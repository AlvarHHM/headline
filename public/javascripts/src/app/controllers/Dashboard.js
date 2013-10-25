define([
  'Palace'
, 'Trending'
, 'app/controllers/NewInsights'
, 'app/controllers/LiveActivity'
], function(
    Palace
  , Trending
  , NewInsights
  , LiveActivity
) {
  return function(view) {
    updateHtml('#main', view({}));
    startController('Trending', Trending);
    startController('NewInsights', NewInsights);
    startController('LiveActivity', LiveActivity);
  }
});
