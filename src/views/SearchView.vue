<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <input type="text" placeholder="你想知道啥" v-model="searchKey" @keydown.enter="enterKeyWord">
  </div>
  <div class="searchHistory">
    <span class="searchSpan">搜索历史</span>
    <span v-for="item in historyWordList" :key="item" class="spanKey" @click="clickHistory(item)">{{item}}</span>
    <svg class="icon" aria-hidden="true" @click="deleteHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="itemList">
      <div class="item" v-for="(item, i) in searchResult" :key="i">
        <div class="itemLeft" @click="updateIndex(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{item1.name}}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
            <use xlink:href="#icon-fanhui"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg>
        </div>
      </div>
    </div>
</template>

<script>
import {getSearchMusic} from '@/request/api/home.js';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      historyWordList : [],
      searchKey : "",
      searchResult : []
    }
  },
  mounted() {
    if(JSON.parse(localStorage.getItem('historyWordList'))) {
      // 添加这个判断，不然当本地并没有这个记录的时候，这个数组不存在，这时候是不能unshift的
      this.historyWordList =JSON.parse(localStorage.getItem('historyWordList'));
    } else {
      this.historyWordList = [];
    }
  },
  methods : {
    ...mapMutations(['pushPlayList','updatePlayListIndex']),

    enterKeyWord :async function() {
      if(!this.searchKey) {
        
      } else {
        this.historyWordList.unshift(this.searchKey);
        console.log(this.historyWordList);

        // 对重复的对象进行去重
        this.historyWordList = [...new Set(this.historyWordList)];

        // 限制历史记录中最多能放几个
        if(this.historyWordList > 5) {
          this.historyWordList.splice(this.historyWordList.length - 1,1);
        }
        localStorage.setItem('historyWordList',JSON.stringify(this.historyWordList));
        // 请求
        let res = await getSearchMusic(this.searchKey);
        console.log(res);
        this.searchResult = res.data.result.songs;
        this.searchKey = "";
      }
    },
    deleteHistory : function() {
      localStorage.removeItem('historyWordList');
      this.historyWordList = [];
    },
    // 点击历史记录进行搜索
    clickHistory :async function(historyKey) {
        let res = await getSearchMusic(historyKey);
        this.searchResult = res.data.result.songs;
        // console.log(this.searchResult);
    },
    updateIndex : function(item) {
      item.al = item.al;
      this.$store.commit('pushPlayList',item);
      this.$store.commit('updatePlayListIndex',this.$store.state.playList.length - 1)
    },
  }
}
</script>

<style lang="less" scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory {
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan {
    font-weight: 700;
  }
  .spanKey {
    padding: 0.1rem 0.2rem;
    background-color: rgb(244, 233, 233);
    border-radius: 0.4rem;
    margin: 0.1rem 0.1rem;
    display: inline-block;
  }
  .icon {
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.itemList {
  width: 100%;
  padding: .2rem;
  .item {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemLeft {
      width: 85%;
      height: 100%;
      display: flex;
      align-items: center;
    .leftSpan {
      display: inline-block;
      width: 0.2rem;
      text-align: center;
    }
    div {
      p {
        width: 4.54rem;
        height: .4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
      }
      span {
        font-weight: 400;
        font-size: .24rem;
        color: #999;
      }
      margin-left: 0.3rem;
    }
  }
  .itemRight{
    width: 20%;
    height: 100%;
    display: flex;
    // justify-content: space-between;
      align-items: center;
      position: relative;
        .icon{
          fill: #999;
        }
        .bofang{
          position: absolute;
          left: 0;
        }
        .liebiao{
          position: absolute;
          right: 0;
        }
      }
    }
  }
</style>