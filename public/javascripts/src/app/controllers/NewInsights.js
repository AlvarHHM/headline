define(['Palace', 'HighCharts'], function(Palace) {
  return function(view){


    //+ getResults :: _ -> Promise(Data)
    var getResults = compose(Http.get('/newInsightData'), K({}))

      , fillChart = function(data) {
          $('#new_insights_chart').highcharts({
             chart: {
                type: 'column'
              },
              title: {
                  text: 'Monthly Average Temperature',
                  x: -20 //center
              },
              subtitle: {
                  text: 'Source: WorldClimate.com',
                  x: -20
              },
              xAxis: {
                  categories: data.xs
              },
              yAxis: {
                  title: {
                      text: 'Temperature (°C)'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  valueSuffix: '°C'
              },
              legend: {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'middle',
                  borderWidth: 0
              },
              series: data.ys,
              credits:{
                enabled:false
              }
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
