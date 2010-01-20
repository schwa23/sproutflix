// ==========================================================================
// Project:   Sproutflix.User
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Sproutflix.User = SC.Record.extend(
/** @scope Sproutflix.User.prototype */
{

    primaryKey: "screen_name",

    screenName: SC.Record.attr(String, {key: 'screen_name'}),
    name: SC.Record.attr(String),
    profileImage: SC.Record.attr(String, {key: 'profile_image_url'})

});
