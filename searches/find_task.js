'use strict';

const searchFindtask = (z, bundle) => {
  const responsePromise = z.request({
    url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/tasks/user`,
  });
  return responsePromise.then(response => JSON.parse(response.content).data);
};

module.exports = {
  key: 'find_task',
  noun: 'Task',

  display: {
    label: 'Find a Task 1',
    description: 'Finds a task.'
  },

  operation: {
    inputFields: [
      {
        key: 'taskName',
        label: 'Task Name',
        helpText: 'The name of the task to find.',
        type: 'string',
        required: true
      }
    ],
    sample: {
      _id: '07b8db25-25f2-45cf-b9f6-1503764ec388',
      userId: '4c85b82b-1777-4bee-9fc5-72dd2b043f68',
      text: 'New test',
      updatedAt: '2017-04-19T02:47:15.325Z',
      createdAt: '2017-04-19T02:47:15.325Z',
      reminders: [],
      group: [],
      challenge: {},
      attribute: 'str',
      priority: 1,
      value: 0,
      tags: [],
      notes: '',
      type: 'todo',
      checklist: [],
      collapseChecklist: false,
      completed: false,
      id: '07b8db25-25f2-45cf-b9f6-1503764ec388' ,
    },

    perform: searchFindtask
  }
};
