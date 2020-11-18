<template>
  <div class="page-article">
    <div class="d-flex py-2 px-2 border-bottom">
      <i class="sprite sprite-back"></i>
      <strong class="flex-1 text-blue pl-2">
        {{model.header}}
      </strong>
      <div class="text-grey_light_3 fs-xs">
        2019-11-13
      </div>
    </div>
    <!-- 文章内容 -->
    <div>
      <div v-html="model.body" class="px-3 body fs-xl"></div>
    </div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link class="py-1" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id">
          {{item.header}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {}
    }
  },
  watch: {
    id () {
      this.fetchArticle()
    }
  },
  methods: {
    async fetchArticle () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetchArticle()
  }
}
</script>

<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>