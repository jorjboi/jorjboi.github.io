---
layout: page
title: Animation Extractor
description: Houdini HDA to detect rigid objects from an Alembic file and extract the animation into the object level.
img: assets/img/anim_extractor_cover.gif
importance: 1
category: work
related_publications: false
---

<!-- Include MathJax -->
<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

**Under construction!**

- [Overview](#overview)
- [Rigid Body Detection](#rigid-body-detection)
- [Animation Extraction](#animation-extraction)
- [DOP Network Import](#dop-network-import)


## Overview
To practice making a digital asset and using Python with Houdini, I made a HDA that extracts the transformations of objects in an Alembic file and turns them into efficient collision objects for simulations.

An Alembic file is efficient for storing detailed 3D animation as baked geometric results. It stores pre-calculated geometry data like vertex positions, and sometimes this can include hundreds or thousands of pieces that move frame-by-frame.

While this makes Alembics efficient and interchangeable across different platforms, using an Alembic for collision simulations becomes very computationally expensive. This tool identifies pieces of geometry with the same transformation (translation + rotation) in an Alembic file and extracts that transformation to the object-level. Instead of dealing with a full complex deforming mesh, we have rigid bodies with simple transformations instead. This is much more efficient for collisions in DOPs, Houdini's engine for simulating rigid body interactions.

The repo for this HDA is stored [here](https://github.com/jorjboi/extract_anim).

## Rigid Body Detection
In the first step, I create a Houdini digital asset to procedurally divide an Alembic file into parts based on the transformations of the geometry. I do this by extracting the `packedfulltransform` matrix of each primitive, turning the orientation into a quaternion, and counting how many different orientations there are.

For instance, in this helicopter animation, the three components with distinct transformations are the main body, the main rotor, and the rear rotor.


<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="../assets/img/animation_extractor/heli.png" title="Helicopter components" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Helicopter parts
</div>


## Animation Extractor

In the next step, I create an HDA `extract_anim` to run a callback to a Python script which first object merges an Alembic, and then divides it into separate parts which share the same transformation.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/animation_extractor/animation_extractor.gif" title="Animation extraction process" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Animation extraction process
</div>


## DOP Network Import

The HDA also automates importing the separate parts as collision objects into DOPs. To do this, simply pass in the relative path of a target DOP node.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/animation_extractor/dop_output.gif" title="Import into DOP" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Import into DOP
</div>
 