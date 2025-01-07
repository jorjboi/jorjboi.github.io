---
layout: page
permalink: /art/
title: art
description: Under construction!
nav: true
nav_order: 3
---

<style>
  .art-section {
    margin-bottom: 40px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .grid img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .video-container {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
  }

  .video-container video {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <p class="post-description">{{ page.description }}</p>
  </header>

  <article>
    <section class="art-section" id="life-drawing">
      <h2>Life Drawing</h2>
      <div class="grid">
        <!-- Add your images here -->
        <img src="/path/to/life-drawing1.jpg" alt="Life Drawing 1">
        <img src="/path/to/life-drawing2.jpg" alt="Life Drawing 2">
        <img src="/path/to/life-drawing3.jpg" alt="Life Drawing 3">
      </div>
    </section>

    <section class="art-section" id="illustration">
      <h2>Illustration</h2>
      <div class="grid">
        <!-- Add your images here -->
        <img src="/path/to/illustration1.jpg" alt="Illustration 1">
        <img src="/path/to/illustration2.jpg" alt="Illustration 2">
        <img src="/path/to/illustration3.jpg" alt="Illustration 3">
      </div>
    </section>

    <section class="art-section" id="film">
      <h2>Film</h2>
      <div class="video-container">
        <!-- Embed your video here -->
        <video controls>
          <source src="/path/to/your-video.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  </article>
</div>


<!-- 
For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like! -->
