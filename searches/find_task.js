// Search stub created by 'zapier convert'. This is just a stub - you will need to edit!

// find a particular findtask by name
const searchFindtask = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://habitrpg-delta.herokuapp.com/api/v3/tasks/user',
    params: {
      EXAMPLE: bundle.inputData.EXAMPLE
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'find_task',
  noun: 'Findtask',

  display: {
    label: 'Find a Findtask',
    description: 'Finds a findtask.'
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
      attribute: {
        type: 'string',
        label: 'undefined'
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
      dateCreated: {
        type: 'string',
        label: 'Date Created'
      },
      id: {
        type: 'string',
        label: 'Task ID'
      },
      notes: {
        type: 'string',
        label: 'Task Notes'
      },
      priority: {
        type: 'undefined',
        label: 'Priority'
      },
      reminders: {
        type: 'string',
        label: 'undefined'
      },
      text: {
        type: 'string',
        label: 'Task Name'
      },
      type: {
        type: 'string',
        label: 'Type'
      },
      value: {
        type: 'undefined',
        label: 'Task Value'
      }
    },

    perform: searchFindtask
  }
};
