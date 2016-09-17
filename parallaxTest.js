(function() {
    var width = window.outerWidth;
    var parallax = document.querySelectorAll(".parallax"),
        speed = (-0.0003646 * (width - 1440)) + 0.580;
    
    window.onscroll = function() {
        [].slice.call(parallax).forEach(function(el,i) {
            var windowYOffset = window.pageYOffset,
                elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
                
            el.style.backgroundPosition = elBackgrounPos;
        });
    };
})();
