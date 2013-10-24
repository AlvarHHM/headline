define(['Palace'], function(Palace) {
  return function(view, args){
    Palace.expose();

    var root

      , add = function(x, y) { return x + y; }.autoCurry()

    //+ updateTitle :: Headline -> Html
      , updateTitle =  compose(html('#title', view), pluck('title'))

    //+ populateScroller :: Html -> Headline -> Html
      , populateScroller = function(view, headline) {
          var images = mconcat(
            map(function(i) { return '<img src="'+i+'" class="item" />'; }, headline.images)
          );
          return html('#sliderContent', view, images);
        }

    //+ populatePage :: Headline -> Html
      , populatePage = S(populateScroller, updateTitle)

    //+ getHeadline :: _ -> {title: String}
      , getHeadline = K({title: "My Title", images: ['images/demo/field.jpg', 'images/demo/gnome.jpg', 'images/demo/pencils.jpg', 'images/demo/golf.jpg']})

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
