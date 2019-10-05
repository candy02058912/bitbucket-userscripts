// example config, please use your own parameters and rename to config.js
module.exports = {
  namespace: "*://bitbucket.example.com/example_repo/pull-requests?create*",
  groups: [
    {
      groupName: "Example Project",
      reviewers: ["example@company.com", "example2@company.com"]
    }
  ]
};
