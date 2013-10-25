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
  , Socket
) {
  return function() {
    TEST = Socket.create('http://localhost:4000');
    register('socket', TEST);
    startController('Headline', Headline);
    startController('Search', Search);
    startController('Results', Results);
    startController('Dashboard', Dashboard);
  }
});
