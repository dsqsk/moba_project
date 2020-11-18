<template>
  <div>
    <div class="sprite sprite-topbar">
      <div class="d-flex py-2 px-3 ai-center">
        <i class="sprite sprite-logo"></i>
        <div class="px-3 flex-1">
          <div class="text-white">王者荣耀</div>
          <div class="text-grey_light_1 fs-xxs">团队成就更多</div>
        </div>
        <button type="button" class="btn bg-primary">立即下载</button>
      </div>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav jc-around nav-inverse pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="">赛事中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="">IP新游</router-link>
        </div>
      </div>
    </div>

    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.sprite-topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>