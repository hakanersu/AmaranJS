#!
# * jQuery AmaranJS Plugin v0.5.5
# * https://github.com/hakanersu/AmaranJS
# *
# * Copyright 2013, 2016 Hakan ERSU
# * Released under the MIT license
# 

(($, window, document, undefined_) ->
    Plugin = (options) ->
        defaults =
          position: "bottom right"
          content: " "
          delay: 3000
          sticky: false
          stickyButton: false
          inEffect: "fadeIn"
          outEffect: "fadeOut"
          theme: "default"
          themeTemplate: null
          closeOnClick: true
          closeButton: false
          clearAll: false
          cssanimationIn: false
          cssanimationOut: false
          resetTimeout: false
          overlay: false
          overlayColor: 'rgba(153,204,51,.9)'

          beforeStart: ->
              
          afterEnd: ->
              
          onClick: ->
              
          wrapper: ".amaran-wrapper"
          
        @config = $.extend({}, defaults, options)
        @config.beforeStart()
        @init()
        @close()
        return
    Plugin:: =
        
       init: ->
            wrapper= null
            wrapperInner = null
            elClass = @config.position.split(" ")
            # Lets create wrapper for amaranjs notification elements.
            # If wrapper not created yet lets create wrapper.
            unless $(@config.wrapper).length
                # Remove dot from wrapper and append position value.
                # Append wrapper to body.
                wrapper = $("<div>",class: @config.wrapper.substr(1, @config.wrapper.length) + " " + @config.position).appendTo("body")
                innerWrapper = $("<div>",class: "amaran-wrapper-inner").appendTo(wrapper)
            else
                # We have wrapper.
                # If our wrapper dont have same positon value
                # it must be another wrapper instance
                unless $(@config.wrapper).hasClass(@config.position)
                    # Append new wrapper to body.
                    wrapper = $("<div>",class: @config.wrapper.substr(1, @config.wrapper.length) + " " + @config.position).appendTo("body")
                    innerWrapper = $("<div>",class: "amaran-wrapper-inner").appendTo(wrapper)
                else
                    # If we have wrapper with same class just set wrapper value to 
                    # current wrapper.
                    wrapper = $(@config.wrapper + "." + elClass[0] + "." + elClass[1])
                    innerWrapper = wrapper.find ".amaran-wrapper-inner"
            #message = (if (typeof (@config.content) is "object") then (if (@config.themeTemplate?) then @config.themeTemplate(@config.content) else themes[@config.theme.split(" ")[0] + "Theme"](@config.content)) else @config.content)

            # Is content is an object ?
            if typeof (@config.content) is "object"
                # Is custom theme setted ?
                if @config.themeTemplate?
                    message = @config.themeTemplate(@config.content)
                else
                    # If there is a theme call function and get html content
                    message = themes[@config.theme.split(" ")[0] + "Theme"](@config.content)
            else
                # If content not an object it must be plain text
                # So lets create an object
                @config.content = {}
                @config.content.message = @config.message
                @config.content.color = "#27ae60"
                message = themes["defaultTheme"](@config.content)
            
            # Create object for element creation
            amaranObject =
                class: (if @config.themeTemplate then "amaran " + @config.content.themeName else (if (@config.theme and not @config.themeTemplate) then "amaran " + @config.theme else "amaran"))
                #html: (if (@config.closeButton) then "<span class=\"amaran-close\" data-amaran-close=\"true\"></span>" + message else message)
                html: @.buildHTML message

            # Clear if clearAll option true
            $(".amaran,.amaran-overlay").remove()  if @config.clearAll
            # Finally lets create element and append to wrapper.
            element = $("<div>", amaranObject).appendTo(innerWrapper)
            @centerCalculate wrapper, innerWrapper  if elClass[0] is "center"
            @animation @config.inEffect, element, "show"
            # OnClick callback
            if @config.onClick
                bu = this
                $(element).css({'cursor':'default'})
                $(element).on "click",(e) ->

                    # Quick fix when clicked close button it must prevent
                    # on click event.Thanks Sibin Xavier to report.
                    if $(e.target).is(".amaran-close") or $(e.target).is('.amaran-sticky')
                        e.preventDefault()
                        return

                    bu.config.onClick()
                    return
            # If its not sticky hide after delay

            # this option must have own method.
            # but for now i'll repeat my self
            if @config.resetTimeout
                bu = this

                $(element).on "mouseenter", ->
                    bu.resetTimeout()

                $(element).on "mouseleave", ->
                    bu.resumeTimeout(element)

            if @config.overlay && $('.amaran-overlay').length<=0
                $('body').prepend('<div class="amaran-overlay" style="background-color:'+@config.overlayColor+'"></div>')    

            if @config.stickyButton
                bu = this

                $(element).find('.amaran-sticky').on 'click', ->
                    if $(this).hasClass('sticky')
                        bu.resumeTimeout element
                        $(this).removeClass 'sticky'
                    else
                        bu.resetTimeout()
                        $(this).addClass 'sticky'

            @hideDiv element  if @config.sticky isnt true
            return

        resetTimeout: ->
            bu = this
            clearTimeout bu.timeout
        
        resumeTimeout: (element) ->
            bu = this
            bu.timeout = setTimeout(->
                    bu.animation bu.config.outEffect, element, "hide"
                , bu.config.delay)   
        
        buildHTML: (message) ->
            if @.config.closeButton
                message = "<span class=\"amaran-close\" data-amaran-close=\"true\"></span>" + message;

            if  @.config.stickyButton
                message = "<span class=\"amaran-sticky\" data-amaran-sticky=\"true\"></span>" + message;

            return message       
              
        centerCalculate: (wrapper,innerWrapper) ->
            totalAmarans = innerWrapper.find(".amaran").length
            totalAmaransHeight = innerWrapper.height()
            topAmaranMargin = (wrapper.height()-totalAmaransHeight)/2
            innerWrapper.find(".amaran:first-child").animate
                "margin-top": topAmaranMargin
            , 200
            return
        # Lets decide which effect we will use    
        animation: (effect, element, work) ->
            return @fade(element, work)  if effect is "fadeIn" or effect is "fadeOut"
            return @cssanimate(element,work) if effect is "show"
            return @slide effect, element, work

        fade: (element,work) ->
            # Fade is easy one
            # if work is show just fadein element
            @.removeOverlay()  
            bu = @
            if work is "show"
                if @.config.cssanimationIn
                    element.addClass('animated '+@.config.cssanimationIn).show()
                else
                    element.fadeIn()
            else
                if @.config.cssanimationOut
                    element.addClass('animated '+@.config.cssanimationOut)
                    element.css
                        "min-height": 0
                        "height": element.outerHeight()
                    element.animate
                        opacity: 0
                    , ->
                        element.animate
                            height: 0
                        , ->
                            #element.remove()
                            bu.removeIt(element)
                            return
                        return
                    return
                else
                    # If work is not show basic fadeOut effect not good for us
                    # we have to set height and when opacity reach 0 we have to set
                    # height 0 otherwise when we remove element other elements seems like jumps down
                    # lets create this effect
                    element.css
                        "min-height": 0
                        "height": element.outerHeight()
                    element.animate
                        opacity: 0
                    , ->
                        element.animate
                            height: 0
                        , ->
                            bu.removeIt(element)
                            #bu.config.afterEnd()
                            return
                        return
                    return

                return
        removeIt: (element) ->
            clearTimeout(@.timeout)
            element.remove()
            wrapper = $(@config.wrapper+"."+@config.position.split(" ")[0]+"."+@config.position.split(" ")[1])
            innerWrapper = wrapper.find ".amaran-wrapper-inner"
            @centerCalculate wrapper, innerWrapper  if @config.position.split(" ")[0] is "center"
            @.config.afterEnd()
                     

            return
        # why this method ?
        # i need elements width for calculation before show
        # i did this function before border-box become popular
        # so i will change this method soon
        getWidth: (el) ->
            # Lets clone the element and get width
            newEl = el.clone().hide().appendTo("body")
            
            # I will try to find better way to calculate this 
            # This is not actual width
            #Right way is newElWidth=newEl.outerWidth()+parseInt(el.css('margin'));
            newElWidth = newEl.outerWidth() + newEl.outerWidth()/2
            # we dont need this element anymote
            newEl.remove()
            return newElWidth
        # For sliding effects i need informantion about
        # element and wrapper position and size.
        getInfo: (element) ->
            # Element offset
            offset = element.offset()
            # Wrapper offset
            wrapperOffset = $(@config.wrapper).offset()
            # Lets set each values for the element and wrapper
            t: offset.top
            l: offset.left
            h: element.height()
            w: element.outerWidth()
            wT: wrapperOffset.top
            wL: wrapperOffset.left
            wH: $(@config.wrapper).outerHeight()
            wW: $(@config.wrapper).outerWidth()
        # Here is the calculations of slide effect
        # Some of them not accurate ill try to fix sometime
        getPosition: (element,effect) ->
            # Lets get info about element
            p = @getInfo(element)
            # where is the element
            parca = @config.position.split(" ")[1]
            # v is our position object
            v = 
                # Slide top calculation
                slideTop:
                    
                    start:
                    
                        top: -(p.wT + p.wH + p.h*2)
                    
                    move:
                        top: 0
                    
                    hide:
                        top: -(p.t+(p.h*2))
                    
                    height: p.h
                slideBottom:
                    
                    start:
                        top: ($(window).height() - p.wH + p.h * 2)
                    
                    move:
                        top: 0
                    
                    hide:
                        top: ($(window).height() - p.wH + p.h * 2)
                    
                    height: p.h
                
                slideLeft:
                    
                    start:
                        left: (if (parca is "left") then -p.w * 1.5 else -$(window).width())
                    
                    move:
                        left: 0
                    
                    hide:
                        left: (if (parca is "left") then -p.w * 1.5 else -$(window).width())
                    
                    height: p.h
                
                slideRight:
                    
                    start:
                        left: (if (parca is "right") then p.w * 1.5 else $(window).width())
                    
                    move:
                        left: 0
                    
                    hide:
                        left: (if (parca is "right") then p.w * 1.5 else $(window).width())
                    
                    height: p.h
                    
            (if v[effect] then v[effect] else 0)
        # We have all effect values from previous method 
        # so lets create slide method
        slide: (effect,element,work) ->
            @.removeOverlay()
            # Get calculated values with given element and effect
            position = @getPosition(element,effect)
            # if just show it is the easy one
            if work is "show"
                element.show().css(position.start).animate position.move
                return
            else
                # Yet again try to prevent jump effect
                bu = this
                element.animate(position.hide , ->
                    element.css
                        "min-height": 0
                        "height": position.height
                    , ->
                        element.html " "
                        return
                    return
                ).animate
                    height: 0
                , ->
                    #element.remove()
                    bu.removeIt(element)
                    #bu.config.afterEnd()
        
        removeOverlay: ->
            if @config.overlay and $('.amaran').length<=1
                $('.amaran-overlay').remove()

        # Lets remove/close element
        close: ->
            bu = this
            # Let closeing with attiribute
            $("[data-amaran-close]").on "click", ->
                bu.animation bu.config.outEffect, $(this).closest("div.amaran"), "hide"
                return
                
            # if closeOnClick and closeButton not setted
            # lets set wrapper
            if not @config.closeOnClick and @config.closeButton
                bu.animation bu.config.outEffect , $(this).parent("div.amaran"), "hide"
                return

            # If closeOnClick setted
            else if @config.closeOnClick
                $(".amaran").on "click", ->
                    bu.animation bu.config.outEffect, $(this), "hide"
                    return

            return
        hideDiv: (element) ->
            bu = this
            bu.timeout=setTimeout (->
                bu.animation bu.config.outEffect, element, "hide"
                return
            ), bu.config.delay           
            return
            
    themes =
        
        defaultTheme: (data) ->
            color = ""
            color = data.color  if typeof (data.color) isnt "undefined"
            "<div class='default-spinner'><span style='background-color:" + data.color + "'></span></div><div class='default-message'><span>" + data.message + "</span></div>"

        awesomeTheme: (data) ->
            "<i class=\"icon " + data.icon + " icon-large\"></i><p class=\"bold\">" + data.title + "</p><p><span>" + data.message + "</span><span class=\"light\">" + data.info + "</span></p>"

        userTheme: (data) ->
            "<div class=\"icon\"><img src=\"" + data.img + "\" alt=\"\" /></div><div class=\"info\"><b>" + data.user + "</b>" + data.message + "</div>"

        colorfulTheme: (data) ->
            color = data.color  if typeof (data.color) isnt "undefined"
            bgcolor = data.bgcolor  if typeof (data.bgcolor) isnt "undefined"
            "<div class='colorful-inner' style='background-color:" + data.bgcolor + ";color:" + data.color + "'>" + data.message + "</div>"

        tumblrTheme: (data) ->
            "<div class=\"title\">"+data.title+"</div><div class=\"content\">"+data.message+"</div>"

    $.amaran = (options) ->
        amaran = new Plugin(options)
        amaran

    $.amaran.close = ->
        $(".amaran-wrapper").remove()
        false
        
) jQuery, window, document
