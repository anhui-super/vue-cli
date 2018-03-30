<template>
    <div id="Sign_In" class="Sign_In">
        <!--后退顶部-->
        <sign_top :statue="login_status" v-on:on_login="Login"></sign_top>
        <!--登录-->
        <sign_login v-if="login_status==0" v-on:Forget="Fget" v-on:load="Loading"></sign_login>

        <!--忘记密码-->
        <sgin_forget_register v-if="login_status==1" v-on:load="Loading"></sgin_forget_register>

        <!--账号注册-->
        <sgin_register v-if="login_status==2" v-on:load="Loading"></sgin_register>

        <!--其他登录方式-->
        <sign_foot v-if="login_status==0"></sign_foot>

        <!-- 加载 -->
        <loading v-if="loading"></loading> 

    </div>
</template>
<script>
    import sign_top from './common/Sign_In_Top.vue'
    import sign_login from './Sign_In_login.vue'
    import sign_foot from './common/Sign_In_Foot.vue'
    import sgin_forget_register from './Sign_In_register_forget.vue'
    import sgin_register from './Sign_In_registe.vue'

    import loading from '../common/loading.vue'
    export default {
        data () {
          return {
            login_status:ostatus,
            loading:false
          }
        },
        methods:{
          Fget:function () {
            this.login_status=1
          },
          Loading:function(statue){
            this.loading=statue
          },
          Login:function (a){
             this.login_status= a
          }
        },
        components:{
          sign_top,sign_foot,sign_login,sgin_forget_register,sgin_register,loading
        },
        created(){
          console.log(ostatus= 1)
        }
      }
</script>
<style>
    .CommonOn{
        font-size: 48px;
        color: #1a1a1a;
        padding-left: 83px;
        padding-top: 83px;
        font-weight: 400;
    }
    .btn{
        display: block;
        width:585px;
        height:90px;
        margin: 80px auto 0;
        border:none;
        border-radius: 50px;
        font-size: 34px;
        outline: none;
        color: #fff;
        background: -moz-linear-gradient(left,rgba(255,179,25,1),rgba(255,121,25,1));
        background: -o-linear-gradient(left,rgba(255,179,25,1),rgba(255,121,25,1));
        background: -webkit-gradient(left,rgba(255,179,25,1),rgba(255,121,25,1));
        background: linear-gradient(left,rgba(255,179,25,1),rgba(255,121,25,1));
    }
    .btn:disabled{
        background: -moz-linear-gradient(left,rgba(255,179,25,.5),rgba(255,121,25,.5));
        background: -o-linear-gradient(left,rgba(255,179,25,.5),rgba(255,121,25,.5));
        background: -webkit-gradient(left,rgba(255,179,25,.5),rgba(255,121,25,.5));
        background: linear-gradient(left,rgba(255,179,25,.5),rgba(255,121,25,.5));
    }
    .ToSign{
        text-align: center;
        margin-top: 20px;
    }

    .onInput{
        margin: 70px auto 0;
        padding: 0 80px;
    }
    .onInput div{
        position: relative;
        width:100%;
        height:65px;
        color: #D9D9D9;
        padding-top:15px;
        border-bottom: 1px solid #D9D9D9;
        margin-bottom: 40px
    }
    .onInput div input[type='text'],.onInput div input[type='number'],.onInput div input[type='password']{
        display: block;
        margin-right: 40px;
        height:50px;
        font-size: 42px;
        color: #1a1a1a;
    }
    .onInput div input:disabled{
        background: none;
        color: #1a1a1a;
    }
    .onInput div input.O_3{
        opacity: .3;
    }
    .onInput div.Code input[type='text']{
        width:400px;
        display: block;
    }
    .onInput div span,.onInput div input[type='button']{
        display: block;
        position: absolute;
        margin: 0;
        top: 10px;
        right:0;
        font-size: 36px;
    }
    .onInput div input.code_txt{
        top:0;
        font-size: 28px;
        color: #ffb319;
        padding: 20px;
        background: none;
    }
    .onInput div input:disabled,.onInput div input.code_txt:disabled{
        color: #d9d9d9;
    }
    .ToSign .link{
        padding: 20px;
        display: inline-block;
        font-size: 28px;
        color: #666;
    }

    .ToSign_box{
        width: 585px;
        margin: 20px auto 0;
        display: flex;
    }
    .ToSign_box .item{
        flex: 1;
        font-size: 28px;
        color: #666
    }
    .ToSign_box .item:last-child{
        text-align: right;
    }
    .ToSign_box .item .link{
        padding: 20px;
        display: inline-block;
    }
    .onInput div span.mr_40{
        right:80px;
    }





</style>