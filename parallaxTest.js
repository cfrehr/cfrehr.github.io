(function() {
    var speedTest = 0.580;
    var parallax = document.querySelectorAll(".parallax"),
        speed = speedTest;
    
    window.onscroll = function() {
        [].slice.call(parallax).forEach(function(el,i) {
            var windowYOffset = window.pageYOffset,
                elBackgrounPos = "50% " + (windowYOffset * speed) + "px";
                
            el.style.backgroundPosition = elBackgrounPos;
        });
    };
})();
