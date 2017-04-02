'use strict';

const subscribeHook = (z, bundle) => {
  const data = {
    url: bundle.targetUrl,
    label: 'Zapier Group Chat Received Webhook',
    type: 'groupChatReceived',
    options: {
      groupId: bundle.inputData.groupId
    }
  };

  const promise = z.request({
    url: 'https://habitica.com/api/v3/user/webhook',
    method: 'POST',
    body: data,
  });

  return promise.then((response) => JSON.parse(response.content).data);
};

const unsubscribeHook = (z, bundle) => {
  const hookId = bundle.subscribeData.id;

  const promise = z.request({
    url: `https://habitica.com/api/v3/user/webhook/${hookId}`,
    method: 'DELETE',
  });

  return promise.then((response) => JSON.parse(response.content).data);
};

const getChat = (z, bundle) => {
  const data = convertWebhookDataToZapier(bundle.cleanedRequest);

  return [data];
};

const getFallbackRealChat = (z, bundle) => {
  const url = `https://habitica.com/api/v3/groups/${bundle.inputData.groupId}/chat`;
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
    description: 'Triggers when a new chat appear in a group (party or guild).'
  },

  operation: {
    type: 'hook',
    inputFields: [
      {
        key: 'groupId',
        label: 'Group',
        helpText: 'Choose one of your groups (Party or Guilds). The ID can be found on the group page on the website.',
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
