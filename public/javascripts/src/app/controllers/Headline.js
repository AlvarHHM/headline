define(['Palace'], function(Palace) {
  return function(view, hl_stream, search_stream){
    view = view({});

    //+ updateTitle :: Headline -> Html
    var updateTitle =  compose(html('#title', view), pluck('title'))
    //+ populateScroller :: Html -> Headline -> Html
      , populateScroller = function(view, headline) {
          var images = mconcat(
            map(function(i) { return '<img src="'+i+'" class="item" />'; }, headline.images)
          );
          return html('#sliderContent', view, images);
        }
    //+ populatePage :: Headline -> Html
      , populatePage = liftA2(populateScroller, updateTitle, I)
    //+ addListeners :: IO
      , addListeners = function() {
            $('.iosSlider').iosSlider({
              desktopClickDrag: true
            });
        }

    //+ init :: E -> IO()
      , init = compose(addListeners, updateHtml('#main'), populatePage)

      , search = function(e) {
        search_stream.sendEvent($(e.currentTarget).text())
      }
      ;

    fmap(search, on('click', '#title'))
    fmap(init, hl_stream);
  };
});
