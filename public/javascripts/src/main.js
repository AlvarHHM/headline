require.config( {
    baseUrl: '/javascripts'
  , paths : {
      Handlebars: 'vendor/handlebars/1.0.5/handlebars'
    , text: 'vendor/require/plugins/text'
    , Palace:  'vendor/palace/0.1/palace'
    , FlapJax: 'vendor/flapjax'
    , FunctionalJS: 'vendor/FunctionalJS/functional'
    , PreludeJS: 'vendor/PreludeJS/prelude'
    , Socket: 'src/app/lib/Socket'
    , Http: 'src/app/lib/Http'
    , HighCharts: 'vendor/highcharts/highcharts'
    , typeclasses: 'vendor/typeclasses/amd/index'
    , lodash: 'vendor/lodash/1.3.3/lodash'
  },
        shim: {
          'Handlebars': {
            exports: 'Handlebars'
          }
          , 'HighCharts': {
            exports: 'Highcharts'
          }
        }
});

require(
[
'require'
, 'src/app/controllers/App'
, 'lodash'
, 'typeclasses'
, 'FunctionalJS'
, 'PreludeJS'
, 'FlapJax'
, 'Handlebars'
, 'Palace'
, 'text'
],
function(require, App, _, tc, FunctionalJS, PreludeJS, FlapJax, Handlebars, Palace){
  _.extend(window, tc);
  PreludeJS.expose();
  Palace.expose();
  IS_WORKER = !(typeof document.cookie == 'string'); //hack
  if(!IS_WORKER) App();
});
