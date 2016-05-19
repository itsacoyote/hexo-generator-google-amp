# hexo-generator-google-amp

[Hexo](https://hexo.io/) plugin to generate Google AMP project amp files for posts.

## Download
You're welcome to download and use for your own personal projects. It is specifically designed for my own personal blog so the amp template will require some modification to fit your needs.

## Google Amp Project
Learn more about the [Google AMP Project](https://www.ampproject.org/)

## Usage

Add the tag below in the head file for your theme template. This is required for the canonical url to link between the regular html page and the amp page. It currently only generates amp pages for posts, not pages.

```
  <% if (is_post()) { %>
    <%- googleAmpsCanonical(config, page) %>
  <% } %>
```

AMP files will be generated under the same directory alongside with the post with an amp.html extension.
