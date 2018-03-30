<template>
    <div class="top">
        <span class="w50">
            <span class="router iconfont icon-dinglanleft" onclick="window.history.go(-1)"></span>
        </span>
        <span class="w50">
            <span class="router" v-on:click="on_status">{{statue!=2?'注册':'登入'}}</span>
        </span>
    </div>
</template>
<script>
  export default {
    name:'hello',
    data () {
      return {
        sign_top:"注册"
      }
    },
    props:['statue'],
    methods:{
        on_status:function(){
            var oa ;
            if(this.statue!=2){  //注册
               oa=2
            }else{  //登入
               oa=0
            }
            this.$emit('on_login',oa)
        }
    }

  }
</script>
<style scoped>
    .top{
        display: flex;
        height:50px;
        line-height:50px;
        margin-top: 24px;
        padding: 0 10px;
    }
    .router{
        padding: 20px;
    }
    .top .w50{
        flex: 2;
    }
    .top .w50:last-child{
        text-align: right;
        font-size: 28px;
        color: #4d4d4d;
    }
</style>