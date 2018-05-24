<template>
    <ul class="allul">
        <li class="alli" v-for="(item,index) in rating">
            <img class="alli_fst" src="https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/">
            <div>
                <span class="fst_span">{{item.username}}</span> <span class="fst_span" style="font-size:11px;line-height:18px;padding-left:5px">{{item.rated_at}}</span><br>
                <el-rate
                    v-model="value5[index]"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
                <p>{{item.rating_text}}</p>
                <ul>
                    <li v-for="sth in rating[0].food_ratings" class="tips">{{sth.rate_name}}</li>
                </ul>
            </div>
        </li>
    </ul>
</template>
<script>
import axios from 'axios';
export default{
    name: 'wdh',
    data(){
        return{
            rating:null,
            value5:[]
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/ratingsfour.json')
        .then( response=> {
            this.rating = response.data;
            for(var i=0; i<this.rating.length; i++){
                this.value5.push(this.rating[i].rating);
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
}
</script>
<style scoped>
.allul{
    width:100%;
}
.alli{
    text-align:left;
    list-style:none;
    width:90%;
    padding:20px 5%;
    border-top:1px solid rgb(245, 245, 245);
}
.alli_fst{
    width:9%;
    float:left;
}
.el-rate{
    width:120px !important;
    padding:0 !important;
    overflow:hidden;
    height:19px;
    margin:0;
    transform:scale(0.8,0.8) translate(-15px);
}
.fst_span{
    font-size:13px;
    float:left;
}
.alli div{
    display:inline-block;
    padding-left:15px;
    width:81%;
    text-align:left;
    font-size:13.5px
}
.alli div p{
    margin-bottom:5px;
}
.judgepic{
    padding:0 !important;
    width:100% !important;
    margin-top:10px;
    margin-bottom:5px;
}
.judgepic img{
    width:26%;
    margin-right:2%;
}
.judgement{
    float:left; 
}
.tips{
    width:25%;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    display:inline-block;
    padding:3px;
    text-align:center;
    font-size:12px;
    border:1px solid rgb(245, 245, 245);
    margin-right:5px;
}
</style>