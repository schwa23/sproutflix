// ==========================================================================
// Project:   Sproutflix.QueueItem
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sproutflix */

/** @class

    An item in a queue.  Generally a movie or a tv episode, might be a TV season.

  @extends SC.Record
  @version 0.1
*/
Sproutflix.QueueItem = SC.Record.extend(
/** @scope Sproutflix.QueueItem.prototype */ {

    primaryKey: 'id',
    averageRating: SC.Record.attr(Number, {key: 'average_rating'}),
    
    title: SC.Record.attr(Object),
    
    fullTitle: function() {
        return this.get('title').regular;
    }.property('title').cacheable(),
    
    categories: SC.Record.toMany(Sproutflix.Category),
    
    boxArt: SC.Record.attr(Object, {key: 'box_art'}),
    
    mediumImage: function() {
        return this.get("boxArt").medium;
    }.property('boxArt').cacheable(),
    
    playButton: 'sc-icon-options-24'
    
    
    

    // {
    //      "average_rating": "4.3",
    //      "box_art": {
    //        "large": "http://cdn-2.nflximg.com/us/boxshots/large/70023522.jpg",
    //        "small": "http://cdn-2.nflximg.com/us/boxshots/tiny/70023522.jpg",
    //        "medium": "http://cdn-2.nflximg.com/us/boxshots/small/70023522.jpg"
    //      },
    //      "category": [
    //        {
    //          "term": "available now",
    //          "content": "Available Now",
    //          "scheme": "http://api.netflix.com/categories/queue_availability",
    //          "label": "available now"
    //        },
    //        {
    //          "term": "Instant",
    //          "scheme": "http://api.netflix.com/categories/title_formats",
    //          "label": "Instant"
    //        },
    //        {
    //          "term": "TV-14",
    //          "scheme": "http://api.netflix.com/categories/tv_ratings",
    //          "label": "TV-14"
    //        },
    //        {
    //          "term": "Television",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "Television"
    //        },
    //        {
    //          "term": "TV Sitcoms",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "TV Sitcoms"
    //        },
    //        {
    //          "term": "TV Comedies",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "TV Comedies"
    //        },
    //        {
    //          "term": "Must-See TV Comedies",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "Must-See TV Comedies"
    //        },
    //        {
    //          "term": "NBC",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "NBC"
    //        },
    //        {
    //          "term": "Universal Studios Home Entertainment",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "Universal Studios Home Entertainment"
    //        },
    //        {
    //          "term": "Blu-ray",
    //          "scheme": "http://api.netflix.com/categories/genres",
    //          "label": "Blu-ray"
    //        }
    //      ],
    //      "updated": "1262382739",
    //      "id": "http://api.netflix.com/users/T16e0wh.g8VXRcFIJqbrXABVpzSeKLdfNW6c3ZmeA6iwQ-/queues/instant/available/1/70023522",
    //      "link": [
    //        {
    //          "href": "http://api.netflix.com/users/T16e0wh.g8VXRcFIJqbrXABVpzSeKLdfNW6c3ZmeA6iwQ-/queues/instant/available",
    //          "rel": "http://schemas.netflix.com/queues.available",
    //          "title": "available queue"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522",
    //          "rel": "http://schemas.netflix.com/catalog/title",
    //          "title": "The Office: Season 1"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/synopsis",
    //          "rel": "http://schemas.netflix.com/catalog/titles/synopsis",
    //          "title": "synopsis"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/cast",
    //          "rel": "http://schemas.netflix.com/catalog/people.cast",
    //          "title": "cast"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/directors",
    //          "rel": "http://schemas.netflix.com/catalog/people.directors",
    //          "title": "directors"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/format_availability",
    //          "rel": "http://schemas.netflix.com/catalog/titles/format_availability",
    //          "title": "formats"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/screen_formats",
    //          "rel": "http://schemas.netflix.com/catalog/titles/screen_formats",
    //          "title": "screen formats"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/languages_and_audio",
    //          "rel": "http://schemas.netflix.com/catalog/titles/languages_and_audio",
    //          "title": "languages and audio"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522",
    //          "rel": "http://schemas.netflix.com/catalog/titles.series",
    //          "title": "The Office"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/episodes",
    //          "rel": "http://schemas.netflix.com/catalog/titles.programs",
    //          "title": "episodes"
    //        },
    //        {
    //          "href": "http://api.netflix.com/catalog/titles/series/70023522/seasons/70023522/similars",
    //          "rel": "http://schemas.netflix.com/catalog/titles.similars",
    //          "title": "similars"
    //        },
    //        {
    //          "href": "http://www.nbc.com/nbc/The_Office/",
    //          "rel": "http://schemas.netflix.com/catalog/titles/official_url",
    //          "title": "official webpage"
    //        },
    //        {
    //          "href": "http://www.netflix.com/Movie/The_Office_Season_1/70023522",
    //          "rel": "alternate",
    //          "title": "web page"
    //        }
    //      ],
    //      "position": "1",
    //      "runtime": "8700",
    //      "title": {
    //        "regular": "The Office: Season 1",
    //        "short": "The Office: Season 1"
    //      },
    //      "release_year": "2005"
    //    },

}) ;
