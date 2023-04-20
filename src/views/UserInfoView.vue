<template>
  <div class="userInfo">
    <div class="userInfoTop">
      <div class="userInfoTopbar">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <img :src="user.backgroundUrl" alt="" class="bgimg">
      <div class="user">
        <img :src="user.avatarUrl" alt="" class="avatarimg">
        <div class="showInfo">
          <div class="userInfoName">{{user.nickname}}</div>
          <span class="userInfoFollow">关注 {{user.follows}}</span> |<span class="userInfoFollow">粉丝 {{user.followeds}}</span>
        </div>
      </div>
    </div>
    <div class="userMusicList">
      <div class="musicBox" v-for="(item,i) in userMusicList">
        <div class="musicBoxRight">
          <img :src="item.coverImgUrl" alt="">
        </div>
        <div class="musicBoxLeft">

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import {getMyMusicList} from '@/request/api/user.js';
export default {
  data() {
    return {
      userInfo : {}
    }
  },
  computed: {
    ...mapState(["user","token","userMusicList"])
  },
  mounted () {
    console.log(this.user);
    // console.log(this.token);
    // console.log(this.user.profile.nickname);
    this.myMusicList();
  },
  methods:{
    myMusicList :async function () {
      let res = await getMyMusicList(this.user.userId);
      console.log(res);
      console.log(res.data.playlist);
      this.$store.commit('updateUserMusicList',res.data.playlist);
      console.log(this.userMusicList);
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo{
  .userInfoTop{
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    margin-top: .2rem;
    align-items: center;
    position: relative;
    .userInfoTopbar {
      .icon {
        fill: white;
        width: 1rem;
        height: .5rem;
        display: flex;
        justify-content: space-between;
        // 垂直居中
        align-items: center;
        margin: 0 .2rem;
      }
    }
    .bgimg {
        width: 100%;
        height: 5rem;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: -1;
        border-radius: 0.2rem;
    }
    .user{
      width: 100%;
      height: 3rem;
      padding: 0.2rem;
      margin-top: 2rem;
      margin-right: 7rem;
      display: flex;
      justify-content: space-around;
      .avatarimg{
        width: 36%;
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
      }
      .showInfo {
        width: 70%;
        .userInfoName {
          height: 50%;
          font-weight: 600;
          color: white;
          font-size: .4rem;
          padding-right: .5rem;
        }
        .userInfoFollow {
          height: 50%;
          margin-top: 2rem;
          color: white;
        }
      }
    }
  }
  .userMusicList{
    .musicBox{
      height: 2rem;
      width: 100%;
      background-color: aqua;
    }
  }

}
</style>