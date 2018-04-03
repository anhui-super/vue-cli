<template>
    <div class="content">
        <!--当前页面的标题-->
        <div class="CommonOn">欢迎来到聚橙网</div>
        <div class="onInput">
            <div class="iphone">
                <input :class="{O_3:phone==''}" type="number" max="11"  placeholder="请输入手机号" v-on:input="inputchange" v-model="phone">
                <span class="icon iconfont icon-shuruquxiao" v-if="hide" @click="clean"></span>
            </div>
            <div class="Code">
                <input :class="{O_3:Codetxt==''}" type="text" placeholder="请输入验证码" v-model="Codetxt">
                <input type="button" :disabled="notcode" class="code_txt" v-model="btntxt" v-on:click="sendcode">
            </div>
        </div>

        <!--按钮-->
        <input type="submit" :disabled="btn_disable" class="btn" name="" value="登录"  v-on:click="loginpost">

        <!--密码登录-->
        <div class="ToSign">
            <router-link class="link" to="/passport/login_2">密码登录</router-link>
        </div>
        <sign_foot></sign_foot>
    </div>

</template>
<script >
  import sign_foot from './common/Sign_In_Foot.vue'
  export default {
    name: 'hello',
    data () {
      return {
        btntxt: '获取验证码',
        hide:false,                         //删除账号按钮开关
        phone:'',                           //账号
        Codetxt:'',                         //验证码
        time:0,                             //验证码倒计时60秒
        notcode:true,                       //获取验证码按钮状态
        btn_disable:true,                   //登录按钮状态
        code_url:code_url ,                 //验证码接口
        code_url_btn:code_url_btn,         //手机验证码登录
        To_login_url:To_login_url
      }
    },
    components:{
      sign_foot
    },
    methods:{
      //手机验证码登录
      register_btn:function () {
        this.btntxt= '获取验证码'
         this.register_fast=false
         this.notcode=true
         this.hide=false
         this.phone=''
         this.btn_disable= true
         this.time=0
      },
      //手机号登录
      register_F:function () {
        this.btntxt= '获取验证码'
        this.register_fast=true
        this.hide=false
        this.phone=''
        this.btn_disable=true
        this.time=0

      },

      //电话号码change
      inputchange:function () {
           this.hide=true
           this.notcode=false
      },
      //输入密码
      inputchange2:function () {
        if(this.phone!=''&& this.password!=''){
          this.btn_disable=false
        }
      },
      //清空电话号码
      clean:function () {
        this.phone=''
        this.notcode=true
        this.btn_disable=true
        this.btntxt= '获取验证码'
        this.time=0
      },

      //验证手机号码
      sendcode:function () {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == '') {
          this.$layer.msg('请输入手机号码')
        } else if (!reg.test(this.phone)) {
          this.$layer.msg('手机格式不正确')
        } else {
          this.time = 60;
          this.timer()
          this.btn_disable=false
          this.notcode=true
          this.ajax()
        }
      },
      loginpost:function () {
           this.$emit('load',true)
           this.$axios.post(this.code_url_btn,this.qs.stringify({
             "mobile":this.phone,
             "code":this.Codetxt
           })).then(res=>{
               this.$emit('load',false)
               if(res.data.code==1){
                 window.location.href = this.To_login_url
               }else{
                 this.$layer.msg(res.data.msg)
               }
          })
      },

      //获取验证码请求
      ajax:function () {
          this.$emit('load',true)
          this.$axios.post(this.code_url,this.qs.stringify({
            "mobile":this.phone,
            "type":3
          })).then(res=>{
            this.$emit('load',false)
          })
      },

     // 验证码倒计时60s
      timer: function(){
        if (this.time > 0) {
          this.time--;
          this.btntxt=this.time+"s后重新获取";
          setTimeout(this.timer, 1000);
        } else{
          this.time=0;
          this.btntxt="获取验证码";
          this.iphone='';
          this.Codetxt='';
        }
      }
    }
  }
</script>
<style>

</style>