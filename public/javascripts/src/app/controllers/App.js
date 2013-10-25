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
    startController('Search', Search);
    startController('Results', Results);
    Dashboard();
    // register('Headline', spawn('Palace', 'startController', ['Headline'])); }
  }
});
