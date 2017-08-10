/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {

    $("#datetime-picker2").datetimePicker();  //控制日历时间
    $("#datetime-picker3").datetimePicker();  //控制日历时间
    var Request=new getMoreParam();
    var getId = Request.id;
    var getFundId = Request.fundId;
    //console.log(getId)
    //console.log($(".money").text());
    var param = {
        "key":"",
        "minBuyTime":null,
        "maxBuyTime":null,
        "available":null,
        "pageNo":1,
        "pageSize":20,
        "orders":{
            "buyTime":true,
            "money":true,
            "buyUnitPrice":true,
            "curDays":true,
            "curMoney":true,
            "profit":true,
            "profitPercent":true,
            "efficiency":true
        }
    };
    function success(res){
        if(res&&res.success == true){
           //console.log(res.result.result);
          var getDataArr = res.result.result;
          for(var i=0;i<getDataArr.length;i++){
              var item = getDataArr[i];
              if(getId ==item.id){
                  $(".fundDetailTitle").text(item.fundName+"基金详情")
                  $(".money").text(item.money);
                  $(".curMoney").text(item.curMoney);
                  $(".sellSurplus").text(item.sellSurplus);
                  $(".profit").text(item.profit);
                  $(".profitPercent").text(item.profitPercent);
                  $(".dayProfit").text(item.dayProfit);
                  $(".dayProfitPercent").text(item.dayProfitPercent);
                  $(".buyTime").text(getMyDate(item.buyTime)); //需要将后台获取的毫秒转换成时间格式
                  $(".buyUnitPrice").text(item.buyUnitPrice);
                  $(".share").text(item.share);
                  $(".buyCost").text(item.buyCost);
                  $(".curUnitPriceDate").text(getMyDate(item.curUnitPriceDate));//需要将后台获取的毫秒转换成时间格式
                  $(".curDays").text(item.curDays);
                  $(".curUnitPrice").text(item.curUnitPrice);
                  $(".curSellExchangeRate").text(item.curSellExchangeRate);
                  $(".curSellCost").text(item.curSellCost);
                  $(".curLoss").text(item.curLoss);
                  $(".fundAvailable").text(item.fundAvailable?"是":"否");
                  //修改盒子里面的初始值
                  $(".buyTime").val(getMyDate(item.buyTime));
                  $(".buyCost").val(item.buyCost);
                  $(".money").val(item.money);
                  $(".buyUnitPrice").val(item.buyUnitPrice);

              }
          }

        }

    }
    fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/buy/getBuyList",param,success);

    //点击修改，弹出修改框
    var ModifyFundBox_isShow = false;   //新增基金买入盒子是否显示的控制
    $(".modifyBtn").click(function(){
        if(ModifyFundBox_isShow == false){
            $(".popModifyFundBox").css("display","block");
            ModifyFundBox_isShow = true;
        }else{
            $(".popModifyFundBox").css("display","none");
            ModifyFundBox_isShow = false;
        }
    })

    //点击确定修改，提交
    $(".sureModify").click(function(){
        var param = {
            "id":getId,
            "fundId":getFundId,
            "money":$(".money").val(),
            "unitPrice": $(".buyUnitPrice").val(),
            "buyTime":  Date.parse(new Date($(".buyTime").val()))/1000,
            "buyCost":$(".buyCost").val(),
        };
        function success(res){
            if(res&&res.success == true){

                $.confirm("确定修改此基金买入？", function() {
                     $.toast("修改成功");

                     $(".popModifyFundBox").css("display","none");
                     ModifyFundBox_isShow = false;
                 }, function() {
                     //点击取消后的回调函数
                     });

                }
            }
        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/buy/addOrUpdateBuy",param,success);

        })

    //取消修改基金
    $(".cancelModify").click(function(){
        $(".popModifyFundBox").css("display","none");
        ModifyFundBox_isShow = false;
    })

    //点击新增卖出信息按钮
    $(".sellFundBtn").click(function(){
        $("#sellFund").popup();//弹出卖出基金页面
        $(".sell-money").val($(".money").val());
        $(".sellUnitPrice").val($(".buyUnitPrice").val());

        //点击计算卖出费用
        $(".cpuSellCostBtn").click(function(){
            var param = {
                "buyId":getId,
                "sellTime":Date.parse(new Date($("#datetime-picker3").val()))/1000,
                "unitPrice":$(".sellUnitPrice").val()
            };
            function success(res){
                if(res&&res.success==true){
                    $(".cpuSellCost").val(res.result.sellCost);
                }

            };
            fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/sell/getSellCost",param,success)
        })

        //点击计算资金流失
        $(".cpuMoneyLossBtn").click(function(){
            var param = {
                "buyId":getId,
                "sellTime":Date.parse(new Date($("#datetime-picker3").val()))/1000,
            };
            function success(res){
                if(res&&res.success==true) {
                    $(".cpuMoneyLoss").val(res.result.loss);
                }
            };
            fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/sell/getMoneyLoss",param,success)
        })

        //点击确定卖出
        $(".sureSell").click(function(){
            var param = {
                "id":null,
                "buyId":getId,
                "sellTime":Date.parse(new Date($("#datetime-picker3").val()))/1000,
                "unitPrice":$(".sellUnitPrice").val(),
                "sellCost": $(".cpuSellCost").val(),
                "loss":$(".cpuMoneyLoss").val(),
            }
            function success(res){
                if(res&&res.success==true){
                    $.toast("卖出成功");
                }
            }
            fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/sell/addOrUpdateSell",param,success)
        })





    })











})