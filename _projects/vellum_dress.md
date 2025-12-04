---
layout: page
title: Vellum Dress
description: Dress made and simulated in Houdini using Vellum tools.
img: assets/img/dress_cover.png
importance: 1
category: work
related_publications: false
---

<!-- Include MathJax -->
<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

- [Overview](#overview)
- [Results](#results)

## Overview

For this project, I explored Houdini's Vellum tools for cloth to model, drape, and simulate a dress with a fitted top, frilled sleeves, and a bottom and top layer.

## Top
The top was built from creating planar patches from a drawn input curve. During paneling, I found it helpful to be able to name the seams, which can be referenced later to weld pieces together in the Vellum drape.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/top1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

In the cloth constraints, I use high stretch and bend stiffness to preserve the overall form. I also have high compression stiffness to retain more fine detail from the wrinkles and folds. I found that if the mesh is able to contract too much, it appears more rubbery instead of cloth-like. When the besh is forced to bend instead of compress, it produces the nice fold detail we'd expect to see.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/top2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/top3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


To keep the top more static for the rest of the drape set up, I use a `Pin to Animation` constraint to pin the top to itself. Since the pieces of the dress are done in an additive manner, this freezes the pieces that are already draped and welded, so that they no longer affect downstream simulations.

It was also good idea to clean up attributes, with the exception of color and `vm_cuspangle` (which ensures consistent normal calculation to avoid unwanted faceting or creasing).


## Frills
To create frills, I create constraints between curved panels and the sleeves of the top.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/frills1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

One issue is that the size of the primitives on the edge of the frill geometry are much larger than the primitives along the border of the sleeve. Trying to constrain them results in jagged edges and primitives.

  <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/frills2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

By using a distance constraint and lowering the `rest length scale` for the primitives along the edges of the frill, I'm able to effectively shrink them and create a smoother transition.


  <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/frills3.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Dress
I use two layers of fabric to create a top and bottom layer. The bottom layer has some more stiffness so it won't distort as much, while the top layer is more free-flowing.

To prevent the cloth from intersecting with the hips of the model itself from the initial pose, I found that I could use "Inflate Collisions" to start the collision geometry smaller and inflate it over time.


  <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/dress1.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


And here is the final dress!

<div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/vellum_dress/dress2.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

When I take the final drape in a Vellum solver for simulation, the most important parts are to attach the neckline and sleeves to the body of the model so that they stay in place.