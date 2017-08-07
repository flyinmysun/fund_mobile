/**
 * Created by Administrator on 2017/7/22.
 */


function sum(a,b) {
   return a+b ;
}
//alert(sum(4,5));


function random(x,y) {
    if(x>y){
        return Math.floor(Math.random()*(x-y)+y);
    }else {
        return Math.floor(Math.random()*(y-x)+x);
    }
}

//alert(random(20,10));

function data(arr,name) {
    for(var i=0;i<arr.length;i++){
        var item = arr[i];
        if(item.name == name){
            return item;
        }
    }
}

/**
 * 保存对象到cookie中
 * pram key:cookie的键
 * pram value:要保存的对戏那个
 * */
function setArrToCookies(key,value) {
    var objStr = JSON.stringify(value);//因为cookie里面只能存字符，不能存对象（数组）
    $.cookie(key,objStr);//存入cookie
}


function getArrFromCookies(key) {
    var objStr = $.cookie(key);
    //if(!objStr){objStr = "[]";}
    var obj = JSON.parse(objStr || "[]"); //将获取的cookie字符，转换成新的对象
    return obj
}


function setObjToCookies(key,value) {
    var objStr = JSON.stringify(value);//因为cookie里面只能存字符，不能存对象（数组）
    $.cookie(key,objStr, {path: '/' });//存入cookie,  path:"/"  代表cookie存在根目录下面，如果不加，可能导致另外页面获取不到cookie
}


function getObjFromCookies(key) {
    var objStr = $.cookie(key);
    //if(!objStr){objStr = "{}";}
    var obj = JSON.parse(objStr || "{}"); //将获取的cookie字符，转换成新的对象
    return obj
}

/***页面传参获取单个参数***/
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    if (url.indexOf("?") != -1) {    //判断是否有参数
        var str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
        strs = str.split("=");   //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
        //alert(strs[1]);          //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
        return strs[1]
    }
}


/***获取多个参数**/
function UrlSearch()
{
    var name,value;
    var str=location.href; //取得整个地址栏
    var num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

    var arr=str.split("&"); //各个参数放到数组里
    for(var i=0;i < arr.length;i++){
        num=arr[i].indexOf("=");
        if(num>0){
            name=arr[i].substring(0,num);
            value=arr[i].substr(num+1);
            this[name]=value;
        }
    }
}
var Request=new UrlSearch(); //实例化
//alert(Request.id);


/* function sexIsChecked(el,onOff){
 $(el).click(function(){
 if(onOff == false){
 $(el).attr("checked",true);
 onOff = true;
 }else{
 $(el).attr("checked",false);
 onOff = false;
 }
 })
 }   //checkbox的勾选
 sexIsChecked(".chooseMan",false);
 sexIsChecked(".chooseWomen",false);*/