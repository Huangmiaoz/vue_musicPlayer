<template>
<van-form @submit="onSubmit" class="loginBox">
  <van-cell-group inset>
    <van-field
      v-model="cellphone"
      name="手机号"
      label="手机号"
      placeholder="手机号"
      :rules="[{ required: true, message: '请填写登录的手机号' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit" @click="Login">登录</van-button>
  </div>
</van-form>

</template>

<script>
import {getLoginUser} from '@/request/api/home.js'
export default {
  data() {
    return {
      cellphone : '',
      password : ''
    }
  },
  methods : {
    Login : async function(){
      let res = await this.$store.dispatch('getPhoneLogin',{
        cellphone:this.cellphone,
        password:this.password
      })
      // console.log(res);
      // console.log(res.data.code);
      //如果返回的code等于200，说明登录成功，就跳转个人中心页面
      if(res.data.code===200){
        console.log('login');
        this.$store.commit('updateIsLogin',true)
        this.$store.commit('updateToken',res.data.token)
        let result = await getLoginUser(res.data.account.id)
        console.log(result.data.profile);
        this.$store.commit('updateUser',result.data.profile)
        this.$router.push('/UserInfoView')
      }else{
        alert("手机号码或者密码错误")
        this.password=''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
