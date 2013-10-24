define([
  'Palace'
, 'Search'
, 'Results'
, 'Headline'
, 'Socket'
, 'Repo'
], function(
    Palace
  , Search
  , Results
  , Headline
) {
  return function() {
    register('Headline', startController('Headline', Headline));
    register('Search', startController('Search', Search));
    register('Results', startController('Results', Results));
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
