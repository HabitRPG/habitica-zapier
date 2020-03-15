module.exports = (z, bundle) => {
    let inputFields = [
        {
            key: 'startDate',
            label: 'Start Date',
            type: 'datetime',
            required: true,
        },
        {
            key: 'frequency',
            label: 'Frequency',
            helpText: 'Applicable only to Dailies. Choose the kind of Daily.',
            choices: {
                daily: 'Every X Days',
                weekly: 'On Certain Days of the Week',
                monthly: 'Every X Months',
                yearly: 'Every X Months'
            },
            required: true,
            altersDynamicFields: true,
        },
        {
            key: 'everyX',
            label: 'Repeat Every',
            helpText: 'Applicable only to Dailies. Choose how often the Daily should repeat.',
            type: 'integer',
            required: false,
        },
    ];
    if (bundle.inputData.frequency === 'weekly') {
        inputFields.push(
            {
                key: "repeat",
                children: [
                    {
                        key: 'm',
                        label: 'Repeat on Monday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Monday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 't',
                        label: 'Repeat on Tuesday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Tuesday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 'w',
                        label: 'Repeat on Wednesday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Wednesday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 'th',
                        label: 'Repeat on Thursday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Thursday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 'f',
                        label: 'Repeat on Friday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Friday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 's',
                        label: 'Repeat on Saturday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Saturday.',
                        type: 'boolean',
                        required: false,
                    }, {
                        key: 'su',
                        label: 'Repeat on Sunday (Default: yes)',
                        helpText: 'Applicable only to Dailies with a frequency of "On Certain Days of the Week". Choose whether the Daily should be active on Sunday.',
                        type: 'boolean',
                        required: false,
                    }]
            }
        );
    } else if (bundle.inputData.frequency === 'monthly') {
        inputFields.push(
            {
                key: 'repeatOn',
                required: true,
                label: "Repeat On",
                choices: {dom: 'Day of the Month', dow: 'Day of the Week'}
            }
        );
    }
    return inputFields;
};
