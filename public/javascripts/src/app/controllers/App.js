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
    register('Headline');
    Headline();
    register('Search', startController('Search', Search));
    register('Results', startController('Results', Results));
    Dashboard();
    // register('Headline', spawn('Palace', 'startController', ['Headline'])); }
  }
});
