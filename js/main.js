/**
 * main.js
 * http://www.designtheway.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, DesignTheWay
 * http://www.designtheway.com
 */

$(function() {
    var $body = $('body'),
        slides = $('.slide'),
        container = $('#slides ul'),
        elm = container.find(':first-child').prop("tagName"),
        item_width = container.width();

        slides.width(item_width); //set the slides to the correct pixel width
        container.parent().width(item_width);
        container.width(slides.length * item_width); //set the slides container to the correct total width

    var total_item_width = $('#slides ul').width(),
        reset_value = total_item_width - item_width,
        pre_offset = total_item_width - (item_width * 2),

        bgContainer = $('.carousel-background__container'),
        bgElm = bgContainer.find(':first-child').prop("tagName"),

        content = $('.carousel-content ul'),
        conElm = content.find(':first-child').prop("tagName"),

        bulletContainer = $('.carousel-bullets'),
        bulletElm = bulletContainer.find(':first-child').prop("tagName");

    resetSlides();

    // Init function
    function init(){

      // Slide in elements
      TweenLite.set('.slider-features', {className: '+=animate-scroll'});

    }
    init();
    
    
    // Navigation
    $('.carousel-controls button').click(function (e) {
        var whichButton = $(this).data('nav');

        if(!$body.hasClass('is-animating')){

          if (whichButton === 'next') {

              TweenMax.set($body, {className: '+=is-animating'});

              // Preview animation right slide
              TweenMax.set(container.find(elm + ':first'), {opacity: .6});
              TweenMax.to(container, 1, {x: '+=' + item_width, ease: Expo.easeOut,
                onComplete: function(){
                  container.find(elm + ':last').after(container.find(elm + ':first'));
                  resetSlides();
                  container.find(elm + ':last').css("opacity", "1");
                }
              });

              // Background animation right slide
              bgContainer.find(bgElm + ':last').after(bgContainer.find(bgElm + ':first'));
              TweenMax.fromTo(bgContainer, 1, { x: 0}, {x: '+=' + item_width, ease: Expo.easeOut});
              TweenMax.fromTo(bgContainer.find("div:eq(1)"), 1, {opacity: .2}, {opacity: .6, ease: Expo.easeOut}); 
              TweenMax.fromTo(bgContainer.find("div:eq(2)"), 1, {opacity: 0}, {opacity: .2, ease: Expo.easeOut,
                onComplete: function(){
                    bgContainer.find(bgElm + ':last').css("opacity", "0.2");
                }
              }); 

              bullets();
              slider();
          }
          
          if (whichButton === 'prev') {
              TweenMax.set($body, {className: '+=is-animating'});

              // Preview animation left slide
              container.find(elm + ':first').before(container.find(elm + ':last'));
              TweenMax.set(container.find("li:eq(1)"), {opacity: .6});
              TweenMax.fromTo(container, 1, {x: -pre_offset}, {x: '-=' + item_width, ease: Expo.easeOut,
                onComplete: function(){
                  resetSlides();
                  container.find("li:eq(1)").css("opacity", "1");
                }
              });

              // Background animation left slide
              
              TweenMax.to(bgContainer, 1, {x: '-=' + item_width, ease: Expo.easeOut,
                onComplete: function(){
                  bgContainer.find(bgElm + ':first').before(bgContainer.find(bgElm + ':last'));
                  resetSlides();
                  
                }
              });

              TweenMax.fromTo(bgContainer.find("div:eq(1)"), 1, {opacity: .6}, {opacity: .2, ease: Expo.easeOut}); 
              TweenMax.fromTo(bgContainer.find("div:eq(2)"), 1, {opacity: .2}, {opacity: 0, ease: Expo.easeOut,
                onComplete: function(){
                    bgContainer.find(bgElm + ':first').css("opacity", "0.6");
                }
              });

              bullets();
              sliderback();
              
          }
      }
        
    });
     
    
    // Re-setting slides
    function resetSlides() {
      TweenMax.set(container, {x: -reset_value});
      TweenMax.set(bgContainer, {x: item_width});
    }
  
    // Content rotation
    var i=1;

      for(var b=1;b<=$(".carousel-content li").length;b++)

        content.find(conElm + ':first').addClass("show");

        function slider(){

          var l = $(".carousel-content li").length;

          if(i==l){i=0;}

          content.find(".show").addClass("hide");

          setTimeout(hide, 1000);

          i++;

          $(".carousel-content li:nth-child("+i+")").addClass("show");
        }
  
        function sliderback(){

          var l = $(".carousel-content li").length;

          if(i==0){i=l+1;}

          content.find(".show").addClass("hide");

          setTimeout(hide, 1000);

          i--;

          if(i <= 0){i = l;}

          $(".carousel-content li:nth-child("+i+")").addClass("show");
        }    

    // Hide class function
    function hide(){
      content.find(".hide").removeClass("show hide");
      setTimeout(function() {
            TweenMax.set($body, {className: '-=is-animating'});
        }, 500);
    }

    // Bullet animation
    function bullets(){
      bulletContainer.find(bulletElm + ':first').before(bulletContainer.find(bulletElm + ':last'));
      TweenMax.fromTo(bulletContainer, 1, {x: '-=28px'}, {x: '0', ease: Expo.easeOut});
      TweenMax.to(bulletContainer.find(bulletElm + ':first'), 1, {opacity: 1, ease: Expo.easeOut});
      TweenMax.to(bulletContainer.find(bulletElm + ':last'), 1, {opacity: 0, ease: Expo.easeOut});
    }
});
