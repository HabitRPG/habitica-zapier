'use strict';

const webhookHandlers = require('../lib/webhook');

const subscribeHook = webhookHandlers.createSubscribeHookHandler((bundle) => {
  return {
    label: 'Zapier Task Scored Webhook',
    type: 'taskActivity',
    options: {
      scored: true,
      created: false,
      updated: false,
      deleted: false,
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
  key: 'task_scored',
  noun: 'Task',

  display: {
    label: 'Task Scored',
    description: 'Triggers when a task is scored. Includes additional info about the user object, direction that task was scored ("up" or "down") and the change in value from the score.'
  },

  operation: {
    type: 'hook',
    inputFields: [],

    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: getTask,
    performList: getFallbackRealTask,

    sample: convertWebhookDataToZapier(fakeSampleData),
  }
};
