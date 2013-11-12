define([
  'Palace'
, 'HighCharts'
], function(Palace) {
  return function(view){

    var sigInst = null
      , hidden = false

      , getNeighbors = function(nodes) {
        var neighbors = {};
        sigInst.iterEdges(function(e){
          if(nodes[e.source] || nodes[e.target]){
            neighbors[e.source] = 1;
            neighbors[e.target] = 1;
          }
        });
        return neighbors;
      }

      , hidePaths = function(event){
        var n = {}
        n[event.content[0]] = 1;
        var neighbors = getNeighbors(getNeighbors(n));
        sigInst.iterNodes(function(n){
          n.hidden = Number(!neighbors[n.id])
        }).draw(2,2,2);
      }

    , showAllPaths = function() {
        return sigInst.iterEdges(function(e){
                e.hidden = 0;
              }).iterNodes(function(n){
                n.hidden = 0;
              }).draw(2,2,2);
      }

      , fillChart = function(data) {
          var sigRoot = $('#sig')[0];
          sigInst = sigma.init(sigRoot).drawingProperties({
            defaultLabelColor: '#ccc',
            font: 'Arial',
            edgeColor: 'source',
            defaultEdgeType: 'curve'
          }).graphProperties({
             minNodeSize: 0.5,
             maxNodeSize: 5
          });

          sigInst.parseGexf('/output.gexf');
          // Draw the graph :
          sigInst.draw();

         sigInst.bind('downnodes', function(e) {
          hidden ? hidePaths(e) : showAllPaths(e);
          hidden = !hidden;
         });
      }

    //+ makePage :: Html
      , makePage = compose(updateHtml('#new_insights'), view)

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(fillChart, makePage)
      ;

    init();
  };
});
