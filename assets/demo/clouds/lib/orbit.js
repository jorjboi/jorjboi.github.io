var Orbit = {
	init: function() {
		console.log("Orbit Mode");
		controls = new THREE.OrbitControls( cameras[curr_id], renderer.domElement );
	    controls.addEventListener( 'change', renderOnce ); // add this only if there is no animation loop (requestAnimationFrame)
	    controls.enableDamping = true;
	    controls.dampingFactor = 0.25;
	    // controls.enableZoom = false;

	},

	exit: function() {
		controls.dispose();
		stopRender();
    },
};