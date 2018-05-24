<template>
    <div class="clickme">
        <h1><span class="brand">品牌</span> {{ metal.name }}</h1>
        <ul>
            <li>
                <h2>{{metal.float_delivery_fee}}</h2>
                <p>评分</p>
            </li>
            <li>
                <h2>{{ metal.recent_order_num }}</h2>
                <p>月售</p>
            </li>
            <li>
                <h2>{{metal.delivery_mode.text}}</h2>
                <p>约{{metal.order_lead_time}}分钟</p>
            </li>
            <li>
                <h2>{{metal.float_delivery_fee}}</h2>
                <p>配送费</p>
            </li>
            <li>
                <h2>{{metal.distance}}m</h2>
                <p>距离</p>
            </li>
        </ul>
        <p class="clickp">--公告--</p>
        <p class="div_sp">{{metal.promotion_info}}</p>
    </div>
</template>
<script>
export default{
    name:'show',
    props:['metal']
}
</script>
<style scoped>
.clickme{
    width:90%;
    border:1px solid #ccc;
    border-radius:5px;
    z-index:10;
    position:absolute;
    left:5%;
    top:185px;
    background:#fff;
    box-shadow:5px 5px 5px #ccc;
}
h1{
  font-size:25px;
  color:#333;
  margin:20px 0;
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
li{
    list-style:none;
    padding:0 3%;
    display:inline-block;
    text-align:center;
    margin-bottom:10px;
}
li p{
    color:f8f8f8;
}
h2{
    font-size:17px;
    margin:0;
    text-align:center;
}
.clickp{
    margin:10px 0;
    color:f8f8f8;
}
.div_sp{
    padding-bottom:30px;
    font-size:13px;
    color:#000;
}
</style>