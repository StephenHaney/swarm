(function () { // :)
    'use strict';

    watchmen.mapBuilder = {
        buildMap: function() {
            this.buildText();
            this.buildBads();
            this.buildMaze();
            this.buildGoals();
        },

        // write it out, it helps
        buildText: function() {

        },

        // spawn the bad guys!
        buildBads: function() {
            // outside patrol 1
            /*watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    // top
                    { x: 0, y: 100, pause: 600 },
                    { x: 450, y: 100, pause: 600 },
                    { x: 450, y: 200, pause: 100 },
                    { x: 500, y: 200, pause: 100 },
                    { x: 500, y: 100, pause: 100 },
                    // right
                    { x: 950, y: 100, pause: 600 },
                    { x: 950, y: 450, pause: 600 },
                    { x: 850, y: 450, pause: 100 },
                    { x: 850, y: 500, pause: 100 },
                    { x: 950, y: 500, pause: 100 },
                    // bottom
                    { x: 950, y: 850, pause: 600 },
                    { x: 500, y: 850, pause: 600 },
                    { x: 500, y: 750, pause: 100 },
                    { x: 450, y: 750, pause: 100 },
                    { x: 450, y: 850, pause: 100 },
                    //left
                    { x: 0, y: 850, pause: 600 },
                    { x: 0, y: 500, pause: 600 },
                    { x: 100, y: 500, pause: 100 },
                    { x: 100, y: 450, pause: 100 },
                    { x: 0, y: 450, pause: 100 },
                ],
                speed: 3
            }));*/

            // outside patrol 2
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 0, y: 850, pause: 600 },
                    { x: 0, y: 500, pause: 200 },
                    { x: 250, y: 500, pause: 200 },
                    { x: 250, y: 450, pause: 200 },
                    { x: 0, y: 450, pause: 600 },
                    { x: 0, y: 100, pause: 600 },
                    { x: 950, y: 100, pause: 600 },
                    { x: 950, y: 850, pause: 600 },
                ],
                speed: 3,
                image: watchmen.faces.baddies.roamer
            }));

            // outside patrol 3
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 950, y: 100, pause: 600 },
                    { x: 950, y: 450, pause: 200 },
                    { x: 700, y: 450, pause: 200 },
                    { x: 700, y: 500, pause: 200 },
                    { x: 950, y: 500, pause: 600 },
                    { x: 950, y: 850, pause: 600 },
                    { x: 0, y: 850, pause: 600 },
                    { x: 0, y: 100, pause: 600 },
                ],
                speed: 3,
                image: watchmen.faces.baddies.roamer
            }));


            // inside patrol 1
           /* watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 850, y: 200, pause: 600 },
                    { x: 850, y: 450, pause: 200 },
                    { x: 700, y: 450, pause: 200 },
                    { x: 700, y: 500, pause: 200 },
                    { x: 850, y: 500, pause: 600 },
                    { x: 850, y: 750, pause: 600 },
                    { x: 100, y: 750, pause: 600 },
                    { x: 100, y: 500, pause: 200 },
                    { x: 250, y: 500, pause: 200 },
                    { x: 250, y: 450, pause: 200 },
                    { x: 100, y: 450, pause: 600 },
                    { x: 100, y: 200, pause: 600 }
                ],
                image: watchmen.faces.baddies.roamer
            }));

            // inside patrol 2
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 100, y: 750, pause: 600 },
                    { x: 100, y: 500, pause: 200 },
                    { x: 250, y: 500, pause: 200 },
                    { x: 250, y: 450, pause: 200 },
                    { x: 100, y: 450, pause: 600 },
                    { x: 100, y: 200, pause: 600 },
                    { x: 850, y: 200, pause: 600 },
                    { x: 850, y: 450, pause: 200 },
                    { x: 700, y: 450, pause: 200 },
                    { x: 700, y: 500, pause: 200 },
                    { x: 850, y: 500, pause: 600 },
                    { x: 850, y: 750, pause: 600 }
                ],
                image: watchmen.faces.baddies.roamer
            }));*/

            // inside patrol 3
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 250, y: 200, pause: 200 },
                    { x: 850, y: 200, pause: 200 },
                    { x: 850, y: 350, pause: 200 },
                    { x: 700, y: 350, pause: 200 },
                    { x: 700, y: 200, pause: 200 },
                    { x: 100, y: 200, pause: 200 },
                    { x: 100, y: 350, pause: 200 },
                    { x: 250, y: 350, pause: 200 },
                ],
                image: watchmen.faces.baddies.roamer
            }));

            // inside patrol 4
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 700, y: 750, pause: 200 },
                    { x: 100, y: 750, pause: 200 },
                    { x: 100, y: 600, pause: 200 },
                    { x: 250, y: 600, pause: 200 },
                    { x: 250, y: 750, pause: 200 },
                    { x: 850, y: 750, pause: 200 },
                    { x: 850, y: 600, pause: 200 },
                    { x: 700, y: 600, pause: 200 },
                ],
                image: watchmen.faces.baddies.roamer
            }));


/*
            // inner top left patrol
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({
                loop: false,
                route: [
                    { x: 50, y: 450, pause: 300 },
                    { x: 100, y: 450, pause: 300 },
                    { x: 100, y: 350, pause: 300 },
                    { x: 250, y: 350, pause: 300 },
                    { x: 250, y: 200, pause: 300 },
                    { x: 450, y: 200, pause: 300 },
                    { x: 450, y: 150, pause: 300 }
                ]
            }));

            // inner top right patrol
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({
                loop: false,
                route: [
                    { x: 850, y: 350, pause: 400 },
                    { x: 700, y: 350, pause: 400 },
                    { x: 700, y: 200, pause: 400 }
                ]
            }));

            // inner bottom left patrol
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({
                loop: false,
                route: [
                    { x: 450, y: 800, pause: 300 },
                    { x: 450, y: 750, pause: 300 },
                    { x: 250, y: 750, pause: 300 },
                    { x: 250, y: 600, pause: 300 },
                    { x: 100, y: 600, pause: 300 },
                    { x: 100, y: 500, pause: 300 },
                    { x: 50, y: 500, pause: 300 }
                ]
            }));

            // inner bottom right patrol
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({
                loop: false,
                route: [
                    { x: 800, y: 600, pause: 400 },
                    { x: 700, y: 600, pause: 400 },
                    { x: 700, y: 700, pause: 400 }
                ]
            }));*/

            // middle spinners
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 450, y: 350 },
                    { x: 500, y: 350 },
                    { x: 500, y: 400 },
                    { x: 450, y: 400 }
                ],
                speed: 0.5,
                image: watchmen.faces.baddies.guardian
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 450, y: 600 },
                    { x: 500, y: 600 },
                    { x: 500, y: 550 },
                    { x: 450, y: 550 },
                ],
                speed: 0.5,
                image: watchmen.faces.baddies.guardian
            }));

            // middle patrol
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 350, y: 300 },
                    { x: 600, y: 300 },
                    { x: 600, y: 650 },
                    { x: 350, y: 650 }
                ],
                speed: 1,
                image: watchmen.faces.baddies.guardian
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 600, y: 300 },
                    { x: 600, y: 650 },
                    { x: 350, y: 650 },
                    { x: 350, y: 300 }
                ],
                speed: 1,
                image: watchmen.faces.baddies.guardian
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 600, y: 650 },
                    { x: 350, y: 650 },
                    { x: 350, y: 300 },
                    { x: 600, y: 300 }
                ],
                speed: 1,
                image: watchmen.faces.baddies.guardian
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 350, y: 650 },
                    { x: 350, y: 300 },
                    { x: 600, y: 300 },
                    { x: 600, y: 650 }
                ],
                speed: 1,
                image: watchmen.faces.baddies.guardian
            }));

            // top wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 250, y: 250 },
                    { x: 700, y: 250 },
                    { x: 450, y: 250 },
                    { x: 600, y: 250 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 700, y: 250 },
                    { x: 250, y: 250 },
                    { x: 350, y: 250 },
                    { x: 325, y: 250 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 400, y: 250 },
                    { x: 250, y: 250 },
                    { x: 600, y: 250 },
                    { x: 250, y: 250 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 600, y: 250 },
                    { x: 250, y: 250 },
                    { x: 700, y: 250 },
                    { x: 400, y: 250 }
                ],
                speed: 0.6
            }));

            // bottom wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 250, y: 700 },
                    { x: 700, y: 700 },
                    { x: 450, y: 700 },
                    { x: 600, y: 700 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 700, y: 700 },
                    { x: 250, y: 700 },
                    { x: 350, y: 700 },
                    { x: 325, y: 700 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 400, y: 700 },
                    { x: 250, y: 700 },
                    { x: 600, y: 700 },
                    { x: 250, y: 700 }
                ],
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 600, y: 700 },
                    { x: 250, y: 700 },
                    { x: 700, y: 700 },
                    { x: 400, y: 700 }
                ],
                speed: 0.6
            }));

            // inner top left wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 150, y: 400 },
                    { x: 300, y: 400 },
                    { x: 300, y: 350 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 300, y: 350 },
                    { x: 300, y: 400 },
                    { x: 150, y: 400 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 300, y: 400 },
                    { x: 300, y: 350 },
                    { x: 300, y: 400 },
                    { x: 150, y: 400 }
                ],
                loop: false,
                speed: 0.6
            }));

            // inner top right wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 800, y: 400 },
                    { x: 650, y: 400 },
                    { x: 650, y: 350 },
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 650, y: 350 },
                    { x: 650, y: 400 },
                    { x: 800, y: 400 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 650, y: 400 },
                    { x: 650, y: 350 },
                    { x: 650, y: 400 },
                    { x: 800, y: 400 }
                ],
                loop: false,
                speed: 0.6
            }));

            // inner bottom left wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 150, y: 550 },
                    { x: 300, y: 550 },
                    { x: 300, y: 600 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 300, y: 600 },
                    { x: 300, y: 550 },
                    { x: 150, y: 550 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 300, y: 550 },
                    { x: 300, y: 600 },
                    { x: 300, y: 550 },
                    { x: 150, y: 550 }
                ],
                loop: false,
                speed: 0.6
            }));

            // inner bottom right wall
            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 800, y: 550 },
                    { x: 650, y: 550 },
                    { x: 650, y: 600 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 650, y: 600 },
                    { x: 650, y: 550 },
                    { x: 800, y: 550 }
                ],
                loop: false,
                speed: 0.6
            }));

            watchmen.baddies.push(new watchmen.objectTemplates.NPC({ 
                route: [
                    { x: 650, y: 550 },
                    { x: 650, y: 600 },
                    { x: 650, y: 550 },
                    { x: 800, y: 550 }
                ],
                loop: false,
                speed: 0.6
            }));
        },

        // the structures!
        buildMaze: function() {
            // outer top left
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 50, y: 150, width: 400, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 50, y: 200, width: 50, height: 250 }));

            // outer top right
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 550, y: 150, width: 400, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 900, y: 200, width: 50, height: 250 }));

            // outer bottom left
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 50, y: 800, width: 400, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 50, y: 550, width: 50, height: 250 }));

            // outer bottom right
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 550, y: 800, width: 400, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 900, y: 550, width: 50, height: 250 }));

            // inner top left
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 150, y: 300, width: 100, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 200, y: 250, width: 50, height: 50 }));

            // inner top right
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 750, y: 300, width: 100, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 750, y: 250, width: 50, height: 50 }));

            // inner bottom left
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 150, y: 650, width: 100, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 200, y: 700, width: 50, height: 50 }));

            // inner bottom right
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 750, y: 650, width: 100, height: 50 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 750, y: 700, width: 50, height: 50 }));

            // middle beams
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 400, y: 350, width: 50, height: 300 }));
            watchmen.structures.push(new watchmen.objectTemplates.Structure({ x: 550, y: 350, width: 50, height: 300 }));
        },

        // all gooey and golden
        buildGoals: function() {
            // out top left
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 150,
                y: 250,
                group: 1,
                collide: true,
                visible: true,
                opacity: 1
            }));

            // out top right
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 800,
                y: 250,
                group: 1,
                collide: true,
                visible: true,
                opacity: 1
            }));

            // out bottom left
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 150,
                y: 700,
                group: 1,
                collide: true,
                visible: true,
                opacity: 1
            }));

            // out bottom right
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 800,
                y: 700,
                group: 1,
                collide: true,
                visible: true,
                opacity: 1
            }));

            // inner top left
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 250,
                y: 350,
                group: 2
            }));

            // inner top right
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 700,
                y: 350,
                group: 2
            }));

            // inner bottom left
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 250,
                y: 600,
                group: 2
            }));

            // inner bottom right
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 700,
                y: 600,
                group: 2
            }));

            // center
            watchmen.goals.push(new watchmen.objectTemplates.Goal({
                x: 450,
                y: 450,
                width: 100,
                height: 100,
                group: 3
            }));
        },
    };
})();