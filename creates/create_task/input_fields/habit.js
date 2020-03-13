module.exports = (z, bundle) => [
    {
        key: 'up',
        label: 'Up',
        helpText: 'Applicable only to Habits. Creates a Habit with a (+) button.',
        type: 'boolean',
        required: true,
    }, {
        key: 'down',
        label: 'Down',
        helpText: 'Applicable only to Habits. Creates a Habit with a (-) button.',
        type: 'boolean',
        required: true,
    }, {
        key: 'frequency',
        label: 'Frequency',
        helpText: 'Applicable only to Habits. Choose how frequently to reset your streak.',
        choices: {
            daily: 'Every day',
            weekly: 'Every week',
            monthly: 'Every month',
        },
        required: true,
    }
];
