'use strict';

const inputFields = require('./input_fields');

const createCreatetask = (z, bundle) => {
  if (bundle.inputData.priority) {
    let priority = parseFloat(bundle.inputData.priority);
    bundle.inputData.priority = priority >= 2 ? 2 : priority >= 1.5 ? 1.5 : priority >= 1 ? 1 : 0.1;
  }
  if(bundle.inputData.type === 'daily' && bundle.inputData.frequency === 'monthly'){
    let day = new Date(bundle.inputData.startDate).getDate();
    if(bundle.inputData.repeatOn === 'dom')
      bundle.inputData.daysOfMonth = [day];
    if(bundle.inputData.repeatOn === 'dow')
      bundle.inputData.weeksOfMonth = [Math.floor(day/7)]
  }
  if(bundle.inputData.repeat){
    bundle.inputData.repeat = bundle.inputData.repeat.reduce((acc)=> {acc.item.key})
  }

  const responsePromise = z.request({
    method: 'POST',
    url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/tasks/user`,
    body: bundle.inputData
  });

  return responsePromise.then(response => JSON.parse(response.content).data);
};

module.exports = {
  key: 'create_task',
  noun: 'Task',

  display: {
    label: 'Create Task',
    description: 'Creates a new task (Habit, Daily, To-Do, or Reward).'
  },

  operation: {
    inputFields,
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
