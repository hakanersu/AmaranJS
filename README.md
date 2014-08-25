AmaranJS jQuery Notification Plugin
============
Nice, sleek and stylish notifications.

## What is new and What is changed
============

 * Blur Theme ,Rounded Theme and Read More theme removed.
 * All javascript codes ported to coffee and css to sass.
 * [Animate.css](http://daneden.github.io/animate.css/) and options added for alternative css3 effects.


## Installation

Go to dist directory and copy all the folders to a new destination, which will be your project home.

It’s not required, but i recommend placing CSS files in ```<head>``` and JavaScript files and initialization code in the footer of your site (before the closing ```</body>``` tag).

jQuery required for **Amaran JS**.If you already have jquery.js on your site, don’t include it a second time, or use **jQuery.noConflict();** mode

```html
<link rel="stylesheet" href="/css/amaran.min.css">

```
You can add jQuery via Google CDN

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

Place Amaran JS after jQuery

```html
<script src="/js/jquery.amaran.js"></script>
```

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
    <link rel="stylesheet" href="/css/amaran.min.css">
</head>
<body>
    <p>My Content</p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="/js/jquery.amaran.js"></script>
</body>
</html>
```
