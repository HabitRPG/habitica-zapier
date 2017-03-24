// Created by 'zapier convert'. This is just a stub - you will need to edit!

const GetgroupTrigger = require('./triggers/get_group');
const GroupchatreceivedTrigger = require('./triggers/group_chat_received');
const TaskactivityTrigger = require('./triggers/task_activity');
const FindtaskSearch = require('./searches/find_task');
const ScoretaskCreate = require('./creates/score_task');
const CreatetaskCreate = require('./creates/create_task');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
      // TODO: complete auth settings
    },

  resources: {
  },

  triggers: {
    [GetgroupTrigger.key]: GetgroupTrigger,,
[GroupchatreceivedTrigger.key]: GroupchatreceivedTrigger,,
[TaskactivityTrigger.key]: TaskactivityTrigger,
  },

  searches: {
    [FindtaskSearch.key]: FindtaskSearch,
  },

  creates: {
    [ScoretaskCreate.key]: ScoretaskCreate,,
[CreatetaskCreate.key]: CreatetaskCreate,
  }

};

module.exports = App;
