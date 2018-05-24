<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="trd_div" id="trd_id">
      <el-tab-pane label="点餐" name="first"><order></order></el-tab-pane>
      <el-tab-pane label="评价" name="second"><talk></talk></el-tab-pane>
      <el-tab-pane label="商家" name="third"><seller></seller></el-tab-pane>
    </el-tabs>
</template>
<script>
import seller from './seller';
import talk from './talk';
import order from './order';
export default{
    name: 'tab',
    components:{
        seller,
        talk,
        order
    },
    data(){
        return {
            activeName: 'first'
        }
    },
    methods:{
    handleClick(tab,event){
      console.log(tab,event);
    }
  }
}
</script>
<style type="text/css">
.trd_div{
  width:100%;
  margin-top:20px;
  font-size:16px;
  }
#trd_id .el-tabs__header{
    margin-bottom:0;
}
.el-tabs__active-bar{
    width:34% !important;
}
.el-tabs__nav{
    width:100%;
}
.el-tabs__item:hover{
    color:#000;
}
.el-tabs__header .el-tabs__item{
    width:33%;
    padding:0;
}
</style>