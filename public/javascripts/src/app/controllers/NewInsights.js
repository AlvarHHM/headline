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

      , fillChart = function(file_name) {
          file_name = file_name || "output";
          var $sig = $('#sig');
          $sig.html('');
          var sigRoot = $sig[0];
          sigInst = sigma.init(sigRoot).drawingProperties({
            defaultLabelColor: '#ccc',
            font: 'Arial',
            edgeColor: 'source',
            defaultEdgeType: 'curve'
          }).graphProperties({
             minNodeSize: 0.5,
             maxNodeSize: 5
          });
          console.log('file_name', file_name);
          //var file_name = (window.location.hash && window.location.hash.split("#")[1]) || "output";
          sigInst.parseGexf('/'+file_name+'.gexf');
          // Draw the graph :
          sigInst.draw();

         sigInst.bind('downnodes', function(e) {
          hidden ? hidePaths(e) : showAllPaths(e);
          hidden = !hidden;
         });
      }

    //+ addListeners :: UI()
      , addListeners = function() {
        $('#button_box a').click(function(e) {
          e.preventDefault();
          //window.location.hash = this.href;
          fillChart($(this).data('chart'));
        });
      }

    //+ makePage :: Html
      , makePage = compose(updateHtml('#new_insights'), view)

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(addListeners, fillChart, makePage)
      ;

    init();
  };
});
