<template>
    <div class="top">
        <span class="w50">
            <span class="router iconfont icon-dinglanleft" onclick="window.history.go(-1)"></span>
        </span>
        <span class="w50">
             <router-link class="router" to="/passport/login_1" v-if="statue!=2"  v-on:click.native="on_status">登入</router-link>
             <router-link class="router" to="/passport/registe" v-else  v-on:click.native="on_status">注册</router-link>
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