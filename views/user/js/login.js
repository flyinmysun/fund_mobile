/**
 * Created by Administrator on 2017/8/5.
 */
$(function () {
    $(".linkBtnPanel").click(function () {
        window.location.href = "register.html"
    })

   $(".loginBtn").click(function () {
       if(!$(".userName").val()){alert("用户名不能为空");return false;}
       if(!$(".password").val()){alert("密码不能为空");return false;}

       $.ajax({
           type:"post",
           url:"http://lms.moyior.com/ZFortuneCat-web/api/user/login",
           contentType : 'application/json',
           dataType:"json",
           xhrFields: {
               withCredentials: true
           },
           data:JSON.stringify(
               {
                   "username":$(".userName").val(),
                   "password":$(".password").val(),

           }
           ),
           success:function(data){
               if(data &&data.success==true){
                    setObjToCookies("user",data.result.user);
                   //var data = getObjFromCookies("user")
                   //console.log(data)
                    window.location.href = "../buy/buy.html"
               }
               //console.log(data);
           },
           error:function () {
               alert("服务器错误")
           }
       });
   })



})
