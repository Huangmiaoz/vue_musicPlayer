<template>
  <TopNavVue></TopNavVue>
  <SwiperTopVue></SwiperTopVue>
  <IconListVue></IconListVue>
  <MusicListVue></MusicListVue>
</template>

<script>

import TopNavVue from '@/components/home/TopNav.vue'
import SwiperTopVue from '@/components/home/SwiperTop.vue'
import IconListVue from '@/components/home/IconList.vue'
import MusicListVue from '@/components/home/MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    TopNavVue,
    SwiperTopVue,
    IconListVue,
    MusicListVue
  }
}
</script>
