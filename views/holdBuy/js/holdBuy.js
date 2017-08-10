/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    //获取持仓买入列表数据
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
            console.log(res.result.result)
            var tpl = _.template($("#listItem").html()); //返回一个获取到了模板的方法
            var okTpl = tpl({data:res.result.result});
            $(".tplWrap").append(okTpl);

            //点击linkToDetail跳转到详情链接   并浏览器传参id
            $(".linkToDetail").click(function(){
                var getId = $(this).attr("info");
                var getFundId = $(this).attr("info1");
                window.location.href = "holdBuyFundDetail.html?id="+getId+"&fundId="+getFundId;  //通过浏览器传参，将id传到另外一个页面
            })

        }

    }
    fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/buy/getBuyList",param,success)







})