var builder = require('xmlbuilder');

var last = function(xs){ return xs[xs.length-1]; }

var generate = function(result) {
  var header = builder.create('gexf', {"xmlns": "http://www.gexf.net/1.2draft",
                                       "xmlns:viz":"http://www.gexf.net/1.2draft/viz",
                                       "xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
                                       "encoding": "UTF-8",
                                       "version": "1.0"
  });

  var graph = header.ele('graph', {mode: "static", defaultedgetype: "directed"});

  var root_node = graph.ele('nodes');
  root_node = result.nodes.reduce(function(b, n) {
    return b.ele('node', {id: n.id, label: n.data.name}).up();
  }, root_node).end({pretty: true});
  
  var root_edge = graph.ele('edges');
  root_edge = result.edges.reduce(function(b, e) {
    var start = last(e.start.split('/'));
    var end = last(e.end.split('/'));
    return b.ele('edge', {id: e.id, source: start, target: end}).up();
  }, root_edge).end({pretty: true});
  return root_edge;
}

module.exports = {generate: generate}
