// ==========================================================================
// Project:   Sproutflix - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

// This page describes the main user interface for your application.  
Sproutflix.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page 
    // load.
    mainPane: SC.MainPane.design({
        childViews: 'titleView tabView'.w(),

        titleView: SC.LabelView.design({
            layerId: "flix-title",
            layout: {
                centerX: 0,
                bottom: 0,
                width: 200,
                height: 30
            },
            textAlign: SC.ALIGN_CENTER,
            tagName: "h1",
            value: "SproutFlix",
            fontWeight: SC.BOLD_WEIGHT
        }),

        tabView: SC.TabView.design({
            layout: {
                top: 10,
                right: 10,
                bottom: 30,
                left: 10
            },
            items: [{
                title: 'Instant Queue',
                value: 'Sproutflix.instantQueuePage.mainView'
            },
            {
                title: 'Recommendations',
                value: 'Sproutflix.recommendationsPage.mainView'
            }],
            itemTitleKey: 'title',
            itemValueKey: 'value',
            nowShowing: 'Sproutflix.instantQueuePage.mainView'
        })
    })

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('sproutflix');