<template>
    <div class="try">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane 
            :label="item.name+'('+item.count+')'" 
            :name="index"
            :key="item.name"
            v-for="(item,index) in tags">
            <judge :data="msg"></judge>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import axios from 'axios';
import judge from './snd_tab/judge';
export default{
    name:'btn',
    components:{
        judge
    },
    data(){
        return{
            tags: null,
            activeName: '0',
            msg:null
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/tags.json')
        .then( response=> {
            this.tags = response.data;
        })
        axios.get('http://localhost:8080/static/rating.json')
        .then( response=> {
            this.msg = response.data;
        })
    },
    methods: {
      handleClick(tab,event) {
        // this.currentName=tab.name;
        // console.log(this.currentName);
        // this.currentName= name;
        // debugger
        var tabName = tab.name;
        var url = "";
        if(tabName=="0" || tabName=="3"){
            url = "http://localhost:8080/static/rating.json";
        }else if(tabName=="1"){
            url = 'http://localhost:8080/static/ratingsTwo.json';
        }else if(tabName=="2"){
            url = 'http://localhost:8080/static/ratingsThree.json';
        }else if(tabName=="4"){
            url = 'http://localhost:8080/static/ratingsfour.json';
        }

        axios.get(url)
            .then( response=> {
                this.msg = response.data;
            })
        
        console.log(this.msg[0].order_id);
      }
    }
}
</script>
<style type="text/css">
.try .el-tabs{
    display:inline-block;
    width:100%;
}
.try .el-tabs__nav-scroll{
    width:auto;
}
.try .el-tabs__header{
    border:none;
    margin:0;
}
.try .el-tabs__nav{
    white-space:pre-wrap !important;
    border:none !important;
    width:90%;
    margin:5px 5%;
}
.try .el-tabs__nav-prev{
    display:none;
}
.try .el-tabs__nav-next{
    display:none; 
}
.try .el-tabs__nav-wrap{
    padding:0;
    text-align:center;
    overflow:inherit;
    width:100%;
    display:inline-block;
}
.try .el-tabs__item{
    border:1px solid #ebf5ff !important;
    border-radius:4px;
    color: #6d7885;
    height:32px;
    line-height:25px;
    background-color: #ebf5ff;
    padding:2px 8px !important;
    font-size:13px;
    width:auto !important;
    margin:10px 4% 0 0;
    float:left;
}
.try .el-tabs__item:hover {
    color: #fff;
    cursor: pointer;
    background:#0097ff;
}
.try .el-tabs__item.is-active{
    color: #fff;
    cursor: pointer;
    background:#0097ff;
}
.try #tab-2{
    color:#aaa;
    background:#f5f5f5;
}
.try #tab-2:hover{
    color:#fff;
    background:#ccc;
    cursor: pointer;
}
.try #tab-2.is-active{
    color:#fff;
    background:#ccc;
    cursor: pointer;
}
</style>