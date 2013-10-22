var Results = function(view, args){
  var Palace = require('Palace');
  var results = [];
  Palace.expose();
  var images1 =  ['images/demo/field.jpg', 'images/demo/gnome.jpg', 'images/demo/pencils.jpg', 'images/demo/golf.jpg'];
  var images2 =  ['images/demo/field.jpg', 'images/demo/golf.jpg'];
  //+ populateTable :: [Result] -> Table
  var populateTable = compose(append('table', view), map(render_('ResultRow')))

  //+ getResults :: String -> [Result]
    , getResults = K([
        {id: 1, title: 'one', images: images1},
        {id: 2, title: 'two', images: images2}
      ])

  //+ makeResults :: Post -> AddView(Table)
    , makeResults = compose(updateHtml('#main'), populateTable)

  //+ cacheResults :: [Result] -> [Result]
    , cacheResults = function(xs) { return results = xs; }

  //+ init :: {term: String} -> EventStream(AddView(Table))
    , init = compose(makeResults, cacheResults, getResults, pluck('term'))

  //+ retrieveResult :: Id -> Result
    , retrieveResult = function(id) { return detectBy(pluck('id'), id, results); }
    , showHeadline = compose(
        emit('render', 'Headline'), retrieveResult, pluck('id'), pluck('currentTarget')
      )
    ;

  fmap(init, on('submit', 'Search'))
  fmap(showHeadline, on('click', '.row'))
};
