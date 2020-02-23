'use strict';

const nerdamer = require('nerdamer');

const createCreatetask = (z, bundle) => {
  let strictParseFloat = function(value) {
      if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value))
        return Number(value);
    return NaN;
  }

  let priority = strictParseFloat(nerdamer(bundle.inputData.priority).evaluate().text());
  bundle.inputData.priority = priority >= 2 ?2:priority>=1.5?1.5:priority >= 1?1:0.1;

  const responsePromise = z.request({
    method: 'POST',
    url: 'https://habitica.com/api/v3/tasks/user',
    body: bundle.inputData
  });

  return responsePromise.then(response => JSON.parse(response.content).data);
};

module.exports = {
  key: 'create_task',
  noun: 'Task',

  display: {
    label: 'Create Task',
    description: 'Creates a new task.'
  },

  operation: {
    inputFields: [
      {
        key: 'type',
        label: 'Type',
        helpText: 'The type of your task.',
        choices: {
          todo: 'To-Do',
          daily: 'Daily',
          habit: 'Habit',
          reward: 'Reward',
        },
        required: true,
        altersDynamicFields: true,
      }, {
        key: 'text',
        label: 'Name',
        helpText: 'The name of the habit, daily, to-do or reward.',
        type: 'string',
        required: true
      }, {
        key: 'notes',
        label: 'Notes',
        helpText: 'Enter all notes that should be attached to the task here.',
        type: 'text',
        required: false
      }, {
        key: 'priority',
        label: 'Priority',
        helpText: 'Difficulty, options are 0.1, 1, 1.5, 2; eqivalent of Trivial, Easy, Medium, Hard. You may also use symbolic math expressions supported by nerdamer http://nerdamer.com/documentation.html ',
        type: 'string',
        required: false
      }, {
        key: 'alias',
        label: 'Alias',
        helpText: 'A human readable id for your task. Task short names can only contain alphanumeric characters, underscores and dashes and must be unique among all your tasks. Useful when creating a sync between Habitica and another service. You may want to set the task alias to other_service_name-id_from_other_service so that you can identify the task after creation.',
        type: 'string',
        required: false
      },
      (z, bundle) => {
        const attribute = {
          key: 'attribute',
          label: 'Training Attribute',
          helpText: 'If you have chosen automatic stat allocation based on activity, you can set which attribute to train.',
          choices: {
            str: 'Strength',
            int: 'Intelligence',
            per: 'Perception',
            con: 'Constitution'
          },
          required: false
        };

        if (bundle.inputData.type === 'habit') {
          return [{
            key: 'up',
            label: 'Up',
            helpText: 'Applicable only to Habits. Creates a Habit with a (+) button.',
            type: 'boolean',
            required: true,
          }, {
            key: 'down',
            label: 'Down',
            helpText: 'Applicable only to Habits. Creates a Habit with a (-) button.',
            type: 'boolean',
            required: true,
          }, attribute];
        } else if (bundle.inputData.type === 'daily') {
          return [{
            key: 'frequency',
            label: 'Freqency',
            helpText: 'Applicable only to Dailys. Choose the kind of Daily.',
            choices: {
              daily: 'Every X Days',
              weekly: 'On Certain Days of the Week',
            },
            required: true,
            altersDynamicFields: true,
          }, attribute];
        } else if (bundle.inputData.type === 'todo') {
          return [{
            key: 'date',
            label: 'Due Date',
            helpText: 'Applicable only to To-Dos. Choose the date you want the To-Do to be due.',
            type: 'datetime',
            required: false,
          }, attribute];
        } else if (bundle.inputData.type === 'reward') {
          return [{
            key: 'value',
            label: 'Price',
            helpText: 'Only applicable to Rewards. Sets the price of the reward.',
            type: 'number',
            required: false,
          }];
        }

        return [];
      }, (z, bundle) => {
        if (bundle.inputData.type !== 'daily') {
          return [];
        }

        if (bundle.inputData.frequency === 'daily') {
          return [{
            key: 'everyX',
            label: 'Every X Days',
            helpText: 'Applicable only to Dailys with a frequency of "Every X Days". Choose how often the Daily should repeat.',
            type: 'integer',
            required: false,
          }];
        } else if (bundle.inputData.frequency === 'weekly') {
           return [{
            key: 'repeat__m',
            label: 'Repeat on Monday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Monday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__t',
            label: 'Repeat on Tuesday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Tuesday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__w',
            label: 'Repeat on Wednesday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Wednesday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__th',
            label: 'Repeat on Thursday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Thursday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__f',
            label: 'Repeat on Friday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Friday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__s',
            label: 'Repeat on Saturday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Saturday.',
            type: 'boolean',
            required: false,
          }, {
            key: 'repeat__su',
            label: 'Repeat on Sunday',
            helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Sunday.',
            type: 'boolean',
            required: false,
          }];
        }

        return [];
      }
    ],
    sample: {
      id: 'task-id',
      alias: 'task-alias',
      attribute: 'str',
      // TODO
      // checklist: {
      //   type: 'string',
      //   label: 'undefined'
      // },
      // collapseChecklist: {
      //   type: 'undefined',
      //   label: 'undefined'
      // },
      // reminders: {
      //   type: 'string',
      //   label: 'undefined'
      // },
      // tags: {
      //   type: 'string',
      //   label: 'undefined'
      // },
      completed: false,
      createdAt: '2017-03-09T14:17:44.531Z',
      date: '2017-03-09T14:17:44.531Z',
      down: false,
      everyX: 1,
      frequency: 'daily',
      notes: 'Task Notes',
      priority: 1,
      repeat__f: true,
      repeat__m: true,
      repeat__s: true,
      repeat__su: true,
      repeat__t: true,
      repeat__th: true,
      repeat__w: true,
      startDate: '2017-03-09T14:17:44.531Z',
      text: 'Task Text',
      type: 'daily',
      up: false,
      updatedAt: '2017-03-09T14:17:44.531Z',
      userId: 'user-id',
      value: 50
    },

    perform: createCreatetask
  }
};
