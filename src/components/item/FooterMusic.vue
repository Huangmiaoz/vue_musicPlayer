<template>
  <div class="FooterMusic">
      <div class="footerLeft" @click="updateDetailShow">
        <img :src="playList[playListIndex].al.picUrl" alt="">
        <div>
          <p>{{playList[playListIndex].name}}</p>
          <span>横划可以切换上下首</span>
        </div>
      </div>
      <div class="footerRight">
        <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
            <use xlink:href="#icon-gengduo"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
      <van-popup v-model:show="isDetailShow" position="bottom" :style="{ width: '100%' , height: '100%' }" >
        <MusicDetail 
          :musicList="playList[playListIndex]" 
          :play="play" 
          :isBtnShow="isBtnShow"
          :addDurationTime="addDurationTime"
        />
      </van-popup>
   </div>
</template>

<script>
import { mapMutations, mapState } from "vuex"; 
import MusicDetail from "@/components/item/MusicDetail.vue"
export default {
    data() {
      return {
        interVal : 0
      }
    },
    computed: {
        ...mapState(["playList", "playListIndex", "isBtnShow", "isDetailShow","durationTime"])
    },
    mounted() {
        console.log(this.$refs);
        this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);

    },
    updated() {
      this.$store.dispatch("getLyric",this.playList[this.playListIndex].id);
      this.addDurationTime();
    },
    methods: {
      play: function () {
          // 判断音乐是否播放
        if (this.$refs.audio.paused) {
            this.$refs.audio.play();
            this.updateIsBtnShow(false);
            this.interVal = this.updateTime(); // 播放时调用函数传值
        }
        else {
            this.$refs.audio.pause();
            this.updateIsBtnShow(true);
            clearInterval(this.interVal);// 暂停时清除定时器
        }
      },
      updateTime : function() {
        setInterval(()=>{
          this.updateCurrentTime(this.$refs.audio.currentTime)
        },1000);
      },
      addDurationTime : function(){
        this.updateDurationTime(this.$refs.audio.duation);
      },
      ...mapMutations(["updateIsBtnShow", "updatePlayList", "updateDetailShow","updateCurrentTime","updateDurationTime"])
    },
    watch: {
        playListIndex: function () {
            this.$refs.autoplay = true;
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                // this.$nextTicker(()=>{
                //   this.$refs.audio.play()
                // })
                this.updateIsBtnShow(false);
            }
        },
        playList: function () {
            if (this.isBtnShow) {
                this.$refs.autoplay = true;
                this.updateIsBtnShow(false);
            }
        }
    },
    components: { MusicDetail }
}
</script>

<style lang="less" scoped>
  .FooterMusic {
    height: 1.4rem;
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: .2rem;
    justify-content: space-around;
    .footerLeft {
      width: 70%;
      height: 100%;
      display: flex;
      padding: .2rem;
      justify-content: space-between;
      align-items: center;
      img{
        width:1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
    .footerRight {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
        width: .6rem;
        height: .6rem
      }
    }

  }
</style>