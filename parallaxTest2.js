(function() {
    
    var parallax = document.querySelectorAll(".parallax"),
      speed = 1.94,
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
      
      maxShiftDistance = (windowWidth * inversebgRatio) - windowHeight;
      
      console.log('Max shift:' +  maxShiftDistance);
    }
    
    calculateBGPosition = function() {
        [].slice.call(parallax).forEach(function(el,i) {
          
          var windowYOffset = window.pageYOffset;
          scrollProportion = windowYOffset / (docHeight - windowHeight);
          
          var limitedShiftAmount;
          
          if (windowRatio > bgRatio) {
            limitedShiftAmount = windowYOffset - (scrollProportion * maxShiftDistance);
          } else {
            limitedShiftAmount = windowYOffset;
          }
          // var desiredShiftAmount = windowYOffset * speed;

            var elBackgrounPos = "50% " + limitedShiftAmount + "px";
 
            el.style.backgroundPosition = elBackgrounPos;
        });
    }
  
    window.onresize = function(event) {
      calculateRatios();
      calculateBGPosition();
    };
  
    window.onscroll = function() {
      calculateBGPosition();
    };

    calculateRatios();
})();
