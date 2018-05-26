<template>
    <div>
        <ul class="left_tb">
            <li v-for="(item,index) in order"><a :href="'#'+ item.name" style="text-decoration:none;color:#666">{{item.name}}</a></li>
        </ul><!--此处字符串拼接-->
        <div>
            <ul class="right_thing">
                <li v-for="(bar,index) in order">
                    <div :id="bar.name"><!--设置锚点-->
                        <span v-for="sth in bar.name" class="title_p">{{sth}}</span>
                        <span v-for="sth in bar.description" class="title_t">{{sth}}</span>
                    </div>
                    <!--div v-for="pic in menuPic[index]">
                        <img :src="pic">
                    </div-->
                    <div v-for="(item,index) in bar.foods" class="ulist">
                        <img :src="item.image_path">
                        <div class="llist">
                            <h2>{{item.name}}</h2>
                            <p class="spoke">{{item.description}}</p>
                            <p class="sell">月售{{item.month_sales}}份 好评率{{item.satisfy_rate}}%</p>
                            <span>￥<span style="font-weight:bold;font-size:18px;">{{item.specfoods[0].price}}</span> 起</span>
                            <el-button type="text" @click="openDialog(item.category_id, item.virtual_food_id)">
                                <button :id="item.virtual_food_id">选规格</button>
                            </el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <totalPrice :shopping="shop"></totalPrice>
        <div class="stuff">
            <el-dialog :visible.sync="buttonVisible">
                <div class="bodyDiv">
                    <h2>{{currentFoodObj.name}}</h2>
                    <div class="tipBox">
                        <p>规格</p>
                        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                            <ul>
                                <li v-for="jew in currentFoodObj.specfoods">
                                    <el-tab-pane v-for="tip in jew.specs" :label="tip.value">
                                        <ul v-for="sub in currentFoodObj.attrs" class="tinyUl">
                                            <p>{{sub.name}}</p>
                                            <li v-for="(taste,index) in sub.values" v-model="activeName2" :name="index">{{taste}}</li>
                                        </ul>
                                        <div class="bigD">
                                            <div class="littleD1">
                                                <h2>￥{{jew.price}}</h2>
                                            </div>
                                            <div class="littleD2" @click="addMoney">
                                                <h2>选好了</h2>
                                            </div>
                                        </div>
                                    </el-tab-pane>
                                </li>
                            </ul>
                        </el-tabs>
                    </div>
                </div>
            </el-dialog>
        </div>  
        <div class="shoppingCart">
            <div class="shoppingDescription">
                <p>{{shop.activities[1].description}}</p>
            </div>
            <div class="workOutArea">
                <div class="workOutprice">
                    <h2>￥{{price}}</h2>
                    <p>配送费￥{{shop.float_delivery_fee}}</p>
                </div>
                <div class="priceToSend">
                    <h2>￥{{shop.float_minimum_order_amount}}起送</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default{
    name:"order",
    data(){
        return{
            order:null,
            shop:null,
            buttonVisible:false,
            currentFoodObj: {},
            activeName2:"1",
            price:"0"
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/menu.json')
        .then(response=> {
            this.order = response.data;//定义数据
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('http://localhost:8080/static/shop.json')
        .then(response=> {
            this.shop = response.data;
        })
        .catch(function(error){
            console.log(error);
        })
    },
    methods:{
        openDialog:function(category_id, food_id){
            this.buttonVisible=true;
            // console.log(category_id);
            // console.log(food_id);
            console.log(this.order);

            // 缓存当前菜品对应的分类数据
            var category = null;
            for(var i=0; i<this.order.length; i++){
                if(this.order[i].id == category_id){
                    category = this.order[i];
                    
                    // 取得分类数据后，再循环遍历取得菜品对象
                    for(var f=0, len=category.foods.length; f<len; f++){
                        // 缓存当前菜品对象
                        var food = null;
                        if(category.foods[f].virtual_food_id == food_id){
                            food = category.foods[f];
                            this.currentFoodObj = food;
                            console.log(this.currentFoodObj);
                        }
                    }
                }
            }
            // for(var i=0;i<this.order.length;i++){
            //     var sub=this.order[i].foods;
            //     // var such=[];
            //     for(var j=0;j<sub.length;j++){
            //         if(id=sub[j].virtual_food_id){
            //             this.buttonForm=sub[j];
            //         }
            //     }
            // }
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        addMoney(){
            this.price=Number(this.price)+Number(this.currentFoodObj.specfoods[0].price);
        }
    }
}
// var left = document.getElementsByClassName("left_tb").getElementsByTagName("li");
// for(var i=0;i<left.length;i++){
//     left[i].onclick = function(){
//         left[i].className = "isActive";
//     }
// }
</script>
<style type="text/css">
.left_tb{
    display:inline-block;
    width:22%;
    background:#f8f8f8;
    height:700px;
    float:left;
}
.left_tb .isActive{
    background:#000;
}
.left_tb li{
    display:block;
    list-style:none;
    padding:15px 7%;
    font-size:14px;
}
.left_tb li:hover{
    background:#fff;
}
.left_tb li:active{
    background:#fff;
}
.right_thing{
    padding:10px;
    text-align:left;
    width:70%;
    float:left;
    height:680px;
    overflow:scroll;
}
.right_thing li{
    list-style:none;
}
.title_p{
    font-size:14px;
    font-weight:bold;
}
.title_t{
    font-size:11px;
    color:#999;
}
.ulist{
    padding:15px 0 15px 0;
}
.ulist img{
    width:28%;
    float:left;
    border-radius:2px;
}
.llist{
    display:inline-block;
    width:67%;
    margin-left:10px;
}
.llist .el-button{padding:0;}
.llist h2{
    display:inline-block;
    margin:0;
    font-size:16.5px;
}
.spoke{
    white-space:nowrap;
    overflow:hidden;
    font-size:10px;
    margin:3px 0;
    text-overflow:ellipsis;
}
.sell{
    font-size:12px;
    color:#333;
    margin:5px 0;
}
.llist span{
    color:#f60;
    font-size:14px;
}
button{
    color:#fff;
    border-radius:15px;
    font-size:14px;
    background:#3199e8;
    border:1px solid #3199e8;
    padding:3px 5px;
    float:right;
}
.stuff .el-dialog__header{
    padding:0;
}
.stuff .el-dialog__body{
    padding:0;
    border-radius:5px;
}
.stuff .el-dialog{
    border-radius:5px;
}
.stuff h2{
    text-align:center;
    color:#333;
    margin:0 auto !important;
    font-size:19px;
    width:70%;
    font-weight:normal;
}
.tipBox{border-radius:5px;}
.tipBox .el-tabs__active-bar{display:none;}
.tipBox .el-tabs__nav{
    float:none;
}
.tipBox .el-tabs--border-card{
    border:none;
    box-shadow:none;
    text-align:left;
    border-radius:5px;
}
.tipBox li{list-style:none;}
.tipBox p{
    text-align:left;
    margin:10px 10px 10px 15px;
}
.tipBox .el-tabs__header{
    background:#fff;
    border:none;
}
.tipBox .el-tabs__item{
    border:1px solid #ccc !important;
    border-radius:15px;
    text-overflow:ellipsis;
    width:auto;
    padding:0 5px 0 10px!important;
    margin:0 0 0 3px !important;
    height:23px;
    line-height:23px;
}
.tipBox .el-tabs__content{
    height:140px;
    padding:0;
    border-radius:5px;
}
.tipBox .el-tabs__nav-scroll{
    width:99%;
}
.tinyUl{margin:10px 10px 10px 15px;}
.tinyUl p{margin:0;}
.tinyUl li{
    display:inline-block;
    padding:1px 10px;
    border:1px solid #ccc;
    margin:10px 8px 10px 0;
    color:#909399;
    border-radius:15px;
}
.tinyUl li:hover{
    color:#409EFF;
    border-color:#409EFF;
}
.bodyDiv h2{
    padding:15px 0;
    margin:0;
}
.bigD{
    width:100%;
    background:#f9f9f9;
    height:60px;
}
.littleD1{
    display:inline-block;
    margin:0 5%;
}
.littleD1 h2{
    font-weight:bold;
    color:#ff6000;
}
.littleD2{
    display:inline-block;
    float:right;
    margin:0 5%;
}
.littleD2 h2{
    color:#fff;
    padding:6px 6px 6px 10px;
    background:#3199e8;
    margin:15px 0 !important;
    font-size:16px;
    width:auto;
    border-radius:3px;
}
.shoppingCart{
    width:100%;
    position:fixed;
    bottom:0;
    height:80px;
}
.shoppingDescription{
    width:100%;
    height:25px;
    line-height:25px;
    font-size:12px;
    background:#fffad6;
}
.workOutArea{
    width:100%;
    background:rgba(61,61,63,.9);
    height:75px;
    text-align:right;
}
.workOutprice h2{
    margin:0;
    color:#fff;
    line-height:30px;
}
.workOutprice{
    text-align:left;
    width:50%;
    margin:0 auto;
    display:inline-block;
    height:75px;
}
.workOutprice p{
    line-height:15px;
    font-size:12px;
    color:#999;
}
.priceToSend{
    text-align:center;
    width:30%;
    float:right;
    height:75px;
}
.priceToSend h2{
    margin:0;
    color:#fff;
    text-align:center;
    padding:12% 0;
}
</style>
