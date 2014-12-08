(function () { // :)
    'use strict';

    watchmen.objectTemplates.Structure = function(stats) {
        this.size = { width: 100, height: 100 };
        this.position = { x: 0, y: 0 };
        
        if (typeof stats !== typeof undefined) {
            if (typeof stats.width !== typeof undefined) { this.size.width = stats.width; }
            if (typeof stats.height !== typeof undefined) { this.size.height = stats.height; }
            if (typeof stats.x !== typeof undefined) { this.position.x = stats.x; }
            if (typeof stats.y !== typeof undefined) { this.position.y = stats.y; }
        }

        this.draw = function(deltaTime) {
            watchmen.ctxFore.fillStyle = '#339';
            watchmen.ctxFore.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        };

        this.update = function(deltaTime) {
        };
    };

    watchmen.objectTemplates.Goal = function(stats) {
        this.initialSize = { width: 50, height: 50 };
        
        this.initialPosition = { x: 475, y: 475 };
        this.won = false;
        this.visible = false;
        this.collide = false;
        this.opacity = 0;
        this.pulsing = false;
        this.group = 1;

        if (typeof stats !== typeof undefined) {
            if (typeof stats.width !== typeof undefined) { this.initialSize.width = stats.width; }
            if (typeof stats.height !== typeof undefined) { this.initialSize.height = stats.height; }
            if (typeof stats.x !== typeof undefined) { this.initialPosition.x = stats.x; }
            if (typeof stats.y !== typeof undefined) { this.initialPosition.y = stats.y; }
            if (typeof stats.group !== typeof undefined) { this.group = stats.group; }
            if (typeof stats.visible !== typeof undefined) { this.visible = stats.visible; }
            if (typeof stats.collide !== typeof undefined) { this.collide = stats.collide; }
            if (typeof stats.opacity !== typeof undefined) { this.opacity = stats.opacity; }
        }

        this.size = { width: this.initialSize.width, height: this.initialSize.height };
        this.position = { x: this.initialPosition.x, y: this.initialPosition.y };

        this.pulse = function(self) {
            this.pulsing = true;
            var newSize = {};
            if (this.size.width < this.initialSize.width) {
                newSize = {
                    x: this.initialSize.width * 1.2,
                    y: this.initialSize.height * 1.2
                };
            }
            else {
                newSize = {
                    x: this.size.width * 0.7,
                    y: this.size.height * 0.7
                };
            }

            var newPosition = {
                x: this.position.x + (this.size.width - newSize.x) / 2,
                y: this.position.y + (this.size.height - newSize.y) / 2
            };

            var self = this;
            tween.to(this.size, 0.5, { width: newSize.x, height: newSize.y });
            tween.to(this.position, 0.5, {
                x: newPosition.x,
                y: newPosition.y,
                onComplete: function() {
                    self.pulsing = false;
                }
            });
        };

        this.spawn = function() {
            tween.to(this, 1, { opacity: 1 });
            this.visible = true;
            this.collide = true;
        };

        this.draw = function(deltaTime) {
            if (this.visible) {
                if (this.opacity !== 1) {
                    watchmen.ctxFore.globalAlpha = this.opacity;
                    watchmen.ctxFore.fillStyle = '#fff';
                    watchmen.ctxFore.drawImage(watchmen.faces.powerup, this.position.x, this.position.y, this.size.width, this.size.height);
                    watchmen.ctxFore.globalAlpha = 1;
                }
                else {
                    watchmen.ctxFore.fillStyle = '#fff';
                    watchmen.ctxFore.drawImage(watchmen.faces.powerup, this.position.x, this.position.y, this.size.width, this.size.height);
                }
            }
        };

        this.update = function(deltaTime) {
            if (this.collide) {
                // check for player
                var grabbed = watchmen.checkForCollision(watchmen.hero, this);
                if (grabbed) {
                    this.collected();
                }
            }

            if (this.visible && !this.pulsing) { this.pulse(); }
        };

        this.collected = function() {
            watchmen.sounds.pickup.play();
            this.collide = false;
            this.won = true;
            this.finalAnimation();

            // check if this is the last of this group
            for (var gi = 0; gi < watchmen.goals.length; gi++) {
                var foundRemaining = false;
                if (watchmen.goals[gi].group === this.group) {
                    if (watchmen.goals[gi].won === false) {
                        foundRemaining = true;
                        break;
                    }
                }
            }

            if (foundRemaining === false) {
                // this was the last of this group!
                if (this.group === 3) {
                    // we won!
                    watchmen.win();
                }
                else {
                    var nextGroup = this.group + 1;

                    for (var gi = 0; gi < watchmen.goals.length; gi++) {
                        if (watchmen.goals[gi].group === nextGroup) {
                            watchmen.goals[gi].spawn();
                        }
                    }
                }
            }
        };

        this.finalAnimation = function() {
            var goal = this;

            var newSize = {
                x: this.size.width * 3,
                y: this.size.height * 3
            };
            var newPosition = {
                x: this.position.x + (this.size.width - newSize.x) / 2,
                y: this.position.y + (this.size.height - newSize.y) / 2
            };

            tween.to(this.size, 2, { width: newSize.x, height: newSize.y });
            tween.to(this, 2, { opacity: 0 });

            tween.to(this.position, 2, {
                x: newPosition.x,
                y: newPosition.y,
                onComplete: function() {
                    goal.visible = false;
                }
            });
        };

        this.reset = function() {
            tween.killTweensOf(this);
            tween.killTweensOf(this.size);
            tween.killTweensOf(this.position);
            this.won = false;
            this.pulsing = false;
            this.size.width = this.initialSize.width;
            this.size.height = this.initialSize.height;
            this.position.x = this.initialPosition.x;
            this.position.y = this.initialPosition.y;
            if (this.group === 1) {
                this.opacity = 1;
                this.visible = true;
                this.collide = true;
            }
            else {
                this.opacity = 0;
                this.visible = false;
                this.collide = false;
            }

        };
    };

})(); // :D