import { getGroupIcon, addReviewers } from "./utils";
import { groups } from "./config";

const groups = groups || [];
const reviewersDataKey = "reviewers";

const dropdownHTML = [
  '<a href="#reviewers_list" aria-owns="reviewers_list" aria-haspopup="true" class="aui-button aui-style-default aui-dropdown2-trigger" style="margin-left: 10px; display: inline-block; top: -10px;">',
  getGroupIcon(),
  "</a>",
  '<div id="reviewers_list" class="aui-style-default aui-dropdown2">',
  `<ul class="aui-list-truncate" id="ul_reviewers_list">`,
  "</ul>",
  "</div>"
].join("\n");

// jquery instance
const $dropdown = jQuery(dropdownHTML);

groups.forEach(function(group) {
  const linkText = `${group.groupName} (${group.reviewers.length} reviewers)`;
  const $a = jQuery('<a href="Javascript:void(0)"></a>').text(linkText);
  const $li = jQuery("<li></li>")
    .append($a)
    .data(reviewersDataKey, group.reviewers);
  $dropdown.find("#ul_reviewers_list").append($li);
});

const $reviewersInput = jQuery("#s2id_reviewers");
$reviewersInput.after($dropdown);
$dropdown
  .find("#ul_reviewers_list")
  .find("li")
  .click(function() {
    const $element = jQuery(this);
    const reviewers = $element.data(reviewersDataKey);
    addReviewers(reviewers);
  });
