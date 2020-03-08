# habitica-zapier

The CLI app for Habitica's Zapier integration.

## Resources for More Information
* [Zapier](https://habitica.fandom.com/wiki/Zapier) - the wiki's page about the production and beta Zapier integrations. If you're contributing to this repo, please see the [Beta Development Version section](https://habitica.fandom.com/wiki/Zapier#Beta_Development_Version) at the bottom of the page.
* [Aspiring Zapier Comrades](https://habitica.com/groups/guild/f144f026-cf47-4ab0-a857-0e80ee43d4fd) - a guild for questions and discussions about devloping and testing the integration.

NB the current production version of the Zapier integration does not use code in this repo. It was built using Zapier's Legacy Web Builder.

## Information for Contributors to this Repo

Zapier does not use the most recent versions of node and npm. If you have node and npm installed for other projects, use nvm to switch between node versions. To find the required versions of node and npm, refer to Zapier's official documentation (although some of it is out of date) or look in the `engines` section of this repo's package.json file.

The tests in this repo connect to a Habitica account so that they can create tasks. To enable the connection, you need to declare environment variables called USER_ID and API_KEY to store your account's [User ID and API Token](https://habitica.com/user/settings/api) respectively. If you don't want to use your normal Habitica account, you're welcome to create one or more test accounts. To run tests:

1. Check that the correct version of node and nom is in use, especially if you use nvm.
2. `export USER_ID=12345678-90ab-416b-cdef-1234567890ab`  # this assumes you're using bash
3. `export API_KEY=87654321-90ab-416b-cdef-ba0987654321`  # this assumes you're using bash
4. `zapier test`
