---
layout: page
title: Braid Generator
description: Procedural braid generator for Houdini using Lissajous curves.
img: assets/img/braids_cover.gif
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

This Houdini HDA procedurally generates and deforms braids along a user-defined curve. I took a lot of inspiration from Rohan Davi's braid setup to create hair geo and an initial base strand along the curve, but this tool allows for more than 3 strands in the braid and also calculates the transformations of subsequent strands (instead of requiring the user to eye-ball them into place). 

The bulk of the math was taken from the Pixar paper ["Space Rangers with Corn Rows"](https://graphics.pixar.com/library/Cornrows/) by Sofya Ogunseitan and implemented in Houdini using VEX. 

## Results
This tool allows the user to specify the number of strands, the thickness and tightness distribution along the braid, the thickness of individual strands, and the density and frizziness of the hair.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/braids/braids_demo.gif" title="Braids HDA demo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
