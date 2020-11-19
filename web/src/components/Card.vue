<template>
  <div class="card bg-white p-3 mt-3">
    <!-- card-header -->
    <div class="card-header d-flex ai-center" :class="{'border-bottom':!special,'pb-3':!special}">
      <i class="sprite" :class="`sprite-${icon}`"></i>
      <div class="fs-xl flex-1 px-2" :class="{'fw-b':special}">{{title}}</div>
      <i class="sprite" :class="`sprite-${icon_more}`"></i>
    </div>
    <!-- card-body -->
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {},
    icon: {},
    icon_more: {}
  }
}
</script>

<style lang="scss">
@import "../assets/style/style.scss";
.card {
  border-bottom: 1px solid $border-color;
}
</style>