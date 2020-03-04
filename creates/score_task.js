'use strict';

const createScoretask = (z, bundle) => {
  const taskId = bundle.inputData.taskId;
  const direction = bundle.inputData.direction;
  const responsePromise = z.request({
    method: 'POST',
    url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/tasks/${taskId}/score/${direction}`,
  });
  return responsePromise
    .then(response => JSON.parse(response.content).data);
};

module.exports = {
  key: 'score_task',
  noun: 'Task',

  display: {
    label: 'Score Task',
    description: 'Scores an existing Task'
  },

  operation: {
    inputFields: [
      {
        key: 'taskId',
        label: 'Task ID',
        helpText: 'ID or alias of the task to score.',
        type: 'string',
        required: true
      }, {
        key: 'direction',
        label: 'Direction',
        helpText: 'Either "up" or "down". If you want to mark a given Daily or ToDo as completed, score "up".',
        choices: {
          up: 'Up',
          down: 'Down',
        },
        required: true
      }
    ],
    sample: {
      delta: 0.9746999906450404,
      _tmp: { quest: {} },
      hp: 48.1,
      mp: 30,
      exp: 54,
      gp: 6.031504018368912,
      lvl: 1,
      class: 'warrior',
      points: 0,
      str: 0,
      con: 0,
      int: 0,
      per: 0,
      buffs: {
        str: 0,
        int: 0,
        per: 0,
        con: 0,
        stealth: 0,
        streaks: false,
        snowball: false,
        spookySparkles: false,
        shinySeed: false,
        seafoam: false
      },
      training: {
        int: 0,
        per: 0,
        str: 0,
        con: 0
      }
    },

    perform: createScoretask
  }
};
