define([
  'Palace'
, 'HighCharts'
], function(Palace) {
  return function(view){

    var sigInst = null
      , hidden = false

      , hidePaths = function(event){
        var nodes = event.content;
        var neighbors = {};
        sigInst.iterEdges(function(e){
          if(nodes.indexOf(e.source)>=0 || nodes.indexOf(e.target)>=0){
            neighbors[e.source] = 1;
            neighbors[e.target] = 1;
          }
        }).iterNodes(function(n){
          if(!neighbors[n.id]){
            n.hidden = 1;
          }else{
            n.hidden = 0;
          }
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
