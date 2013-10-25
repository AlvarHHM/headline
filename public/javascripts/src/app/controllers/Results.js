define(['Palace'], function(Palace) {
  return function(view, args){
    var results = [];
    Palace.expose();
    //+ populateTable :: [Result] -> Table
    var populateTable = compose(append('table', view), map(render_('ResultRow')))

    //+ getResults :: String -> Promise([Result])
      , getResults = Http.get('/headlines')
      //K([
          //{id: 1, title: 'one', images: images1},
          //{id: 2, title: 'two', images: images2}
        //])

    //+ cacheResults :: [Result] -> [Result]
      , cacheResults = function(xs) { return results = xs; }

    //+ makeResults :: Post -> AddView(Table)
      , makeResults = compose(updateHtml('#main'), populateTable, cacheResults)

    //+ init :: {term: String} -> EventStream(AddView(Table))
      , init = compose(fmap(makeResults), getResults, pluck('term'))

    //+ retrieveResult :: Id -> Result
      , retrieveResult = function(id) {
        return detectBy(pluck('id'), id, results);
      }
      , showHeadline = compose(
            emit('render', 'Headline')
          , log
          , retrieveResult
          , pluck('id')
          , pluck('currentTarget')
        )
      ;

    fmap(init, on('submit', 'Search'))
    fmap(showHeadline, on('click', '.row'))
  };
});
