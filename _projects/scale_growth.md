---
layout: page
title: Scale Growth
description: Scale growth visual effect created in Houdini using VOPs.
img: assets/img/render_scales_cover.gif
importance: 2
category: work
related_publications: false
---

<!-- Include MathJax -->
<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

**Under construction!**

- [Overview](#overview)
- [Process](#process)

## Overview
To become familiar with working with VOPs in Houdini, I created a scale growth effect. I can see the benefits of VOPs over scripting in VEX, especially when effects require some nosie and an art-directable organic quality.

I first use the distance attribute with added noise to drive the growth effect. The growth factor is used to control the `pscale` of the scales over time, causing them to appear. To give the growth a more organic quality, I also add noise to the normals and a spring effect to give it some jiggle.

## Process

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/scale_growth/growth_map.gif" title="raycasting" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


