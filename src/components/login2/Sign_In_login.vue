<template>
    <div class="content">
        <!--当前页面的标题-->
        <div class="CommonOn">欢迎来到聚橙网</div>
        <div class="onInput">
            <div class="iphone">
                <input :class="{O_3:phone==''}" type="number" max="11"  placeholder="请输入手机号" v-on:input="inputchange" v-model="phone">
                <span class="icon iconfont icon-shuruquxiao" v-if="hide" @click="clean"></span>
            </div>

            <div class="Code" v-if="register_fast">
                <input :class="{O_3:Codetxt==''}" type="text" placeholder="请输入验证码" v-model="Codetxt">
                <input type="button" :disabled="notcode" class="code_txt" v-model="btntxt" v-on:click="sendcode">
            </div>

            <div class="pass" v-else>
                <input :class="{O_3:password==''}" placeholder="请输入登录密码" :type="password_status" v-on:input="inputchange2" v-model="password" >
                <span class="icon iconfont icon-shuruquxiao mr_40" v-if="hide2" @click="clean2"></span>
                <span class="icon iconfont " :class="icon?'icon-mimakejian': 'icon-mimabukejian'" v-if="hide2" v-on:click="seapassword"></span>
            </div>
        </div>

        <!--按钮-->
        <input type="submit" :disabled="btn_disable" class="btn" name="" value="登录"  v-on:click="loginpost">

        <!--密码登录-->
        <div class="ToSign" v-if="register_fast">
            <!--<span class="link"  v-on:click="register_btn">密码登录 ></span>-->
            <router-link class="link" to="/passport/login">密码登录</router-link>
        </div>

        <!-- 手机号码登录，忘记密码 -->

        <div class="ToSign_box" v-else>
          <span class="item">
               <router-link class="link" to="/passport/login">手机号登录</router-link>
              <!--<span class="link" v-on:click="register_F">手机号登录</span>-->
          </span>
            <span class="item">
                <router-link class="link" to="/passport/forget">忘记密码</router-link>
              <!--<span class="link" v-on:click="forget">忘记密码</span>-->
          </span>
        </div>
    </div>

</template>
<script >
  export default {
    name: 'hello',
    data () {
      return {
        btntxt: '获取验证码',
        register_fast:true,          //登录方式
        hide:false,                         //删除账号按钮开关
        hide2:false,                        //删除密码按钮开关
        phone:'',                           //账号
        Codetxt:'',                         //验证码
        time:0,                             //验证码倒计时60秒
        notcode:true,                       //获取验证码按钮状态
        btn_disable:true,                   //登录按钮状态
        code_url:code_url ,                 //验证码接口
        code_url_btn:code_url_btn,          //手机验证码登录
        login_url:login_url,                //账号密码登入
        // dat:{                               //获取验证码传参数
        //   mobile:'',
        //   type:3
        // },
        password:'',                        //密码
        password_status:'password',         //密码type的状态
        password_status_off:false,          //密码开关
        icon:false,                          //查看密码开关
        To_login_url:To_login_url
      }
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
         this.password=''
          this.password_status='password'
          this.password_status_off=false
      },
      //手机号登录
      register_F:function () {
        this.btntxt= '获取验证码'
        this.register_fast=true
        this.hide=false
        this.phone=''
        this.btn_disable=true
        this.time=0
        this.password=''
        this.password_status='password'
        this.password_status_off=false
        this.hide2=false
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
        this.hide2=true
      },
      //清空电话号码
      clean:function () {
        this.phone=''
        this.notcode=true
        this.btn_disable=true
        this.btntxt= '获取验证码'
        this.time=0
      },
      //清空密码
      clean2:function () {
        this.password=''
      },
      //查看密码
      seapassword:function () {
        this.password_status_off=!this.password_status_off
        this.icon=!this.icon
        if(this.password_status_off){
          this.password_status='text'
        }else{
          this.password_status='password'
        }

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
         if(this.register_fast){ //验证码登录
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
         }else{  //用户密码登录
            this.$emit('load',true)
            this.$axios.post(this.login_url,this.qs.stringify({
              "username":this.phone,
              "password":this.password,
              "isCard":1,
              "regFrom":2
            }))
           .then(res=> {
             this.$emit('load',false)
             if (res.data.code == 1) {
               window.location.href = this.To_login_url
             } else {
               this.$layer.msg(res.data.msg)
             }

           })
         }
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
      },
      //忘记密码
      forget:function () {
        this.$emit('Forget',1)
      }
    }
  }
</script>
<style>

</style>