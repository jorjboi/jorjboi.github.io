var defaultSettings = {
        depth: 100,  
        scene: "Foreground",  

        cloudType: 'Cirrus',
        shape: 'Ellipsoid',
        detail: 'Best',
        wispiness: 1.0,
        density: 1.0,
        maxRays: 4,

        edgeColor: 0xffffff,
        faceColor: 0xf9f6f6,
        genColor: 0xff4992

    },
    settings = $.extend({}, defaultSettings),
    cloudTypes = {
        Cumulus: {
            shape: 'Sphere',
            width: 1,
            length: 1,
            height: 1
        },
        Cirrus: {
            shape: 'Ellipsoid',
            width: 0.5,
            length: 1,
            height: 1
        },
        Stratus: {
            shape: 'Ellipsoid'
        }
    };
function parse_detail() {
    if (settings.detail == 'Best') {
        return 1;
    } else if (settings.detail == 'Serviceable') {
        return 5;
    } return 10;
}

function parse_scene() {
    if (settings.scene == "Foreground") {
        return 0.2;
    } else if (settings.scene == "Middleground") {
        return 0.1;
    } return -0.1;
}

function parse_shape() {
    if (settings.shape == 'Sphere') {
        return Shapes.sphere;
    } return Shapes.ellipsoid;
}
var gui = new dat.GUI({
        height: 8 * 32 - 1
    });

// var brush = gui.addFolder('Brush');
gui.add(settings, 'depth', 1, 500).step(1).listen();
// var advancedBrush = brush.addFolder('Advanced');

gui.add(settings, 'scene').options('Foreground', 'Middleground', 'Background').listen();
var cloud = gui.addFolder('Cloud');
cloud.add(settings, 'cloudType').options('Cumulus', 'Cirrus', 'Stratus');
cloud.add(settings, 'shape').options('Sphere', 'Ellipsoid').listen();
cloud.add(settings, 'wispiness', 0, 5.0).step(0.1).listen();
cloud.add(settings, 'density', 0, 5.0).step(0.1).listen();

var render = gui.addFolder('Rendering');
render.add(settings, 'maxRays', 0, 10).step(1).listen(); // max number of rays
render.add(settings, 'detail').options('Fast', 'Serviceable', 'Best');

