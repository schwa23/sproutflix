// ==========================================================================
// Project:   Sproutflix.recommendationsPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

// This page describes a part of the interface for your application.
Sproutflix.recommendationsPage = SC.Page.design({

  // Add your views here.  Ex:
  
  // mainView: SC.View.design({
  //   layout: { top: 0, left: 0, right: 0, height: 0 }
  // })


  mainView: SC.ScrollView.design({
       hasHorizontalScroller: NO,
       layout: { top: 0, bottom: 0, left: 0, right: 0 },
       backgroundColor: 'white',

       contentView: SC.ListView.design({   
         classNames: 'queue-list'.w(),
         canEditContent: NO,
         hasContentIcon: YES,
         hasContentRightIcon: YES,

         rowHeight: 110,
         contentBinding: 'Sproutflix.recommendationsController.arrangedObjects',
         selectionBinding: 'Sproutflix.recommendationsController.selection',
         contentValueKey: 'fullTitle',
         contentIconKey: 'mediumImage',
         contentRightIconKey: 'playButton'

       })
     })
});
