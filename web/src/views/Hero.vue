<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-bar top_title">
      <div class="d-flex py-2 px-3 ai-center text-white">
        <i class="sprite sprite-logo"></i>
        <div class="px-3 flex-1">
          <span>王者荣耀</span>
          <span class="ml-2">攻略站</span>
        </div>
        <router-link tag="div" to="/">
          <span class="fs-sm mr-2">更多英雄</span>
          <strong class="fs-lg mr-3">&gt;</strong>
        </router-link>
      </div>
    </div>

    <!-- banner -->
    <div class="top-banner" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between">
          <div class="scores fs-xxs d-flex ai-center pt-2" v-if="model.scores">
            <span class="">难度</span>
            <span class="badge bg-primary">{{model.scores.difficultGrade}}</span>
            <span>技能</span>
            <span class="badge bg-select">{{model.scores.skillGrade}}</span>
            <span>攻击</span>
            <span class="badge bg-red">{{model.scores.attackGrade}}</span>
            <span>生存</span>
            <span class="badge bg-brown">{{model.scores.survivalGrade}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey_light fs-sm">皮肤:&gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end banner -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <!-- page 1 -->
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-2 flex-1">
                  <i class="bg-video"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-2 flex-1 ml-2">
                  <i class="bg-video"></i>
                  英雄介绍视频
                </router-link>
              </div>
              <!-- 技能详情 -->
              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img class="icon" @click="currentSkillIndex=i" :class="{'active':currentSkillIndex===i}"
                    v-for="(item,i) in model.skills" :key="item.name" :src="item.icon">
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-2">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span class="text-grey_light_3 ml-4 fs-xs">
                      (冷却值：{{currentSkill.cooldown}}
                      消耗：{{currentSkill.consume}})
                    </span>
                  </div>
                  <p class="mb-1 text-dark skillsDescription">{{currentSkill.description}}</p>
                </div>
              </div>
            </div>

            <m-card special icon="hero" title="出装推荐" class="heroItems">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.itemsWell" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.itemsBad" :key="item.name">
                  <img :src="item.icon" class="icon">
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card special icon="hero" title="使用技巧">
              <p class="m-0 tips text-dark">{{model.usageTips}}</p>
            </m-card>
            <m-card special icon="hero" title="对抗技巧">
              <p class="m-0 tips text-dark">{{model.againstTips}}</p>
            </m-card>
            <m-card special icon="hero" title="团战思路">
              <p class="m-0 tips text-dark">{{model.teamfightTips}}</p>
            </m-card>
            <m-card special icon="hero" title="英雄关系">
              <div class="fs-xl">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-4">
                <img :src="item.hero.avatar" height="50">
                <p class="flex-1 ml-3 m-0 tips text-dark">
                  {{item.description}}
                </p>
              </div>

              <div class="border-bottom mt-2"></div>
              <p class="fs-lm mb-2">被谁克制</p>
              <div v-for="item in model.counters" :key="item.name" class="d-flex pt-2">
                <img :src="item.hero.avatar" height="50">
                <p class="flex-1 ml-3 m-0 tips text-dark">
                  {{item.description}}
                </p>
              </div>
              <div class="border-bottom mt-2"></div>

              <p class="fs-lm mb-2">克制谁</p>
              <div v-for="item in model.advantagers" :key="item.name" class="d-flex pt-2">
                <img :src="item.hero.avatar" height="50">
                <p class="flex-1 ml-3 m-0 tips text-dark">
                  {{item.description}}
                </p>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <!-- page 2 -->
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data () {
    return {
      model: null,
      currentSkillIndex: 0
    }
  },
  computed: {
    currentSkill () {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style lang="scss">
@import "../assets/style/style.scss";
.page-hero {
  .top_title {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .top-banner {
    height: 50vw;
    background: #ffffff no-repeat top center;
    background-size: 100% 100%;
    // background-position: ;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.5rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.5rem;
      }
    }
  }
  .skills {
    img.icon {
      width: 5rem;
      height: 5rem;
      border: 3px solid map-get($colors, "white");
      &.active {
        border-color: map-get($colors, "primary");
      }
      border-radius: 50%;
    }
    .skillsDescription {
      line-height: 1.5rem;
    }
  }
  .heroItems {
    img.icon {
      width: 3.4615rem;
      height: 3.4615rem;
      border-radius: 50%;
    }
  }
  .tips {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
</style>