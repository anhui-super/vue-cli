<template>
    <div class="content">
        <!--当前页面的标题-->
        <div class="CommonOn">账号注册
            <p class="tips"  v-if="status==2">验证码已发送至手机：<span>{{phone}}</span></p>
        </div>

        <div class="onInput" v-if="status==1">
            <div class="iphone">
                <input :class="{O_3:phone==''}" type="number" max="11"  placeholder="请输入手机号" v-on:input="inputchange" v-model="phone">
                <span class="icon iconfont icon-shuruquxiao" v-if="hide" v-on:click="clean"></span>
            </div>
        </div>

        <div class="onInput" v-if="status==2">
            <div class="iphone" v-for="(item,index) in passbox">
                <input :class="{O_3:item.model==''}"  :type="item.type" max="11"  :placeholder="item.holder" v-on:input="inputchange2(index)" v-model="item.model">
                <span class="icon iconfont icon-shuruquxiao" v-if="item.clen_btn"></span>
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
        phone:'',
        hide:false,
        btn_txt:'下一步',
        btn_disable:true,
        code_url:code_url ,      //验证码接口
        Register:Register,         //注册接口
        status:1,
        passbox:[
          {
            model:'',
            type:'number',
            holder:'图形验证码',
            clen_btn:false,
          },
          {
            model:'',
            type:'password',
            holder:'设置6-20位密码',
            clen_btn:false
          }
        ],
        To_login_url:To_login_url
      }
    },
    methods:{
      inputchange:function () {
        this.hide=true
        if(this.phone.length==11){
          this.btn_disable=false
        }
      },
      inputchange2:function (i) {
        if(i==0){
          this.passbox[i].clen_btn=true
        }
      },
      clean:function () {
        this.phone=''
      },
      loginpost:function () {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if(this.status==1){
          if (this.phone == '') {
            this.$layer.msg('请输入手机号码')
          } else if (!reg.test(this.phone)) {
            this.$layer.msg('手机格式不正确')
          } else {
            this.$emit('load',true)
//            this.$axios.get(this.code_url+'?mobile='+this.phone+'&type=2')
            this.$axios.post(this.code_url,{
              "mobile":this.phone,
              "type":2
            })
              .then(response => {
                this.$emit('load',false)
                this.status=2
                this.btn_txt='注册'
              })
          }
        }else{
//          this.$axios.get(this.Register+'?mobile='+this.phone+'&password='+this.passbox[1].model+'&code='+this.passbox[0].model).then(res=>{
          this.$emit('load',true)
          this.$axios.post(this.Register,{
            "mobile":this.phone,
            "password":this.passbox[1].model,
            "code":this.passbox[0].model
          }).then(res=>{
            this.$emit('load',false)
            this.$layer.msg(res.data.msg)

            if(res.data.code==1){
              window.location.href = this.To_login_url
            }
          })
        }

      }
    }
  }
</script>
<style scoped>
    .tips{
        font-size: 24px;
        color: #1a1a1a;
    }
    .tips span{
        color: #2b82d9;
    }
</style>