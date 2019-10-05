const config = require("./config");

module.exports = {
  name: "PR Reviewer Groups",
  namespace: "https://github.com/candy02058912/bitbucket-userscripts",
  version: process.env.npm_package_version,
  description: "Adds a component to select a group of reviewers when creating PRs",
  match: config.match
};
