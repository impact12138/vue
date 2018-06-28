<template>
    <div>
        <ul class="left_tb">
            <li v-for="(item,index) in order" :key="item.name" :class="['lili',{lione: currentName==item.name}]" @click="leftChange(item.name)">
                {{item.name}}
            </li>
        </ul><!--此处字符串拼接-->
        <div>
            <ul class="right_thing">
                <li v-for="(bar,index) in order" :id="bar.index">
                    <div>
                        <span class="title_p">{{bar.name}}</span>
                        <span class="title_t">{{bar.description}}</span>
                    </div>
                    <div v-for="(item,index) in bar.foods" class="ulist">
                        <el-button type="text" @click="openBigone(item.category_id, item.virtual_food_id)">
                            <img :src="item.image_path">
                        </el-button>
                            <div class="llist">
                                <el-button type="text" @click="openBigone(item.category_id, item.virtual_food_id)">
                                    <h2 style="color:#000;">{{item.name}}</h2>
                                    <p class="spoke">{{item.description}}</p>
                                    <p class="sell">月售{{item.month_sales}}份 好评率{{item.satisfy_rate}}%</p>
                                    <span>￥<span style="font-weight:bold;font-size:18px;">{{item.specfoods[0].price}}</span> 起</span>
                                </el-button>
                                <div style="display:inline-block;float:right;text-align:right;" class="listDiv">
                                    <div class="delete">
                                        <span 
                                        v-if="cart.menu[item.virtual_food_id] && cart.menu[item.virtual_food_id].count > 0"
                                        @click="cut(item.category_id,item.virtual_food_id)"
                                        class="deleteSpan">
                                        -
                                        </span>
                                        <span v-if="cart.menu[item.virtual_food_id] && cart.menu[item.virtual_food_id].count > 0">{{cart.menu[item.virtual_food_id].count}}</span><!--先显示数字，后判断显示减号-->
                                    </div>
                                    <el-button type="text" @click="openDialog(item.category_id, item.virtual_food_id)">
                                        <button :id="item.virtual_food_id">选规格</button>
                                    </el-button>
                                </div>
                            </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bigStuff">
            <el-dialog :visible.sync="imgVisible":show-close="false">
                <img :src="currentImgObj.image_path">
                <div class="describe">{{currentImgObj.description}}</div>
                <div class="bigStuffdiv">
                    <h2>{{currentImgObj.name}}</h2>
                    <p>月售{{currentImgObj.month_sales}}份 好评率{{currentImgObj.satisfy_rate}}%</p>
                    <span class="bgStfSpan">￥<span style="font-weight:bold;font-size:18px;">{{specPrice}}</span> 起</span>
                    <el-button type="text" @click="openDialog(currentImgObj.category_id, currentImgObj.virtual_food_id)">
                        <button :id="currentImgObj.virtual_food_id">选规格</button>
                    </el-button>
                </div>
            </el-dialog>
        </div>
        <div class="stuff">
            <el-dialog :visible.sync="buttonVisible">
                <div class="bodyDiv">
                    <h2>{{currentFoodObj.name}}</h2>
                    <div class="tipBox">
                        <p>规格</p>
                        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
                            <ul>
                                <li v-for="jew in currentFoodObj.specfoods">
                                    <el-tab-pane v-for="(tip,index) in jew.specs" :key="tip.value" :label="tip.value" :stock="jew.stock">
                                        <ul v-for="sub in currentFoodObj.attrs" class="tinyUl">
                                            <p>{{sub.name}}</p>
                                            <li v-for="(taste,index) in sub.values" :name="index">{{taste}}</li>
                                        </ul>
                                        <div class="bigD">
                                            <div class="littleD1">
                                                <h2>￥{{jew.price}}</h2>
                                            </div>
                                            <div class="littleD2" :class="{sellout: isSellout}" @click="addMoney(currentFoodObj.category_id, currentFoodObj.virtual_food_id)">
                                                <h2 v-html="xhl"></h2>
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
        <div class="shoppingCart" v-if=shop>
            <div class="shoppingDescription">
                <p>{{shop.activities[1].description}}</p>
            </div>
            <div v-if="showCar" class="showCar">
                <div class="alreadyChoose">
                    <h2>已选商品</h2>
                    <p @click="clear">清空</p>
                </div>
                <ul>
                    <li v-for="(item, key) in cart.menu" class="goods">
                        <div style="float:left;line-height:16px;text-align:left;">
                            <p>{{item.name}}</p>
                            <small style="font-size:11px;">{{item.name}} /</small>
                        </div>
                        <div style="margin:0 15px;color:#f60;">
                            <p>￥{{item.prize}}</p>
                        </div>
                        <div style="width:30%" class="goodsLast">
                            <p @click="divide(item.category_id,key)">-</p><span>{{item.count}}</span><p @click="add(item.category_id,key)">+</p>
                        </div>
                    </li>
                </ul>
                <div class="foodBox">
                    <h2>餐盒</h2>
                    <h2>{{cart.count}}</h2>
                </div>
            </div>
            <div class="workOutArea">
                <div class="car" @click="openBox">
                    <el-badge :value="cart.count">
                        <el-button size="small" :class="{active:isActive}"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTggNTgiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHdpZHRoPSIyMDAlIiBoZWlnaHQ9IjIwMCUiIHg9Ii01MCUiIHk9Ii01MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCI+PGZlT2Zmc2V0IGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiLz48ZmVHYXVzc2lhbkJsdXIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIiBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IGluPSJzaGFkb3dCbHVyT3V0ZXIxIiByZXN1bHQ9InNoYWRvd01hdHJpeE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjA4IDAiLz48ZmVNZXJnZT48ZmVNZXJnZU5vZGUgaW49InNoYWRvd01hdHJpeE91dGVyMSIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48cGF0aCBpZD0iYiIgZD0iTTcuNjE0IDQuMDUxYy0xLjA2Ni4wODYtMS40NTItLjM5OC0xLjc1Mi0xLjU4NEM1LjU2MiAxLjI4LjMzIDUuODguMzMgNS44OGwzLjcxIDE5LjQ3NmMwIC4xNDgtMS41NiA3LjUxNS0xLjU2IDcuNTE1LS40ODkgMi4xOS4yOTIgNC4yNyAzLjU2IDQuMzIgMCAwIDM2LjkxNy4wMTcgMzYuOTIuMDQ3IDEuOTc5LS4wMTIgMi45ODEtLjk5NSAzLjAxMy0zLjAzOS4wMy0yLjA0My0xLjA0NS0yLjk3OC0yLjk4Ny0yLjk5M0w4LjgzIDMxLjE5MnMuODYtMy44NjUgMS4wNzctMy44NjVjMCAwLTUuNzg4LjEyMiAzMi4wNjUtMS45NTYuNjA2LS4wMzMgMi4wMTgtLjc2NCAyLjI5OC0xLjg0OCAxLjExMy00LjMxNyA0LjAwOC0xMy4yNiA0LjQ1OC0xNS42NC45MzItNC45MjUgMi4wNjEtOC41NTgtNC4yOC03LjQwNSAwIDAtMzUuNzY4IDMuNDg3LTM2LjgzMyAzLjU3M3oiLz48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMgMikiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUuMDM4IDcuODA4KSI+PG1hc2sgaWQ9ImMiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2IiLz48L21hc2s+PHVzZSBmaWxsPSIjNUY1RjYzIiB4bGluazpocmVmPSIjYiIvPjxwYXRoIGZpbGw9IiNFQkVFRjMiIGQ9Ik01My45NjIgNy43NzRsLTUuNzAxIDE5LjMwNS00MC43OCAxLjU3NHoiIG1hc2s9InVybCgjYykiIG9wYWNpdHk9Ii4wNSIvPjwvZz48cGF0aCBzdHJva2U9IiM1RjVGNjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI2IiBkPSJNOS4zNzQgMTguNzIyUzcuODY4IDExLjI4MyA3LjMyMyA4LjcxQzYuNzc4IDYuMTM2IDUuODYgNS4zMyAzLjk3OCA0LjUyIDIuMDk2IDMuNzEzLjM2NyAyLjI4Ni4zNjcgMi4yODYiLz48Y2lyY2xlIGN4PSI0NiIgY3k9IjUxIiB
                        yPSI0IiBmaWxsPSIjNUY1RjYzIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI1MSIgcj0iNCIgZmlsbD0iIzVGNUY2MyIvPjwvZz48L3N2Zz4="></el-button>
                    </el-badge>
                </div>
                <div class="workOutprice">
                    <h2>￥{{cart.price}}</h2>
                    <p>配送费￥{{shop.float_delivery_fee}}</p>
                </div>
                <div class="priceToSend" v-html="msg">
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
            imgVisible:false,
            currentFoodObj: {},
            currentImgObj:{},
            activeName:"1",
            msg:"",
            currentName:"",
            specPrice:"",
            isActive:false,
            showCar:false,
            isSellout: false,
            scrollTop:"",
            xhl:"",
            cart: {
                count: "",
                price: 0,
                menu: {}
            }
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/menu.json')
        .then(response=> {
            this.order = response.data;//定义数据
            this.currentName="热销";
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('http://localhost:8080/static/shop.json')
        .then(response=> {
            this.shop = response.data;
            this.msg='￥'+this.shop.float_minimum_order_amount+'起送';
            this.xhl="选好了";
        })
        .catch(function(error){
            console.log(error);
        })
        // debugger
        var right = document.getElementsByClassName('right_thing')[0];
        right.addEventListener('scroll', this.handleScroll);
    },
    methods:{
        openBigone:function(category_id, food_id){
            this.imgVisible=true;
            
            var category = null;
            for(var i=0; i<this.order.length; i++){
                if(this.order[i].id == category_id){
                    category = this.order[i];
                    
                    // 取得分类数据后，再循环遍历取得菜品对象
                    for(var f=0, len=category.foods.length; f<len; f++){
                        // 缓存当前菜品对象
                        var feed = null;
                        if(category.foods[f].virtual_food_id == food_id){
                            feed = category.foods[f];
                            this.currentImgObj = feed;
                            this.specPrice=this.currentImgObj.specfoods[0].price;
                        }
                    }
                }
            }
        },
        openDialog:function(category_id, food_id){
            this.buttonVisible=true;
            // console.log(category_id);
            // console.log(food_id);
            console.log(this.order);
            this.imgVisible=false;
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
            if(tab.$attrs.stock > 0){
                this.isSellout = false;
                this.xhl="选好了";
            }else{
                this.isSellout = true;
                this.xhl="已售完";
            }
        },
        addMoney:function(category_id, food_id){
            //  debugger
            
            if(this.isSellout == false){
                this.cart.price=Number(this.cart.price)+Number(this.currentFoodObj.specfoods[0].price);
                // var leo=document.getElementById("leo");操作DOM失败X2
                // this.leo = "false";无法更改因为显示函数在插件里已定死    v-if失败
                this.buttonVisible=false;//***
                this.cart.count++;
                if(this.cart.count>0){
                    this.isActive=true;
                }
                if(0<this.cart.price<this.shop.float_minimum_order_amount){
                    var least=this.shop.float_minimum_order_amount-this.cart.price;
                    this.msg="还差￥"+least+"起送"
                }
                if(this.cart.price>=this.shop.float_minimum_order_amount){
                    this.msg="<div style=background:#4cd964;height:100%;>去结算</div>"
                }
                // this.cart.menu[food_id]={
                //         category_id:category_id,
                //         prize:this.currentFoodObj.specfoods[0].price,
                //         count:0
                // }
                
                var shopcart =this.cart.menu;
                var flag = false; //菜单是否已存在，默认是不存在
                for(var item in shopcart){
                    if(item == food_id && shopcart[item].category_id == category_id){
                        flag = true;
                        // debugger
                        shopcart[food_id]={
                            name:this.currentFoodObj.name,
                            category_id:category_id,
                            count: shopcart[food_id].count+1,
                            prize: this.currentFoodObj.specfoods[0].price * (shopcart[food_id].count+1)
                        }
                    }
                }
                
            
            // 如果该菜品还未点过,则默认设置此次添加为第一份菜
            if(!flag){     //！表示取反
                shopcart[food_id]={
                    name:this.currentFoodObj.name,
                    category_id: category_id,
                    prize: this.currentFoodObj.specfoods[0].price,
                    count: 1
                }
            }
            console.log(shopcart);
            }
            
        },
        cut(category_id,food_id){
            var category = null;
            for(var i=0; i<this.order.length; i++){
                if(this.order[i].id == category_id){
                    category = this.order[i];
                    for(var f=0, len=category.foods.length; f<len; f++){
                        // 缓存当前菜品对象
                        var food = null;
                        if(category.foods[f].virtual_food_id == food_id){
                            food = category.foods[f];
                            this.currentFoodObj = food;
                        }
                    }
                }
            }
            this.cart.price-=this.currentFoodObj.specfoods[0].price;
            this.cart.count--;
            for(var item in this.cart.menu){
                if(item == food_id && this.cart.menu[item].category_id == category_id){
                    this.cart.menu[item].count--;
                    this.cart.menu[item].prize-=this.currentFoodObj.specfoods[0].price;
                    if(this.cart.menu[item].count<=0){
                        delete this.cart.menu[item];
                    }
                }
                console.log(this.cart.menu[item]);
            }
            if(0<this.cart.price<this.shop.float_minimum_order_amount){
                var least=this.shop.float_minimum_order_amount-this.cart.price;
                this.msg="还差￥"+least+"起送"
            }
            if(this.cart.price>=this.shop.float_minimum_order_amount){
                this.msg="<div style=background:#4cd964;height:100%;>去结算</div>"
            }
            if(this.cart.count<=0){
                this.cart.count="";
                this.isActive=false;
                this.showCar=false;
                this.msg='￥'+this.shop.float_minimum_order_amount+'起送';
            }
        },
        openBox(){
            if(this.cart.count>0){
                // this.showCar = !this.showCar;
                // debugger
                if(this.showCar){
                    this.showCar=false;
                }else{
                    this.showCar=true;
                }
                
            }
        },
        divide(category_id,food_id){
            // console.log(category_id);
            var category = null;
            for(var i=0; i<this.order.length; i++){
                if(this.order[i].id == category_id){
                    category = this.order[i];
                    for(var f=0, len=category.foods.length; f<len; f++){
                        // 缓存当前菜品对象
                        var food = null;
                        if(category.foods[f].virtual_food_id == food_id){
                            food = category.foods[f];
                            this.currentFoodObj = food;
                        }
                    }
                }
            }
            this.cart.price-=this.currentFoodObj.specfoods[0].price;
            this.cart.count--;
            for(var item in this.cart.menu){
                if(item == food_id && this.cart.menu[item].category_id == category_id){
                    this.cart.menu[item].count--;
                    this.cart.menu[item].prize-=this.currentFoodObj.specfoods[0].price;
                    if(this.cart.menu[item].count<=0){
                        delete this.cart.menu[item];
                    }
                }
            }
            if(0<this.cart.price<this.shop.float_minimum_order_amount){
                var least=this.shop.float_minimum_order_amount-this.cart.price;
                this.msg="还差￥"+least+"起送"
            }
            if(this.cart.price>=this.shop.float_minimum_order_amount){
                this.msg="<div style=background:#4cd964;height:100%;>去结算</div>"
            }
            if(this.cart.count<=0){
                this.cart.count="";
                this.isActive=false;
                this.showCar=false;
                this.msg='￥'+this.shop.float_minimum_order_amount+'起送';
            }
            
        },
        add(category_id,food_id){
            var category = null;
            for(var i=0; i<this.order.length; i++){
                if(this.order[i].id == category_id){
                    category = this.order[i];
                    for(var f=0, len=category.foods.length; f<len; f++){
                        // 缓存当前菜品对象
                        var food = null;
                        if(category.foods[f].virtual_food_id == food_id){
                            food = category.foods[f];
                            this.currentFoodObj = food;
                        }
                    }
                }
            }
            this.cart.price+=this.currentFoodObj.specfoods[0].price;
            this.cart.count++;
            for(var item in this.cart.menu){
                if(item == food_id && this.cart.menu[item].category_id == category_id){
                    this.cart.menu[item].count++;
                    this.cart.menu[item].prize+=this.currentFoodObj.specfoods[0].price;
                }
            }
            if(0<this.cart.price<this.shop.float_minimum_order_amount){
                var least=this.shop.float_minimum_order_amount-this.cart.price;
                this.msg="还差￥"+least+"起送"
            }
            if(this.cart.price>=this.shop.float_minimum_order_amount){
                this.msg="<div style=background:#4cd964;height:100%;>去结算</div>"
            }
        },
        clear(){
            this.showCar=false;
            this.cart.count="";
            this.cart.price=0;
            this.cart.menu={};
            this.isActive=false;
            console.log(this.cart.menu);
            this.msg='￥'+this.shop.float_minimum_order_amount+'起送';
        },
        handleScroll(){
            this.scrollTop = document.getElementsByClassName('right_thing')[0].scrollTop;
            if(this.scrollTop >=0 && this.scrollTop <= 100){
                this.currentName = "热销";
            }else if(this.scrollTop > 100 && this.scrollTop <= 1353){
                this.currentName = "优惠";
            }else if(this.scrollTop > 1353 && this.scrollTop <= 2600){
                this.currentName = "超值套餐为您优选！";
            }else if(this.scrollTop > 2600 && this.scrollTop <= 3653){
                this.currentName = "公告栏";
            }else if(this.scrollTop > 3653 && this.scrollTop <= 4212){
                this.currentName = "正新鸡排";
            }else if(this.scrollTop > 4212 && this.scrollTop <= 4903){
                this.currentName = "美味烤串";
            };
            console.log(this.currentName);
        },
        leftChange(name){
            var list = document.getElementsByClassName('right_thing')[0];
            // debugger
            this.currentName = name;
            this.scrollTop = list.scrollTop;
            if(name == "热销"){
                list.scrollTop = 0;
            }
            if(name == "优惠"){
                list.scrollTop = 1340;
            }
            if(name == "超值套餐为您优选！"){
                list.scrollTop = 2545;
            }
            if(name == "公告栏"){
                list.scrollTop = 3620;
            }
            if(name == "正新鸡排"){
                list.scrollTop = 4168;
            }
            if(name == "美味烤串"){
                list.scrollTop = 4848;
            }

            console.log(this.currentName);
        }
        // goAnchor(selector){
        //     // debugger
        //     var anchor = this.$el.querySelector(selector);
        //     this.scrollTop = document.getElementsByClassName('right_thing')[0].scrollTop;
        //     this.scrollTop = anchor.offsetTop;
        // }
        // leftA(name){
        //     // debugger
        //     console.log(name);
        //     this.scrollTop = document.getElementsByClassName('right_thing')[0].scrollTop;
        //     if(name == "热销"){
        //         this.scrollTop = 0;
        //     }
        //     if(name == "优惠"){
        //         this.scrollTop = 1353;
        //     }
        //     if(name == "超值套餐为您优选！"){
        //         this.scrollTop = 2500;
        //     }
        //     if(name == "公告栏"){
        //         this.scrollTop = 3653;
        //     }
        //     if(name == "正新鸡排"){
        //         this.scrollTop = 4212;
        //     }
        //     if(name == "美味烤串"){
        //         this.scrollTop = 4903;
        //     }
        // }
    }
}
</script>
<style type="text/css">
.left_tb{
    display:inline-block;
    width:22%;
    background:#f8f8f8;
    height:700px;
    float:left;
}
.lili{
    display:block;
    list-style:none;
    font-size:14px;
    padding:15px 7%;
}
.lione{
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
.ulist .el-button{
    width:29%;
    padding:0;
    float:left;
}
.ulist .el-button img{
    width:100%;
    border-radius:2px;
}
.llist{
    display:inline-block;
    width:67%;
    margin-left:10px;
}
.llist .el-button{
    width:100%;
    text-align:left;
    border:none;
}
.listDiv{margin-top:-20px;}
.listDiv .el-button{
    padding:0;
    width:auto;   
    float:none;
    text-align:right;
}
.llist .el-button h2{
    display:inline-block;
    margin:0;
    font-size:16.5px;
}
.spoke{
    white-space:nowrap;
    overflow:hidden;
    font-size:10px;
    margin:8px 0 !important;
    color:#999;
    text-overflow:ellipsis;
}
.sell{
    font-size:12px;
    color:#333;
    margin:8px 0;
}
.llist .el-button span{
    color:#f60;
    font-size:14px;
    line-height:16px
}
.llist .el-button h2{
    width:185px;
    overflow:hidden;
    text-overflow:ellipsis;  
}
button{
    color:#fff;
    border-radius:15px;
    font-size:14px;
    background:#3199e8;
    border:1px solid #3199e8;
    padding:3px 5px;
}
.bigStuff .el-dialog__header{
    padding:0;
}
.bigStuff .el-dialog__body{
    width:100%;
    padding:0;
    overflow:scroll;
}
.bigStuff .el-dialog__body img{
    width:100%;
}
.bigStuff .el-dialog{
    margin:18vh 8% 0 8% !important;
    width:84%;
    border-radius:7px;
    height:460px;
    overflow:hidden;
    position:absolute;
}
.bigStuffdiv{
    padding:0 10px;
    text-align:left;
}
.bigStuffdiv h2{
    margin-bottom:0;
    font-size:15px;
}
.bigStuffdiv p{
    font-size:13px;
}
.bgStfSpan{
    color:#f60;
    float:left;
    display:inline-block;
    position:absolute;
    bottom:10px;
    left:10px;  
}
.bigStuffdiv .el-button{
    float:right;
    padding:0;
    position:absolute;
    bottom:10px;
    right:10px;
}
.describe{
    font-size:12px;
    text-align:left;
    position:absolute;
    bottom:25%;
    color:#ddd;
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
.sellout h2{
    background:#ccc !important;
}
.littleD2 h2{
    color:#fff;
    padding:6px;
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
    text-align:right;
}
.workOutprice h2{
    margin:0;
    color:#fff;
    line-height:30px;
    font-size:17px;
}
.workOutprice{
    text-align:left;
    width:50%;
    margin:0 auto;
    display:inline-block;
    height:57px;
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
    color:#fff;
    height:57px;
    line-height:55px;
    font-weight:bold;
    font-size:18px;
}
.car{
    display:inline-block;
    position:fixed;
    bottom:10px;
    left:10px;
    width:60px;
    height:60px;
    border-radius:50%;
    background:rgba(61,61,63,.9);
}
.showCar{
    width:100%;
    background:#fff;
    max-height:240px;
    overflow:scroll;
}
.showCar ul{
    padding-bottom:30px;
}
.car span{
    display:block;
    width:25px;
    height:25px;
    position:relative;
    right:5px;
}
.car img{
    width:25px;
    height:25px;
}
.car .el-button{
    border:none;
    border-radius:50%;
    height:45px;
    width:45px;
    position:relative;
    right:7px;
    top:7px;
    background:#363636;
}
.active{background:#3190e8 !important;}
.car .el-badge__content.is-fixed{
    right:16px;
    top:10px;
}
.delete{
    display:inline-block;
    vertical-align:middle;
}
.deleteSpan{
    font-size:20px;
    width:15px;
    height:15px;
    display:inline-block;
    border:1px solid #3190e8;
    border-radius:50%;
    line-height:15px;
    text-align:center;
}
.alreadyChoose{
    background:#eceff1;
    padding:0 3%;
    margin:0;
    text-align:left;
}
.alreadyChoose h2{
    margin:0;
    padding:8px 0;
    display:inline-block;
}
.alreadyChoose p{
    display:inline-block;
    padding:8px 0;
    float:right;
}
.goods{
    list-style:none;
    text-align:right;
    padding:10px;
}
.goods div{
    display:inline-block;
    width:auto;
    text-align:center;
}

.goodsLast span{
    width:10%;
    font-size:16px;
    border:none;
    text-align:center;
}
.goodsLast p{
    width:20px;
    height:20px;
    display:inline-block;
    line-height:18px;
    font-size:20px;
    text-align:center;
    background:#fff;
    border:1px solid #2395ff;
    border-radius:50%;
    color:#666;
    margin:0 10px;
}
.foodBox{
    padding:0 10px;
    text-align:left;
}
.foodBox h2{
    display:inline-block;
}
.foodBox :last-child{
    margin-left:50%;
}

</style>
