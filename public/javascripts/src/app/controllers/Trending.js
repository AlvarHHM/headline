define(['Palace'], function(Palace) {
  return function(view, args){

    //+ populateTable :: [Result] -> Table
    var populateTable = compose(append('#trending_list', view), map(render_('HeadlineItem')))

    //+ getResults :: String -> Promise([Result])
      , getResults = Http.get('/headlines')

    //+ makeResults :: Post -> AddView(Table)
      , makeResults = compose(updateHtml('#trending'), populateTable)

    //+ init :: {} -> EventStream(AddView(Table))
      , init = compose(fmap(makeResults), getResults)
      ;

    init({});
  };
});
