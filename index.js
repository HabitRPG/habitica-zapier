const GroupChatReceivedTrigger = require('./triggers/group_chat_received');
const TaskActivityTrigger = require('./triggers/task_activity');
const TaskScoredTrigger = require('./triggers/task_scored');
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
      {
        key: 'userId',
        label: 'User ID',
        required: true,
        type: 'string',
        helpText: 'See [API Options](https://habitica.fandom.com/wiki/API_Options) to learn how to find your User ID.'
      },
      {
        key: 'apiKey',
        label: 'API Token',
        required: true,
        type: 'string',
        helpText: 'See [API Options](https://habitica.fandom.com/wiki/API_Options) to learn how to find your API Token.'
      }
    ],
    test: {
      url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/user`
    },
    connectionLabel: '@{{bundle.inputData.auth.local.username}} / {{bundle.authData.userId}}',
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    (request, z, bundle) => {
      request.headers['x-api-user'] = bundle.authData.userId;
      request.headers['x-api-key'] = bundle.authData.apiKey;

      return request;
    }
  ],

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  afterResponse: [],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
    group: groupResource,
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [GroupChatReceivedTrigger.key]: GroupChatReceivedTrigger,
    [TaskActivityTrigger.key]: TaskActivityTrigger,
    [TaskScoredTrigger.key]: TaskScoredTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    [FindTaskSearch.key]: FindTaskSearch,
  },

  // If you want your creates to show up, you better include it here!
  creates: {
    [ScoreTaskCreate.key]: ScoreTaskCreate,
    [CreateTaskCreate.key]: CreateTaskCreate,
  }
};

module.exports = App;
