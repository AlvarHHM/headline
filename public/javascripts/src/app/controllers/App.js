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
    register('socket', Socket.create('http://localhost:4000'));
    startController('Headline', Headline);
    startController('Search', Search);
    startController('Results', Results);
    startController('Dashboard', Dashboard);
  }
});
