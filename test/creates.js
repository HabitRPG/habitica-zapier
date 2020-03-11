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
    it('should create a new habit', (done) => {
      const bundle = {
        authData: {
          userId: process.env.USER_ID,
          apiKey: process.env.API_KEY
        },
        inputData: {
          type: 'habit',
          text: 'Write a test :)',
          priority: '2',
          frequency: 'monthly',
        }
      };
      appTester(App.creates.create_task.operation.perform, bundle)
          .then((result) => {
            result.should.have.property('type').equal('habit');
            result.should.have.property('text').equal('Write a test :)');
            result.should.have.property('priority').equal(2);
            result.should.have.property('frequency').equal('monthly');
            done();
          })
          .catch(done);
    });
      it('should create a new daily that repeats monthly', (done) => {
          const bundle = {
              authData: {
                  userId: process.env.USER_ID,
                  apiKey: process.env.API_KEY
              },
              inputData: {
                  type: 'daily',
                  text: 'Improve a test',
                  priority: '2',
                  frequency: 'monthly',
                  everyX: "1",
                  startDate:"2020-03-05T15:38:33.192Z",
                  repeatOn: "dom"
              }
          };
          appTester(App.creates.create_task.operation.perform, bundle)
              .then((result) => {
                  result.should.have.property('type').equal('daily');
                  result.should.have.property('text').equal('Improve a test');
                  result.should.have.property('priority').equal(2);
                  result.should.have.property('frequency').equal('monthly');
                  result.should.have.property('daysOfMonth').deepEqual([5]);
                  done();
              })
              .catch(done);
      });
  });
});
