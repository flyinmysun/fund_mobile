/**
 * Created by Administrator on 2017/8/5.
 */
$(function () {
    $(".userName").val("changyang");
    $(".password").val("123456");
    $(".linkBtnPanel").click(function () {
        window.location.href = "register.html"
    })

   $(".loginBtn").click(function () {
       if (!$(".userName").val()) {
           alert("用户名不能为空");
           return false;
       }
       if (!$(".password").val()) {
           alert("密码不能为空");
           return false;
       }
       var param = {
           "username": $(".userName").val(),
           "password": $(".password").val(),
       }

       function successfn(res) {
           if (res && res.success == true) {
               //setObjToCookies("user", res.result.user);
               //var data = getObjFromCookies("user")
               console.log(res.result);
               //window.location.href = "../buy/buy.html"
           }
           //console.log(data);
       }

       FundAjax("http://lms.moyior.com/ZFortuneCat-web/api/user/login", param, successfn);

       /*$.ajax({
        type:"post",
        url:"http://lms.moyior.com/ZFortuneCat-web/api/user/login",
        contentType : 'application/json',
        dataType:"json",
        xhrFields: {
        withCredentials: true
        },
        data:JSON.stringify(

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
        })*/

   });

})
