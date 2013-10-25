define(['Palace'], function(Palace) {
  return function(view){
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
      ;

    fmap(init, on('render', 'Headline'))
  };
});
