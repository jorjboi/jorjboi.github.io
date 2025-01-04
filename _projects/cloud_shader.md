---
layout: page
title: Cloud Shader
description: A GLSL shader to create clouds and simulate different lighting scenarios.
img: assets/img/clouds_loop.gif
importance: 2
category: work
related_publications: false
---

Inspired by scenes in films such as Up, I wanted to render a scene with believable and aesthetically compelling clouds. Using Three.js, a JavaScript API for WebGL based graphics, I created a fragment shader that creates clouds through volumetric ray marching. I also added a UI that lets the user control the scene's appearance.

- [Implementation](#implementation)
- [UI Controls](#ui-controls)
- [Results](#results)

## Implementation

The geometry of my scene is just a simple screen-aligned quad, and my vertex shader is nothing more than a dummy "Hello World" shader. The fragment shader generates the output of every pixel and paints the scene.

I first generate procedural noise to sample for a cloud-like texture. We can sample a simple noise function or texture to create more complex Fractal Brownian Motion noise. This is done by layering several layers of Perlin noise, each layer increasing in frequency (lacunarity) and decreasing in amplitude (persistence). 

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/fbm_noise.png" title="Fbm noise" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Next, I implement **volumetric ray marching** to simulate cloud volumes, initializing each ray based on the camera origin and a pixel’s coordinates. I define a bounding box for where I want clouds to exist in the scene and incrementally sample the ray at regular intervals within this volume. At each step, I sample the noise function for the cloud density and thickness. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/raymarch.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Finally, light was added to the scene by taking the dot product of the scene's `lightDirection` and the direction of the ray to simulate the light intensity, and then fading it out exponentially `2^(k*(light_intensity−1))` from the source. I do this several times with different parameters to create several "layers" that are added to the background color to fade the light out realistically and create ambient lighting effects.

By sampling the density and light intensity, the ray accumulates a final color and opacity for the cloud at a specific fragment.

---

## UI Controls

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/cloud_ui.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The hardness parameter is factored into the noise sampling function to adjust the noise density, which has an effect on the hardness or softness of the clouds. 

The abledo describes how reflective the clouds are, and is factored into the light intensity.

The position of the sun can be adjusted by adding offsets to the lightDirection vector, and the viewing angle can be adjusted with offsets to the camera view matrix.

Finally, the time of day (morning, midday, or night) is set by choosing different values for the background color and the light source.

---

## Results

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/hard_clouds.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/soft_clouds.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Hard (upper) vs. Soft (lower) clouds
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/high_albedo_clouds.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/low_albedo_clouds.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    High albedo (upper) vs. Low albedo (lower) clouds
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/light_source_direction.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Adjusting the light source direction
</div>


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/high_albedo_clouds.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/cloud_shader/low_albedo_clouds.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Changing the time of day
</div>

