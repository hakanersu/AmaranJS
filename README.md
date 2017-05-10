AmaranJS jQuery Notification Plugin
============
Nice, sleek and stylish notifications.

[Demo & Documentation](http://www.amaranjs.com/) 

You can check [AmaranJS v.1.0.1](https://github.com/hakanersu/AmaranJS/tree/amaran%40v2), with this version amaranjs no longer requires jquery and most of the animations moved to css animations.

## What is new and What is changed


 * Blur Theme ,Rounded Theme and Read More theme removed.
 * All javascript codes ported to coffee and css to sass.
 * [Animate.css](http://daneden.github.io/animate.css/) and options added for alternative css3 effects.

## Some Features

Here is the some basic features of AmaranJS.But i  recommend that review the examples and check demos.

 * Easy notification creation.
 * Unique notification animations.
 * Included stylish themes.
 * Easily adapt your own themes.
 * Callbacks

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
So minimalistic setup look like this

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

### Optional Steps

 * Awesome theme uses fontawesome if you want to use  awesome theme you have to include fontawesome.

```html
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
```
 * If you want to use [Animate.css](http://daneden.github.io/animate.css/) effects you have to include [Animate.css](http://daneden.github.io/animate.css/) . [Animate.css](http://daneden.github.io/animate.css/) already included dist/css folder.
 
```html
<link rel="stylesheet" href="/css/animate.min.css">
```
## Usage
AmaranJS included 4 theme (for now).

Very basic usage ,not include any theme.
```javascript
$(function(){
    $.amaran({'message':'My first example!'});
});
```
If you want to use included themes , you have to pass content object with desired fields.

Awesome theme usage.

```javascript
$.amaran({
    content:{
        title:'My first funcy example!',
        message:'1.4 GB',
        info:'my_birthday.mp4',
        icon:'fa fa-download'
    },
    theme:'awesome ok'
});

```


