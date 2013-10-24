require.config( {
	paths : {
	  	Handlebars: '/javascripts/vendor/handlebars/1.0.5/handlebars'
	  , text: '/javascripts/vendor/require/plugins/text'
	  , Palace:  '/javascripts/vendor/palace/0.1/palace'
	  , FlapJax: '/javascripts/vendor/flapjax'
    , FunctionalJS: '/javascripts/vendor/FunctionalJS/functional'
    , PreludeJS: '/javascripts/vendor/PreludeJS/prelude'
    , types: '/javascripts/vendor/typeclasses/support/types'
    , functor: '/javascripts/vendor/typeclasses/functor'
    , Applicative: '/javascripts/vendor/typeclasses/applicative'
    , Monoid: '/javascripts/vendor/typeclasses/monoid'
    , Monad: '/javascripts/vendor/typeclasses/monad'
	  , EventStreams: '/javascripts/vendor/typeclasses/eventstreams'
	  , App: '/javascripts/src/app/controllers/App'
	  , Search: '/javascripts/src/app/controllers/Search'
	  , Headline: '/javascripts/src/app/controllers/Headline'
	  , Results: '/javascripts/src/app/controllers/Results'
	  , Dashboard: '/javascripts/src/app/controllers/Dashboard'
	  , Trending: '/javascripts/src/app/controllers/Trending'
	  , Socket: '/javascripts/src/app/lib/Socket'
	  , Http: '/javascripts/src/app/lib/Http'
	  , Repo: '/javascripts/src/app/lib/Repo'
	},
    shim: {
        	'Handlebars': {
            exports: 'Handlebars'
        	}
				, 'EventStreams': {
						deps: ['FlapJax', 'functor', 'Monad']
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
		, 'FunctionalJS'
		, 'PreludeJS'
		, 'FlapJax'
		, 'EventStreams'
		, 'Handlebars'
		, 'Palace'
		, 'types'
		, 'functor'
    , 'Monoid'
		, 'Monad'
		, 'text'
	],
	function(require, App, FunctionalJS, PreludeJS, FlapJax, EventStreams, Handlebars, Palace, Typeclasses, Functor, Monoid, Monad){
		PreludeJS.expose();
		Palace.expose();
		IS_WORKER = !(typeof document.cookie == 'string'); //hack
		if(!IS_WORKER) App();
});
