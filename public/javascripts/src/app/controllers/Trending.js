define([
  'Palace'
, 'Http'
], function(Palace, Http) {
  return function(view){


    //+ getResults :: String -> Promise([Headline
    var getResults = Http.get('/headlines')

    //+ makeResults :: [Headline] -> AddView(HTML)
      , makeResults = compose(
          updateHtml('#trending')
        , view
        , setVals({headlines: id}))

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(fmap(makeResults), getResults)
      ;

    init({});
  };
});
