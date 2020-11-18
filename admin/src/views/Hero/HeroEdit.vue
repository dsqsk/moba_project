<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label='英雄名称'>
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label='称号'>
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label='头像'>
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
              :on-success="afterUploadAvator">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label='原画'>
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
              :on-success="afterUploadBanner">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-circle-plus-outline avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label='类型'>
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='难度'>
            <el-rate style="margin-top:0.6rem" v-model="model.scores.difficultGrade" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label='技能'>
            <el-rate style="margin-top:0.6rem" v-model="model.scores.skillGrade" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label='攻击'>
            <el-rate style="margin-top:0.6rem" v-model="model.scores.attackGrade" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label='生存'>
            <el-rate style="margin-top:0.6rem" v-model="model.scores.survivalGrade" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label='顺风出装'>
            <el-select v-model="model.itemsWell" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='逆风出装'>
            <el-select v-model="model.itemsBad" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.againstTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamfightTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button icon="el-icon-plus" @click="model.skills.push({})">添加技能</el-button>
          <el-row types="flex">
            <!-- 通过el-col循环数据 -->
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="技能名称" style="margin-top:2rem">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="技能图标">
                <!-- <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                  :on-success="afterUpload"> -->
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.cooldown"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.consume"></el-input>
              </el-form-item>
              <el-form-item label="技能描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 搭档 -->
        <el-tab-pane label="英雄关系">
          <el-button icon="el-icon-plus" @click="model.partners.push({})">选择搭档英雄</el-button>
          <el-row types="flex">
            <!-- 通过el-col循环数据 -->
            <el-col :md="12" v-for="(item,index) in model.partners" :key="index">
              <el-form-item label="英雄" style="margin-top:2rem">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 被克 -->
          <el-button icon="el-icon-plus" style="margin-top:2rem" @click="model.counters.push({})">选择克制英雄</el-button>
          <el-row types="flex">
            <!-- 通过el-col循环数据 -->
            <el-col :md="12" v-for="(item,index) in model.counters" :key="index">
              <el-form-item label="英雄" style="margin-top:2rem">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.counters.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 克制 -->
          <el-button icon="el-icon-plus" style="margin-top:2rem" @click="model.advantagers.push({})">选择克制英雄</el-button>
          <el-row types="flex">
            <!-- 通过el-col循环数据 -->
            <el-col :md="12" v-for="(item,index) in model.advantagers" :key="index">
              <el-form-item label="英雄" style="margin-top:2rem">
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="danger" @click="model.advantagers.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type='primary' native-type='submit' style="margin-top:1rem">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {
        name: '',
        avatar: '',
        skills: [],
        partners: [],
        counter: [],
        advantagers: [],
        scores: {
          difficultGrade: 0,
          skillGrade: 0,
          attackGrade: 0,
          survivalGrade: 0
        }
      },
      categories: [],
      items: [],
      heroes: []
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      // 有id修改 无id新建
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/heroes', this.model)
      }
      // this.$router.push('/heroes/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchList () {
      const res = await this.$http.get(`/rest/heroes/${this.id}`)
      this.model = { ...this.model, ...res.data }
    },
    async fetchCategories () {
      const res = await this.$http.get('/rest/categories')
      this.categories = res.data
    },
    async fetchItems () {
      const res = await this.$http.get('/rest/items')
      this.items = res.data
    },
    async fetchHeroes () {
      const res = await this.$http.get('/rest/heroes')
      this.heroes = res.data
    },
    afterUploadAvator (res) {
      this.model.avatar = res.url
    },
    afterUploadBanner (res) {
      this.model.banner = res.url
    }
  },
  created () {
    this.fetchItems()
    this.fetchCategories()
    this.fetchHeroes()
    this.id && this.fetchList()
  }
}

</script>

<style>
</style>
