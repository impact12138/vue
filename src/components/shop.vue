<template>
  <div class="hello">
    <div>
      <img v-bind:src="shop.imageURL" class="hellopic1"/>
      <img v-bind:src="shop.imgpath" class="hellopic2"/>
    </div>
    
      <div class="fst_div">
      <el-button type="text" @click="centerDialogVisible = true">
        <h1><span class="brand">品牌</span> {{ shop.name }}</h1>
        <p>{{shop.float_delivery_fee}} 月售{{ shop.recent_order_num }}单 {{shop.delivery_mode.text}} 约{{shop.order_lead_time}}分钟&nbsp;
        距离{{shop.distance}}km</p>
        <p class="div_sp">{{shop.promotion_info}}</p>
        </el-button>
      </div>
    <el-button type="text" @click="DialogVisible = true">
      <div class="snd_div">
        <span>首单 </span>
        <span> {{shop.activities[0].description}} </span>
        <span> 9个优惠▼</span>
      </div>
    </el-button>
    <div class="bigone">
      <el-dialog :visible.sync="centerDialogVisible" :show-close="false">
        <div class="clickme">
          <h1><span class="brand">品牌</span> {{ shop.name }}</h1>
          <ul>
              <li>
                  <h2>{{shop.float_delivery_fee}}</h2>
                  <p>评分</p>
              </li>
              <li>
                  <h2>{{ shop.recent_order_num }}</h2>
                  <p>月售</p>
              </li>
              <li>
                  <h2>{{shop.delivery_mode.text}}</h2>
                  <p>约{{shop.order_lead_time}}分钟</p>
              </li>
              <li>
                  <h2>{{shop.float_delivery_fee}}</h2>
                  <p>配送费</p>
              </li>
              <li>
                  <h2>{{shop.distance}}m</h2>
                  <p>距离</p>
              </li>
          </ul>
          <p class="clickp">--公告--</p>
          <p class="div_sp">{{shop.promotion_info}}</p>
        </div>
      </el-dialog>
    </div>
    <div class="bottomone">
      <el-dialog :visible.sync="DialogVisible">
        <div class="bottomTip">
          <h1>优惠活动</h1>
          <ul>
            <li v-for="(item,index) in shop.activities"><span v-bind:style="{background:sth[index]}">{{item.icon_name}}</span> &nbsp;{{item.tips}}</li>
          </ul>
        </div>
      </el-dialog>
    </div>
    <tab></tab>
  </div>
</template>
<script>
import axios from 'axios';
import tab from './tab';
export default {
  name: 'shop',
  components: {
    tab
  },
  data () {
    return {
      shop: null,
      centerDialogVisible: false,
      DialogVisible:false,
      sth:[]
    };
  },
  mounted(){
    axios.get('http://localhost:8080/static/shop.json')
    .then(response => {
        this.shop = response.data;
        for(var i=0;i<this.shop.activities.length;i++){
          this.sth.push("#" + this.shop.activities[i].icon_color);
        }
    })
    .catch(function (error) {
        console.log(error);
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-button{
  display:block;
  padding:0;
  margin:0 auto;
  float:none;
  width:100%;
}
h1{
  font-size:25px;
  color:#333;
  margin:8px 0;
}
.hellopic1{
  height:26vw;
  width:100%;
}
.hellopic2{
  width:17%;
  border:0.8px solid #ccc;
  border-radius:1px;
  margin-top:-13vw;
}
.fst_div{
  width:100%;
  height:80px;
  text-align:center;
}
.fst_div p{
  line-height:20px !important;
}
.brand{
  background:#fff100;
  color:#6a3709 !important;
  font-size:12px;
  display:inline-block;
  padding:2px 4px;
  position:relative;
  bottom:3px;
}
.div_sp{
  color:#999;
  overflow:hidden;
  text-overflow: ellipsis;
  font-size:11px;
  width:90%;
  margin:0 auto;
  white-space:nowrap;
}
.el-button--text{color:#333;}
.el-button--text:focus, .el-button--text:hover {
  color:#333;
  background:#fff;
}
.snd_div{
  width:90%;
  height:7vw;
  margin:2vw auto;
  padding:0;
  text-align:left;
  border:0.5px solid rgb(245, 245, 245);
  line-height:7vw;
  font-size:11px;
}
.snd_div :first-child{
  background:#000;
  margin:0 2%;
  background-color: rgb(112, 188, 70);
  padding:0 0 1px 3px;
  color:#fff;
  font-size:11px;
  border-radius:2px;
}
.snd_div :last-child{
  float:right;
  margin-right:2%;
}
h2{
  font-size:18px;
  margin:15px 0;
  color:#333;
  text-align:left;  
}
.clickme{
    width:100%;
    border-radius:5px;
    margin:0 auto;
}
.brand{
  background:#fff100;
  color:#6a3709;
  font-size:12px;
  display:inline-block;
  padding:2px 4px;
  position:relative;
  bottom:3px;
}
.clickme li{
    list-style:none;
    padding:0 3%;
    display:inline-block;
    text-align:center;
    margin-bottom:10px;
}
.clickme li p{
    color:f8f8f8;
}
.clickme h2{
    font-size:17px;
    margin:0;
    text-align:center;
}
.clickp{
    margin:10px 0;
    color:f8f8f8;
}
.bottomTip{
    text-align:left;
    font-size:13px;
    width:100%;
    height:270px;
}
.bottomTip ul{
    height:220px;
    overflow:scroll;
    padding:0 5%;
}
.bottomTip ul li{
  list-style:none;
  padding:3px 0;
  line-height:25px;
  color:#333;  
}
.bottomTip ul li span{
   background-color:#000;
   color:#fff;
   border-radius:1px;
   font-size:12px;
   padding:2px 4px;
}
.bottomTip h1{
  font-size:18px;
  margin:17px 0;
  color:#333;
  text-align:center;
}
</style>
