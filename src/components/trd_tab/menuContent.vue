<template>
    <div class="menuTitle">
        <div>
            <span v-for="(item,index) in MenuContent.name" class="title_p">{{item}}</span>
            <span v-for="(item,index) in MenuContent.description" class="title_t">{{item}}</span>
        </div>
        <ul>
            <li v-for="(item,index) in MenuContent">
                <img :src="item.foods.image_path">
                <div>
                    <h2>{{item.foods.name}}</h2>
                    <p class="spoke">{{item.foods.description}}</p>
                    <p class="sell">月售{{item.foods.month_sales}}份 好评率{{item.foods.satisfy_rate}}%</p>
                    <span>￥<span style="font-weight:bold;font-size:18px;">{{item.foods.specfoods[0].price}}</span> 起</span>
                    <button>选规格</button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default{
        name:'menuContent',
        props:['MenuContent'],
        data(){
            return{}
        }
    }
</script>
<style scoped>
.menuTitle{
    text-align:left;
}
.title_p{
    font-size:14px;
    font-weight:bold;
}
.title_t{
    font-size:11px;
    color:#999;
}
ul{
    margin-top:10px;
}
ul img{
    width:28%;
    float:left;
    border-radius:2px;
}
ul li{
    padding:10px 10px 30px 0;
}
li div{
    display:inline-block;
    width:67%;
    margin-left:10px;
}
h2{
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
li div span{
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