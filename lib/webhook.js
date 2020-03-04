'use strict';

function createSubscribeHookHandler (configFunc) {
  return (z, bundle) => {
    const data = configFunc(bundle);

    data.url = bundle.targetUrl;

    const promise = z.request({
      url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/user/webhook`,
      method: 'POST',
      body: data,
    });

    return promise.then((response) => JSON.parse(response.content).data);
  };
}

function unsubscribeHandler (z, bundle) {
  const hookId = bundle.subscribeData.id;

  const promise = z.request({
    url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/user/webhook/${hookId}`,
    method: 'DELETE',
  });

  return promise.then((response) => JSON.parse(response.content).data);
}

module.exports = {
  createSubscribeHookHandler: createSubscribeHookHandler,
  unsubscribeHandler: unsubscribeHandler
};
