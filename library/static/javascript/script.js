$(document).ready(function() {
  $(".in").blur(function() {
    if ($(this).val() == "") {
      $(this).attr("placeholder", "required feild");
      $(this).addClass("inpv");
    }

  });
  //var model= $("#umodal-wrapper");
  //password visibility
  $(".paa").click(function() {
    if ($(".inp").attr("type") == "password" ) {
      $(".inp").attr("type", "text");
      $(".paa").css("color", "#185adb");

    } else {
      $(".inp").attr("type", "password");
      $(".paa").css("color", "#8ab6d6");
    }
  });
  $(".ulog").click(function() {
    //  $(".modal").animate({width="+=400px"});
    //alert("hii");
    $("#umodal-wrapper").css("display", "block");
  });
  $(".alog").click(function() {
    //alert("hii");
    $("#amodal-wrapper").css("display", "block");
  });
  $(".close").click(function() {
    //alert("hii");
    $("#umodal-wrapper").css("display", "none");
    $("#amodal-wrapper").css("display", "none");
    $("#sumodal-wrapper").css("display", "none");

  });

  $(".siup").click(function() {
    $("#sumodal-wrapper").css("display", "block");
  });
  //admin Login
  $(".adm").click(function() {
    //alert("df");
    var aname = $("#aname").val();
    var apword = $("#apword").val();
    //console.log(aname,apword);
    if (aname == "" || apword == "") {
      alert("fill all credentials");
    } else {
      $.ajax({
        url: 'admin_login',
        datatype: 'JSON',
        data: {
          "aname": aname,
          "apword": apword
        },
        success: function(d) {
          alert(d);
          if (d == "success") {
            window.location.href = "/admin_page/";
          } else {
            $("#aname").val("");
            $("#apword").val("");
          }
        }
      });
    }
  });
  //user SignUp
  $(".sup").click(function() {
    var uname = $("#name").val();
    var uage = $("#age").val();
    var umobile = $("#mobile").val();
    var umail = $("#mail").val();
    var upword = $("#password").val();
    if (uname == "" || uage == "" || umobile == "" || umail == "" || upword == "") {
      alert("fill all details");
    } else {
      $.ajax({
        url: "user_reg",
        datatype: "JSON",
        data: {
          "uname": uname,
          "uage": uage,
          "umobile": umobile,
          "umail": umail,
          "upword": upword
        },
        success: function(d) {
          alert(d);
          if(d=="successfully registered"){
            window.location.reload();
          }
        $("#sumodal-wrapper").css("display", "block");

        }
      });
    }
  });
  //user Login
  $(".user").click(function() {
    var umail = $("#umail").val();
    var upword = $("#upword").val();
    if (umail == "" || upword == "") {
      alert("fill all details");
    } else {
      $.ajax({
        url: 'user_log',
        datatype: "JSON",
        data: {
          "umail": umail,
          "upword": upword
        },
        success: function(d) {
          alert(d);
          if (d == "success") {
            window.location.href = "/user_page/";
          } else {
            $("#umail").val("");
            $("#upword").val("");
          }
        }
      });
    }
  });
  //mail validation
  



});
