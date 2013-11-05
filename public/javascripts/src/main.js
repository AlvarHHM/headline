require.config( {
  paths : {
    Handlebars: '/javascripts/vendor/handlebars/1.0.5/handlebars'
  , text: '/javascripts/vendor/require/plugins/text'
  , Palace:  '/javascripts/vendor/palace/0.1/palace'
  , FlapJax: '/javascripts/vendor/flapjax'
  , FunctionalJS: '/javascripts/vendor/FunctionalJS/functional'
  , PreludeJS: '/javascripts/vendor/PreludeJS/prelude'
  , App: '/javascripts/src/app/controllers/App'
  , Search: '/javascripts/src/app/controllers/Search'
  , Headline: '/javascripts/src/app/controllers/Headline'
  , Results: '/javascripts/src/app/controllers/Results'
  , Dashboard: '/javascripts/src/app/controllers/Dashboard'
  , Trending: '/javascripts/src/app/controllers/Trending'
  , Socket: '/javascripts/src/app/lib/Socket'
  , Http: '/javascripts/src/app/lib/Http'
  , Repo: '/javascripts/src/app/lib/Repo'
  , HighCharts: '/javascripts/vendor/highcharts/highcharts'
  , typeclasses: '/vendor/typeclasses/amd/index'
  , lodash: '/vendor/lodash/dist/lodash'
  },
        shim: {
          'Handlebars': {
            exports: 'Handlebars'
          }
          , 'HighCharts': {
            exports: 'Highcharts'
          }
          , 'Socket' : {
            deps: ['Palace']
              , exports: 'Socket'
          }
          , 'Http' : {
            deps: ['Palace']
              , exports: 'Http'
          }
          , 'Repo': {
            deps: ['Http', 'Socket']
              , exports: 'Repo'
          }
        }
});

require({baseUrl: "/javascripts/src/" },
[
'require'
, 'App'
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
