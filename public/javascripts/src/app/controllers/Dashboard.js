define([
  'Palace'
, 'Trending'
], function(
    Palace
  , Trending
) {
  return function(view) {
    console.log("IN DASHBOARD", view);
    updateHtml('#main', view);
    register('Trending', startController('Trending', Trending));
    console.log("after call to trends");
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
