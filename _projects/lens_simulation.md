---
layout: page
title: Lens Simulation
description: Simulating focal length and aperture adjustment using lightfields. 
img: assets/img/chessboard.gif
importance: 3
category: work
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
        {% include figure.liquid loading="eager" path="assets/img/lens_simulation/chess.jpg" title="chessboard" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Chessboard with simulated focal point
</div>

By aligning different regions of the image, we can change the focal point. I simulate different focal points by shifting images in our light field before averaging.

In each collection of 17 x 17 images, I chose the middle one at (8,8) to be my frame of reference. Each image in the grid was shifted by a distance proportional to its distance from our reference image, multiplied by a scalar. Adjusting the scalar allows us to adjust the focal depth. 

<div style="text-align: center;">
  <figure style="display: inline-block; text-align: center;">
    <img src="assets/img/chessboard.gif" alt="Chessboard refocusing" style="max-width: 100%;">
    <figcaption style="margin-top: 8px; font-style: italic; color: #555;">Chessboard refocusing</figcaption>
  </figure>
</div>

<div style="text-align: center;">
  <figure style="display: inline-block; text-align: center;">
    <img src="assets/img/flower.gif" alt="Flower refocusing" style="max-width: 100%;">
    <figcaption style="margin-top: 8px; font-style: italic; color: #555;">Flower refocusing</figcaption>
  </figure>
</div>

---

## Aperture Adjustment

Aperture also determines how much of an image is in focus. The larger the aperture, the shallower the depth of field and the more bokeh we get. For many wedding or fine art portrait photographers, this is desirable because it creates a dreamy effect while drawing the eyes to the subject.

Averaging a larger number of images sampled over the grid perpendicular to the viewing axis creates more blur and mimics a camera with a larger aperture. Using fewer images results in an image that mimics a smaller aperture. 

For an aperture of size m, we average the middle m x m images. 

<div style="text-align: center;">
  <figure style="display: inline-block; text-align: center;">
    <img src="assets/img/bunny.gif" alt="Bunny image, aperture adjustment" style="max-width: 100%;">
    <figcaption style="margin-top: 8px; font-style: italic; color: #555;">Bunny image, aperture adjustment</figcaption>
  </figure>
</div>

