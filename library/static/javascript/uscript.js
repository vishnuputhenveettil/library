$(document).ready(function() {

//adding category listing
$.ajax({
  url:"/get_cat/",
  datatype:"JSON",
  success:function(data){
    if(data!="no data" || data!="error" ){
      for (i = 0; i < data.data1.length; i++) {
        $("#boocat").append("<option>" + data.data1[i].fields.bcats + "</option>")
      }
    }
  }
});


  $(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();
      var user;
      var ma;
      cus();
      book_list("All");
      ad_not();
      function cus(){
        $.ajax({
          url: "/current/",
          success: function(cu) {
            user = cu[0];
            ma=cu[1];
            $(".uh").html("Hello  " + user );

          }
        });
      }


      function ad_not(){
        //alert(ma);
        $.ajax({
          url:'/get_user_trans/',
          datatype:"JSON",
          data:{
            "mail":ma,
          },
          success:function(data){
            if(data!= "none" || data!="error"){
            $(".user-head").empty();
            var tr=$("<tr class='table-dark'/>");
            tr.append("<th scope='col'>Book id</th>");
            tr.append("<th scope='col'>Book Name</th>");
            tr.append("<th scope='col'>Date</th>");
            tr.append("<th scope='col'>Status</th>");
            tr.append("<th scope='col'>Action</th>");
            $(".user-head").append(tr);
            for(i=0;i<data.data2.length;i++){
              var ro=$("<tr/>");
              ro.append("<td><input class='tid' value="+data.data2[i].pk+" hidden></input>"+data.data2[i].fields.bid+"</td>");
              ro.append("<td>"+data.data2[i].fields.bname+"</td>");
              ro.append("<td>"+data.data2[i].fields.tdate+"</td>");
              ro.append("<td class='sta'>"+data.data2[i].fields.status+"</td>");
              ro.append("<td><button type='button' class='btn btn-outline-success cancel' style='margin-right:5px';>cancel</button></td>");
              $("#utable").append(ro);
            }

          }
          }
        });
      }

      $("#boocat").change(function(){
        c=$("#boocat").val();
        //alert(c);
        book_list(c);
        $('#books').load(document.URL +  ' #books');


      });






      function book_list(cat) {
        li = 0;
        ff = 0;
        var bcat=cat;
        $.ajax({
            url: "/list_books/",
            datatype: "JSON",
            data:{
              "bcat":bcat,
            },
            success: function(data) {
              if (data != "null") {
                var len = data.data5.length;

                //alert(len);
                var r = Math.floor(len / 4);
                var re = len % 4;
                console.log(r);
                if (len <= 4) {
                  var di = $("<div class='row'>");
                  for (j = 0; j < re; j++) {
                    var bid=data.data5[ff].pk;
                    var bname = data.data5[ff].fields.bname;
                    var bcat = data.data5[ff].fields.bcat;
                    var bauth = data.data5[ff].fields.bauthor;
                    var bcopy = data.data5[ff].fields.bcopy;
                    //"{% static 'images\books\akam.jpg' %}"
                    var co = $("<div class='col-sm-12 col-md-5 col-lg-2 card ' style='width: 18rem;'>");
                    var im = $("<img class='card-img-top book' src='' alt='Card image cap'>");
                    var dc = $("<div class='card-body'>");
                    var db = $("<button class='btn btn-primary rent ' type='button' name='button'>Rent Now</button>");
                    var bn = $("<h5 class='card-title bname'>" + bname + "</h5>");
                    var bid= $("<h5 class='card-title bid' hidden>" + bid + "</h5>");
                    var bc = $("<h6 class='card-title'>Copies remaining: " + bcopy + "</h6>");
                    var bd = $("<p class='card-text'>" + bname + " is a " + bcat + " book written by " + bauth + "</p>");
                    dc.append(bn);
                    dc.append(bid);
                    dc.append(bd);
                    dc.append(bc);
                    dc.append(db);
                    co.append(im);
                    co.append(dc);
                    di.append(co);
                    //  $(".book").attr("src","{% static 'images\books\akam.jpg' %}");
                    //console.log(bname);
                    ff = ff + 1;
                  }//for<4
                  $("#books").append(di);
                } //if<4
                else {
                  for (i = 0; i < r; i++) {
                    var di = $("<div class='row'>");
                    for (j = 0; j < 4; j++) {
                      var bid=data.data5[ff].pk;
                      var bname = data.data5[ff].fields.bname;
                      var bcat = data.data5[ff].fields.bcat;
                      var bauth = data.data5[ff].fields.bauthor;
                      var bcopy = data.data5[ff].fields.bcopy;
                      var im=data.data5[ff].fields.bimage;

                      var image= 'images\\books\\'+ im +' ';
                      console.log(image);
                      var co = $("<div class='col-sm-12 col-md-5 col-lg-2 card ' style='width: 18rem;'>");
                      var im = $("<img class='card-img-top book' src="+ image +" alt='Card image cap'>");
                      var dc = $("<div class='card-body'>");
                      var db = $("<button class='btn btn-primary rent' type='button' name='button'>Rent Now</button>");
                      var bn = $("<h5 class='card-title bname'>" + bname + "</h5>");
                      var bid= $("<h5 class='card-title bid' hidden>" + bid + "</h5>");
                      var bc = $("<h6 class='card-title'>Copies remaining: " + bcopy + "</h6>");
                      var bd = $("<p class='card-text'>" + bname + " is a " + bcat + " book written by " + bauth + "</p>");
                      dc.append(bn);
                      dc.append(bid);
                      dc.append(bd);
                      dc.append(bc);
                      dc.append(db);
                      co.append(im);
                      co.append(dc);
                      di.append(co);
                      //  $(".book").attr("src","{% static 'images\books\akam.jpg' %}");
                      //console.log(bname);
                      ff = ff + 1;
                    }//for column >4

                      $("#books").append(di);
                    }// for row >4

                    var di = $("<div class='row'>");
                    for (j = 0; j < re; j++) {
                      var bid=data.data5[ff].pk;
                      var bname = data.data5[ff].fields.bname;
                      var bcat = data.data5[ff].fields.bcat;
                      var bauth = data.data5[ff].fields.bauthor;
                      var bcopy = data.data5[ff].fields.bcopy;
                      //"{% static 'images\books\akam.jpg' %}"
                      var co = $("<div class='col-sm-12 col-md-5 col-lg-2 card ' style='width: 18rem;'>");
                      var im = $("<img class='card-img-top book' src='' alt='Card image cap'>");
                      var dc = $("<div class='card-body'>");
                      var db = $("<button class='btn btn-primary rent' type='button' name='button'>Rent Now</button>");
                      var bn = $("<h5 class='card-title bname'>" + bname + "</h5>");
                      var bid= $("<h5 class='card-title bid' hidden>" + bid + "</h5>");
                      var bc = $("<h6 class='card-title'>Copies remaining: " + bcopy + "</h6>");
                      var bd = $("<p class='card-text'>" + bname + " is a " + bcat + " book written by " + bauth + "</p>");
                      dc.append(bn);
                      dc.append(bid);
                      dc.append(bd);
                      dc.append(bc);
                      dc.append(db);
                      co.append(im);
                      co.append(dc);
                      di.append(co);
                      //  $(".book").attr("src","{% static 'images\books\akam.jpg' %}");
                      //console.log(bname);
                      ff = ff + 1;
                    }
                    $("#books").append(di)
                  }
                  }//not null
                }//success

              }); //main ajax

          }//main function
          //renting
          $(document).on("click",".rent",function(){

            var ca=$(this).closest("div");
            var bid=ca.find(".bid").html();
            var bname=ca.find(".bname").html();
            var stat="pending";
            //alert(ma);
            $.ajax({
              url:"/book_transaction/",
              datatype:"JSON",
              data:{
                "bid":bid,
                "umail":ma,
                "uname":user,
                "bname":bname,
                "bstatus":stat,

              },
              success:function(d){
                alert(d);
                window.location.reload();
              }
            });

          });

          $(document).on("click",".cancel",function(){
            var ro=$(this).closest("tr");
            var tid=ro.find(".tid").val();
            $.ajax({
              url:"/trns_delete/",
              data:{
                "tid":tid,
              },
              success:function(d){
                alert(d);
                if(d=="deleted")
                window.location.reload();
              }

            });
          });


        });//documen load
