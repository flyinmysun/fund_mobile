/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
  //获取卖出列表
    getSellList();
    function getSellList(){
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
        }
        function success(res){
            if(res&&res.success==true){
                var sellList = res.result.result;
                //console.log(sellList)
                var tpl = _.template($("#sellListItem").html()); //返回一个获取到了模板的方法
                var okTpl = tpl({data:res.result.result});
                $(".tplWrap").append(okTpl);

                //点击跳转到卖出基金的详情页面
                $(".linkToDetail").click(function(){
                    var id = $(".linkToDetail").attr("info");
                    window.location.href = "holdSellFundDetail.html?id="+id;
                })

            }

        }
        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/sell/getSellList",param,success)
    }








})