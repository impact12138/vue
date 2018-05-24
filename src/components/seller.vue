<template>
  <div class="shop_area">
      <div class="fth_div">
        <h2>配送信息</h2>
        <p><span>{{shop.delivery_mode.text}}</span>&nbsp; 约{{shop.order_lead_time}}分钟送达，距离{{shop.distance}}km</p>
        <p>{{shop.piecewise_agent_fee.description}}</p>
      </div>
      <div class="fif_div">
        <h2>活动与服务</h2>
        <ul>
          <li v-for="(item,index) in shop.activities"><span v-bind:style="{background:sth[index]}">{{item.icon_name}}</span> &nbsp;{{item.tips}}</li>
        </ul>
      </div>
      <div class="six_div">
        <h2>商家实景</h2>
        <img v-bind:src="shop.cover_img" class="hellopic3" />
        <p>{{shop.albums[0].name}}({{shop.albums[0].count}}张)</p>
      </div>
      <div class="sve_div">
        <h2>商家信息</h2>
        <p>暂无简介</p>
        <p class="sve_p">品类<span>{{shop.flavors[0].name}}、{{shop.flavors[1].name}}</span></p>
        <p class="sve_p">商家电话<span>{{shop.phone}}></span></p>
        <p class="sve_p">地址<span>{{shop.address}}</span></p>
        <p class="sve_p">营业时间<span>{{shop.opening_hours[0]}}</span></p>
      </div>
      <div class="ate_div">
        <h2>营业资质<span>></span></h2>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'seller',
  data () {
    return {
      shop: null,
      sth:[]
    }
    
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
}
</script>
<style>
h2{
  font-size:18px;
  margin:15px 0;
  color:#333;
  text-align:left;  
}
.fth_div{
  text-align:left;
  font-size:15px;
  width:90%;
  padding:0px 5% 30px 5%;
  border-bottom:11px solid rgb(245, 245, 245);
}
.fth_div p{
  line-height:25px;
  color:gray;  
}
.fth_div p span{
  color:#fff;
  border-radius:3px;
  background:#0097ff;
  font-size:12px;
  padding:2px 4px;
}
.fif_div{
  text-align:left;
  font-size:15px;
  width:90%;
  padding:0 5% 30px 5%;
  border-bottom:11px solid rgb(245, 245, 245);
}
.fif_div ul li{
  list-style:none;
  padding:3px 0;
  line-height:25px;
  color:gray;  
}
.fif_div ul li span{
   background-color:#000;
   color:#fff;
   border-radius:1px;
   font-size:12px;
   padding:2px 4px;
}
.six_div{
  text-align:left;
  font-size:15px;
  width:90%;
  padding:0 5% 30px 5%;
  border-bottom:11px solid rgb(245, 245, 245);
}
.sve_div,.ate_div{
  text-align:left;
  font-size:15px;
  width:90%;
  padding:0 5%;
  border-bottom:11px solid rgb(245, 245, 245);
}
.six_div p{
  color:#fff;
  background:#000;
  width:25%;
  text-align:center;
  margin-top:-25px;
}
.hellopic3{
  width:25%;
}
.sve_div p{padding-bottom:20px;}
.sve_p{
  font-weight:bold;
  padding:15px 0;
  border-top:1px solid rgb(245, 245, 245);
}
.sve_p span{
  float:right;
  font-weight:normal;
  color:gray;
}
.ate_div h2 span{
  float:right;
  color:#ccc;
  font-size:30px;
  line-height:20px;
}
</style>
