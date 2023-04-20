<template>
    <!-- <h1>歌单详情页</h1> -->
    <itemMusicTop></itemMusicTop>
    <ItemMusicListBody></ItemMusicListBody>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import {getMusicItemList} from '@/request/api/item.js'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import ItemMusicListBody from '@/components/item/ItemMusicListBody.vue'
    export default {
        setup() {
            const state = reactive({
                playList : {},
                MusicListId : null
            })
            // onMounted(async()=> {
            //     state.MusicListId = useRoute().query.id;
            //     let res = await getMusicItemList(state.MusicListId);
            //     // console.log(res);
            //     state.playList = res.data.songs;
            //     console.log(state.playList);
            // })
            return {state};
        },
        components : {
            itemMusicTop
        }
    };
</script>