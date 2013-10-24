define(['Palace'], function(Palace) {
  return function(view, args){
    //+ tellOthers :: Event -> Event
    var tellOthers = function(e){return emit('submit', 'Search',
      {term: $('#term').val()} )
    }
    fmap(tellOthers, on('click', '#searched'));
  };
});
