var defaultSettings = {
			Zoom: 		1,
			Rotate_X: 	0,
			Rotate_Y:	0,
			Rotate_Z:	0,
            Light_Vertical: 0,
            Light_Horiz: 0,
			Scene:	'Morning',
            Hardness: 0.35,
            Albedo: 0.5,
			cloudType: 'Cirrus',
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

function get_zoom_factor() {
    return settings.Zoom;
};
function get_Rotate_X() {
    return settings.Rotate_X;
};
function get_Rotate_Y() {
    return settings.Rotate_Y;
};
function get_Rotate_Z() {
    return settings.Rotate_Z;
};

function get_Hardness() {
    return settings.Hardness;
};

function get_Albedo() {
    return settings.Albedo;
}

function get_lightVert() {
    return settings.Light_Vertical;
}

function get_lightHoriz() {
    return settings.Light_Horiz;
}

function get_Scene() {
    if (settings.Scene == "Morning")
		return 2.0;
    else if (settings.Scene == "Midday")
		return 1.0;
    else if (settings.Scene == "Night")
		return 3.0;	
};
var gui = new dat.GUI({height: 8 * 32 - 1});

gui.add(settings, 'Zoom', 0.5, 2).step(0.1).listen();

gui.add(settings, 'Rotate_X', -45, 45).step(1).listen();
gui.add(settings, 'Rotate_Y', -90, 90).step(1).listen();
gui.add(settings, 'Rotate_Z', -180, 180).step(1).listen();

gui.add(settings, 'Hardness', 0.15, 0.5).step(0.05).listen();
gui.add(settings, 'Albedo', 0., 1.).step(0.1).listen();

gui.add(settings, 'Light_Vertical', -0.5, .5).step(0.1).listen();
gui.add(settings, 'Light_Horiz', -.5, 1.).step(0.05).listen();

gui.add(settings, 'Scene').options('Morning', 'Midday', 'Night').listen();
