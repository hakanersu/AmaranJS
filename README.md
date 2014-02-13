###Minimal Setup
Copy amaran folder in to your project folder.

It’s not required, but i recommend placing CSS files in ```<head>``` and JavaScript files and initialization code in the footer of your site (before the closing ```</body>``` tag).

```
<link rel="stylesheet" href="amaran/css/jquery.amaran.min.css">
<link rel="stylesheet" href="amaran/css/themes/all-themes.css">
```


jQuery required for **Amaran JS**.If you already have **jquery.js** on your site, don’t include it a second time, or use **jQuery.noConflict();** mode.

You can add jQuery via Google CDN

```
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
```

Place Amaran JS after jQuery

```
<script src="amaran/js/jquery.amaran.js"></script>
```

So minimalistic setup look like this

```
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
    <link rel="stylesheet" href="amaran/css/jquery.amaran.min.css">
    <link rel="stylesheet" href="amaran/css/themes/all-themes.css">
</head>
<body>
    <p>My Content</p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="amaran/js/jquery.amaran.js"></script>
</body>
</html>
```

###Recomended Setup

I recommend Font Awesome Icons and Open Sans for better looking notifications.Specially for default theme.
Just place these two css files inside your ```<head>``` section.

```
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'>
```
So recomended setup should look like this;

```
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600' rel='stylesheet' type='text/css'> 
    <link rel="stylesheet" href="amaran/css/jquery.amaran.min.css">
    <link rel="stylesheet" href="amaran/css/themes/all-themes.css">
</head>
<body>
    <p>My Content</p>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="amaran/js/jquery.amaran.js"></script>
</body>
</html>
```

###Basic Usage

