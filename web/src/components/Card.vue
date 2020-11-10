<template>
  <div class="card bg-white p-3 mt-3">
    <!-- card-header -->
    <div class="card-header d-flex ai-center pb-3">
      <i class="sprite" :class="`sprite-${icon}`"></i>
      <div class="fs-xxl flex-1 px-2">{{title}}</div>
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
    icon_more: {},
  }
}
</script>

<style lang="scss">
@import "../assets/style/style.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>