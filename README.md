# AmaranJS 
Nice, sleek and stylish notifications.

### AmaranJS v1.0.1

If you looking AmaranJS 0.5 (jQuery plugin) checkout this link. With this version AmaranJS do not require jQuery. 

## What is AmaranJS

AmaranJS is yet another notification/alert javascript library. You can create stylish notification with nicely done effects. It is highlt customizable. 

## Installation

Go to dist directory and copy amaran.min.css and amaran.min.js to a new destination , which will be your project home.

```html
<link rel="stylesheet" href="/css/amaran.min.css">
```

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
    <script src="/js/amaran.min.js"></script>
</body>
</html>
```

## Usage

Very basic usage like this;

```javascipt
amaran()
	.content('Hello world, im here!')
	.run();
```

And you can use options with two diffrent ways. First you can chain it like first example or you can pass config object so lets look an example.

If i want to delay notification and make it sticky i can do it like this with first approach;

```javascipt
amaran()
	.content('Hello world, im here!')
	.position('top','left')
	.delay(3000)
	.sticky()
	.run();
```

or i can pass an config object;

```javascipt
amaran({
	content: 'Hello world, im here!',
	position: 'top left',
	delay: 3000,
	sticky: true
}).run();
```

## Options

Here is the full options;

```javascipt
{
	position: 'top right',
	content: 'Hello from amaranjs, you just forget content.',
	in: 'right',
	out: 'right',
	timeout: 3000,
	sticky: false,
	beforeStart: false,
	afterEnd: false,
	onClick: false,
	delay: 100
}
```
