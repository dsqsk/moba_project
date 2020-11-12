<template>
  <div>
    <!-- swiper -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/image/afb12d863bfed6ecf1179f40e97a3f9f.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/dace36b6da6efe67226a2ac54744af5c.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/f7c6784c235ce87e631f95ba9acc19b1.jpeg">
      </swiper-slide>
      <div class="swiper-pagination pagination-top text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->

    <!--nav icons -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-grey">
      <div class=" d-flex flex-wrap">
        <div class="nav-items mb-3">
          <i class="sprite sprite-blz"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-gsz"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-zbsc"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-tyf"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-xrzq"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-rycc"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-wzyd"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-gzh"></i>
          <div class="py-2">公众号</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-bbjs"></i>
          <div class="py-2">版本介绍</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-djhj"></i>
          <div class="py-2">对局环境</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-djhj"></i>
          <div class="py-2">无限王者团</div>
        </div>
        <div class="nav-items mb-3">
          <i class="sprite sprite-djhj"></i>
          <div class="py-2">创意互动营</div>
        </div>
      </div>
      <div class="bg-white_light py-2 fs-sm ai-center jc-center">
        <i class=" sprite sprite-up mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end nav icons -->
    <m-list-card icon="new" title="新闻资讯" :categories="newsData">
      <template #items="{category}">
        <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-select mr-2">[{{news.categoryName}}]</span>
          <span class="flex-1 text-grey_dark text-ellipsis pr-2">{{news.header}}</span>
          <span class="text-grey_light_2 fs-sm">{{news.createdAt | date}}</span>
        </div>
      </template>
    </m-list-card>
    <m-card icon="new" icon_more="menu" title="英雄列表">

    </m-card>
  </div>
</template> 

<script>
import dayjs from 'dayjs'
export default {
  filters: {
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      newsData: []
    }
  },
  methods: {
    async fetchNewsCategories () {
      const res = await this.$http.get('news/list')
      this.newsData = res.data
    }
  },
  created () {
    this.fetchNewsCategories()
  }
}
</script>

<style lang="scss">
@import "../assets/style/style.scss";
.pagination-top {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background-color: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "select");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-items {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>