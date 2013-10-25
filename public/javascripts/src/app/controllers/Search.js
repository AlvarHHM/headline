define(['Palace'], function(Palace) {
  return function(view, args){
    //+ tellOthers :: Event -> Event
    var tellOthers = function(e){
      e.preventDefault();
      return emit('submit', 'Search', {term: $('#term').val()} )
    }
    fmap(tellOthers, on('click', '#searched'));
    fmap(tellOthers, on('submit', '#search-form'));
  };
});
