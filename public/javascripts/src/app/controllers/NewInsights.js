define(['Palace', 'HighCharts'], function(Palace) {
  return function(view){


    //+ getResults :: _ -> Promise(Data)
    var getResults = compose(Http.get('/newInsightData'), K({}))

      , fillChart = function(data) {
          var sigRoot = $('#sig')[0];
          var sigInst = sigma.init(sigRoot).drawingProperties({
            defaultLabelColor: '#ccc',
            font: 'Arial',
            edgeColor: 'source',
            defaultEdgeType: 'curve'
          }).graphProperties({
             minNodeSize: 0.5,
             maxNodeSize: 5
          });

          sigInst.addNode('hello',{
            label: 'Hello',
            color: '#ff0000',
            x: Math.floor(Math.random()*100),
            y: Math.floor(Math.random()*100)
          })
          .addNode('world',{
            label: 'World !',
            color: '#00ff00',
            x: Math.floor(Math.random()*100),
            y: Math.floor(Math.random()*100)
          })
          .addNode('blah',{
            label: 'blah',
            color: '#00ff00',
            x: Math.floor(Math.random()*100),
            y: Math.floor(Math.random()*100)
          })
          .addEdge('hello_world','hello','world')
          .addEdge('hello_world1','hello','world')
          .addEdge('hello_world2','hello','world')
          .addEdge('tacos','hello','blah')
          .draw();

         sigInst.bind('downnodes',function(event){
            var nodes = event.content;
            console.log(nodes)
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
          }).bind('outnodes',function(){
            sigInst.iterEdges(function(e){
              e.hidden = 0;
            }).iterNodes(function(n){
              n.hidden = 0;
            }).draw(2,2,2);
          });
      }

    //+ makePage :: 
      , makePage = compose(updateHtml('#new_insights'), view)

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(fmap(fillChart), getResults, makePage)
      ;

    init({});
  };
});
