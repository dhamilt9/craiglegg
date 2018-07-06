

$(document).ready(function() {

  function DayDiff(CurrentDate)
  {
  	var TYear=CurrentDate.getFullYear();
          var TDay=new Date("September, 22, 2018");
          TDay.getFullYear(TYear);
          var DayCount=(TDay-CurrentDate)/(1000*60*60*24);
          DayCount=Math.round(DayCount);
      return(DayCount);
  }

  var Today 	= new Date();
  var z1 = DayDiff(Today);

  $('#daynumber').text(z1);


  var slider = $('#crewSlide').clone();
  var img1 = "images/craiglegg3.jpg";

  var soundlock=0;

  if (screen.height>screen.width){
    portraitmode();
  }

  $( window ).on( "orientationchange", function( event ) {
    if (screen.height>screen.width){
      landscapemode();
    }else{
      portraitmode();
    }
  });

  $( '#m3' ).hover(
    function(){
      $( '#dropdown' ).stop().slideDown();
    }, function(){
      $( '#dropdown' ).stop().slideUp();
    }
  );
  $( window ).resize(function() {
    if (screen.height>screen.width){
      portraitmode();
    }else{
      landscapemode();
    }
    if ($('#menu2').position().top!=0){
      $('#menu2').css("top",$('#headerImg').height());
    }
  });
  var sspeed;
  sspeed=700;

  $('.crewImg').hover(
    function(){
      if (!($(this).hasClass('activeCrew'))){
        $(this).parent().parent().find('.activeCrew').removeClass('activeCrew');
        $(this).addClass('activeCrew');
      }
    },
    function(){
    }
  );
  $( '.crewcat').hover(
    function(){
      $(this).css({'color':'black'});
      $(this).find('img').first().addClass('activeCrew');
    },function(){
      $(this).removeAttr('style');
      $(this).find('.activeCrew').removeClass('activeCrew');
    }
  )

  $( '.crewImg' ).click(
    function(){
      $(document).find('.clicked').removeClass("clicked");
      $(this).addClass("clicked");
      $(document).find('.activeCrew').removeClass('activeCrew');
      var qName = $(this).data('name');
      var qPos = $(this).data('position');
      var qSrc = $(this).attr('src');
      var qQuote = $(this).data('quote');
      slideDiv(qName, qPos, qSrc, qQuote);
    }
  )

  $( '.crewcat').click(
    function(){
      $(document).find('.clicked').removeClass("clicked");
      $(this).find('.activeCrew').addClass("clicked");
      var qName = $(this).find('.activeCrew').data('name');
      var qPos = $(this).find('.activeCrew').data('position');
      var qSrc = $(this).find('.activeCrew').attr('src');
      var qQuote = $(this).find('.activeCrew').data('quote');
      slideDiv(qName, qPos, qSrc, qQuote);
    }
  ).children().find('img').click(function(e){
    return false;
  });

  $('.textbutton').click(
    function(){
      if ($(this).next().prop("checked")==true && $(this).next().attr('type')=='checkbox'){
        $(this).next().prop( "checked", false);
      }else{
        $(this).next().prop( "checked", true );
      }
    }
  );

  $( '.crewcat' ).click(
    function(){
      $( '.active2' ).removeClass('active2');
      $(this).addClass('active2');
    }
  );

  $('.slidetogglr').click(
    function(){
      if ($('input:radio[value=yesattending]').is(':checked')){
        $('#campbox').prop('checked', true);
        $('#formslidedown').slideDown();
      }else{
        $('#campbox').prop('checked', false);
        $('#formslidedown').slideUp();
      }
    }
  )

  $('form').submit(function(event) {
    $('#radiobuttons').removeAttr('style');
    $('#radiobuttons2').removeAttr('style');
    $('input[name=name]').removeAttr('style');

    var attend;
    var camp

    if ($('input[name=camp]').prop('checked')){
      camp=true;
    }else{
      camp=false;
    }

    event.preventDefault();
    var formData = {
      'name'              : $('input[name=name]').val(),
      'attend'            : $('input:radio[name=attending]:checked').val(),
      'transportation'    : $('input:radio[name=transportation]:checked').val(),
      'camp'              : camp,
      'songreq'           : $('input[name=songreq]').val(),
      'other'             : $('textarea[name=other]').val()
    };

    console.log(formData);
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : 'rsvp.php', // the url where we want to POST
        data        : formData, // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        encode      : true
    }).done(function(data) {
      if (data.hasOwnProperty('errors')){
        if (data.errors.hasOwnProperty('name')){
          $('input[name=name]').css("border", "4px solid red");
        }
        if (data.errors.hasOwnProperty('transportation')){
          $('#radiobuttons').css("backgroundColor", "red");
        }
        if (data.errors.hasOwnProperty('attend')){
          $('#radiobuttons2').css("backgroundColor", "red");
        }
      }else{
        $('#rsvpform').slideToggle();
        $('#personname').text($('input[name=name]').val().split(" ")[0]);
        if ($('input:radio[name=attending]:checked').val()=="yesattending"){
          $('#personmessage').text("We can't wait to see you!");
        }
        else{
          $('#personmessage').text("We're sorry you can't make it!");
        }
        $('#thankyou').slideToggle();
      }
    });
  });

  var targetmenu=[$('#m0'), $('#m1'), $('#m2'), $('#m3'), $('#m4'), $('#m5')];

  $('#fullpage').fullpage({

    sectionsColor: ['#fffff', '#c65a67', '#626085', '#c190bf', 'rgb(252,248,148)', '#626085'],

    anchors: ['', 'home', 'crew', 'logistics', 'registry', 'rsvp'],

    menu: '#menu',

    scrollingSpeed: sspeed,

    afterLoad: function(){
      soundlock=0;
    },

    normalScrollElements: '#element1',

    onLeave: function(index, nextIndex, direction){
      var targetNumber = nextIndex-1;


      if (index == 1 && nextIndex != 2){
        setInterval(function(){
          var window_top=$(window).scrollTop();
          var div_top = $('#nav-anchor').offset().top;
          if (window_top > div_top){
            $('#menu2').prependTo("body");
            $('#menu2').css("top","0px");
          }
        }, 1);
      }
      if (index == 2 && direction == 'down'){
        $('#menu2').prependTo("body");
        $('#menu2').css("top","0px");
        $('#m1').animate({'backgroundColor':'rgba(0,0,0,.2)'}, 'fast', function(){
              $('#m1').removeClass('active');
              $('#m1').removeAttr('style');
            });
        targetmenu[targetNumber].animate({'backgroundColor':'rgba(0,0,0,0)'}, 'fast', function(){
              targetmenu[targetNumber].addClass('active');
              targetmenu[targetNumber].removeAttr('style');
            });
      }
      else if (index==2 && direction == 'up'){
        $('#menu2').prependTo('#fullpage');
        $('#menu2').css("top",$('#headerImg').height());
        $('#m1').animate({'backgroundColor':'rgba(0,0,0,.2)'}, 'fast', function(){
              $('#m1').removeClass('active');
              $('#m1').removeAttr('style');
            });
      }else{
        targetmenu[targetNumber].addClass("active");
        targetmenu[index-1].removeClass("active");
      }
      if ((nextIndex!==index+1 || nextIndex!==index-1) && nextIndex!==5){
        soundlock=1;
      }
      if (index == 1 && nextIndex != 2){
        setInterval(function(){
          var window_top=$(window).scrollTop();
          var div_top = $('#nav-anchor').offset().top;
          if (window_top > div_top){
            $('#menu2').prependTo("body");
            $('#menu2').css("top","0px");
          }
        }, 1);
      }
      if (index==1 && direction=='down'){
        $('#m1').removeAttr('style');
        $('#dropdown').css({'top':'100%','bottom':'auto'});
      }
      if (index == 2 && direction == 'down'){
        $('#menu2').prependTo("body");
        $('#menu2').css("top","0px");
      }
      else if (index==2 && direction == 'up'){
        $('#menu2').prependTo('#fullpage');
        $('#menu2').css("top",$('#headerImg').height());
        $('#dropdown').css({'top':'auto', 'bottom':'5vw'});
      }
    },
  });
});

function portraitmode(){
  $('.imgClass').css({'width':'38vmin'});
  $('.midTxt').css({'font-size':'3vmin'});
  $('.column').css({'font-size':'2.8vmin'});
  $('.crewLabel').css({'font-size':'2.8vmin'});
  // console.log("Switching to P");
  // $('.column').css({'width':'100%', 'height':'50%'});
  // $('.breaker').hide();
  // $('.smaller').css('width', '70%');
}

function landscapemode(){
  $('.imgClass').removeAttr('style');
  $('.midTxt').removeAttr('style');
  $('.column').removeAttr('style');
  $('.crewLabel').css({'font-size':'2.8vmin'});
  // console.log("Switching to L");
  // $('.txtClass').css({'width':'100%'});
  // $('.column').css({'width':'45%', 'height':'', 'font-size':''});
  // $('.breaker').show();
  // $('.smaller').css('width', '50%');
};

function slideDiv(name, position, imgSrc, quote){
  $('#crewSlide').fadeOut('fast', function() {
    $('#crewSlide').find('#crewName').text(name);
    $('#crewSlide').find('#crewPosition').text(position);
    $('#crewSlide').find('#crewImg').attr("src",imgSrc);
    $('#crewSlide').find('#crewQuote').text(quote);
    $('#crewSlide').fadeIn('fast');
  });
}
