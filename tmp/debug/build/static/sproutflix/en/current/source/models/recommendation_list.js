// ==========================================================================
// Project:   Sproutflix.RecommendationList
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Sproutflix.RecommendationList = SC.Record.extend(
/** @scope Sproutflix.RecommendationList.prototype */ {

  // TODO: Add your own code here.
  
  recommendations: SC.Record.toMany('Sproutflix.QueueItem', {key: 'recommendation'}),
  
  
  
  primaryKey: "url_template"

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('sproutflix');