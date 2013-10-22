var Results = function(view, args){
  var Palace = require('Palace');
  var results = [];
  Palace.expose();

  //+ populateTable :: [Result] -> Table
  var populateTable = compose(append('table', view), map(render_('ResultRow')))

	//+ getResults :: String -> [Result]
    , getResults = K([{id: 1, name: 'one'}, {id: 2, name: 'two'}])

  //+ makeResults :: Post -> AddView(Table)
    , makeResults = compose(updateHtml('#main'), populateTable)

  //+ cacheResults :: [Result] -> [Result]
    , cacheResults = function(xs) { return results = xs; }

  //+ init :: {term: String} -> EventStream(AddView(Table))
    , init = compose(makeResults, cacheResults, getResults, pluck('term'))

    , showHeadline = compose(pluck('id'), pluck('currentTarget'))
    ;

  fmap(init, on('submit', 'Search'))
  fmap(showHeadline, on('click', '.row'))
};
