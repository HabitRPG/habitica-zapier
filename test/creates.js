require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('create task create', () => {
    it('should create a new task', (done) => {
      const bundle = {
        authData: {
          userId: process.env.USER_ID,
          apiKey: process.env.API_KEY
        },
        inputData: {
          type: 'todo',
          text: 'Write more tests :)',
          priority: '2',
        }
      };
      appTester(App.creates.create_task.operation.perform, bundle)
        .then((result) => {
          result.should.have.property('text');
          done();
        })
        .catch(done);
    });
  });
});
