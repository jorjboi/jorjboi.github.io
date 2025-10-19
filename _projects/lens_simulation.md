---
layout: page
title: Lens Simulation
description: Simulating focal length and aperture adjustment using lightfields. 
img: assets/img/chessboard.gif
importance: 4
category: fun
related_publications: false
---

- [Overview](#overview)
- [Depth Refocusing](#depth-refocusing)
- [Aperture Adjustment](#aperture-adjustment)

## Overview

The light field is a function that describes the amount of light flowing in every direction through every point in space; the slice of the light field that enters our eyes or the camera provides us with visual information about the world around us. We can take discrete samples of the light field with plenoptic cameras.

Here, I recreate the results of a plenoptic camera with collections of images from the [Stanford Light Field Archive](http://lightfield.stanford.edu/lfs.html). Light field captures from the Stanford Light Field Rig consist of 289 views from a 17 x 17 camera array. We can simulate effects such as depth refocusing and aperture adjustment from simple shifting and averaging operations.

---

## Depth Refocusing

When we take multiple pictures of a scene from slightly different positions on a plane orthogonal to the scene, moving the camera slightly between images to create stereoscopic views, objects that are closer to the camera appear to shift more than objects that are further away. When these images are averaged, images that are closer appear more blurred than ones further away, which simulates a far focal point.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lens_sim/far_focal_point.jpg" title="chessboard" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Chessboard with simulated focal point
</div>

By aligning different regions of the image, we can change the focal point. I simulate different focal points by shifting images in our light field before averaging.

In each collection of 17 x 17 images, I chose the middle one at (8,8) to be my frame of reference. Each image in the grid was shifted by a distance proportional to its distance from our reference image, multiplied by a scalar. Adjusting the scalar allows us to adjust the focal depth. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lens_sim/chess_focus.gif" title="Chessboard refocusing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  Chessboard refocusing
</div>

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lens_sim/flower_focus.gif" title="Flower refocusing" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Flower refocusing
</div>


---

## Aperture Adjustment

Aperture also determines how much of an image is in focus. The larger the aperture, the shallower the depth of field and the more bokeh we get. For many wedding or fine art portrait photographers, this is desirable because it creates a dreamy effect while drawing the eyes to the subject.

Averaging a larger number of images sampled over the grid perpendicular to the viewing axis creates more blur and mimics a camera with a larger aperture. Using fewer images results in an image that mimics a smaller aperture. 

For an aperture of size `m`, we average the middle `m` x `m` images. 

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/lens_sim/bunny_aperture.gif" title="Bunny image, aperture adjustment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
  Bunny aperture adjustment
</div>


