// "Create" stub created by 'zapier convert'. This is just a stub - you will need to edit!

// create a particular createtask by name
const createCreatetask = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://habitica.com/api/v3/tasks/user',
    data: JSON.stringify({
      EXAMPLE: bundle.inputData.EXAMPLE
    })
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'create_task',
  noun: 'Createtask',

  display: {
    label: 'Create Createtask',
    description: 'Creates a createtask.'
  },

  operation: {
    inputFields: [
      {
        key: 'type',
        label: 'Type',
        helpText: 'The type of your task.',
        type: 'string',
        required: true
      },
      {
        key: 'text',
        label: 'Name',
        helpText: 'The name of the habit, daily, to-do or reward.',
        type: 'string',
        required: true
      },
      {
        key: 'notes',
        label: 'Notes',
        helpText: 'Enter all notes that should be attached to the task here.',
        type: 'string',
        required: false
      },
      {
        key: 'up',
        label: 'Up',
        helpText: 'Applicable only to Habits. Creates a Habit with a (+) button.',
        type: 'string',
        required: false
      },
      {
        key: 'down',
        label: 'Down',
        helpText: 'Applicable only to Habits. Creates a Habit with a (-) button.',
        type: 'string',
        required: false
      },
      {
        key: 'frequency',
        label: 'Freqency',
        helpText: 'Applicable only to Dailys. Choose the kind of Daily.',
        type: 'string',
        required: false
      },
      {
        key: 'everyX',
        label: 'Every X Days',
        helpText: 'Applicable only to Dailys with a frequency of "Every X Days". Choose how often the Daily should repeat.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__m',
        label: 'Repeat on Monday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Monday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__t',
        label: 'Repeat on Tuesday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Tuesday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__w',
        label: 'Repeat on Wednesday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Wednesday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__th',
        label: 'Repeat on Thursday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Thursday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__f',
        label: 'Repeat on Friday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Friday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__s',
        label: 'Repeat on Saturday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Saturday.',
        type: 'string',
        required: false
      },
      {
        key: 'repeat__su',
        label: 'Repeat on Sunday',
        helpText: 'Applicable only to Dailys with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Sunday.',
        type: 'string',
        required: false
      },
      {
        key: 'date',
        label: 'Due Date',
        helpText: 'Applicable only to To-Dos. Choose the date you want the To-Do to be due.',
        type: 'string',
        required: false
      },
      {
        key: 'alias',
        label: 'Alias',
        helpText: 'A human readable id for your task. Task short names can only contain alphanumeric characters, underscores and dashes and must be unique among all your tasks. Useful when creating a sync between Habitica and another service. You may want to set the task alias to other_service_name-id_from_other_service so that you can identify the task after creation.',
        type: 'string',
        required: false
      },
      {
        key: 'value',
        label: 'Price',
        helpText: 'Only applicable to Rewards. Sets the price of the reward.',
        type: 'string',
        required: false
      },
      {
        key: 'attribute',
        label: 'Training Attribute',
        helpText: 'If you have chosen automatic stat allocation based on activity, you can set which attribute to train.',
        type: 'string',
        required: false
      }
    ],
    sample: {
      _id: {
        type: 'string',
        label: 'undefined'
      },
      alias: {
        type: 'string',
        label: 'undefined'
      },
      attribute: {
        type: 'string',
        label: 'Attribute'
      },
      checklist: {
        type: 'string',
        label: 'undefined'
      },
      collapseChecklist: {
        type: 'undefined',
        label: 'undefined'
      },
      completed: {
        type: 'undefined',
        label: 'Completed'
      },
      createdAt: {
        type: 'string',
        label: 'Created At'
      },
      date: {
        type: 'string',
        label: 'undefined'
      },
      down: {
        type: 'undefined',
        label: 'undefined'
      },
      everyX: {
        type: 'undefined',
        label: 'undefined'
      },
      frequency: {
        type: 'string',
        label: 'undefined'
      },
      id: {
        type: 'string',
        label: 'Task ID'
      },
      notes: {
        type: 'string',
        label: ' Task Notes'
      },
      priority: {
        type: 'undefined',
        label: 'Priority'
      },
      reminders: {
        type: 'string',
        label: 'undefined'
      },
      repeat__f: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__m: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__s: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__su: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__t: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__th: {
        type: 'undefined',
        label: 'undefined'
      },
      repeat__w: {
        type: 'undefined',
        label: 'undefined'
      },
      startDate: {
        type: 'string',
        label: 'undefined'
      },
      tags: {
        type: 'string',
        label: 'undefined'
      },
      text: {
        type: 'string',
        label: 'Task Name'
      },
      type: {
        type: 'string',
        label: 'Task Type'
      },
      up: {
        type: 'undefined',
        label: 'undefined'
      },
      updatedAt: {
        type: 'string',
        label: 'undefined'
      },
      userId: {
        type: 'string',
        label: 'User ID'
      },
      value: {
        type: 'undefined',
        label: 'Task Value'
      }
    },

    perform: createCreatetask
  }
};
