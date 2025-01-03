---
layout: page
title: Mesh Editor
description: A tool to create a mesh out of a Bezier surface, upsample with loop subdivision, and visualize Phong shading and environment mapping.
img: assets/img/meshedit_gif.gif
importance: 2
category: work
giscus_comments: true
related_publications: false
---

- [Overview](#overview)
- [Bezier Patches](#bezier-patches)
- [Smooth Shading](#smooth-shading)
- [Edge Flip](#edge-flip)

## Overview

This project explored the geometry of 3D modeling by creating a tool that can display and make simple edits to a COLLADA mesh file. It can tessellate a Bezier surface and upsample a mesh, and implements Phong shading and environment mapping. 

I can also use my program to load and shade a custom model that I created in the open-source 3D computer graphics and animation software, Blender!

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/teapot_header.png" title="teapot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br/><br/>


## Bezier Patches

Given a 4-by-4 grid of Bezier control points, I can evaluate all points on the corresponding bicubic Bezier patch using the Bernstein polynomials of degree 3. A Bezier surface can be represented as a continuous set of Bezier curves, parametrized by `(u, v)` coordinates in the range `[0, 1] x [0, 1]`.

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/bezier_patch.png" title="bicubic bezier patch" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br/><br/>

A 9 x 9 grid of evenly spaced `(u, v)` coordinates were used as sample points to evaluate our Bezier surface. The resulting vectors were then taken 3 at a time to tesselate the surface using triangles. Here, we evaluate the Bezier surface for a teapot mesh.

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/tesselated_teapot.png" title="bicubic bezier patch" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br/><br/>

## Smooth Shading

To implement smooth shading, I need to compute the area-weighted average normal for each vertex, which requires iterating through the vertex’s neighboring vertices. We can perform this traversal by using the halfedge data structure for mesh representation.

<br/><br/>
<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/mesh_editor/halfedge_diagram.png" title="halfedge structure" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pathtracer/halfedge_traversal.png" title="traversal" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br/><br/>


A mesh consists of faces, edges, vertices, and halfedges, which tie together all the other elements. We can iterate through the neighboring vertices around a vertex by starting from the twin of a vertex's halfedge (so that it points inwards from a neighbor) and then repeatedly taking the twin of the next halfedge, ignoring faces on the boundary.

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/smoothed_teapot.png" title="smoothed teapot" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Teapot with smooth shading
</div>
<br/><br/>


## Edge Flip

I implement functionality to flip a non-boundary edge in a mesh. Flipping edge cb in the diagram below should create a new edge ad, and give us triangles adc and abd.

This process starts with identifying all elements in the original mesh of a pair of triangles: 6 half-edges, 2 faces, 5 edges, and 4 vertices. We then systematically set the pointers for these elements to their new values (after the edge flip is complete). This operation doesn’t create or destroy any new mesh elements.

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/edge_flip_diagram.png" title="edge flip diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<br/><br/>

This process starts with identifying all elements in the original mesh of a pair of triangles: 6 half-edges, 2 faces, 5 edges, and 4 vertices. We then systematically set the pointers for these elements to their new values (after the edge flip is complete). This operation doesn’t create or destroy any new mesh elements.

<br/><br/>
<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/mesh_editor/diagonal_edge_flip.png" title="diagonal edge flip" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/pathtracer/vertical_edge_flip.png" title="vertical edge flip" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Diagonal and vertical edge flips
</div>
<br/><br/>

<br/><br/>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/mesh_editor/multiple_edge_flip.png" title="multiple edge flips" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Multiple edge flips
</div>
<br/><br/>

## Edge Split






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

You can also put regular text between your rows of images.
Say you wanted to write a little bit about your project before you posted the rest of the images.
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
