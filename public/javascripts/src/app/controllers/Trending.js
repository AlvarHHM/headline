define(['Palace'], function(Palace) {
  return function(){


    //+ getResults :: String -> Promise([Headline
    var getResults = Http.get('/headlines')

    //+ makeResults :: [Headline] -> AddView(HTML)
      , makeResults = compose(
          updateHtml('#trending')
        , render_('Trending')
        , setVals({headlines: id}))

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(fmap(makeResults), getResults)
      ;

    init({});
  };
});
