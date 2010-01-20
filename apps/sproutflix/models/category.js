// ==========================================================================
// Project:   Sproutflix.Category
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Sproutflix.Category = SC.Record.extend(
/** @scope Sproutflix.Category.prototype */
{

    // TODO: Add your own code here.
    term: SC.Record.attr(String),
    content: SC.Record.attr(String),
    label: SC.Record.attr(String)

    // "category": [
    //       {
    //         "term": "available now",
    //         "content": "Available Now",
    //         "scheme": "http://api.netflix.com/categories/queue_availability",
    //         "label": "available now"
    //       },
});