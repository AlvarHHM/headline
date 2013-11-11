define([
  'Palace'
, 'src/app/controllers/Trending'
, 'src/app/controllers/NewInsights'
, 'src/app/controllers/LiveActivity'
], function(
    Palace
  , Trending
  , NewInsights
  , LiveActivity
) {
  return function(view, socket) {
    updateHtml('#main', view({}));
    startController('Trending', Trending);
    startController('NewInsights', NewInsights);
    LiveActivity(render_('LiveActivity'), socket);
  }
});
