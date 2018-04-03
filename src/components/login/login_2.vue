<template>
    <div class="content">
        <!--当前页面的标题-->
        <div class="CommonOn">欢迎来到聚橙网</div>
        <div class="onInput">
            <div class="iphone">
                <input :class="{O_3:phone==''}" type="number" max="11"  placeholder="请输入手机号" v-on:input="inputchange" v-model="phone">
                <span class="icon iconfont icon-shuruquxiao" v-if="hide" @click="clean"></span>
            </div>
            <div class="pass">
                <input :class="{O_3:password==''}" placeholder="请输入登录密码" :type="password_status" v-on:input="inputchange2" v-model="password" >
                <span class="icon iconfont icon-shuruquxiao mr_40" v-if="hide2" @click="clean2"></span>
                <span class="icon iconfont " :class="icon?'icon-mimakejian': 'icon-mimabukejian'" v-if="hide2" v-on:click="seapassword"></span>
            </div>
        </div>

        <!--按钮-->
        <input type="submit" :disabled="btn_disable" class="btn" name="" value="登录"  v-on:click="loginpost">

        <!-- 手机号码登录，忘记密码 -->
        <div class="ToSign_box">
          <span class="item">
               <router-link class="link" to="/passport/login_1">手机号登录</router-link>
          </span>
            <span class="item">
                <router-link class="link" to="/passport/forget">忘记密码</router-link>
          </span>
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
        hide:false,                         //删除账号按钮开关
        hide2:false,                        //删除密码按钮开关
        phone:'',                           //账号
        btn_disable:true,                   //登录按钮状态
        login_url:login_url,                //账号密码登入
        password:'',                        //密码
        password_status:'password',         //密码type的状态
        password_status_off:false,          //密码开关
        icon:false,                          //查看密码开关
        To_login_url:To_login_url
      }
    },
    components:{
      sign_foot
    },
    methods:{

      //电话号码change
      inputchange:function () {
           this.hide=true
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
        this.btn_disable=true
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
      loginpost:function () {
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
      },

    }
  }
</script>
<style>

</style>