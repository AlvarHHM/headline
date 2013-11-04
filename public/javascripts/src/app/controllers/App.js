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
    var socket = Socket.create('http://localhost:4000');
    TEST = socket;
    var search_stream = Search(render_('Search'));
    var result_stream = Results(render_('Results'), search_stream);
    Headline(render_('Headline'), result_stream, search_stream);
    Dashboard(render_('Dashboard'), socket);
  }
});
