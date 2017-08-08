/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    var userInfo = getObjFromCookies("user");
    //console.log(userInfo);
    var param = {
        "pageNo":1,
        "pageSize":10,
        "orders":{"valueTime":true},
    }
    fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/fund/getFundListByUser",param,successfn)
    function successfn(res){
        if(res &&res.success==true){
            console.log(res.result.result);
            var tpl = _.template($("#listItem").html()); //返回一个获取到了模板的方法
            var okTpl = tpl({data:res.result.result});
            $(".tplWrap").append(okTpl);

            //点击一条基金，跳转到基金详情,并浏览器传参id
            $(".linkFundDetail").click(function(){
                var id = $(this).attr("info");
                //console.log(id)
                window.location.href = "buyFundDetail.html?id="+id;  //通过浏览器传参，将id传到另外一个页面

            })

        }
    }
   /* $.ajax({
        type:"POST",
        url:"http://lms.moyior.com/ZFortuneCat-web/api/fund/getFundListByUser",
        contentType : 'application/json',
        dataType:"json",
        xhrFields: {  //跨域问题
            withCredentials: true
        },
        data:JSON.stringify({
            "pageNo":1,
            "pageSize":10,
            "orders":{"valueTime":true},
        }),
        success:function(data){
            if(data &&data.success==true){
                //console.log(data.result.result);
                var tpl = _.template($("#listItem").html()); //返回一个获取到了模板的方法
                var okTpl = tpl({data:data.result.result});
               $(".tplWrap").append(okTpl);

                //点击一条基金，跳转到基金详情,并浏览器传参id
                $(".linkFundDetail").click(function(){
                    var id = $(this).attr("info");
                    //console.log(id)
                    window.location.href = "buyFundDetail.html?id="+id;  //通过浏览器传参，将id传到另外一个页面

                })





            }

        },
        error:function () {
            alert("服务器错误")
        }
    });*/








})