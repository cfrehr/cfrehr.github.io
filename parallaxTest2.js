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
