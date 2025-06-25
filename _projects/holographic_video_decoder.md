---
layout: page
title: Holographic Video Decoder
description: A decoder for streaming lightfield-video with 6 degrees of freedom.
img: assets/img/ralphie_demo.gif
importance: 2
category: work
related_publications: false
---

## Overview

At Visby, a startup I joined from 2018 to 2020, we were researching a potential codec for live-captured holographic video, or video with 6 degrees of freedom using [light fields](https://graphics.stanford.edu/papers/light/).

I worked on the decoder side, which loads encoded light field video data from disk, renders each frame of the video based on the viewer’s position and orientation at any given moment, and serves it to a 3D spatial display (such as a VR headset or a [Looking Glass display](https://lookingglassfactory.com/16-spatial-oled)) at a target rate of 30 FPS.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/decoder/pipeline.svg" title="Decoder pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Other things I worked on included designing an ETL system for collecting data on internal metrics, porting our experience into Unity, and assisting with the creation of an API for a partner company.
 
Some technologies I had to become familiar with on the fly included ffmpeg, libjpeg, SIMD and multithreading, and CUDA.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/decoder/ralphie_hologram.gif" title="Ralphie the Havanese" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Ralphie the Havanese
</div>

