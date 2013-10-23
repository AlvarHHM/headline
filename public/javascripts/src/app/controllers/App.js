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
    Palace.register('Headline', startController('Headline', Headline));
    Palace.register('Search', startController('Search', Search));
    Palace.register('Results', startController('Results', Results));
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
