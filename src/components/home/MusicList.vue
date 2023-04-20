<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="160" class="mySwipe" :show-indicators="false">
                <van-swipe-item v-for="item in data.musicList " :key="item">
                    <router-link :to="{path:'/ItemMusic', query:{id:item.id}}">
                        <img :src="item.picUrl" alt="">
                            <span class="playcount"> 
                                <svg class="icon" aria-hidden = "true" :class="icon">
                                    <use xlink:herf = "#icon-gengduo"></use>
                                </svg>
                                {{changeNumber(item.playcount)}}
                            </span>
                        <span class="musicName">{{item.name}}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
        
    </div>
</template>

<script>
import {getMusicList} from '@/request/api/home.js'
import { onMounted, reactive } from 'vue'
export default {
    // data() {
    //     return {
    //         musicList : []
    //     }
    // },
    // methods : {
    //     async getMusic() {
    //         let res = await getMusicList();
    //         console.log(res);
    //         this.musicList = res.data.recommend;
    //     },
    //     changeNumber(number) {
    //         if(number >= 100000000) {
    //             return (number/100000000).toFixed(1) + "亿";
    //         }
    //         else if(number >= 10000) {
    //             return (number / 10000).toFixed(1) + "万";
    //         }
            
    //     }  
    // },
    // mounted() {
    //     this.getMusic();
    // }
    setup() {
        const data = reactive({
            musicList : []
        });
        onMounted(async () => {
            let res = await getMusicList();
            console.log(res);
            data.musicList = res.data.recommend;
        })
        function changeNumber(number) {
            if(number >= 100000000) {
                return (number/100000000).toFixed(1) + "亿";
            }
            else if(number >= 10000) {
                return (number / 10000).toFixed(1) + "万";
            }
        }
        // 一开始这里没有返回函数changeNumber，所以报错changeNumber is not a function
        return {data,changeNumber};
    }
}
</script>
<style lang="less">
    .musicList{
        width : 100%;
        height : 5rem;
        padding : 0.2rem;
        .musicTop{
            width : 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title {
                font-size: 0.4rem;
                font-weight: 900;
            }
            .more {
                border: 1px solid #ccc;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.08rem;
                border-radius: 0.4rem;
            }
        }
        .musicContent {
            width: 100%;
            height : 3.6rem;
             .mySwipe {
                width: 100%;
                height: 100%;
                img{
                    height: 2.4rem;
                    width: 100%;
                    border-radius: 0.2rem;
                }
                .playcount {
                    position: absolute;
                    z-index: 100;
                    right: 0.3rem;
                    color: white;
                    margin-top: 0.06rem;
                    .icon {
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                }
            }
            .musicName {
                position: relative;
                bottom: 0;
                font-size: 0.31rem;
            }
        }
       
    }
</style>