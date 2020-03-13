const dailyFields = require('./daily');
const habitFields = require('./habit');
const rewardFields = require('./reward');
const todoFields = require('./todo');

module.exports = [(z, bundle) => {
    let fields = [
        {
            key: 'type',
            label: 'Type',
            helpText: 'The type of your task.',
            choices: {
                todo: 'To-Do',
                daily: 'Daily',
                habit: 'Habit',
                reward: 'Reward',
            },
            required: true,
            altersDynamicFields: true,
        }, {
            key: 'text',
            label: 'Name',
            helpText: 'The name of the task.',
            type: 'string',
            required: true
        }, {
            key: 'notes',
            label: 'Notes',
            helpText: 'Notes that should be attached to the task.',
            type: 'text',
            required: false
        }, {
            key: 'priority',
            label: 'Difficulty',
            helpText: 'Difficulty, options are 0.1, 1, 1.5, 2 (eqivalent of Trivial, Easy, Medium, Hard).',
            type: 'string',
            required: false
        }, {
            key: 'alias',
            label: 'Alias',
            helpText: 'A human-readable ID for your task. Task aliases can only contain alphanumeric characters, underscores, and dashes and must be unique among all your tasks. Useful when creating a sync between Habitica and another service. You may want to set the task alias to other_service_name-id_from_other_service so that you can identify the task after creation.',
            type: 'string',
            required: false
        },
        {
            key: 'attribute',
            label: 'Training Attribute',
            helpText: 'If you have chosen automatic stat allocation based on activity, you can set which attribute to train.',
            choices: {
                str: 'Strength',
                int: 'Intelligence',
                per: 'Perception',
                con: 'Constitution'
            },
            required: false
        },
    ];
    if (bundle.inputData.type === 'habit') {
        fields.push(...habitFields(z, bundle));
    } else if (bundle.inputData.type === 'daily') {
        fields.push(...dailyFields(z, bundle));
    } else if (bundle.inputData.type === 'todo') {
        fields.push(...todoFields(z, bundle));
    } else if (bundle.inputData.type === 'reward') {
        fields.push(...rewardFields(z, bundle));
    }

    return fields;
}];
