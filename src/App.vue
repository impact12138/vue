<template>
  <div id="app">
    <shop></shop>
  </div>
</template>
<script>
import shop from './components/shop';
export default {
  name: 'App',
  components: {
    shop
  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
.snd_li .el-rate{
  float:left;
  margin:3px 0;
}
body{
  margin:0;
  padding:0;
  font-size: .293333rem;
  text-align:center;
  color:#666;
}
@media screen and (max-width:360px) {
    body{
      font-size:10px;
      width:360px;
    }
    .fth_div{
      font-size:14px !important;
    }
    .fif_div{
      font-size:12.5px !important;
    }
    .sve_div{
      font-size:13px !important;
    }
    #try_id .el-tabs__item{
      font-size:10px !important;
      height:25px !important;
      line-height:20px !important;
    }
    .clickme h2{
      font-size:15px !important;
    }
    .clickme li p{
      font-size:14px !important;
    }
    .bottomone .el-dialog__body{padding:5px 10px 0 10px !important;}
    .bottomTip{height:300px !important;}
    .bottomTip ul{height:150px !important;}
    .bigStuff .el-dialog{
      height:410px !important;
      margin-top:10vh !important;
    }
    .bigStuffdiv h2{
      margin:10px 0;
      font-size:14px;
      width:90%;
    }
    .bgStfSpan{
      margin:10px 0 !important;
      position:absolute;
      bottom:2px !important;
      left:2px !important;
    }
    .llist .el-button h2{
      width:175px !important;
      overflow:hidden;
      text-overflow:ellipsis;  
    }
    .lili{font-size:13px !important;}
}
@media screen and (width:375px) {
  .snd_div{
    font-size:11px !important;
  }
  .fif_div{
      font-size:14px !important;
    }
  .clickme h2{
    font-size:15px !important;
  }
  .bottomone .el-dialog__body{padding:5px 10px 0 10px !important;}
  .bottomTip{height:300px !important;}
  .bottomTip ul{height:180px !important;}
  .bigStuff .el-dialog{
    height:420px !important;
  }
  .bigStuffdiv h2{margin:10px 0;}
  .llist .el-button h2{
    width:175px;
    overflow:hidden;
    text-overflow:ellipsis;  
  }
}
.bigone .el-dialog{
  margin:30vh auto !important;
  width:90%;
  height:200px;
  border-radius:5px;
}
.bigone .el-dialog__header{
  padding:0;
}
.bigone .el-dialog__body{padding:10px;}
.bottomone .el-dialog{
  position:fixed;
  margin:0;
  bottom:0;
  width:100%;
  height:70vw;
}
.stuff .el-dialog{
  margin:30vh auto !important;
  width:80%;
}
.bottomone .el-dialog__header{padding:0;}
.bottomone .el-dialog__body{padding:10px 20px 0 20px;}
</style>
