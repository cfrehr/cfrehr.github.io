(function() {
    
    var parallax = document.querySelectorAll(".parallax"),
      backgroundImageHeight = 2100,
      backgroundImageWidth = 1366,
      inversebgRatio = backgroundImageHeight / backgroundImageWidth,
      bgRatio = backgroundImageWidth / backgroundImageHeight,
      windowRatio,
      maxShiftDistance,
      docHeight,
      windowHeight,
      windowWidth,
      scrollPercentage;
    
    // Find the viewport's height and width
    calculateRatios = function() {
      windowHeight = document.documentElement.clientHeight;
      windowWidth = document.documentElement.clientWidth;
      windowRatio = windowWidth / windowHeight;
      
      // Note 1:    Finding document sizes are a browser compatability issue; every browser has it's own standards and quirks.
      //            For example, Firefox may interpret the height of a document as document.body.clientHeight while Opera uses
      //            document.documentElement.clientHeight. Every browser calculates document dimensions in a different way.
      //                http://www.webdeveloper.com/forum/showthread.php?179931-document-documentElement-vs-document-body
      // Note 2:    There is no single, magic-solution to finding a document's dimensions, so instead, you have to find the 
      //            maximum value of all possible browser-specific calls. This will then find the correct document dimension
      //            given the user's browser specs.
      //                http://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
      docHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
      
      // Find the vertical distance that the viewport will have to shift.
      // Multiply inversebgRatio by windowWidth to get total scroll length of window/viewport. Then subtract windowHeight 
      //    to get the total remaining distance that the viewport will have to scroll.
      maxShiftDistance = (windowWidth * inversebgRatio) - windowHeight;
      
      console.log('Max shift:' +  maxShiftDistance);
    }
    
    calculateBGPosition = function() {
        [].slice.call(parallax).forEach(function(el,i) {
          
          // gets the number of pixels the window has been vertically scrolled
          var windowYOffset = window.pageYOffset;
          
          // (docHeight - windowHeight) is total amount of pixels that can be scrolled.
          // windowYoffset / (docHeight - windowHeight) is the proportion of available scrolling that has been performed.
          scrollProportion = windowYOffset / (docHeight - windowHeight);
          
          var limitedShiftAmount;
          
          // If windowRatio (aspect ratio; width/height) is bigger than background bgRatio,
          // then the entire image is not contained in the window and there is scrolling to be performed.
          if (windowRatio > bgRatio) {
            limitedShiftAmount = windowYOffset - (scrollProportion * maxShiftDistance);
          
          // Else, the entire image is contained in the window and no scrolling is necessary.
          } else {
            limitedShiftAmount = windowYOffset;
          }
            
            // Find and set background position.
            var elBackgrounPos = "50%" + limitedShiftAmount + "px";
            el.style.backgroundPosition = elBackgrounPos;
        });
    }
  
    // On every window resize, recalulate ratios and background position.
    window.onresize = function(event) {
      window.requestAnimationFrame(calculateRatios);
      window.requestAnimationFrame(calculateBGPosition);
    };
    
    // On every scroll, recalculate the background position.
    window.onscroll = function() {
      window.requestAnimationFrame(calculateBGPosition);
    };

    calculateRatios();
})();
