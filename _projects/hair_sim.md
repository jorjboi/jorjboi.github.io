---
layout: page
title: Hair Simulation
description: Human hair simulation for Houdini using a Vellum solver.
img: assets/img/hair_sim_cover.gif
importance: 1
category: work
related_publications: false
---

<!-- Include MathJax -->
<!-- <script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script> -->

- [Overview](#overview)
- [Results](#results)

## Overview

In this project, I set out to groom and simulate two distinct hairstyles using Vellum tools. Different hair styles require different approaches to simulation, and getting believable hair behavior is tricky! 

## Sleek and Wavy Hair

I create my guides for Vellum simulation using a `Guide Groom` node to plant and sculpt some initial guides, and then `Hair Generate` and `Hair Clump` nodes to generate more guides and get them roughly into the shape of the desired hair. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/sleek1.png" title="Wavy Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Hair guides 
</div>

To allow for variation and more realistic motion, I assigned different Vellum constraints based on the hair layer. Some of the guides taken from the top of the head (to be used for slightly more "frizzy" hairs later on) have a moderate amount of stretch and bend stiffness. The stretch stiffness is still kept high in any case, because we should not expect human hair to stretch in most cases.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/sleek2.png" title="Wavy Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    First set of hair constraints
</div>

The rest of the guides on the bottom layer have a higher stretch stiffness, ensuring that most of the hair shape will not change.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/sleek3.png" title="Wavy Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Second set of hair constraints (stiffer)
</div>

In order to keep the hair from separating into individual stray strands and losing its overall volume during the head turn, I apply glue constraints between the stiffer guides to keep them closer together. However, I leave the very ends of the guides unconstrainted (the last 12 vertices or so) in order to have more freedom on the ends. The ends should have more freedom to separate and change shape.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/sleek4.png" title="Wavy Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Glue constraint between hairs
</div>

From there, I can simulate the guides and use them to generate more hair, create some length and frizz variation on different hairs for realism, and clean them up with a final `Guide Collide VDB`. The rendered results are below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/wavy_hair.gif" title="Wavy Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Wavy sleek hair
</div>

## Afro Hair
The afro hair style presented several challenges, most of which had to do with using different ways to maintain its shape and volume. Unlike the sleek and wavy hair style, its motion is more limited.

Like the first hairstyle, I first create guides with the overall shape of the hair using `Hair Generate` and `Hair Clump` nodes. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/afro1.png" title="Afro Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Hair guides
</div>

Once I have my guides, I use use hair constraint to set the stifftness of the hair. I keep the stretch stiffness high, but found that playing with the bend stiffness of these guides gave interesting results. I settled on a value much larger than the bend stiffness of the sleek and wavy hair, since this is a shorter hair style with coarser hair. 

I also use a "permanent" orientation pin type for `Pin to Animation` vs. a "soft" one, so that the hair remains more pinned the way it's groomed.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/afro2.png" title="Afro Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

I also use a glue constraint between hairs to help the hair hold its volume:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/afro3.png" title="Afro Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<div class="caption">
    Glue constraint
</div>

Unlike the sleek and wave hair style, I found that an additional `Attach to Geometry` constraint here is useful. The hair can't get too close or far from the head here, unlike the sleek and wavy hair style where the hair has more freedom of movement.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/afro4.png" title="Afro Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


<div class="caption">
    Attach to head geometry
</div>


From there, I can simulate the guides and use them in another `Hair Generate` and `Hair Clump` node to create the afro hair below.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hair_sim/afro_hair.gif" title="Afro Hair" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Afro hair
</div>

Now that I've gotten these results, I'm excited to see what else can be achieved with Vellum!

## Resources 
[Denis Zen's Grooming Tutorial](https://www.deniszen.com/groomingtut)

[Andriy Bilichenko Grooming Demo](https://www.youtube.com/watch?v=4Ayo3SR3Iow) 