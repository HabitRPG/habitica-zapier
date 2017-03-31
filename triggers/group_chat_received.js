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
  noun: 'chat',

  display: {
    label: 'New Group Chat',
    description: 'Triggers when a new chat appear in a group (party or guild).'
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
        type: 'Boolean',
        label: 'User is Moderator'
      },
      chat__contributor__contributions: {
        type: 'string',
        label: 'User Contributions'
      },
      chat__contributor__level: {
        type: 'number',
        label: 'User Contributor Level'
      },
      chat__contributor__text: {
        type: 'string',
        label: 'User Contributor Title'
      },
      chat__flagCount: {
        type: 'number',
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
        type: 'date',
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
