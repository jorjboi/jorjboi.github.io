/*jshint eqnull:true */

var SELECTED, INTERSECTED;
var plane;

var SelectUtils = {
    

    highlightCurr: function() {
        if ( scenes[0].children.length > 4) {
            for (var c = 1; c < currGenGroup.children.length; c++) {
                currGenGroup.children[c].material = currGenMaterial;
            }
        }
        renderOnce();
    },

    unhighlightCurr: function() {
        if ( currGenGroup && scenes[0].children.length > 4) {
            for (var c = 1; c < currGenGroup.children.length; c++) {
                currGenGroup.children[c].material = unMaterial;
            }
            scenes[0].remove( currGen.edges );
        }
        renderOnce();
    },

    raycaster: new THREE.Raycaster(),
    offset: new THREE.Vector3(),
    single: false
};

var Select = {

    init: function() {
        if ( SELECTED ) {
            SelectUtils.unhighlightCurr();
            SELECTED = null;
        }
    },

    exit: function() {
        cancelAnimationFrame(requestID);
        SelectUtils.unhighlightCurr();
        currGen = null;
        currGenGroup = null;
    },

    mousedown: function(event) {
        event.preventDefault();
        SelectUtils.raycaster.setFromCamera( Mouse.mouseToNDC(event), cameras[0] );
        Mouse.dragging = true;

        var isect = SelectUtils.raycaster.intersectObjects( objects );
        
        // DEBUGGING
        // var a = [];
        // for (var k = 0; k < isect.length; k++) {
        //     a.push( isect[k].object.id );
        // }
        // console.log(a);
        
        if (isect.length > 0) {
            SELECTED = isect[0].object;

            var sGenGroup = SELECTED.parent;
            
            if (sGenGroup != currGenGroup) {
                SelectUtils.unhighlightCurr();
                currGenGroup = sGenGroup;
                currGen = groupDict[ (sGenGroup.id).toString() ];
                SelectUtils.highlightCurr();
            }
            scenes[0].add(currGen.edges);
            renderOnce();

            isect = SelectUtils.raycaster.intersectObject( plane );
            if ( isect.length > 0 ) {
                SelectUtils.offset.copy( isect[0].point ).sub( plane.position );
                // console.log(isect[0].point);
                viewport.style.cursor = 'move';
            }
        } else {
            SELECTED = null;
            SelectUtils.unhighlightCurr();
        }
    },

    mousemove: function(event) {
        
        SelectUtils.raycaster.setFromCamera( Mouse.mouseToNDC(event), cameras[0] );
        var isect;
        if ( SELECTED) {
            if ( !Mouse.dragging ) {
                return;
            }
            render();
            isect = SelectUtils.raycaster.intersectObject( plane );
            if ( isect.length > 0 ) {
                if (SelectUtils.single) {

                } else {
                    SELECTED.position.copy( isect[0].point.sub( SelectUtils.offset ) );
                }
            }
            return;
        }
        isect = SelectUtils.raycaster.intersectObjects( objects );
        if ( isect.length > 0 && isect[0].id != sky.id) {
            INTERSECTED = isect[0].object;
            
            var iGenGroup = INTERSECTED.parent;
            if (iGenGroup != currGenGroup) {
                SelectUtils.unhighlightCurr();  
                currGenGroup = iGenGroup;
                currGen = groupDict[ (iGenGroup.id).toString() ];
                SelectUtils.highlightCurr();
            }

            plane.position.copy( INTERSECTED.position );
            plane.lookAt( cameras[0].position );

        } else {
            SelectUtils.unhighlightCurr();  
            INTERSECTED = null;
            currGen = null;
            currGenGroup = null;
        }
    },

    mouseup: function() {
        viewport.style.cursor = "auto";
        stopRender();
        Mouse.dragging = false;
    }
};