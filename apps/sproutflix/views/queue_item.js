// ==========================================================================
// Project:   Sproutflix.QueueItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

/** @class

  (Document Your View Here)

  @extends SC.ListItemView
*/
Sproutflix.QueueItemView = SC.ListItemView.extend(
/** @scope Sproutflix.QueueItemView.prototype */ {

  // TODO: Add your own code here.

  displayProperties: ['averageRating'],
  
  contentUnreadCountKey: 'averageRating',
  hasContentUnreadCount: YES,
  
  
  
  renderCount: function(context, count) {
    var width = count / 5 * 100;
    
    context.push('<span class="count rating"><span class="inner" style="width: %@%"><span class="hidden">'.fmt(width))
      .push(count.toString()).push('</span></span></span>') ;
  }
  

});
