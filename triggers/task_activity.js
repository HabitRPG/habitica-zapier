'use strict';

const webhookHandlers = require('../lib/webhook');

const subscribeHook = webhookHandlers.createSubscribeHookHandler((bundle) => {
  return {
    label: 'Zapier Task Activity Webhook',
    type: 'taskActivity',
    options: {
      scored: bundle.inputData.scored === 'true',
      created: bundle.inputData.created === 'true',
      updated: bundle.inputData.updated === 'true',
      deleted: bundle.inputData.deleted === 'true',
    },
  };
});

const unsubscribeHook = webhookHandlers.unsubscribeHandler;

const getTask = (z, bundle) => {
  const data = bundle.cleanedRequest;

  return [convertWebhookDataToZapier(data)];
};

const getFallbackRealTask = (z, bundle) => {
  const url = `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/tasks/user`;
  const responsePromise = z.request({
    url: url
  });

  return responsePromise.then(response => {
    const res = JSON.parse(response.content);

    if (!res.success) {
      z.console.log(res);
      return;
    }

    return [convertWebhookDataToZapier(Object.assign({}, res.data[0], fakeSampleData))];
  });
};

function convertWebhookDataToZapier (data) {
  return {
    id: data.task.id,
    task: data.task,
    webhookType: data.type,
  };
}

const fakeSampleData = {
  type: 'scored',
  task: {
    text: 'Some text',
    notes: 'Some notes',
    type: 'todo',
    value: 50
  },
};

module.exports = {
  key: 'task_activity',
  noun: 'Task',

  display: {
    label: 'Task Activity',
    description: 'Triggers when a change happens to a task (created, updated, deleted, scored).'
  },

  operation: {
    type: 'hook',
    inputFields: [
      {
        key: 'scored',
        label: 'Scored',
        helpText: 'Activated whenever a todo or daily is completed, a habit is scored, or a custom reward is purchased.',
        type: 'boolean',
        required: false
      },
      {
        key: 'created',
        label: 'Created',
        helpText: 'Triggered when a new task is created.',
        type: 'boolean',
        required: false
      },
      {
        key: 'updated',
        label: 'Updated',
        helpText: 'Triggered when a task is updated.',
        type: 'boolean',
        required: false
      },
      {
        key: 'deleted',
        label: 'Deleted',
        helpText: 'Triggered when a task is deleted.',
        type: 'boolean',
        required: false
      }
    ],

    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: getTask,
    performList: getFallbackRealTask,

    sample: convertWebhookDataToZapier(fakeSampleData),
  }
};
