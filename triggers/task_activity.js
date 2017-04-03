'use strict';

const subscribeHook = (z, bundle) => {
  const data = {
    url: bundle.targetUrl,
    label: 'Zapier Task Webhook',
    type: 'taskActivity',
    options: {
      scored: bundle.inputData.scored === 'true',
      created: bundle.inputData.created === 'true',
      updated: bundle.inputData.updated === 'true',
      deleted: bundle.inputData.deleted === 'true',
    }
  };

  const promise = z.request({
    url: 'https://habitica.com/api/v3/user/webhook',
    method: 'POST',
    body: data,
  });

  return promise.then((response) => JSON.parse(response.content).data);
};

const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.id;

  const promise = z.request({
    url: `https://habitica.com/api/v3/user/webhook/${hookId}`,
    method: 'DELETE',
  });

  return promise.then((response) => JSON.parse(response.content).data);
};

const getTask = (z, bundle) => {
  const data = bundle.cleanedRequest;

  return [convertWebhookDataToZapier(data)];
};

const getFallbackRealTask = (z, bundle) => {
  const url = 'https://habitica.com/api/v3/tasks/user';
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
    taskScoredData: {
      direction: data.direction,
      delta: data.delta,
      user: data.user,
    },
  };
}

const fakeSampleData = {
  type: 'scored',
  direction: 'up',
  delta: 10,
  task: {
    text: 'Some text',
    notes: 'Some notes',
    type: 'todo',
    value: 50
  },
  user: {
    _id: 'user-id',
    _tmp: {},
    stats: {
      toNextLevel: 10,
      maxHealth: 50,
      maxMP: 100,
      hp: 45,
      mp: 50,
      exp: 10,
      gp: 10,
      lvl: 10,
      class: 'warrior',
      points: 10,
      str: 10,
      con: 10,
      int: 10,
      per: 10,
      buffs: {
        str: 10,
        int: 10,
        per: 10,
        con: 10,
        stealth: 10,
        streaks: false,
        snowball: false,
        spookySparkles: false,
        shinySeed: false,
        seafoam: false,
      },
      training: {
        int: 10,
        per: 10,
        str: 10,
        con: 10,
      },
    },
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
