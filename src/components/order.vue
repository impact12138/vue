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
                            <el-button type="text" @click="openDialog(item.virtual_food_id)">
                                <button :id="item.virtual_food_id">选规格</button>
                            </el-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <totalPrice :shopping="shop"></totalPrice>
        <el-dialog :visible.sync="buttonVisible">
            <ul>
                <li v-for="bar in buttonForm">
                    <h2>{{bar.name}}</h2>
                </li>
            </ul>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import totalPrice from './trd_tab/totalPrice';
export default{
    name:"order",
    components:{
        totalPrice
    },
    data(){
        return{
            tabPosition: 'left',
            order:null,
            shop:null,
            buttonVisible:false,
            buttonForm:{},
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
        openDialog:function(id){
            this.buttonVisible=true;
            console.log(id);
            for(var i=0;i<this.order.length;i++){
                var sub=this.order[i].foods;
                // var such=[];
                for(var j=0;j<sub.length;j++){
                    if(id=sub[j].virtual_food_id){
                        this.buttonForm=sub[j];
                    }
                }
            }
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
</style>
