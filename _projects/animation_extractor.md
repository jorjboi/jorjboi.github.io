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
- [Simulation Results](#simulation-results)

## Overview
To practice making a digital asset and using Python with Houdini, I made a HDA that extracts the transformations of objects in an Alembic file and turns them into efficient collision objects for simulations.

An Alembic file is efficient for storing detailed 3D animation as baked geometric results. It stores pre-calculated geometry data like vertex positions, but not the procedural setups that generate them. While this makes Alembics efficient and interchangeable across different applications, sometimes this can include hundreds or thousands of pieces that move frame-by-frame.

Using an Alembic file in collision-simulations becomes very slow and computationally expensive. This project identifies pieces of geometry with the same transformation (translation + rotation) in an Alembic file and extracts that transformation to the object-level. Instead of dealing with a full complex deforming mesh, we have rigid bodies with simple transformations instead. This is much more efficient for collisions in DOPs (Houdini's engine for simulating rigid body interactions).

## Rigid Body Detection
