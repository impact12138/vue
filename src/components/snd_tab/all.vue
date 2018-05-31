<template>
    <ul class="allul">
        <li class="alli" v-for="(item, index) in ratings">
            <img class="alli_fst" src="https://fuss10.elemecdn.com/c/f5/d0b0f2fc83f3ac3e4a0cfae891256png.png?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/">
            <div>
                <span class="fst_span">{{item.username}}</span> <span class="fst_span" style="font-size:11px;line-height:18px;padding-left:5px">{{item.rated_at}}</span><br>
                <el-rate
                    v-model="value[index]"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>
                <p>{{item.rating_text}}</p>
                <div class="judgepic" v-for="picMenu in judgeSrc[index]">
                    <img :src="picMenu">
                </div>
                <ul>
                    <li class="tips" v-for="userMemu in word[index]">
                        {{userMemu}}
                    </li>
                </ul>
            </div>
        </li>
        <!--<li v-for="foodArr in item"><span class="tips">{{foodArr}}</span></li>-->
    </ul>
</template>
<script>
import axios from 'axios';
export default{
    name: 'all',
    data(){
        return{
            ratings: null,
            value: [],
            judgeSrc:[],
            word:[]
        }
    },
    mounted(){
        axios.get('http://localhost:8080/static/rating.json')
        .then( response=> {
            
            this.ratings = response.data;
            
            for(var i=0; i<this.ratings.length; i++){
                this.value.push(this.ratings[i].rating);
                var currentCommentRate=this.ratings[i].food_ratings;
                var one=this.ratings[i].order_images;
                var such = [];
                for(var j=0;j<one.length;j++){
                    such.push(one[j].image_hash);
                }
                this.judgeSrc.push(such);
                // 遍历得到每个用户的菜单（数组），并将所有用户的菜单存入另一个数组，得到一个二维数组
                var userMenuArray = [];
                // [
                //     ["menu1", "menu2"],                二维数组
                //     ["menu1", "menu2", "menu3"]
                // ]
                for(var k=0;k<currentCommentRate.length;k++){
                    userMenuArray.push(currentCommentRate[k].rate_name);
                }
                this.word.push(userMenuArray);
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
.judgepic{
    padding:0 !important;
    width:30% !important;
    margin-top:10px;
    margin-bottom:5px;
    display:inline-block;
}
.judgepic img{
    width:90%;
    margin-right:2%;
}
.judgement{
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
.alli div p{
    margin-bottom:5px;
}
.tips{
    width:23%;
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