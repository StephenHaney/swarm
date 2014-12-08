(function () { // :)
    'use strict';

    watchmen.objectTemplates.NPC = function(stats) {
        // defaults stats:
        this.speed = 2;
        this.size = { width: 50, height: 50 };
        this.position = { x: 500, y: 500 };
        this.route = [];
        this.loop = true;  // default behavior is to loop the route, set to false for reverse
        this.opacity = 1;
        this.collide = true;
        this.image = watchmen.faces.baddies.wall;

        var self = this;
        var currentPath = 0;
        var currentPathDirection = 1;
        var xGoalMet = false;
        var yGoalMet = false;

        if (typeof stats !== typeof undefined) {
            if (typeof stats.width !== typeof undefined) { this.size.width = stats.width; }
            if (typeof stats.height !== typeof undefined) { this.size.height = stats.height; }
            if (typeof stats.speed !== typeof undefined) { this.speed = stats.speed; }
            if (typeof stats.image !== typeof undefined) { this.image = stats.image; }
            if (typeof stats.loop !== typeof undefined) { this.loop = stats.loop; }
            if (typeof stats.route !== typeof undefined) {
                this.route = stats.route;
                this.position.x = this.route[0].x;
                this.position.y = this.route[0].y;

                if (this.route.length > 1) {
                    nextDestination();
                }
            }
        }

        this.draw = function(deltaTime) {
            if (watchmen.baddieOpacity !== 1) {
                watchmen.ctxFore.globalAlpha = watchmen.baddieOpacity;
                watchmen.ctxFore.fillStyle = '#dd0000';
                //watchmen.ctxFore.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
                watchmen.ctxFore.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
                watchmen.ctxFore.globalAlpha = 1;
            }
            else {
                watchmen.ctxFore.fillStyle = '#dd0000';
                //watchmen.ctxFore.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
                watchmen.ctxFore.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
            }
        };

        this.update = function(deltaTime) {

            if (this.collide) {
                // check for eating our hero
                var omnomnom = watchmen.checkForCollision(watchmen.hero, this);
                if (omnomnom !== false) {
                    watchmen.hero.damage();
                }
            }

            if (this.route.length > 1)
            {
                var vector = { x: 0, y: 0 };
                vector.x = this.route[currentPath].x - this.position.x;
                vector.y = this.route[currentPath].y - this.position.y;

                if (vector.x !== 0 || vector.y !== 0) {
                    // we have movement
                    var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

                    var distanceMoved = {
                        x: 0,
                        y: 0
                    };

                    if (vector.x !== 0) {
                        distanceMoved.x = vector.x / length * this.speed * deltaTime;
                        this.position.x += distanceMoved.x;
                    }
                    if (vector.y !== 0) {
                        distanceMoved.y = vector.y / length * this.speed * deltaTime;
                        this.position.y += distanceMoved.y;
                    }

                    vector.x = Math.floor(vector.x);
                    vector.y = Math.floor(vector.y);

                    // troubleshooting code if NPCs are getting stuck
                    /*this.lastDistance = distanceMoved;
                    this.lastVector = vector;*/

                    // adjust for going over and check for being done
                    // floor the vector and +1 the distance moved, so if we're 'close' to the goal, it's good enough
                    // or the npc can be stuck foreverrrrrrr
                    if (Math.abs(distanceMoved.x) + 1 >= Math.abs(vector.x)) {
                        this.position.x = this.route[currentPath].x;
                        xGoalMet = true;
                    }

                    if (Math.abs(distanceMoved.y) + 1 >= Math.abs(vector.y)) {
                        yGoalMet = true;
                        this.position.y = this.route[currentPath].y;
                    }

                    if (xGoalMet && yGoalMet) {
                        nextDestination();
                    }
                }
                else {
                    // troubleshooting code if NPCs are getting stuck
                    /*if (xGoalMet === false || yGoalMet === false)
                    {
                        if (this.reported < 50) {
                            // no movement
                            console.log('no!');

                            console.log('path x: ' + this.route[currentPath].x);
                            console.log('path y: ' + this.route[currentPath].y);
                            console.log('current x: ' + this.position.x);
                            console.log('current y: ' + this.position.y);

                            console.log('last vector x: ' + this.lastVector.x);
                            console.log('last vector y: ' + this.lastVector.y);
                            console.log('last distance x: ' + this.lastDistance.x);
                            console.log('last distance y: ' + this.lastDistance.y);

                            this.reported++;
                        }
                    }*/
                }

            }
        };

        // troubleshooting code if NPCs are getting stuck
        /*this.reported = 0;
        this.lastVector = null;
        this.lastDistance = null;*/

        function nextDestination() {
            var nextStepIndex = currentPath + currentPathDirection;

            if (nextStepIndex === self.route.length) {
                // we're at the max
                if (self.loop) {
                    // if we're looping, go back to 0
                    nextStepIndex = 0;
                }
                else {
                    // otherwise go in reverse
                    currentPathDirection = -1;
                    // we just hit max, so to reverse: next route is -2 from overshoot test
                    nextStepIndex += -2;
                }
            }
            else if (nextStepIndex === -1) {
                currentPathDirection = 1;
                // we just hit 0, so to reverse: next route is 1
                nextStepIndex = 1;
            }

            if (typeof self.route[currentPath].pause !== typeof undefined) {
                setTimeout(function() {
                    currentPath = nextStepIndex;
                    xGoalMet = false;
                    yGoalMet = false;
                }, self.route[currentPath].pause);
            }
            else {
                currentPath = nextStepIndex;
                xGoalMet = false;
                yGoalMet = false;
            }
        }
    };

})(); // :D