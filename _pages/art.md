---
layout: page
permalink: /art/
title: art
description: Under construction!
nav: true
nav_order: 3
---

<style>
  .art-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 40px 0;
  }

  .art-row {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
  }

  .art-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .art-item img {
    height: auto;
    max-height: 500px;
    max-width: 100%;
    width: auto;
    margin-bottom: 10px;
  }

  .art-item h3 {
    font-size: 1.2em;
    margin: 0;
  }

  .art-item p {
    font-size: 0.9em;
    color: #666;
  }

  .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
  }

  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>

<article>
  <!-- Row with 1 item -->
  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/wedding.jpg" alt="Artwork 1">
    </div>
  </div>

  <!-- Row with 2 items -->
  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/mav-min.jpg" alt="Artwork 2">
    </div>
    <div class="art-item">
      <img src="/assets/img/art/jbrekkie.jpg" alt="Artwork 3">
    </div>
  </div>

  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/late_nighters.gif" alt="Artwork 1">
    </div>
  </div>

  <!-- Row with 3 items -->
  <!-- <div class="art-row">
    <div class="art-item">
      <img src="/path/to/art4.jpg" alt="Artwork 4">
    </div>
    <div class="art-item">
      <img src="/path/to/art5.jpg" alt="Artwork 5">
    </div>
    <div class="art-item">
      <img src="/path/to/art6.jpg" alt="Artwork 6">
    </div>
  </div> -->

    <section class="art-section" id="film">
      <h2>Film</h2>
      <div class="video-container">
        <!-- Embed your video here -->
        <iframe width="560" height="315" src="https://www.youtube.com/embed/8dKbrDJAVrU?si=625nRcwo0GzEU_xl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </section>
  </article>
</div>


<!-- 
For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like! -->
