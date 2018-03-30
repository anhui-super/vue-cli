<template>
    <div class="content">
        <!--当前页面的标题-->
        <div class="CommonOn">忘记密码</div>
        <div class="onInput" v-if="next==0">
            <div class="iphone">
                <input :class="{O_3:phone==''}" type="number" max="11"  placeholder="请输入手机号" v-on:input="inputchange" v-model="phone">
                <span class="icon iconfont icon-shuruquxiao" v-if="hide" v-on:click="clean"></span>
            </div>

            <div class="Code">
                <input :class="{O_3:Code_register==''}" type="text" placeholder="请输入验证码" v-model="Code_register">
                <input type="button" :disabled="notcode" class="code_txt" v-model="btntxt" v-on:click="sendcode">
            </div>
        </div>

        <div class="onInput" v-if="next==1">
            <div class="pass" v-for="(item,key) in pass">
                <input placeholder="请输入登录密码" :class="{O_3:item.numbel==''}" type="password" v-on:input="inputchange2(key)" v-model="item.numbel">
                <span class="icon iconfont icon-shuruquxiao" v-on:click="clean2(key)" v-if="item.status"></span>
            </div>
        </div>

        <!--按钮-->
        <input type="submit" :disabled="btn_disable" class="btn" name=""   v-on:click="loginpost" v-model="btn_txt">

    </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
         phone:'',                                      //手机号码
         time:'',                                       //验证码倒计时
         Code_register:'',                              //验证码
         btntxt:'获取验证码',
         notcode:true,                                  //验证码按钮状态
         hide:false,                                    //清空手机号码按钮
         btn_disable:true,                              //下一步按钮状态
         code_url:code_url ,                            //验证码接口
         code_url_btn:checkPassCode,                    //找回密码验证
         pass_url:pass_url,              //密码验证
         pass:[
           {
             numbel:'',
             status:false
           },
           {
             numbel:'',
             status:false
           }
         ],
        next:0,
        btn_txt:'下一步'
      }
    },
    methods:{
      inputchange:function () {
        this.hide=true
        this.notcode=false
      },
      //设置密码删除按钮
      inputchange2:function (key) {
         this.pass[key].status=true
         if(this.pass[0].numbel!=''&&this.pass[1].numbel!=''){
           this.btn_disable=false
         }
      },
      loginpost:function(){
        console.log(this.next)
        if(this.next==0){
//              this.$axios.get(this.code_url_btn+'?mobile='+this.phone+'&code='+this.Code_register)
              this.$axios.post(this.code_url_btn,this.qs.stringify({
                "username":this.phone,
                "code":this.Code_register
              }))
                .then(res => {
                  console.log(this.next)
                  if(res.data.code==1){//验证通过
                    this.btn_txt='完成'
                    this.btn_disable=true
                    this.next=1
                  }else{
                    this.$layer.msg(res.data.msg)
                  }
                }).catch(err => {
                    this.$layer.msg(err.data.msg)
              });
        }else{
          if(this.pass[0].numbel==this.pass[1].numbel&&this.pass[0].numbel.length>6){
//            this.$axios.get(this.pass_url+'?mobile='+this.phone+'&password='+this.pass[0].numbel+'&twopasswords='+this.pass[1].numbel)
            this.$axios.post(this.pass_url,this.qs.stringify({
              "username":this.phone,
              "password":this.pass[0].numbel,
              "twopasswords":this.pass[1].numbel
            }))
              .then(res => {
                var a =true;
                if(res.data.code==1){//验证通过
                  this.$layer.msg(res.data.msg)
                  window.location.href = 'https://m.juooo.com'
                }else{
                  this.$layer.msg(res.data.msg)
                }
              }).catch(err => {
              this.$layer.msg(err.data.msg)
            });
          }else if(this.pass[0].numbel!=this.pass[1].numbel){
            this.$layer.msg('两次密码不一样')
          }else{
            this.$layer.msg('请输入六位以上有效密码')
          }

        }

      },
      //活动短信验证码状态
      sendcode:function () {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (this.phone == '') {
          alert("请输入手机号码");
        } else if (!reg.test(this.phone)) {
          alert("手机格式不正确");
        } else {
          this.time = 60;
          this.timer()
          this.btn_disable=false
          this.notcode=true
          this.ajax()
        }
      },
      //清空手机号码
      clean:function () {
        this.phone=''
        this.notcode=true
        this.btn_disable=true
        this.btntxt= '获取验证码'
        this.time=0
      },
      //清空密码
      clean2:function (key) {
        this.pass[key].numbel=''
        this.pass[key].status=false
      },

      //获取验证码请求
      ajax:function () {
//          this.$axios.get(this.code_url+'?mobile='+this.phone+'&type=1')
          this.$axios.post(this.code_url,this.qs.stringify({
            "mobile":this.phone,
            "type":1
          }))
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