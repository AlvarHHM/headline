var Palace = require('Palace');

var Search = function(view, args){
  Palace.expose();

  //+ tellOthers :: Event -> Event
  var tellOthers = function(e){return emit('submit', 'Search', {term: $('#term').val()} )}
  
  fmap(tellOthers, on('click', '#searched'))
};
