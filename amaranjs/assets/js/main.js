$(function(){
	 $.amaran({
      content:{
            message:'Welcome to AmaranJS',
            size:'I hope you like it!',
            file:'',
            icon:'fa fa-heart'
           },
      position:'top right',
      inEffect:'slideTop',
      outEffect:'slideRight',
      theme:'default error'
    });   
   $('nav').onePageNav({
    currentClass: 'current',
    changeHash: true,
    scrollSpeed: 750,
    scrollOffset: 0,
    scrollThreshold: 0.5,
    filter: '',
    easing: 'swing',
  });
   function path()
  {
    var args = arguments,
      result = []
      ;
       
    for(var i = 0; i < args.length; i++)
      result.push(args[i].replace('@', 'assets/js/syntaxhighlighter/'));

    return result
  };
   SyntaxHighlighter.autoloader.apply(null, path(
    'applescript            @shBrushAppleScript.js',
    'actionscript3 as3      @shBrushAS3.js',
    'bash shell             @shBrushBash.js',
    'coldfusion cf          @shBrushColdFusion.js',
    'cpp c                  @shBrushCpp.js',
    'c# c-sharp csharp      @shBrushCSharp.js',
    'css                    @shBrushCss.js',
    'delphi pascal          @shBrushDelphi.js',
    'diff patch pas         @shBrushDiff.js',
    'erl erlang             @shBrushErlang.js',
    'groovy                 @shBrushGroovy.js',
    'java                   @shBrushJava.js',
    'jfx javafx             @shBrushJavaFX.js',
    'js jscript javascript  @shBrushJScript.js',
    'perl pl                @shBrushPerl.js',
    'php                    @shBrushPhp.js',
    'text plain             @shBrushPlain.js',
    'py python              @shBrushPython.js',
    'ruby rails ror rb      @shBrushRuby.js',
    'sass scss              @shBrushSass.js',
    'scala                  @shBrushScala.js',
    'sql                    @shBrushSql.js',
    'vb vbnet               @shBrushVb.js',
    'xml xhtml xslt html    @shBrushXml.js'
  ));
  SyntaxHighlighter.all();

  $('#doce-1').click(function(){
    $.amaran({'content':'My first example!'});   
  });
  $('#doce-2').click(function(){
    $.amaran({
        content:{
            message:'My first funcy example!',
            size:'1.4 GB',
            file:'my_birthday.mp4',
            icon:'fa fa-download'
        },
        theme:'default ok'
    });   
  });
  $('#doce-3').click(function(){
      $.amaran({
            content:{
                message:'<h2>Updates are avalaible for your PC</h2><p>Go to Windows Update to install updates!</p>',
                buttons:'<a href="http://google.com">Install</a><a href="#" class="amaran-close-all" onclick="return $.amaran.close()">Close</a>',
                background:'#8C0095'
            },
            position:'center center',
            theme:'metro',
            sticky:true,
            clearAll:true
        });
  });
   $('#doce-4').click(function(){
      $.amaran({
            content:{
                message:'<h2>Updates are avalaible for your PC</h2><p>Go to Windows Update to install updates!</p>',
                buttons:'<a href="http://google.com">Install</a><a href="#" class="amaran-close-all" onclick="return $.amaran.close()">Close</a>',
                background:'#34D159'
            },
            position:'center center',
            theme:'metro',
            sticky:true,
            clearAll:true
      });
  });
   $('#doce-5').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          delay:10000
      });
   });
   $('#doce-6').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          sticky:true
      });
   });
   $('#doce-7').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          closeOnClick:false
      });
   });
   $('#doce-8').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          closeButton:true
      });
   });
   $('#doce-9').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          clearAll:true
      });
   });
   $('#doce-10').click(function(){
      $( "#doce-2" ).trigger( "click" );
      $( "#doce-8" ).trigger( "click" );
      $( "#doce-7" ).trigger( "click" );
      $( "#doce-6" ).trigger( "click" );
      $( "#doce-5" ).trigger( "click" );
   });
   $('#doce-11').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          delay:10000
      });
   });
   $('#doce-12').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          inEffect:'slideLeft',
          delay:10000
      });
   });
   $('#doce-13').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          inEffect:'slideRight',
          delay:10000
      });
   });
  $('#doce-14').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          inEffect:'slideTop',
          delay:10000
      });
   });
   $('#doce-15').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          inEffect:'slideBottom',
          delay:10000
      });
   });


  $('#doce-16').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          delay:10000
      });
   });
    $('#doce-17').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          outEffect:'slideLeft',
          delay:10000
      });
   });
   $('#doce-18').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          outEffect:'slideRight',
          delay:10000
      });
   });
  $('#doce-19').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          outEffect:'slideTop',
          delay:10000
      });
   });
   $('#doce-20').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          outEffect:'slideBottom',
          delay:10000
      });
   });




   $('#doce-21').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          position:'bottom right',
          delay:10000
      });
   });
   $('#doce-22').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          position:'bottom left',
          delay:10000
      });
   });
   $('#doce-23').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          position:'top right',
          delay:10000
      });
   });
   $('#doce-24').click(function(){
      $.amaran({
          content:{
              message:'Your Download is Ready!',
              size:'1.4 GB',
              file:'my_birthday.mp4',
              icon:'fa fa-download'
          },
          theme:'default ok',
          position:'top left',
          delay:10000
      });
   });
});