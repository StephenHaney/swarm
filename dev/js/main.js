(function () { // :)
    'use strict';

    window.watchmen = {
        objectTemplates: [],

        sounds: [],

        currentKeyboard: {},

        lastUpdate: 0,
        worldWidth: 0,
        worldHeight: 0,

        hero: null,
        goals: [],
        baddies: [],
        baddieOpacity: 1,
        structures: [],

        canvasFore: null,
        canvasGui: null,

        ctxFore: null,
        ctxGui: null,

        mapBuilder: null,

        won: false,

        faces: {
            baddies: {
                roamer: new Image(),
                wall: new Image(),
                guardian: new Image(),
            },

            hero: [new Image(), new Image(), new Image()],

            powerup: new Image(),

            load: function() {
                watchmen.faces.baddies.roamer.src = 'img/faces-bad-roamer.png';
                watchmen.faces.baddies.wall.src = 'img/faces-bad-wall.png';
                watchmen.faces.baddies.guardian.src = 'img/faces-bad-guardian.png';
                watchmen.faces.hero[0].src = 'img/faces-hero-1.png';
                watchmen.faces.hero[1].src = 'img/faces-hero-2.png';
                watchmen.faces.hero[2].src = 'img/faces-hero-3.png';
                watchmen.faces.powerup.src = 'img/faces-powerup.png';
            }
        },

        initialize: function() {
            // load faces
            watchmen.faces.load();

            // init sounds!
            watchmen.initSounds();

            // wait for DOM then create the unique views
            $(function () {
                // keep track of key downs and ups
                $(window).keydown(function(e) {
                    watchmen.currentKeyboard[e.keyCode] = true;
                });

                $(window).keyup(function(e) {
                    watchmen.currentKeyboard[e.keyCode] = false;
                });

                // grab canvas contexts, world size, and set up initial background color
                watchmen.canvasFore = document.getElementById('canvas-foreground');
                watchmen.canvasGui = document.getElementById('canvas-gui');
                watchmen.worldWidth = watchmen.canvasFore.width;
                watchmen.worldHeight = watchmen.canvasFore.height;

                watchmen.ctxFore = watchmen.canvasFore.getContext('2d');
                watchmen.ctxGui = watchmen.canvasGui.getContext('2d');
                watchmen.drawGuiText();

                /*var bgImg = 
                bgImg.src = 'img/background.jpg';
                bgImg.onload = function() {
                    watchmen.ctxBack.drawImage(bgImg, 0, 0);
                }*/

                // scale the canvas to fit the viewport
                watchmen.scaleCanvasToScreen();

                // create our hero
                watchmen.hero = new watchmen.objectTemplates.Hero();

                // build the map! (enemies, structures, goals)
                watchmen.mapBuilder.buildMap();

                // get started
                watchmen.loopy();

                // play again click event
                $('#play-again').on('click', function() {
                    location.reload();
                });
            });
        },

        drawGuiText: function() {
            watchmen.ctxGui.fillStyle = "#fff";
            watchmen.ctxGui.font = "bold 16px Arial";
            //watchmen.ctxGui.fillText("t  h  e   e  n  e  m  y  '  s   g  a  t  e   i  s   d  o  w  n", 550, 55);
            watchmen.ctxGui.fillText("s  w  a  r  m", 457, 100);
        },

        scaleCanvasToScreen: function() {
            var heightDifference = this.worldHeight - $(window).height();
            var widthDifference = this.worldWidth - $(window).width();
            var heightScaleRatio = 1;
            var widthScaleRatio = 1;
            var newScaleRatio = 1;

            if (heightDifference > 0) {
                heightScaleRatio = 1 - (heightDifference / this.worldHeight);
            }
            if (widthDifference > 0) {
                widthScaleRatio = 1 - (widthDifference / this.worldWidth);
            }

            if (heightScaleRatio < 1 && heightScaleRatio < widthScaleRatio) {
                newScaleRatio = heightScaleRatio;
            }
            else if (widthScaleRatio < 1) {
                newScaleRatio = widthScaleRatio;
            }

            tween.set(watchmen.canvasFore, { scale: newScaleRatio });
            tween.set(watchmen.canvasGui, { scale: newScaleRatio });
        },

        restart: function() {
            // game over, restart!
            this.hero.size.width = this.hero.initialSize.width;
            this.hero.size.height = this.hero.initialSize.height;
            this.hero.position.x = this.hero.initialPosition.x;
            this.hero.position.y = this.hero.initialPosition.y;
            this.hero.life = this.hero.initialLife;
            this.hero.image = watchmen.faces.hero[this.hero.life - 1];
            this.hero.opacity = 1;

            this.won = false;

            for (var gi = 0; gi < this.goals.length; gi++) {
                this.goals[gi].reset();
            }
        },

        win: function() {
            this.won = true;
            // kill off baddies
            for (var bi = 0; bi < this.baddies.length; bi++) {
                this.baddies[bi].collide = false;
            }
            this.hero.winAnimation();
            tween.to(this, 2, { baddieOpacity: 0 });

            watchmen.sounds.win.play();

            setTimeout( function() {
                // show the credits after a short delay
                tween.to($('#thanks'), 2, { autoAlpha: 1 });
            }, 3500);
        },

        initSounds: function() {
            watchmen.sounds.main = new Howl({
                urls: ['sound/song.mp3'],
                loop: true,
                volume: 0.5
            });

            watchmen.sounds.main.play();

            /*if (localStorage.getItem('music-mute') !== 'on') {
                skydock.sounds.main.play();
            }
            else {
                skydock.views.startMenu.$el.find('.mute-btn-music').addClass('muted');
            }*/

            /*if (localStorage.getItem('sfx-mute') === 'on') {
                // update icon
                //skydock.views.startMenu.$el.find('.mute-btn-sfx').addClass('muted');
                Howler.mute();
            }*/

            watchmen.sounds.hurt = new Howl({
                urls: ['sound/hurt.mp3'],
                volume: 0.6
            });

            watchmen.sounds.pickup = new Howl({
                urls: ['sound/pickup.mp3'],
                volume: 0.6
            });

            watchmen.sounds.death = new Howl({
                urls: ['sound/death.mp3'],
                volume: 0.6
            });

            watchmen.sounds.goalSpawn = new Howl({
                urls: ['sound/goalspawn.mp3'],
                volume: 0.6
            });

            watchmen.sounds.win = new Howl({
                urls: ['sound/win.mp3'],
                volume: 0.6
            });
        },

        loopy: function() {
            requestAnimationFrame(watchmen.loopy);
            var current = Date.now();
            var deltaTime = current - watchmen.lastUpdate;
            watchmen.lastUpdate = current;

            // cap delta time at 0.1 second to account for losing window focus
            if (deltaTime > 100) {
                deltaTime = 100;
            }

            deltaTime = deltaTime / 10;
            watchmen.updateWorld(deltaTime);
            watchmen.drawAllTheThings(deltaTime);
        },

        updateWorld: function(deltaTime) {
            this.hero.update(deltaTime);

            for (var gi = 0; gi < this.goals.length; gi++) {
                this.goals[gi].update(deltaTime);
            }

            for (var bi = 0; bi < this.baddies.length; bi++) {
                this.baddies[bi].update(deltaTime);
            }

            for (var si = 0; si < this.structures.length; si++) {
                this.structures[si].update(deltaTime);
            }
        },

        drawAllTheThings: function(deltaTime) {
            this.ctxFore.clearRect(0, 0, this.worldWidth, this.worldHeight);

            this.hero.draw(deltaTime);

            for (var si = 0; si < this.structures.length; si++) {
                this.structures[si].draw(deltaTime);
            }

            for (var bi = 0; bi < this.baddies.length; bi++) {
                this.baddies[bi].draw(deltaTime);
            }

            for (var gi = 0; gi < this.goals.length; gi++) {
                this.goals[gi].draw(deltaTime);
            }
        },

        // pass a game object to test against, the new test location, and the test's real location
        // returns false if no collision
        // if there is a collision
        // - and you pass a realPosition: returns max distance you can move without a collision if there would be one
        // - you don't pass a realPosition: returns true
        checkForCollision: function(outwardObject, testLocation, realPosition) {
            if (testLocation.position.x < outwardObject.position.x + outwardObject.size.width &&
                testLocation.position.x + testLocation.size.width > outwardObject.position.x &&
                testLocation.position.y < outwardObject.position.y + outwardObject.size.height &&
                testLocation.position.y + testLocation.size.height > outwardObject.position.y) {
                // collision!
                var result = true;

                if (typeof realPosition !== typeof undefined) {
                    result = {
                        x: null,
                        y: null
                    };

                    // if we passed a real location, we want to know the direction of the collision
                    if (testLocation.position.x < outwardObject.position.x + outwardObject.size.width && 
                        realPosition.x >= outwardObject.position.x + outwardObject.size.width) {
                        // left side
                        result.x = outwardObject.position.x + outwardObject.size.width;
                    }
                    else if (testLocation.position.x + testLocation.size.width > outwardObject.position.x && 
                        realPosition.x + testLocation.size.width <= outwardObject.position.x) {
                        // right side
                        result.x = outwardObject.position.x - testLocation.size.width;
                    }
                    else if (testLocation.position.y < outwardObject.position.y + outwardObject.size.height && 
                        realPosition.y >= outwardObject.position.y + outwardObject.size.height) {
                        // top side
                        result.y = outwardObject.position.y + outwardObject.size.height;
                    }
                    else if (testLocation.position.y + testLocation.size.height > outwardObject.position.y && 
                        realPosition.y + testLocation.size.height <= outwardObject.position.y) {
                        // bottom side
                        result.y = outwardObject.position.y - testLocation.size.height;
                    }
                }

                return result;
            }

            return false;
        }
    };

    watchmen.initialize();

})(); // :D