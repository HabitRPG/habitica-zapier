'use strict';

const webhookHandlers = require('../lib/webhook');

const subscribeHook = webhookHandlers.createSubscribeHookHandler((bundle) => {
  return {
    label: 'Zapier Group Chat Received Webhook',
    type: 'groupChatReceived',
    options: {
      groupId: bundle.inputData.groupId
    }
  };
});

const unsubscribeHook = webhookHandlers.unsubscribeHandler;

const getChat = (z, bundle) => {
  const data = convertWebhookDataToZapier(bundle.cleanedRequest);

  return [data];
};

const getFallbackRealChat = (z, bundle) => {
  const url = `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/groups/${bundle.inputData.groupId}/chat`;
  const responsePromise = z.request({
    url: url
  });

  return responsePromise.then(response => {
    const res = JSON.parse(response.content);

    if (!res.success) {
      z.console.log(res);
      return;
    }

    return [convertWebhookDataToZapier({
      chat: res.data[0],
      group: {
        id: bundle.inputData.groupId,
        name: 'Group Name',
      },
    })];
  });
};

function convertWebhookDataToZapier (data) {
  const chat = data.chat;
  const group = data.group;

  return {
    id: chat.id, // for some reason, Zapier needs this at the top level
    chat: {
      id: chat.id,
      flagCount: chat.flagCount,
      text: chat.text,
      timestamp: chat.timestamp
    },
    sender: {
      id: chat.uuid,
      name: chat.user
    },
    group: group
  };
}

module.exports = {
  key: 'group_chat_received',
  noun: 'Chat',

  display: {
    label: 'New Group Chat',
    description: 'Triggers when a new chat appears in a group (Party or Guild).'
  },

  operation: {
    type: 'hook',
    inputFields: [
      {
        key: 'groupId',
        label: 'Group',
        helpText: 'Choose one of your groups (Party or Guilds).',
        dynamic: 'groupList.id.name',
        type: 'string',
        required: true
      }
    ],


    performSubscribe: subscribeHook,
    performUnsubscribe: unsubscribeHook,
    perform: getChat,
    performList: getFallbackRealChat,

    sample: convertWebhookDataToZapier({
      chat: {
        contributor: {
          admin: false,
          contributions: '',
          level: 7,
          text: 'Legend'
        },
        flagCount: 0,
        id: 'chat-id',
        text: 'Chat Message',
        timestamp: 10001,
        user: 'User',
        uuid: 'user-id',
      },
      group: {
        id: 'group-id',
        name: 'Group Name'
      },
    }),
  }
};
