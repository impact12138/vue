<template>
    <div class="bottomTip">
        <h1>优惠活动</h1>
        <ul>
          <li v-for="(item,index) in sub.activities"><span v-bind:style="{background:sth[index]}">{{item.icon_name}}</span> &nbsp;{{item.tips}}</li>
        </ul>
    </div>
</template>
<script>
export default{
    name:'free',
    props:['sub'],
    data(){
        return{
            sth:[]
        }
    },
    mounted(){
        for(var i=0;i<this.sub.activities.length;i++){
          this.sth.push("#" + this.sub.activities[i].icon_color);
        }
  } 
}
</script>
<style scoped>
.bottomTip{
    text-align:left;
    font-size:13px;
    width:100%;
    position:fixed;
    bottom:0;
    background:#fff;
    height:250px;
    z-index:10;
    border-top:1px solid #f8f8f8;
}
.bottomTip ul{
    height:230px;
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
h1{
  font-size:18px;
  margin:17px 0;
  color:#333;
  text-align:center;
}
</style>