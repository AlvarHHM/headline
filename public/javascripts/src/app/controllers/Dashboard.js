define([
  'Palace'
, 'Trending'
], function(
    Palace
  , Trending
) {
  return function(view) {
    updateHtml('#main', view);
    Trending();
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
