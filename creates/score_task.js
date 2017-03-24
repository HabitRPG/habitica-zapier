// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!

// create a particular scoretask by name
const createScoretask = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://habitica.com/api/v3/tasks/{{taskId}}/score/{{direction}}',
    data: JSON.stringify({
      EXAMPLE: bundle.inputData.EXAMPLE
    })
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'score_task',
  noun: 'Scoretask',

  display: {
    label: 'Create Scoretask',
    description: 'Creates a scoretask.'
  },

  operation: {
    inputFields: [
      {
        key: 'taskId',
        label: 'Task ID',
        helpText: 'ID of the task to score.',
        type: 'string',
        required: true
      },
      {
        key: 'direction',
        label: 'Direction',
        helpText: 'Either 'up' or 'down'. If you want to mark a given Daily or ToDo as completed, score 'up'.',
        type: 'string',
        required: true
      }
    ],
    sample: {
      buffs__con: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__int: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__per: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__seafoam: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__shinySeed: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__snowball: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__spookySparkles: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__stealth: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__str: {
        type: 'undefined',
        label: 'undefined'
      },
      buffs__streaks: {
        type: 'undefined',
        label: 'undefined'
      },
      class: {
        type: 'string',
        label: 'Class'
      },
      con: {
        type: 'undefined',
        label: 'Constitution'
      },
      delta: {
        type: 'undefined',
        label: 'undefined'
      },
      exp: {
        type: 'undefined',
        label: 'Experience'
      },
      gp: {
        type: 'string',
        label: 'Gold'
      },
      hp: {
        type: 'undefined',
        label: 'Health'
      },
      int: {
        type: 'undefined',
        label: 'Intelligence'
      },
      lvl: {
        type: 'undefined',
        label: 'Level'
      },
      mp: {
        type: 'string',
        label: 'Mana'
      },
      per: {
        type: 'undefined',
        label: 'Perception'
      },
      points: {
        type: 'undefined',
        label: 'undefined'
      },
      str: {
        type: 'undefined',
        label: 'Strength'
      },
      training__con: {
        type: 'undefined',
        label: 'undefined'
      },
      training__int: {
        type: 'undefined',
        label: 'undefined'
      },
      training__per: {
        type: 'undefined',
        label: 'undefined'
      },
      training__str: {
        type: 'undefined',
        label: 'undefined'
      }
    },

    perform: createScoretask
  }
};
