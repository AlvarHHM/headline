define(['Palace'], function(Palace) {
  return function(view){

    //+ prependList :: Html -> IO
    var prependList = function(item) {
          return $('#activity_list').prepend(item);
        }

    //+ addResult :: {msg: String} -> EventStream(AddView(Table))
      , addResult = compose(prependList, render_('ActivityItem'))

    //+ init :: {} -> IO
      , init = compose(updateHtml("#live_activity"), view)
      ;

    fmap(addResult, on('activity', 'socket'))
    init({});
  };
});
