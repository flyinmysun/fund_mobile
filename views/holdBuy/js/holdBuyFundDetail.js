/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    $("#datetime-picker2").datetimePicker();  //控制日历时间
    var getId = GetRequest();
    //console.log(id)
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







})