$(document).ready(function() {
  ad_not();
  function ad_not(){
    //alert("hii");
    $.ajax({
      url:'/get_trans_data/',
      datatype:"JSON",
      success:function(data){
        if(data!= "none" || data!="error"){
        $(".adtab").empty();
        var tr=$("<tr class='table-dark'/>");
        tr.append("<th scope='col'>User Name</th>");
        tr.append("<th scope='col'>User Mail</th>");
        tr.append("<th scope='col'>Book id</th>");
        tr.append("<th scope='col'>Book Name</th>");
        tr.append("<th scope='col'>Date</th>");
        tr.append("<th scope='col'>Status</th>");
        tr.append("<th scope='col'>Approve/Reject</th>");
        $(".adtab").append(tr);
        for(i=0;i<data.data2.length;i++){
          var ro=$("<tr/>");
          ro.append("<td><input class='tid' value="+data.data2[i].pk+" hidden></input>"+data.data2[i].fields.uname+"</td>");
          ro.append("<td>"+data.data2[i].fields.uid+"</td>");
          ro.append("<td>"+data.data2[i].pk+"</td>");
          ro.append("<td>"+data.data2[i].fields.bname+"</td>");
          ro.append("<td>"+data.data2[i].fields.tdate+"</td>");
          if(data.data2[i].fields.status=="approved")
          ro.append("<td class='sta' style='color:green;'>"+data.data2[i].fields.status+"</td>");
          else
          ro.append("<td class='sta' >"+data.data2[i].fields.status+"</td>");
          if(data.data2[i].fields.status == "pending")
          ro.append("<td><button type='button' class='btn btn-outline-success app' style='margin-right:5px';>Approve</button><button type='button' class='btn btn-outline-danger rej'>Reject</button></td>");
          $("#atable").append(ro);
        }

      }
      }
    });
  }

  $(document).on("click",".app",function(){
    var r=$(this).closest("tr");
    var tid=r.find(".tid").val();
    //alert(tid);
    $.ajax({
    url:'/status_update/',
    datatype:"JSON",
    data:{
      "tid":tid,
      "bstatus":"approved",
    } ,
    success:function(d){
    alert(d);
    if(d=="success")
    window.location.reload();
    }
    });
  });

  $(document).on("click",".rej",function(){
    var ro=$(this).closest("tr");
    var tid=ro.find(".tid").val();
    $.ajax({
    url:'/status_update/',
    datatype:"JSON",
    data:{
      "tid":tid,
      "bstatus":"rejected"
    } ,
    success:function(d){
    alert(d);
    if(d=="success")
    window.location.reload();
    }
    });

  })







  //Logout
  $(".in").blur(function() {
    if ($(this).val() == "") {
      $(this).attr("placeholder", "required feild");
      $(this).addClass("inpv");
    }

  });

$(".alout").click(function() {
  window.location.href = 'http://127.0.0.1:8000/';
});
$(".ab").click(function() {
  //alert("hii");
  $("#abmodal-wrapper").css("display", "block");
  $.ajax({
    url: "/get_cat/",
    datatype: "JSON",
    success: function(data) {
      for (i = 0; i < data.data1.length; i++) {
        $("#bcat").append("<option>" + data.data1[i].fields.bcats + "</option>")
      }
    }
  });
});
$(".mb").click(function() {
  //alert("hii");
  $("#mbmodal-wrapper").css("display", "block");
  $.ajax({
    url: "/get_cat/",
    datatype: "JSON",
    success: function(data) {
      for (i = 0; i < data.data1.length; i++) {
        $("#mbcat").append("<option>" + data.data1[i].fields.bcats + "</option>")
      }
    }
  });
  //getting book id
  $.ajax({
    url: "/get_book/",
    datatype: "JSON",
    success: function(data) {
      for (i = 0; i < data.data2.length; i++) {
        $("#mbid").append("<option>" + data.data2[i].pk + "</option>")
      }
    }
  });

});
$(".mc").click(function() {
  //alert("hii");
  $("#mcmodal-wrapper").css("display", "block");
  $.ajax({
    url: "/get_cat/",
    datatype: "JSON",
    success: function(data) {
      for (i = 0; i < data.data1.length; i++) {
        $("#mcid").append("<option>" + data.data1[i].pk + "</option>")
      }
    }
  });
});
$(".ac").click(function() {
  //alert("hii");
  $("#acmodal-wrapper").css("display", "block");
});

$(".us").click(function() {
  //alert("hii");
  $("#abmodal-wrapper").css("display", "none");
  $("#mbmodal-wrapper").css("display", "none");
  $("#acmodal-wrapper").css("display", "none");
  $("#mcmodal-wrapper").css("display", "none");
  window.location.reload();
});
//adding new category
$(".addcat").click(function() {
  var cid = $("#cid").val();
  var cname = $("#cname").val();
  var cdesc = $("#cdesc").val();
  if (cid == "" || cname == "" || cdesc == "") {
    alert("fill all the deatails");

  } else {
    $.ajax({
      url: '/add_cat/',
      datatype: "JSON",
      data: {
        "cid": cid,
        "cname": cname,
        "cdesc": cdesc
      },
      success: function(d) {
        if (d == "success") {
          alert("added");
          $("#cid").val("");
          $("#cname").val("");
          $("#cdesc").val("");
        } else {
          alert(d);
        }
      }
    });
  }
});
//list category details based on id
$("#mcid").change(function() {
  var opt = $("#mcid").val();
  //alert(opt);
  if (opt != "select id") {

    $.ajax({
      url: '/cat_det/',
      datatype: 'JSON',
      data: {
        "bcid": opt,
      },
      success: function(a) {
        //alert(a);
        $("#mcname").val(a[0]);
        $("#mcdesc").val(a[1]);
      }
    });
  }
});
// list book detail based on // ID
$("#mbid").change(function() {
  var opt1 = $("#mbid").val();
  if (opt1 != "select book id") {
    $.ajax({
      url: '/book_det/',
      datatype: 'JSON',
      data: {
        "bid": opt1,
      },
      success: function(a) {
        if (a != 'error') {
          //alert(a);
          $("#mbname").val(a[0]);
          $("#mbcat").val(a[1]);
          $("#mbauth").val(a[2]);
          $("#mbnum").val(a[3]);
        }
      }
    });
  }
});
//update category
$(".ccat").click(function() {
  var opt = $("#mcid").val();
  var cname = $("#mcname").val();
  var cdesc = $("#mcdesc").val();
  alert(cname);
  if (opt != "select id") {
    $.ajax({
      url: "/change_cat/",
      datatype: "JSON",
      data: {
        "cid": opt,
        "cname": cname,
        "cdesc": cdesc
      },
      success: function(d) {
        alert(d);
        //alert(a);

        $("#mcid").val("select id");
        $("#mcname").val("");
        $("#mcdesc").val("");
      }
    });
  }
});
//update Books
$(".cbook").click(function() {
  //alert("hii")
  var bid = $("#mbid").val();
  var bname = $("#mbname").val();
  var bcat = $("#mbcat").val();
  var bauth = $("#mbauth").val();
  var bnum = $("#mbnum").val();
  if (bid == "" || bname == "" || bcat == "" || bauth == "" || bnum == "") {
    alert("fill all the deatails");

  } else {
    $.ajax({
      url: '/change_book/',
      datatype: "JSON",
      data: {
        "bid": bid,
        "bname": bname,
        "bcat": bcat,
        "bauth": bauth,
        "bnum": bnum,
      },
      success: function(d) {
        if (d == "success") {
          alert("changes saved");
          window.location.reload();
        } else {
          alert(d);
        }
      }
    });
  }

});

//delete books
$(".dbook").click(function() {
  var bid = $("#mbid").val();
  $.ajax({
    url: '/delete_book/',
    datatype: "JSON",
    data: {
      "bid": bid,
    },
    success: function(d) {
      alert(d);
      window.location.reload();
    }
  });
});
//delete category
$(".dcat").click(function() {
  var opt = $("#mcid").val();
  if (opt != "select id") {

    $.ajax({
      url: "/delt_cat/",
      datatype: "JSON",
      data: {
        "cid": opt,
      },
      success: function(d) {
        alert(d);

        $("#mcid").val("select id");
        $("#mcname").val("");
        $("#mcdesc").val("");
      }
    });
  }
});
//adding new books
$(".addbook").click(function() {
var bid = $("#bid").val();
var bname = $("#bname").val();
var bcat = $("#bcat").val();
var bauth = $("#bauth").val();
var bnum = $("#bnum").val();
if (bid == "" || bname == "" || bcat == "" || bauth == "" || bnum == "") {
  alert("fill all the deatails");

}
else {
  $.ajax({
    url: '/add_book/',
    datatype: "JSON",
    data: {
      "bid": bid,
      "bname": bname,
      "bcat": bcat,
      "bauth": bauth,
      "bnum": bnum,
    },
    success: function(d) {
      if (d == "success") {
        alert("added");
        $("#bid").val("");
        $("#bname").val("");
        $("#bcat").val("select id");
        $("#bauth").val("");
        $("#bnum").val("");
      } else {
        alert(d);
      }
    }
  });
}
});
//adding cover Pic
$(".ff").change(function(){
  if($(".ff").val()!="" && $("#bid").val()!="" && $("#bname").val()!="" && $("#bauth").val()!="" && $("#bnum").val()!="" ){
    alert("hii");
  $(".addbtn").attr("disabled",false)
  }
});

//Notification listing




});
