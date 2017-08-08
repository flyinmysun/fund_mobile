/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    //var userInfo = getObjFromCookies("user");
    //console.log(userInfo);
    var isShow = false;   //新增基金买入盒子是否显示的控制
    $("#datetime-picker").datetimePicker();  //控制日历时间
    var fundId=GetRequest();   //获取页面传参id


   //点击新增基金买入，基金买入详情显示或隐藏
    $(".popAddFund").click(function(){
        if( isShow == false){
            $(".popAddFundBox").css("display","block");
            isShow = true;
        }else{
            $(".popAddFundBox").css("display","none");
            isShow = false;
        }
    })

    //Ajax
    var param = {
        "pageNo":1,
        "pageSize":10,
        "orders":{"valueTime":true},
    }
    function successfn(res) {
        if(res &&res.success==true){
            //console.log(res.result.result);
            //得到列表的数据数组
            var dataArr = res.result.result;
            for(var i =0;i<dataArr.length;i++){
                var item = dataArr[i];
                if(fundId == item.id){
                    console.log(item);
                    //将数据库返回的基金名称，插入到DOM节点显示
                    $(".fundDetailTitle").text(item.name+"基金详情");
                    $(".recentNetValue").text(item.recentNetValue);
                    $(".valueTime").text(getMyDate(item.valueTime));
                    $(".costAvailable").text(item.costAvailable?"是":"否");
                }
            }

        }
    }
    fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/fund/getFundListByUser",param,successfn);

   /*$.ajax({
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
             //得到列表的数据数组
                var dataArr = data.result.result;
                for(var i =0;i<dataArr.length;i++){
                    var item = dataArr[i];
                    if(fundId == item.id){
                        console.log(item);
                        //将数据库返回的基金名称，插入到DOM节点显示
                       $(".fundDetailTitle").text(item.name+"基金详情");
                        $(".recentNetValue").text(item.recentNetValue);
                        $(".valueTime").text(getMyDate(item.valueTime));
                        $(".costAvailable").text(item.costAvailable?"是":"否");
                    }
                }

            }

        },
        error:function () {
            alert("服务器错误")
        }
    });*/

    //点击确定新增，保存新增数据
    $(".sureAdd").click(function(){
        var data = {
            "id":null,
            "fundId":fundId,
            "money":$(".money").val(),
            "unitPrice":$(".price").val(),
            "buyTime":Date.parse($(".buyTime").val())/1000,
            "buyCost":$(".buyCost").val(),
        }
        function success(res) {
            if (res && res.success == true) {
                alert("新增成功");
                $(".buyTime").val("");
                $(".money").val("")
                $(".price").val("");
                $(".buyCost").val("")
                //console.log(data.result)
                //console.log(data.result.result);
            }
        }
        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/buy/addOrUpdateBuy",data,success)

        /*$.ajax({
            type:"POST",
            url:"http://lms.moyior.com/ZFortuneCat-web/api/buy/addOrUpdateBuy",
            contentType : 'application/json',
            dataType:"json",
            xhrFields: {  //跨域问题
                withCredentials: true
            },
            data:JSON.stringify({
                "id":null,
                "fundId":fundId,
                "money":$(".money").val(),
                "unitPrice":$(".price").val(),
                "buyTime":Date.parse($(".buyTime").val())/1000,
                "buyCost":$(".buyCost").val(),
            }),
            success:function(data){
                if(data &&data.success==true){
                    alert("新增成功");
                    $(".buyTime").val("");
                    $(".money").val("")
                    $(".price").val("");
                    $(".buyCost").val("")
                    //console.log(data.result)
                    //console.log(data.result.result);




                }

            },
            error:function () {
                alert("服务器错误")
            }
        });*/

    })








})