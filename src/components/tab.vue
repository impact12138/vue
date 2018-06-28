<template>
    <div class="tab" id="tab">
        <div class="tabSingle">
            <router-link to="/order">点餐</router-link>
        </div>
        <div class="tabSingle">
            <router-link to="/talk">评价</router-link>
        </div>
        <div class="tabSingle">
            <router-link to="/seller">商家</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default{
    name: 'tab',
    data(){
        return {
            
        }
    },
    methods:{
    handleClick(tab,event){
    //   console.log(tab,event);
    }
  }
}
</script>
<style type="text/css">
.tab{
    width:100%;
    height:40px;
    border-bottom:1.5px solid #f8f8f8;
}
.tabSingle{
    width:32.5%;
    display:inline-block;
    line-height:40px;
}
.tabSingle a{
    text-decoration: none;
    color:#666;
    display:block;
    width:100%;
    font-size:15px;
    height:100%;
}
.active1{
    color:#333;
    font-weight:bold;
    border-bottom:2px solid #3199e8;
}
</style>