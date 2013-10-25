define([
  'Palace'
, 'Trending'
, 'app/controllers/NewInsights'
], function(
    Palace
  , Trending
  , NewInsights
) {
  return function() {
    updateHtml('#main', render_('Dashboard'));
    startController('Trending', Trending);
    startController('NewInsights', NewInsights);
  }
});
