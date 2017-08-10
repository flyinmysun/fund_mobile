/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    var Request=new getMoreParam();
    var getId = Request.id;

    //console.log(getId)
    //console.log($(".money").text());
    var param = {
        "key":"",
        "minSellTime":null,
        "maxSellTime":null,
        "pageNo":1,
        "pageSize":20,
        "orders":{
            "buyTime":true,
            "money":true,
            "buyUnitPrice":true,
            "holdDays":true,
            "sellMoney":true,
            "profit":true,
            "profitPercent":true,
            "efficiency":true
        }
    };
    function success(res){
        if(res&&res.success == true){
           //console.log(res.result.result);
          var getSellListArr = res.result.result;
          for(var i=0;i<getSellListArr.length;i++){
              var item = getSellListArr[i];
              if(getId ==item.id){
                  $(".fundDetailTitle").text(item.fundName+"基金详情")
                  $(".buyCost").text(item.buyCost);
                  $(".buyTime").text(getMyDate(item.buyTime)); //需要将后台获取的毫秒转换成时间格式
                  $(".buyUnitPrice").text(item.buyUnitPrice);
                  $(".dayProfit").text(item.dayProfit);
                  $(".dayProfitPercent").text(item.dayProfitPercent);
                  $(".holdDays").text(item.holdDays);
                  $(".money").text(item.money);
                  $(".profit").text(item.profit);
                  $(".profitPercent").text(item.profitPercent);
                  $(".sellCost").text(item.sellCost);
                  $(".sellExchangeRate").text(item.sellExchangeRate);
                  $(".sellLoss").text(item.sellLoss);
                  $(".sellMoney").text(item.sellMoney);
                  $(".sellSurplus").text(item.sellSurplus);
                  $(".sellTime").text(getMyDate(item.sellTime));//需要将后台获取的毫秒转换成时间格式
                  $(".sellUnitPrice").text(item.sellUnitPrice);
                  $(".share").text(item.share);
              }
          }

        }

    }
    fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/sell/getSellList",param,success);
















})