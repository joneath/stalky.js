# Stalky
Stalky is a jQuery plugin to mimic iOS's sticky headers.

![iOS Address Book](http://dl.dropbox.com/u/17011/stickyHeader.png)

## Usage
		$(".myElements").stalky({
			container: $(window),
			stickY: 10,
			stickX: 10
		});

#### options

* `container` - the scroll container (defaults to window).
* `stickY` - Where elements will *stick* in the Y axis when scrolled past.
* `stickX` - Where elements will *stick* in the X axis when scrolled past.

#### methods
* `updateStalky` - Recalculates the target elements Y offset. Call this on the target elements object after stalky has been initialized.

		var $stalkedEls = $(".myElements").stalky();
		
		// Do some re-arranging
		
		$stalkedEls.updateStalky();


