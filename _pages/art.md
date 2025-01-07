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
    justify-content: center;
    gap: 20px;
    margin: 40px 0;
  }

  .art-item {
    width: calc(33% - 20px);
    max-width: 300px;
    text-align: center;
  }

  .art-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

<div class="post">
  <!-- <header class="post-header">
    <h1 class="post-title">h1>
    <p class="post-description"></p>
  </header> -->

  <article>
    <div class="art-container">
      <div class="art-item">
        <img src="/path/to/art1.jpg" alt="Artwork 1">
        <h3>Title of Artwork 1</h3>
        <p>Short description of artwork 1.</p>
      </div>
      <div class="art-item">
        <img src="/path/to/art2.jpg" alt="Artwork 2">
        <h3>Title of Artwork 2</h3>
        <p>Short description of artwork 2.</p>
      </div>
      <div class="art-item">
        <img src="/path/to/art3.jpg" alt="Artwork 3">
        <h3>Title of Artwork 3</h3>
        <p>Short description of artwork 3.</p>
      </div>
      <!-- Add more items as needed -->
    </div>


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
