<template>
    <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in state.images" :key="image">
            <img :src="image.pic" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>

import {reactive, onMounted } from 'vue';
import {getBanner} from '@/request/api/home.js'
    export default {
        setup() {
            const state = reactive ({
                images:[]
        });
        onMounted(async () => {
            let res  = await getBanner();
            console.log(res);
            state.images = res.data.banners;
        })
            return { state };
        },
    };

</script>

<style lang="less">
// #swiperTop{
    .van-swipe{
        width: 100%;
        height: 3rem;
        .van-swipe-item{
            padding: 0 0.2rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }
        .van-swipe__indicator--active {
            background-color: rgb(219,119,130);
        }
    }

    // }
    
</style>