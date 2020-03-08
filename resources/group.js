'use strict';

module.exports = {
  key: 'group',
  noun: 'group',
  list: {
    display: {
      label: 'Group',
      description: 'A guild or party on Habitica.',
      hidden: true
    },
    operation: {
      perform: (z) => {
        return z.request({
          url: `${process.env.BASE_HABITICA_URI||'https://habitica.com'}/api/v3/groups`,
          params: {
            type: 'party,guilds'
          }
        }).then((resp) => {
          return JSON.parse(resp.content).data;
        });
      }
    }
  }
};
