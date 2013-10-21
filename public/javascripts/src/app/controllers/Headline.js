var Headline = function(view, args){
  var Palace = require('Palace');
  Palace.expose();

  
  var root

    , add = function(x, y) { return x + y; }.autoCurry()

  //+ updateTitle :: Headline -> Html
    , updateTitle =  compose(html('#title', view), pluck('title'))

  //+ populateScroller :: Headline -> Html
    , populateScroller = function(view, headline) {
        var images = reduce(function(acc, i) { return acc+'<img src="'+i+'" class="item">'; }, '', headline.images);
        var v = html('#yo', view, images);
        console.log('v', v);
        return v;
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

  //+ init :: IO()
    , init = compose(updateHtml('#main'), populatePage, getHeadline)
    ;

  init();
};
