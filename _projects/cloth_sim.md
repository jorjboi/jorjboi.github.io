---
layout: page
title: Cloth Simulation
description: Cloth simulation using a point mass-spring system, along with various GLSL shaders. 
img: assets/img/clothsim_sphere.gif
importance: 3
category: work
related_publications: false
---

<!-- Include MathJax -->
<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

Under construction!

- [Overview](#overview)
- [Mass-Spring System](#mass-spring-system)
- [Numerical Integration](#numerical-integration)


## Overview

Cloth can be simulated with a 2D grid of point masses connected by springs, as outlined in this [1995 SIGGRAPH paper](https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S14/papers/provot_cloth_simulation_96.pdf). The motion of each mass is governed by the net force from external forces (e.g. gravity) and internal spring forces. The position of each mass at any point in time can be found using the laws of motion and numerical integration techniques.

Here, I implement this mass-spring system and accelerate neighbor detection and collision handling with spatial hashing. I also implement several GLSL shaders to texture the cloth with different effects.

## Mass-Spring System

Our model for the cloth is an m x n grid of identical masses connected by massless springs. There are 3 different types of spring constraints:


1. Structural constraints exist between a mass `[i, j]` and masses `[i + 1, j]` and `[i, j + 1]`. They help define the topology of the cloth and simulate “stretching” stresses on the cloth.
2. Shearing constraints exist between a mass `[i, j]` and masses `[i - 1, j - 1]` and `[i - 1, j + 1]`. They help prevent excessive shearing deformation and prevent the grid from collapsing entirely onto one side. 
3. Flexion constraints exist between a mass `[i, j]` and masses `[i + 2, j]` and `[i, j+ 2]`. They simulate smooth “bending” on the cloth and prevent the grid from folding perfectly onto itself like an infinitely thin sheet of paper.

## Numerical Integration
The total force acting on a mass at any instant can be found by first applying any external forces and then the forces from the spring constraints. I do this by looping over all the springs and calculating the force a spring exerts on the masses at either end using Hooke’s Law: 

$$ F_s = k_s * (\| p_a - p_b \| - l) $$
 

