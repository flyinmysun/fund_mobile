/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    var userInfo = getObjFromCookies("user");
    console.log(userInfo);
    $.ajax({
        type:"POST",
        url:"http://lms.moyior.com/ZFortuneCat-web/api/fund/getFundListByUser",
        contentType : 'application/json',
        dataType:"json",
        data:JSON.stringify({
            "pageNo":1,
            "pageSize":10,
            "orders":{"valueTime":true}
        }),
        
        success:function(data){
            if(data &&data.result==true){
                console.log(data);
            }
            //console.log(data);
            var tpl = _.template($("#listItem").html()); //返回一个获取到了模板的方法
            var okTpl = tpl({data:data.result});
            $(".listItemWrap").append(okTpl)




        },
        error:function () {
            alert("服务器错误")
        }
    });








})