---
layout: page
permalink: /art/
title: art
description: A collection of films, CGI exercises, illustrations, and life drawings.
nav: true
nav_order: 3
---

<style>
  .art-section {
    display: flex;
    flex-direction: column;
    margin: 100px 0;
  }

  .art-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 10px; /* Minimized gap between images */
    margin-bottom: 20px; /* Controlled space between rows */
  }

  .art-item {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
  }

  .art-item img {
    height: auto;
    max-height: 600px; /* Ensures uniform height */
    width: 100%; /* Ensures full width within the container */
    object-fit: contain; /* Maintain aspect ratio without distorting image */
    margin-bottom: 10px;
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

<section class="art-section" id="film">
      <h2>Film</h2>
      <div class="video-container">
        <!-- Embed your video here -->
        <iframe width="560" height="315" src="https://www.youtube.com/embed/8dKbrDJAVrU?si=625nRcwo0GzEU_xl&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
</section>

<section class="art-section" id="illustration">
    <h2>Illustration</h2>
    <div class="art-row">
        <div class="art-item">
            <img src="/assets/img/art/man_and_dog.jpg" alt="Artwork 1">
        </div>
  </div>
  <div class="art-row">
    <div class="art-item">
            <img src="/assets/img/art/izakaya.jpg" alt="Artwork 2">
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
  <div class="art-row">
     </div>
  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/snowy_woods.jpg" alt="Artwork 1">
    </div>
  </div>
  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/wedding.jpg" alt="Artwork 1">
    </div>
  </div>
</section>


<section class="art-section" id="life-drawing">
    <h2>Life Drawing</h2>
  <div class="art-row">
    <div class="art-item">
            <img src="/assets/img/art/mav-min.jpg" alt="Artwork 2">
    </div>
    <div class="art-item">
            <img src="/assets/img/art/tatted_lifedrawing.jpg" alt="Artwork 3">
    </div>
  </div>

  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/week3_lifedraw.jpg" alt="Artwork 1">
    </div>
  </div>

  <div class="art-row">
    <div class="art-item">
            <img src="/assets/img/art/0.jpg" alt="Artwork 2">
    </div>
    <div class="art-item">
            <img src="/assets/img/art/3.jpg" alt="Artwork 3">
    </div>
  </div>
  <div class="art-row">
    <div class="art-item">
            <img src="/assets/img/art/zoo.jpg" alt="Artwork 2">
    </div>
    <div class="art-item">
            <img src="/assets/img/art/reptiles.jpg" alt="Artwork 3">
    </div>
  </div>

  <div class="art-row">
    <div class="art-item">
      <img src="/assets/img/art/palace_of_fine_arts.jpg" alt="Artwork 1">
    </div>
  </div>
</section>


<section class="art-section" id="CGI">
<h2>CGI</h2>
    <div class="art-row">
        <div class="art-item">
            <img src="/assets/img/art/modeling/day1.jpg" alt="Artwork 1">
        </div>
    </div>
     <div class="art-row">
        <div class="art-item">
            <img src="/assets/img/art/modeling/day2.jpg" alt="Artwork 1">
        </div>
        <div class="art-item">
            <img src="/assets/img/art/modeling/day3.jpg" alt="Artwork 1">
        </div>
        <div class="art-item">
            <img src="/assets/img/art/modeling/day4.jpg" alt="Artwork 1">
        </div>
    </div>
    <div class="art-row">
        <div class="art-item">
            <img src="/assets/img/art/modeling/night3.jpg" alt="Artwork 1">
        </div>
        <div class="art-item">
            <img src="/assets/img/art/modeling/night2.jpg" alt="Artwork 1">
        </div>
    </div>
    <div class="art-row">
        <div class="art-item">
            <img src="/assets/img/art/modeling/drama1.jpg" alt="Artwork 1">
        </div>
        <div class="art-item">
            <img src="/assets/img/art/modeling/drama2.jpg" alt="Artwork 1">
        </div>
    </div>
    <div class="video-container">
      <!-- Embed MP4 video -->
      <video controls preload="metadata" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        <source src="/assets/videos/babies_dont_wear_diapers.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
</section>

</article>

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



<!-- 
For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like! -->
