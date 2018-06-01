<template>
<div class="talk_area" v-if="scores">
    <ul class="talk_fst">
        <li class="fst_li">
            <p>{{scores.overall_score.toFixed(1)}}</p>
            <p>综合评价</p>
            <p>高于周边商家{{scores.compare_rating | toInt}}%</p>
        </li>
        <li class="snd_li">
            <div>
                <span style="float:left;margin-right:4px;">服务态度</span>
                <el-rate
                    v-model="scores.service_score.toFixed(1)"
                    disabled
                    text-color="#ff9900"
                    vertical="middle"
                    score-template="{value}">
                </el-rate> 
                <span style="color:#f60;display:inline-block;float:left;">{{scores.service_score.toFixed(1)}}</span>
            </div>
            <div>
                <span style="float:left;margin-right:4px;">菜品评价</span> 
                <el-rate
                    v-model="scores.service_score.toFixed(1)"
                    disabled
                    text-color="#ff9900"
                    vertical="middle"
                    score-template="{value}">
                </el-rate> 
                <span style="color:#f60;display:inline-block;float:left;">{{scores.food_score.toFixed(1)}}</span>
            </div>
            <div style="float:left"><span>送达时间</span> &nbsp;{{deliver_time}}</div>
        </li>
    </ul>
    <btn></btn>
    
</div>
</template>
<script>
import axios from 'axios';
import btn from './btn';
export default{
    name:'talk',
    components:{
        btn,
        deliver_time:""
    },
    data(){
        return{
            scores:null
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/scores.json')
        .then(response => {
        this.scores = response.data;
        if(this.scores.deliver_time>=60){
            this.deliver_time=(this.scores.deliver_time / 60).toFixed(2) + "小时";
        }else{
            this.deliver_time=this.scores.deliver_time + "分钟";
        }
        })
        .catch(function(error){
        console.log(error);
        })
    },
    filters:{
        toInt:function(value){
            return (value*100).toFixed(1);
        }
    }
}
</script>
<style scoped>
.talk_fst{
    font-size:14px;
    height:95px;
    width:100%;
    border-bottom:11px solid rgb(245, 245, 245);
    text-align:left;
}
.talk_area{
    padding-top:15px;
    overflow:scroll;
    height:680px;
}
.fst_li{
    width:35%;
    list-style:none;
    display:inline-block;
    text-align:center;
    float:left;
    margin:5px 0;
    border-right:0.5px solid rgb(245, 245, 245);
}
.fst_li :first-child{
    font-size:23px;
    font-weight:bold;
    color:#ff6000;
}
.fst_li :last-child{
    color:#999;
    font-size:11px;
}
.snd_li{
    width:auto;
    margin-left:5%;
    list-style:none;
    line-height:25px;
    text-align:left;
    display:inline-block;
}
.snd_li .el-rate{
    display:inline-block;
}
</style>