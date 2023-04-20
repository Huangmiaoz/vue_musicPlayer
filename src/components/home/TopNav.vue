<template>
    <div class="topNav">
        <div class="Topleft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
        
        <div class="TopContent">
            <span @click="$router.push('/UserInfoView')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>

        <div class="TopRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/SearchView')">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
        </div>
        
    </div>

</template>

<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding:10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .TopContent{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.36rem;
        .active{
            font-weight: 900;
        }
    }
}
</style>