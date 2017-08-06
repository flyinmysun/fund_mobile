/**
 * Created by Administrator on 2017/8/5.
 */
$(function () {

    //点击登录，跳转登录页面
    $(".linkBtnPanel").click(function () {
        window.location.href = "login.html"
    })

    //点击注册，调用注册方法，并跳转登录页面
    $(".registerBtn").click(function () {
        //console.log($(".userName").val())
        //console.log($(".nickName").val())
        if(!$(".userName").val()){alert("用户名不能为空");return false;}
        if(!$(".nickName").val()){alert("昵称不能为空");return false;}
        if(!$(".mobile").val()){alert("手机号不能为空");return false;}
        if(!$(".password").val()){alert("密码不能为空");return false;}
        if(!$(".email").val()){alert("密码不能为空");return false;}
        $.ajax({
            type:"post",
            url:"http://lms.moyior.com/ZFortuneCat-web/api/user/register",
            contentType : 'application/json',
            dataType:"json",
            data:JSON.stringify(
                {
                    "username":$(".userName").val(),
                    "password":$(".password").val(),
                    "mobilePhone":$(".mobile").val(),
                    "email":$(".email").val(),
                    "nickname":$(".nickName").val(),
                }
            ),
            success:function(data){
                //console.log(data)
                window.location.href = "login.html"

            },
            error:function () {
                alert("服务器错误")
            }
        });












    })





})
