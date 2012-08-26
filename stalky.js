(function($) {
    var stalkyOptions,
        stalkPoints,
        currentStalker;

    // Publics
    var exports = {
        updateStalky: function() {
            stalkPoints = [];

            this.each(function() {
                stalkPoints.push({
                    $el: $(this),
                    top: $(this).offset().top
                });
            });
        }
    };

    $.fn.stalky = function(options) {
        stalkyOptions = $.extend({
            container: $(window),
            stickY: 0,
            stickX: 10
        }, options);

        for (var key in exports) {
            this[key] = exports[key].bind(this);
        }

        this.updateStalky();

        stalkyOptions.container.off("scroll", watchScroll);
        stalkyOptions.container.on("scroll", watchScroll);
    };

    // Privates
    function findClosestStalker(scrollY) {
        var minimumDistance = Number.MAX_VALUE,
            closestStalker,
            currentStalker,
            diff,
            i = 0;

        for (; i < stalkPoints.length; i++) {
            currentStalker = stalkPoints[i];

            if (currentStalker.top > (scrollY + stalkyOptions.stickY)) {
                continue;
            }

            diff = Math.abs(currentStalker.top - scrollY);

            if (diff < minimumDistance) {
                minimumDistance = diff;
                closestStalker = currentStalker;
            }
        }

        if (closestStalker) {
            return {
                $el: closestStalker.$el,
                top: closestStalker.top,
                index: i
            };
        }
    }

    function resetCurrentStalker() {
        if (currentStalker) {
            currentStalker.point.$el.css(currentStalker.css);
            currentStalker = null;
        }
    }

    function watchScroll(e) {
        var scrollY = stalkyOptions.container.scrollTop(),
            stalkPoint = findClosestStalker(scrollY);

        if (stalkPoint &&
            stalkPoint.top < (scrollY + stalkyOptions.stickY)) {
            resetCurrentStalker();

            // Save new stalker
            currentStalker = {
                point: stalkPoint,
                css: {
                    position: stalkPoint.$el.css("position"),
                    top: stalkPoint.$el.css("top"),
                    right: stalkPoint.$el.css("right")
                }
            };

            // Position new stalker
            currentStalker.point.$el.css({
                position: "fixed",
                top: stalkyOptions.stickY,
                right: stalkyOptions.stickX
            });
        } else {
            resetCurrentStalker();
        }
    }
}(jQuery));
