---
layout: page
title: Pathtracer
description: Implemented the core routines of a physically-based renderer using the pathtracing algorithm.
img: assets/img/dragon_render.gif
importance: 1
category: work
related_publications: true
---

## Overview
This project was done for CS184 Computer Graphics & Imaging at UC Berkeley, taught by Professor Ren Ng. In this project, I implemented the core functionality of a physically-based renderer and the rendering equation. 

In path tracing, rays are traced from the camera through each pixel of an image into a three-dimensional scene, where they encounter different surfaces.

At each intersection with a surface, the outgoing light towards the camera is computed using the total incoming light and the Bidirectional Scattering Function (BSDF) of that surface. The incoming light that reaches that point is found by tracing the ray recursively back through the scene, and accumulating the light reflected or transmitted by different surfaces (or light sources) at each subsequent intersection with a surface.

By integrating over all the light arriving at a point and scaling it by the BSDF, we can determine the final amount of radiance towards the camera and compute the color of the pixel.

This process is repeated for every pixel to form an entire image.

---

## Ray Generation and Intersection

Imagine a virtual camera looking at scene; each pixel of the final image has a corresponding location on that virtual camera sensor.

First, we convert the pixel’s location from image space to camera space:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pathtracers/raycasting.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Then, we can define a ray that starts at the camera’s origin and goes through the location of that pixel on the virtual camera sensor, like a little hole in a mesh screendoor. Note that rays should exist in world space--the world of the scene.

Since pixels are specified by the coordinates just one of their corners, we generate a bunch of rays over the unit square of each pixel by random sampling (each ray has an ever-so-slightly different direction).

For each ray, we need to check for an intersection with a surface in the scene. We can see if a ray and a triangle intersect using the **Möller-Trumbore** algorithm:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/pathtracers/raycasting.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

This algorithm takes a ray with origin O and direction D and tests for its intersection with a triangle with vertices P0, P1, and P2. If the barycentric coordinates b1, b2, and 1-b1-b2 specify a point within the triangle, then there is an intersection.

However, testing against every triangle in a scene for an intersection is costly and inefficient, so I accelerate this process by constructing a bounding volume hierarchy for the scene.

---

## Bounding Volume Hierarchies

A bounding volume hierarchy (BVH) is a tree in which each node is the bounding box of a collection of primitives in a mesh, and the leaves are the individual primitives themselves (triangles). Instead of testing for an intersection with every primitive in a mesh, we can check for intersection with bounding boxes, and only check for intersection against individual primitives when we hit a leaf.

At each layer of BVH construction, I choose to split the primitives into left or right branches of the BVH using their **average centroid** as the split point. 

The BVH is constructed recursively. The intersection test for each ray improves  from linear to logarithmic time, so now we can quickly generate images of complicated meshes with thousands of triangles:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Max Planck, rendered with debug normal shading
</div>

---

## Direct Illumination
First, I implemented **direct illumination**. A point on a surface is visible if any rays reflected from the surface directly intersect a light source.

For Lambertian surfaces, reflection is equally diffuse in all directions around the point of intersection. Upon finding an intersection with a surface, we can sample the direction of reflected rays using **uniform hemisphere sampling**, where we choose a random direction within a hemisphere centered around the surface normal at the point of intersection.

We generate a ray that starts at the point of intersection and trace it in the direction to check if it intersects a light source. Using the amount of incoming light from the source, we can compute the outgoing light using the reflectance equation:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The reflectance equation
</div>

The total outgoing emission at point *p* in the direction *wr* is *Lr(p, wr)*, and the integral of the total emission coming from every outgoing direction *wi* is over a hemisphere *H2*. 

*Li(p, wi)* is the emission from a light source that a ray starting at *p* with direction *wi* encounters, *fr(p, wi -> wr)* is the evaluation of the BSDF at point *p* of a ray being reflected from *wi* to *wr* towards the camera, and *cos(theta i)* is used to attenuate the amount of light coming in from an angle.

In practice, we approximate this with a Monte Carlo estimator with *N* samples and the probability distribution function (for a hemisphere, this is 1/2*pi*) :

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Monte Carlo estimator
</div>

However, the renders we get back are noisy because many sampled rays never reach a light source at all. While this image would eventually converge, we would need way too many samples. Additionally, sampling uniformly on a hemisphere is unable to practically sample **point light sources**. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cornell box bunny: direct illumination, uniform hemisphere sampling
</div>

A better solution is to use **importance sampling** of lights, where we sample rays in the directions of our scene lights instead of randomly over a hemisphere. A point is directly illuminated only if the rays do not intersect any other surface before reaching the light source. 

We perform this sampling process for every light source in the scene and sum together the radiance contribution from each light.

Now, the renders are far less noisy because they take far fewer samples to converge.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cornell box bunny: direct illumination, importance sampling
</div>

---

## Global Illumination

In the real world, objects are illuminated not only by direct light sources, but also indirectly by light reflected or transmitted by other objects in the environment.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Global illumination diagram
</div>

To simulate this physical process, I recursively trace each ray back through the scene until it either intersects a light source or we choose to terminate the ray. We can terminate the ray based on **Russian Roulette**, an unbiased method of random termination, as well as by setting a max number of bounces.

The contribution of later bounces to the final pixel radiance decreases exponentially because it should be attenuated by the BSDF at each surface along the way. At first, I forgot to consider that and the renders came out far too bright. An example of a buggy render:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cornell box bunny: incorrect radiances
</div>

Upon fixing this bug, I now have global illumination. We can see some of the color bleeding from the red and blue walls on the right and left sides of the model:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Cornell box bunny: global illumination
</div>

One way to reduce the noise of the images is to increase the number of rays sampled per pixel. At 1024 rays per pixel, the noise is almost impossible to notice.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    16 vs. 1024 samples per pixel 
</div>

However, taking many samples is a slow and computationally expensive process. We can speed up our renders with adaptive sampling.

---

## Adaptive Sampling
With adaptive sampling, we check if a pixel’s value has converged early as we trace rays through it, and stop sampling if it has.

We can check a pixel’s convergence after each batch of n samples to see if it’s within a 95% confidence interval. Areas of the scene that are shadowed or not directly illuminated take longer to converge. Below are images depicting  sample rates for Cornell box spheres and bunny: red indicates that we took more samples to converge, while blue and green indicate that the pixel value converged quickly and we stopped sampling earlier.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Blue indicates pixel value converged early; red indicates slow convergence
</div>

And finally, here is the bunny render, using 1024 samples:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>





Every project has a beautiful feature showcase page.
It's easy to include images in a flexible 3-column grid format.
Make your photos 1/3, 2/3, or full width.

To give your project a background in the portfolio page, just add the img tag to the front matter like so:

    ---
    layout: page
    title: project
    description: a project with a background image
    img: /assets/img/12.jpg
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/1.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/3.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Caption photos easily. On the left, a road goes through a tunnel. Middle, leaves artistically fall in a hipster photoshoot. Right, in another hipster photoshoot, a lumberjack grasps a handful of pine needles.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/5.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

You can also put regular text between your rows of images, even citations {% cite einstein1950meaning %}.
Say you wanted to write a bit about your project before you posted the rest of the images.
You describe how you toiled, sweated, _bled_ for your project, and then... you reveal its glory in the next row of images.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    You can also have artistically styled 2/3 + 1/3 images, like these.
</div>

The code is simple.
Just wrap your images with `<div class="col-sm">` and place them inside `<div class="row">` (read more about the <a href="https://getbootstrap.com/docs/4.4/layout/grid/">Bootstrap Grid</a> system).
To make images responsive, add `img-fluid` class to each; for rounded corners and shadows use `rounded` and `z-depth-1` classes.
Here's the code for the last row of images above:

{% raw %}

```html
<div class="row justify-content-sm-center">
  <div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/6.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/11.jpg" title="example image" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
```

{% endraw %}
