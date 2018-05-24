<template>
    <div class="try">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" id="try_id">
            <el-tab-pane :label="value[0]" name="first"><all></all></el-tab-pane>
            <el-tab-pane :label="value[1]" name="second"><myi></myi></el-tab-pane>
            <el-tab-pane :label="value[2]" name="third"><bmy></bmy></el-tab-pane>
            <el-tab-pane :label="value[3]" name="fourth"><ytu></ytu></el-tab-pane>
            <el-tab-pane :label="value[4]" name="fifth"><wdh></wdh></el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import axios from 'axios';
import all from './snd_tab/all';
import myi from './snd_tab/myi';
import bmy from './snd_tab/bmy';
import ytu from './snd_tab/ytu';
import wdh from './snd_tab/wdh';
export default{
    name:'btn',
    components:{
        all,
        myi,
        bmy,
        ytu,
        wdh
    },
    data(){
        return{
            tags: null,
            activeName2: 'first',
            value:[]
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/tags.json')
        .then( response=> {
            this.tags = response.data;
            for(var i=0;i<this.tags.length;i++){
                this.value.push(this.tags[i].name + "(" +this.tags[i].count +")");
            }
        })
        .catch(function(error){
            console.log(error);
        })
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>
<style type="text/css">
.el-tabs__content{
    overflow:scroll !important;
    height:680px;
}
#try_id .el-tabs__nav{
    white-space:pre-wrap !important;
    border:none !important;
    width:90%;
    margin:5px 5%;
}
#try_id .el-tabs__item{
    border:1px solid #ebf5ff !important;
    border-radius:4px;
    color: #6d7885;
    height:32px;
    line-height:25px;
    background-color: #ebf5ff;
    padding:2px 4px;
    font-size:13px;
    width:23% !important;
    margin:10px 5px 0 0;
    float:left;
}
#try_id .el-tabs__header{border-bottom:none;}
#try_id .el-tabs__item:hover {
    color: #fff;
    cursor: pointer;
    background:#0097ff;
}
#try_id .el-tabs__item:active{
    color: #fff;
    cursor: pointer;
}
#try_id .el-tabs__item.is-active{
    color: #fff;
    cursor: pointer;
    background:#0097ff;
}
#try_id #tab-third{
    color:#aaa;
    background:#f5f5f5;
}
#try_id #tab-third:hover{
    color:#fff;
    background:#ccc;
    cursor: pointer;
}
.el-tabs__nav-prev{display:none;}
.el-tabs__nav-next{display:none;}
</style>