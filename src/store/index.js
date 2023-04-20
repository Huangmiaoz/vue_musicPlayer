import { createStore } from 'vuex'
import { getMusicLyric } from '../request/api/item.js';
import { getPhoneLogin } from '@/request/api/home.js'
export default createStore({
  // 存储的单例状态
  state: {
    // 播放列表
    playList : [{
      // 这个是专辑信息
      al:{
        id: 90383818,
        name: "Love Me No More",
        pic: 109951165040246110,
        picUrl: "https://p2.music.126.net/AZMGEKyJldZYFSYd5S5uyg==/109951165040246105.jpg",
        pic_str: "109951165040246105"
      },
      ar : [{
        id: 30692240,
        name: "LinG"
      }],
      // 这个才是歌曲id
      id: 1453308606,
      name : "Love Me No More_"
    }],
    // 默认下标为0
    playListIndex : 0,
    isBtnShow : true,
    // 歌词详情显示
    isDetailShow : false,
    // 存储当前歌词
    lyricList : {},
    // 当前已经播放的时间
    currentTime : 0,
    // 歌曲的总时长
    durationTime : 0,
    // login
    isLogin : false,
    // footer是否显示
    isFooterMusic : true,

    token : "",
    //用户信息
    user:{},
    // 用户的歌单
    userMusicList : {}
  },
  getters: {
  },
  mutations: {
    updateIsBtnShow : function(state,value) {
      state.isBtnShow = value;
    },
    updatePlayList : function(state,value) {
      state.playList = value;
    },
    pushPlayList : function(state,value) {
      state.playList.push(value);
    },
    updatePlayListIndex : function(state,value) {
      state.playListIndex = value;
    },
    updateDetailShow : function(state) {
      state.isDetailShow = !state.isDetailShow;
    },
    updateLyricList: function(state,value) {
      state.lyricList = value;
    },
    updateCurrentTime: function(state,value) {
      state.currentTime = value;
    },
    updateDurationTime: function(state,value) {
      state.durationTime = value;
    },
    updateIsLogin: function(state,value) {
      state.isLogin = value;
    },
    updateToken: function(state,value) {
      state.token = value;
      localStorage.setItem('token',state.token)
    },
    updateUser : function(state,value) {
      state.user = value;
    },
    updateUserMusicList : function(state,value) {
      state.userMusicList = value;
    }
  },
  actions: {
    // 获取数据属于异步请求要在actions中操作
    getLyric :async function(context,value) {
      let res = await getMusicLyric(value);
      console.log(res);
      context.commit("updateLyricList",res.data.lrc);
    },
    getPhoneLogin : async function(context,value) {
      let res = await getPhoneLogin(value);
      console.log(res);
      return res;
    }
  },
  modules: {
  }
})
