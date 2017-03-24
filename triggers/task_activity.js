// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!

// triggers on taskactivity with a certain tag
const triggerTaskactivity = (z, bundle) => {
  const responsePromise = z.request({
    url: 'http://example.com/api/taskActivity.json', // TODO this is just an example
    params: {
      EXAMPLE: bundle.inputData.EXAMPLE
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'task_activity',
  noun: 'Taskactivity',

  display: {
    label: 'Get Taskactivity',
    description: 'Triggers on a new taskactivity.'
  },

  operation: {
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
    sample: {
      delta: {
        type: 'undefined',
        label: 'undefined'
      },
      direction: {
        type: 'string',
        label: 'undefined'
      },
      task__attribute: {
        type: 'string',
        label: 'undefined'
      },
      task__checklist: {
        type: 'string',
        label: 'undefined'
      },
      task__checklist[]completed: {
        type: 'string',
        label: 'undefined'
      },
      task__checklist[]id: {
        type: 'string',
        label: 'undefined'
      },
      task__checklist[]text: {
        type: 'string',
        label: 'undefined'
      },
      task__collapseChecklist: {
        type: 'undefined',
        label: 'undefined'
      },
      task__completed: {
        type: 'undefined',
        label: 'undefined'
      },
      task__date: {
        type: 'string',
        label: 'undefined'
      },
      task__dateCreated: {
        type: 'string',
        label: 'undefined'
      },
      task__id: {
        type: 'string',
        label: 'undefined'
      },
      task__notes: {
        type: 'string',
        label: 'undefined'
      },
      task__priority: {
        type: 'undefined',
        label: 'undefined'
      },
      task__reminders: {
        type: 'string',
        label: 'undefined'
      },
      task__tags__79a679a5-d5a4-4cdc-b371-e3c0dc6d8337: {
        type: 'undefined',
        label: 'undefined'
      },
      task__text: {
        type: 'string',
        label: 'undefined'
      },
      task__type: {
        type: 'string',
        label: 'undefined'
      },
      task__value: {
        type: 'undefined',
        label: 'undefined'
      },
      type: {
        type: 'string',
        label: 'Type'
      },
      user___id: {
        type: 'string',
        label: 'undefined'
      },
      user__stats__gp: {
        type: 'undefined',
        label: 'undefined'
      },
      user__stats__hp: {
        type: 'undefined',
        label: 'undefined'
      },
      user__stats__maxHealth: {
        type: 'undefined',
        label: 'undefined'
      },
      user__stats__maxMP: {
        type: 'undefined',
        label: 'undefined'
      },
      user__stats__mp: {
        type: 'undefined',
        label: 'undefined'
      },
      user__stats__toNextLevel: {
        type: 'undefined',
        label: 'undefined'
      }
    },

    perform: triggerTaskactivity
  }
};
