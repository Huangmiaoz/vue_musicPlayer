<template>
    <div class="itemMusicTop">
        <img :src="state.MusicListInfo.coverImgUrl" alt=""  class="bgimg">
        <div class="itemLeft">
             <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-fanhui"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
            
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
    </div>
   <div class="itemTopContent">
    <div class="contentLeft">
      <img :src="state.MusicListInfo.coverImgUrl" alt="" />
      <div class="palyCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gl-play-copy"></use>
        </svg>
        <!-- <span>{{ changeCount(state.MusicListInfo.playCount) }}</span> -->
      </div>
    </div>
    <div class="contentRight">
      <p class="rightP_one">{{ state.MusicListInfo.name }}</p>
      <div class="right_img">
        <!-- <img :src="state.MusicListInfo.creator.avatarUrl" alt="" /> -->
        <!-- <span>{{ state.MusicListInfo.creator.nickname }}</span> -->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </div>
      <p class="rightP_two">
        <span>{{ state.MusicListInfo.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou"></use>
        </svg>
      </p>
    </div>
    </div>
    <div class="itemTopFooter">
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ state.MusicListInfo.commentCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ state.MusicListInfo.shareCount }}</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="footerItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
import {getMusicListDescription} from '@/request/api/item.js'
import { onMounted,reactive } from 'vue';
import { useRoute } from 'vue-router'
// import {changeCount} from '@/plugins/myfunc.js'
export default {
    setup() {
        const state = reactive({
            MusicListId : null,
            MusicListInfo : {}
        })
            // 对播放量的处理
        
        state.MusicListId = useRoute().query.id;
        onMounted(async()=> {
            let res = await getMusicListDescription(state.MusicListId);
            state.MusicListInfo = res.data.playlist;
            console.log(res);
        })
        return {state};
    }
        
    
}
</script>

<style lang="less">
    .itemMusicTop {
        // background-color: red;
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .itemLeft,.itemRight {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            // 垂直居中
            align-items: center;
            margin: 0 .2rem;
            span {
                font-size: .4rem;
                color: white;
            }
            .icon {
                fill:white;
            }
        }
        .bgimg{
            width: 100%;
            height: 11rem;
            // position: absolute;
            // absolute是脱离文档流，fixed在向下滚动时固定不动
            position: fixed;
            z-index: -1;
            // 虚化
            filter: blur(15px);
        }
        .itemMusicTopBody {
            height: 5rem;
            width: 30%;
            img {
                width: 100%;
                height: 5rem;
            }
        }
    }
.itemTopContent {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.26rem;
        color: #fff;
      }
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
    .itemTopFooter{
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-around;
        margin-top: .2rem;
        .footerItem{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            .icon{
                fill: #fff;
            }
            span{
                margin-top: .1rem;
            }
        }
    }
    
</style>