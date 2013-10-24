define([
  'Palace'
, 'Search'
, 'Results'
, 'Headline'
, 'Dashboard'
, 'Socket'
, 'Repo'
], function(
    Palace
  , Search
  , Results
  , Headline
  , Dashboard
) {
  return function() {
    register('Headline', startController('Headline', Headline));
    register('Search', startController('Search', Search));
    register('Results', startController('Results', Results));
    register('Dashboard', startController('Dashboard', Dashboard));
    // register('Headline', spawn('Palace', 'startController', ['Headline']));
  }
});
