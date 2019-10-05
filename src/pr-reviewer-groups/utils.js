function getGroupIcon() {
  return `<img id="img_group_icon" style="width:16px; height:16px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABiElEQVRIS72V/zEEQRCFv4sAESADIkAEZIAMXASIABEgAyJABC4DRIAIqE/NXu3Oza/aOtf/bO1uT7/u1697JqzAJivAoAZyBBwCWyGZGXAJfIX3HWAN+ADecwmXQO6A48RBg/nvBhB0M/g8hAT8NrAcyAlwW6Gyq+gq8tsN4PPPOZBnYK8CYkUG/Iz8HgFproLIuVzXzCR/IqcXYL8FJD5Y6ulokBa6VJQZv0UZKIizlkpUitItmdxfA0//2RP7tp1o/D2gOquNb6HLBkvLay/ed6BwMCs5CTvJ/cMp2pSvIP2BXajCg6WJL/XFflwkEtnorZwqXTqUqjkIvMdrJ5l0bUHm5iU1hCbmTpvG1YwFkRbpzK0eweyPAsr2xNXughysh173PXwa3m2+kk2tIedoGleiszzngscqE8ysFYLP1ADPQWyymfscY86Flbl9z6MAMyuRGmdifUz03hk3gLOjtLub9O+3ILkbcAzmwl3SgbTeHS2gxlJ5A7MSy1umLcSrzclSwH8BMXpPGYwvvtgAAAAASUVORK5CYII="/>`;
}

function searchUsersAsync(term) {
  const deferred = jQuery.Deferred();

  const searchParams = {
    avatarSize: 32,
    permission: "LICENSED_USER",
    start: 0,
    filter: term
  };

  jQuery
    .get("/rest/api/latest/users", searchParams)
    .done(function(data) {
      if (data.values.length > 0) {
        const rawd = data.values[0];
        const select2Data = {
          id: rawd.name,
          text: rawd.displayName || rawd.name,
          item: rawd
        };

        deferred.resolve(select2Data);
      }

      deferred.resolve(null);
    })
    .fail(function() {
      // use resolve instead of reject to avoid prematured end with $.when
      deferred.resolve(null);
    });

  return deferred.promise();
}

function addReviewers(reviewers) {
  const differedList = [];
  const select2DataArray = [];
  reviewers.forEach(function(reviewer) {
    // request user data from search api
    const searchDeferred = searchUsersAsync(reviewer);
    // waiting list
    differedList.push(searchDeferred);
    // add to the array
    searchDeferred.done(function(select2Data) {
      if (select2Data) {
        select2DataArray.push(select2Data);
      }
    });
  });

  jQuery.when.apply(jQuery, differedList).done(function() {
    // clean (for atlassian wrapper)
    const allUsers = $("#reviewers").auiSelect2("data");
    $("#reviewers")
      .auiSelect2("data", null)
      .trigger("change");
    $("#reviewers")
      .auiSelect2("val", null)
      .trigger("change");
    allUsers.forEach(function(item) {
      const e = new jQuery.Event("change");
      e.removed = item;
      $("#reviewers").trigger(e);
    });

    // add (for atlassian wrapper)
    select2DataArray.forEach(function(select2Data) {
      const e = new jQuery.Event("change");
      e.added = select2Data;
      $("#reviewers").trigger(e);
    });
    // update displayed value (for select2)
    $("#reviewers").auiSelect2("data", select2DataArray);
  });
}

export { getGroupIcon, addReviewers };
