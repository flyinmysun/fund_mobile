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


    //点击获取买入费用，自动计算买入费用
    $(".getBuyCost").click(function(){

        var param = {
            "fundId":fundId,
            "money":$(".money").val(),
            "buyTime":Date.parse($(".buyTime").val())/1000,
        }
        function successfn(res){
            if (res && res.success == true) {
                $(".buyCost").val(res.result.buyCost)
            }
        }
        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/buy/getBuyCost",param,successfn);



    })

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


    })

    //点击取消，取消输入的数据，并关闭新增窗口
    $(".cancelAdd").click(function(){
        $.confirm("确定取消新增?", function() {
            $(".popAddFundBox").css("display","none");
            isShow = false;
        }, function() {
            $.closeModal();
        });

    })










})