<template>
    <div class="shoppingCart">
        <div class="shoppingDescription">
            <p>{{shopping.activities[1].description}}</p>
        </div>
        <div class="workOutArea">
            <div class="workOutprice">
                <h2>￥{{price}}</h2>
                <p>配送费￥{{shopping.float_delivery_fee}}</p>
            </div>
            <div class="priceToSend">
                <h2>￥{{shopping.float_minimum_order_amount}}起送</h2>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:'totalPrice',
    props:['shopping'],
    data(){
        return{
            price:""
        }
    }
}
</script>
<style scoped>
.shoppingCart{
    width:100%;
    position:fixed;
    bottom:0;
    height:80px;
}
.shoppingDescription{
    width:100%;
    height:25px;
    line-height:25px;
    font-size:12px;
    background:#fffad6;
}
.workOutArea{
    width:100%;
    background:rgba(61,61,63,.9);
    height:75px;
    text-align:right;
}
.workOutprice h2{
    margin:0;
    color:#fff;
    line-height:30px;
}
.workOutprice{
    text-align:left;
    width:50%;
    margin:0 auto;
    display:inline-block;
    height:75px;
}
.workOutprice p{
    line-height:15px;
    font-size:12px;
    color:#999;
}
.priceToSend{
    text-align:center;
    width:30%;
    float:right;
    height:75px;
}
.priceToSend h2{
    margin:0;
    color:#fff;
    text-align:center;
    padding:12% 0;
}
</style>