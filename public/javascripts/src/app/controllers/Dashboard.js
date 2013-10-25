define([
  'Palace'
, 'Trending'
], function(
    Palace
  , Trending
) {
  return function() {
    updateHtml('#main', render_('Dashboard'));
    Trending();
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
