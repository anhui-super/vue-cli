<template>
    <div class="sign_foot">
        <div class="txt"><span>其他登录方式</span></div>
        <ul class="list">
            <li class="item">
                <span class="iconfont icon-QQ" v-on:click="klogin(0)"></span>
            </li>
            <li class="item">
                <span class="iconfont icon-weibo" v-on:click="klogin(1)"></span>
            </li>
            <li class="item">
                <span class="iconfont icon-baidu" v-on:click="klogin(2)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        kjlogin:kjlogin
      }
    },
    methods:{
      klogin:function (e) {
        this.$axios.post(this.kjlogin).then(res=>{
          if(e==0){
            window.location.href = res.data.data.qqLoginUrl
          }else if(e==1){
            window.location.href = res.data.data.sinaLoginUrl
          }else{
            window.location.href = res.data.data.baiduLoginUrl
          }
        })
      }
    }
  }
</script>
<style>

    .sign_foot{
        position: absolute;
        bottom: 75px;
        left:50%;
        margin-left: -260px;
        width:520px;
        /*margin: 220px auto 0;*/
        text-align: center;
    }
    .sign_foot .txt{
        height:16px;
        border-bottom:1px solid #e8e8e8;
        font-size: 24px;
        color: #999;
    }
    .sign_foot .txt span{
        background: #fff;
        padding: 0 20px;
    }
    .list{
        display: flex;
        margin-top: 50px;
    }
    .list .item{
        flex: 1;
        text-align: center;
    }
    .list .iconfont{
        font-size: 70px;
    }
    .list .iconfont.icon-QQ{
        color: #78d1ff;
    }
    .list .iconfont.icon-weibo{
        color: #f78282;
    }
    .list .iconfont.icon-baidu{
        color: #8699f9;
    }
</style>