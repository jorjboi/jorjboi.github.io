var Mouse = {
	NDCtoWorld: function(x, y, z) {
        var v = new THREE.Vector3(x, y, z);

        // DEBUGGING
        // console.log("NDC=" + v.x + "," + v.y + "," + v.z);

        v.unproject( cameras[0] );
        var dir = v.clone().sub( cameras[0].position ).normalize();
        var distance = - cameras[0].position.z / dir.z;
        v = cameras[0].position.clone().add( dir.multiplyScalar( distance ) );

        // DEBUGGING
        // console.log("World=" + v.x + "," + v.y + "," + v.z);

        return v;
    },

    mouseToWorld: function(event) {
        // console.log("Mouse=" + event.clientX + "," + event.clientY);

        var w = new THREE.Vector3();
        w.x = ( event.clientX / canvasWidth ) * 2 - 1;
        w.y = - ( event.clientY / canvasHeight ) * 2 + 1; 
        w.z = 0.5;

        // DEBUGGING
        // console.log("NDC=" + w.x + "," + w.y + "," + w.z);

        w.unproject( cameras[0] );
        var dir = w.clone().sub( cameras[0].position ).normalize();
        var distance = - cameras[0].position.z / dir.z;
        w = cameras[0].position.clone().add( dir.multiplyScalar( distance ) );

        // DEBUGGING
        // console.log("World=" + w.x + "," + w.y + "," + w.z);

        return w;
    },

    mouseToNDC: function(event) {
    	var n = new THREE.Vector2();
        n.x = ( event.clientX / canvasWidth ) * 2 - 1;
        n.y = - ( event.clientY / canvasHeight ) * 2 + 1; 
        return n;
    },

    worldToMouse: function(world) {
        var m = new THREE.Vector3();
        m.x = Math.round( (   world.x + 1 ) * canvasWidth  / 2 );
        m.y = Math.round( (   world.y + 1 ) * canvasHeight / 2 );
        m.z = 0.5;
        m.project(cameras[0]);
        return m;
    },

    dragging: false
};