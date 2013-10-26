define(['Palace'], function(Palace) {
  return function(view, fill_search_text){
    var my_stream = receiverE();
    //+ tellOthers :: Event -> Event
    var tellOthers = function(e){
      e.preventDefault();
      return my_stream.sendEvent($('#term').val());
    }

    fmap(function(text){$('#term').val(text)}, my_stream)
    fmap(tellOthers, on('submit', '#search-form'));
    return my_stream;
  };
});
