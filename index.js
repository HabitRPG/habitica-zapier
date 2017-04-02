const GroupChatReceivedTrigger = require('./triggers/group_chat_received');
const TaskActivityTrigger = require('./triggers/task_activity');
const FindTaskSearch = require('./searches/find_task');
const ScoreTaskCreate = require('./creates/score_task');
const CreateTaskCreate = require('./creates/create_task');

const groupResource = require('./resources/group');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'custom',
    fields: [
      {key: 'userId', label: 'User Id', required: true, type: 'string'},
      {key: 'apiKey', label: 'API Key', required: true, type: 'string'},
    ],
    test: {
      url: 'https://habitica.com/api/v3/user'
    }
  },

  beforeRequest: [
    (request, z, bundle) => {
      request.headers['x-api-user'] = bundle.authData.userId;
      request.headers['x-api-key'] = bundle.authData.apiKey;

      return request;
    }
  ],

  resources: {
    group: groupResource,
  },

  triggers: {
    [GroupChatReceivedTrigger.key]: GroupChatReceivedTrigger,
    [TaskActivityTrigger.key]: TaskActivityTrigger,
  },

  searches: {
    [FindTaskSearch.key]: FindTaskSearch,
  },

  creates: {
    [ScoreTaskCreate.key]: ScoreTaskCreate,
    [CreateTaskCreate.key]: CreateTaskCreate,
  }
};

module.exports = App;
