(function () { // :)
    'use strict';

    watchmen.objectTemplates.Hero = function() {
        this.initialLife = 3;
        this.life = this.initialLife;

        this.speed = 2.75;

        this.initialSize = { width: 30, height: 30 };
        this.size = { width: this.initialSize.width, height: this.initialSize.height };

        this.initialPosition = { x: 485, y: 158 };
        this.position = this.initialPosition;

        this.lastDamageTaken = 0;
        this.opacity = 1;

        this.image = watchmen.faces.hero[this.initialLife - 1];

        this.damage = function() {
            var current = Date.now();

            // throttle:
            if (current > this.lastDamageTaken + 1200) {
                watchmen.sounds.hurt.play();
                this.lastDamageTaken = current;

                this.life--;

                if (this.life === 0) {
                    // game over!
                    watchmen.restart();
                    return;
                }

                this.damageAnimation();
                var newSize = this.life * 10;
                this.size.width = newSize;
                this.size.height = newSize;
                this.position.x = this.initialPosition.x + ((this.initialSize.width - this.size.width) / 2);
                this.position.y = this.initialPosition.y + ((this.initialSize.height - this.size.height) / 2);
                this.image = watchmen.faces.hero[this.life - 1];
            }
        };

        this.damageAnimation = function() {
            // flash
            tween.to(watchmen.hero, 0.3, {
                opacity: 0,
                onComplete: function() {
                    tween.to(watchmen.hero, 0.3, {
                        opacity: 1, 
                        onComplete: function() {
                            tween.to(watchmen.hero, 0.3, {
                                opacity: 0,
                                onComplete: function() {
                                    tween.to(watchmen.hero, 0.3, { opacity: 1 });
                                }
                            });
                        }
                    });
                }
            });
        },

        this.winAnimation = function() {
            var newSize = {
                x: this.size.width * 3,
                y: this.size.height * 3
            };

            var newPosition = {
                x: this.position.x + (this.size.width - newSize.x) / 2,
                y: this.position.y + (this.size.height - newSize.y) / 2
            };

            var self = this;
            tween.to(this.size, 8, { width: newSize.x, height: newSize.y });
            tween.to(this.position, 8, { x: newPosition.x, y: newPosition.y });
            tween.to(this, 5, { opacity: 0 });
        }

        this.draw = function(deltaTime) {
            if (this.opacity !== 1) {
                watchmen.ctxFore.globalAlpha = this.opacity;
                watchmen.ctxFore.fillStyle = '#fff';
                watchmen.ctxFore.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
                watchmen.ctxFore.globalAlpha = 1;
            }
            else {
                watchmen.ctxFore.fillStyle = '#fff';
                watchmen.ctxFore.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height)
            }

            // old smarter clear code: (but has borders)
            //watchmen.ctxFore.clearRect(this.lastDrawPosition.x - 5, this.lastDrawPosition.y - 5, this.size.width + 10, this.size.height + 10);
        };

        this.update = function(deltaTime) {
            var vector = { x: 0, y: 0 };

            if (watchmen.currentKeyboard[38] === true) { vector.y = -1; }
            if (watchmen.currentKeyboard[40] === true) { vector.y = 1; }
            if (watchmen.currentKeyboard[37] === true) { vector.x = -1; }
            else if (watchmen.currentKeyboard[39] === true) { vector.x = 1; }

            if ((vector.x !== 0 || vector.y !== 0) && !watchmen.won) {
                // we have a movement request
                var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

                // we'll create a new test box at the new goal location to see if we can move there
                // can't just set these equal to their objects or it'll pass by reference (essentially)
                var testBox = {
                    position: { x: this.position.x, y: this.position.y },
                    size: { width: this.size.width, height: this.size.height }
                };

                if (vector.x !== 0) {
                    vector.x /= length;
                    testBox.position.x += vector.x * this.speed * deltaTime;
                }
                if (vector.y !== 0) {
                    vector.y /= length;
                    testBox.position.y += vector.y * this.speed * deltaTime;
                }

                var blocked = false;
                for (var i = 0; i < watchmen.structures.length; i++) {
                    var collisionTest = watchmen.checkForCollision(watchmen.structures[i], testBox, this.position);
                    if (collisionTest) {
                        // we'll adjust our goal location to the farthest we can go without overlap
                        if (collisionTest.x !== null) {
                            testBox.position.x = collisionTest.x;
                        }
                        else if (collisionTest.y !== null) {
                            testBox.position.y = collisionTest.y;
                        }
                    }
                }

                this.position = testBox.position;

                // keep 'em in bounds
                var fullyRight = watchmen.worldWidth - this.size.width;
                var fullyBottom = watchmen.worldHeight - this.size.height;

                if (this.position.x < 0) {
                    this.position.x = 0;
                }
                else if (this.position.x > fullyRight) {
                    this.position.x = fullyRight;
                }

                if (this.position.y < 0) {
                    this.position.y = 0;
                }
                else if (this.position.y > fullyBottom) {
                    this.position.y = fullyBottom;
                }
            }
        };
    };

})(); // :D