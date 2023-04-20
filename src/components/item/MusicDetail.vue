<template>
<img :src="musicList.al.picUrl" alt="" class="bgimg" />
<div class="detailTop">
  <div class="detailTopLeft">
    <svg class="icon" aria-hidden="true" @click="backHome">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <div class="leftMarquee">
      {{musicList.name}}
      <!-- 不知道为啥不显示。、。 -->
      <Vue3Marquee style=";color: #fff">{{musicList.name}}</Vue3Marquee>
      <span v-for="item in musicList.ar" :key="item">{{item.name}} > </span>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
    </div>
  </div>

  <div class="detailTopRight">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-fenxiang"></use>
    </svg>
  </div>

</div>

<div class="detailContent" v-show="isLyricShow" @click="showLyeic">
  <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active : !isBtnShow}">

  <img src="@/assets/cd.png" class="img_cd"  alt="" />

  <img 
    :src="musicList.al.picUrl" 
    alt=""  
    class="img_ar"
    :class="{ img_ar_active: !isBtnShow, img_ar_pauesd: isBtnShow }"
  /> 

</div>

<div class="musicLyric" ref="musicLyric" v-show="!isLyricShow" @click="showLyeic">
  <p v-for="item in lyric" :key="item" 
    :class="{ active : (currentTime * 1000  >= item.startTime && currentTime * 1000  <= item.nextTime)}">
      {{item.lrc}}
  </p>
</div>

<div class="detailFooter">
  <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>

    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>

    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg
        class="icon bofang"
        aria-hidden="true"
        v-if="isBtnShow"
        @click="play"
      >
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon bofang" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-fanhui"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gengduo"></use>
      </svg>
    </div>
</div>
  
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import "vue3-marquee/dist/style.css";
import { mapMutations,mapState } from 'vuex';
export default {
  components: {
    Vue3Marquee
  },
  data() {
    return {
      isLyricShow : false
    }
  },  
  mounted(){
    this.addDurationTime();
  },
  props : ['musicList','isBtnShow','play','addDurationTime'],
  methods : {
    ...mapMutations(['updateDetailShow','updateCurrentTime','updatePlayListIndex']),
    backHome : function(){
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    showLyeic : function() {
      this.isLyricShow = ! this.isLyricShow;
      // 点击磁盘切换成歌词，点击歌词切换回磁盘
    },
    goPlay : function(num) {
      let index = this.playListIndex + parseInt(num);
      console.log(num,index,this.playListIndex);
      if(index === -1) {
        index = this.playList.length - 1;
      }
      if(index === this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
      this.addDurationTime();

    }
  },
  computed : {
    ...mapState(["lyricList","currentTime",'playListIndex','playList','durationTime']),
    lyric : function() {
      let arr;
      if(this.lyricList.lyric) {
        // 先根据换行符切割
          arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
          let min = item.slice(1,3);
          let sec = item.slice(4,6);
          let millSec = item.slice(7,10);
          let lrc = item.slice(11,item.length);
          let startTime = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(millSec);
          if(isNaN(Number(millSec))) {
            millSec = item.slice(7,9);
            lrc = item.slice(10,item.length);
            startTime = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(millSec);

          }
          // let min = this.lyricList.lyric.match(/\d{2}(?=:)/gm);
          // let sec = this.lyricList.lyric.match(/\d{2}(?=\.)/gm);
          // let millSec = this.lyricList.lyric.match(/\d{2,3}(?=])/gm);
          // let lyric = this.lyricList.lyric.slice(0,-1).match( /([^\]]+)$/gm);
          // console.log(min,sec,millSec,lrc,startTime);
          return {min,sec,millSec,lrc,startTime}
        });
        arr.forEach((item,i) => {
          if(i === arr.length - 1 || isNaN(arr[i+1].startTime)) {
            item.nextTime = Infinity;
          } else {
            item.nextTime = arr[i+1].startTime;
          }
        });
        console.log(arr);
      }
      // console.log(arr);
      return arr;
    }
  },
  watch : {
    currentTime : function(newVal) {
      let p = document.querySelector("p.active");
      // console.log(p);
      // console.log(p.offsetTop);
      if(p) {
        if(p.offsetTop > 285) {
          this.$refs.musicLyric.scrollTop =p.offsetTop - 300;
        }
      }
      // 检测到播放到最后一首时需要切换到下一首歌曲
      if(newVal === this.durationTime) {
        this.updatePlayListIndex(this.playListIndex+1);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bgimg{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -10;
  // 虚化
  filter: blur(70px);
}
.detailTop{
  display: flex;
  // background-color: orchid;
  height: 1rem;
  width: 100%;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft{
    display: flex;
    align-items: center;
    .leftMarquee {
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span {
        color: #999;
      }
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-18deg);
    transition: all 2s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    // 10s转完一圈，匀速，无限循环
    animation: rotate_ar 10s linear infinite;
  }
  // CSS3属性，根据这个属性来判断动画是否启动
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric {
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  // 溢出样式设置
  overflow: scroll;
  p{
    color:rgb(224, 236, 236);
    margin-bottom: .3rem;
    font-size: .3rem;
  }
  .active {
    color : #fff;
    font-size: .5rem;
  }
}

.detailFooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range {
    width: 100%;
    height: 0.06rem;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      fill: rgb(245, 234, 234);
    }
    .bofang {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>