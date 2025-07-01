---
layout: page
title: Snowflake Simulation
description: 3D physically-based snowflake simulation at the mesoscopic scale, implemented in Houdini using VEX.
img: assets/img/snowflake_cover.gif
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
- [Algorthim](#algorithm)
- [Houdini Modeling](#houdini-modeling)
- [Simulation Results](#simulation-results)

## Overview

In Houdini, I implemented a physically-based model to simulate the formuation of snowflakes, following the paper ["Modeling Snow Crystal Growth III: Three-Dimensional Snowfakes"](https://www.math.ucdavis.edu/~gravner/papers/h3l.pdf) by Janko Gravner and David Griffeath. The model works on a mesoscopic scale, or approximately the micron level. This works well for capturing the overall growth patterns of ice crystals without getting bogged down with tracking every water molecule.

They focus on three key factors for snowflake growth: water vapor diffusion, anisotropic attachment of water molecules, and a semi-liquid boudnary layer on the surface of the ice crystal. By adjusting these parameters, this model can produce a wide variety of realistic snowflakes.

The algorithm below was implemented in a SOP solver using VEX.

## Algorithm

The paper's model assumes the basic building cell of an ice crystal is a hexagonal prism, with a height of `1` and a hexagonal base length of `1/√3`. At each site that an ice crystal can attach to $$x$$ and time step $$t$$, we keep track of two quantities: the boundary mass $$b_t(x)$$ and diffusion mass $$d_t(x)$$.

Diffusive mass represents water vapor in the air, and boundary mass reprsents the thin semi-liquid layer at the snowflake's surface that vapor can condense into before freezing into solid ice. Together, they determine whether a cell will attach to the snow crystal (freezing).

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/snowfakes/cells.png" title="Each number represents the number of horizontal and vertial neighbors of each cell, respectively." class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The algorithm is as follows:

#### 1. Diffusion Calculation 
Calculate the diffusion by averaging the vapor diffusion mass among each cell's 6 horizontal neighbors and 2 vertical ones.
 <!-- Note that the final diffusion calculation accounts for vertical drift, which can happen when a snowflake is falling downwards. However, I skip this for my simulations for simplicty and to ensure symmetrical results. -->
 
<!-- $$ d'_t(x) = \frac{1}{7} \sum_{y \in N^T_x} d^\circ_t(y) $$ -->
<!-- Calculate the vertical diffusion, give a slight anisotropic weight to vertical neighbors:  -->
<!-- $$ d''_t(x) = \frac{8}{14} d'_t(x) + \frac{3}{14} \sum_{\substack{y \in N^Z_x \\ y \ne x}} d'_t(y)$$ -->

<!-- The final diffusion step accounts for drift in the vertical direction, which happens if a snowflake is falling downwards: -->

<!-- $$ d'''_t(x) = (1 - \varphi (1 - a_t(x - e_3))) \cdot d''_t(x) + \varphi (1 - a_t(x + e_3)) \cdot d''_t(x + e_3) $$ -->

<!-- I use $$\varphi = 0$$ for my simulations for simplicty and to ensure symmetrical results. -->

#### 2. Freezing   
Using the horizontal and vertical neighbors, calculate the boundary mass at each time step. If the boundary mass of a cell is greater than that of its neighbors, it freezes and we can attach the cell to the ice crystal.

Additionally, we can attach a cell to the crystal if all its horizontal and vertical neighbors are attached, in order to avoid holes and make the surface of the crystal smoother.
<!-- 
$$ n^T_t(x) = \min ( 3, \#\{ y \in N^T_x \mid a_t(y) = 1 \} ) $$
$$ n^Z_t(x) = \min ( 1, \#\{ y \in N^Z_x \mid a_t(y) = 1 \} ) $$ -->

<!-- We use those to calculate the boundary mass and diffusion mass: -->

<!-- $$ b'_t(x) = b^\circ_t(x) + (1 - \kappa(n^T_t(x), n^Z_t(x))) \cdot d^\circ_t(x) $$
$$ d'_t(x) = \kappa(n^T_t(x), n^Z_t(x)) \cdot d^\circ_t(x) $$ -->
<!-- 
If the boundary mass is greater than that of its neighbors, it freezes and we can attach the cell to the ice crystal:

$$ \text{If} b^\circ_t(x) \geq \beta(n^T_t(x), n^Z_t(x)) $$, then cell $$x$$ attaches. -->


#### 3. Metling  
When melting, part of the boundary mass becomes diffusive mass. 

<!-- $$ b'_t(x) = (1 - \mu(n^T_t(x), n^Z_t(x))) \cdot b^\circ_t(x) 
$$
$$ d'_t(x) = d^\circ_t(x) + \mu(n^T_t(x), n^Z_t(x)) \cdot b^\circ_t(x) 
$$ -->


## Houdini Modeling

The initial state is a prism of hexagonal cells in a finite lattice:

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/snowfakes/start.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Starting grid with snowflake seed in center
</div>

Cells belong to one of three groups: `snowflake` (part of the crystal), `boundary` (at the semi-liquid surface layer), or `vapor` (diffuse). A SOP solver tracks the state of each cell and calculates the diffusion, freezing, and melting steps in VEX and applies updates at each iteration.


## Simulation Results

Using parameters provided by the paper, I was able to generate the following result!

<div class="row justify-content-center">
    <div class="col-6 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/snowfakes/snowflake_sim.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Snowflake simulation results
</div>

Notice the realistic snowflake features such as the branched dendrites and ridged plates. This model was a more physics-based approach to snowflake simulation versus a more art-directable one, so while it may not be very useful for a film's snow VFX, it was a fun way for me to learn about VEX and solvers in Houdini.
