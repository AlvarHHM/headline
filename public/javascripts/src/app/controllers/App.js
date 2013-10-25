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
    startController('Headline', Headline);
    startController('Search', Search);
    startController('Results', Results);
    Dashboard();
  }
});
