// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!

// triggers on groupchatreceived with a certain tag
const triggerGroupchatreceived = (z, bundle) => {
  const responsePromise = z.request({
    url: 'http://example.com/api/groupChatReceived.json', // TODO this is just an example
    params: {
      EXAMPLE: bundle.inputData.EXAMPLE
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'group_chat_received',
  noun: 'Groupchatreceived',

  display: {
    label: 'Get Groupchatreceived',
    description: 'Triggers on a new groupchatreceived.'
  },

  operation: {
    inputFields: [
      {
        key: 'groupId',
        label: 'Group',
        helpText: 'Choose one of your groups (Party or Guilds).',
        type: 'string',
        required: true
      }
    ],
    sample: {
      chat__contributor__admin: {
        type: 'undefined',
        label: 'undefined'
      },
      chat__contributor__contributions: {
        type: 'string',
        label: 'undefined'
      },
      chat__contributor__level: {
        type: 'undefined',
        label: 'undefined'
      },
      chat__contributor__text: {
        type: 'string',
        label: 'undefined'
      },
      chat__flagCount: {
        type: 'undefined',
        label: 'Flag Count'
      },
      chat__id: {
        type: 'string',
        label: 'Chat UUID'
      },
      chat__text: {
        type: 'string',
        label: 'Chat Text'
      },
      chat__timestamp: {
        type: 'undefined',
        label: 'Chat Post Date'
      },
      chat__user: {
        type: 'string',
        label: 'User Name'
      },
      chat__uuid: {
        type: 'string',
        label: 'User UUID'
      },
      group__id: {
        type: 'string',
        label: 'Group UUID'
      },
      group__name: {
        type: 'string',
        label: 'Group Name'
      }
    },

    perform: triggerGroupchatreceived
  }
};
