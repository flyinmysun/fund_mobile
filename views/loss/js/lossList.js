/**
 * Created by Administrator on 2017/8/7.
 */
$(document).ready(function () {
    $("#datetime-picker1").datetimePicker();  //控制日期时间
    $("#datetime-picker2").datetimePicker();  //控制日期时间
    $("#datetime-picker3").datetimePicker();  //控制日期时间
    $("#datetime-picker4").datetimePicker();  //控制日期时间


    //获取资金损耗列表
    getLossList();
    function getLossList(){
        var param = {

        }
        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/loss/getLossList",param,successfn)
        function successfn(res){
            if(res &&res.success==true){
                console.log(res.result.result);
                var dataArr = res.result.result
                var tpl = _.template($("#listItem").html()); //返回一个获取到了模板的方法
                var okTpl = tpl({data:dataArr});
                $(".tplWrap").append(okTpl);

                //点击修改资金损耗
                $(".modifyLossBtn").click(function(){
                    $("#modifyLossBox").popup();   //弹出修改pop
                    var getId = $(this).parent().attr("info");
                    for(var i=0;i<dataArr.length;i++){
                        var item=dataArr[i];
                        //console.log(item)
                        if(getId == item.id){
                            $(".startTime1").val(getMyDate(item.startTime))
                            $(".endTime1").val(getMyDate(item.endTime))
                            $(".lossVal1").val(item.value)
                        }

                    }
                    $(".sureModifyLoss").click(function(){
                        var param ={
                            "id":getId,
                            "startTime": Date.parse(new Date($(".startTime1").val()))/1000,
                            "endTime": Date.parse(new Date($(".endTime1").val()))/1000,
                            "value": $(".lossVal1").val(),

                        }
                        function modifyLoss(res){
                            if(res && res.success == true){
                                $.closePopup();
                                $.toast("操作成功");
                            }

                        };
                        fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/loss/addOrUpdateLoss",param,modifyLoss)

                    })




                })

            }
        }
    }

    //点击新增资金损耗
    $(".addLossListBtn").click(function(){
        $("#addLossBox").popup(); //弹出新增资金损耗pop

        // 确定新增资金损耗
        $(".sureAddLoss").click(function(){
            var param ={
                "id":null,
                "startTime": Date.parse(new Date($(".startTime").val()))/1000,
                "endTime": Date.parse(new Date($(".endTime").val()))/1000,
                "value": $(".lossVal").val(),

            }
            function addLoss(res){
                if(res && res.success == true){
                    $.closePopup();
                    $.toast("操作成功");
                }

            };
            fundAjax("http://lms.moyior.com/ZFortuneCat-web/api/loss/addOrUpdateLoss",param,addLoss)

        })

    })











})