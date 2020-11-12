<template>
  <m-card :icon="icon" icon_more="menu" title="新闻资讯">
    <div class="nav jc-between">
      <div class="nav-item" :class="{active:active === i}" v-for="(category,i) in categories" :key="i"
        @click="$refs.listSwiper.swiper.slideTo(i)">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <!-- card-swiper -->
    <div class="pt-3">
      <swiper ref="listSwiper" @slide-change="()=>active=$refs.listSwiper.swiper.realIndex">
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: {},
    title: {},
    categories: { type: Array, required: true, }
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {

  }
}
</script>

<style>
</style>