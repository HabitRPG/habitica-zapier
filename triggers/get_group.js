// Trigger stub created by 'zapier convert'. This is just a stub - you will need to edit!

// triggers on getgroup with a certain tag
const triggerGetgroup = (z, bundle) => {
  const responsePromise = z.request({
    url: 'https://habitica.com/api/v3/groups?type=party,guilds',
    params: {
      EXAMPLE: bundle.inputData.EXAMPLE
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'get_group',
  noun: 'Getgroup',

  display: {
    label: 'Get Getgroup',
    description: 'Triggers on a new getgroup.'
  },

  operation: {
    inputFields: [

    ],
    sample: {
      _id: {
        type: 'string',
        label: 'undefined'
      },
      balance: {
        type: 'undefined',
        label: 'undefined'
      },
      description: {
        type: 'string',
        label: 'Description'
      },
      id: {
        type: 'string',
        label: 'Group ID'
      },
      memberCount: {
        type: 'undefined',
        label: 'undefined'
      },
      name: {
        type: 'string',
        label: 'Group Name'
      },
      privacy: {
        type: 'string',
        label: 'undefined'
      },
      type: {
        type: 'string',
        label: 'Group Type'
      }
    },

    perform: triggerGetgroup
  }
};
