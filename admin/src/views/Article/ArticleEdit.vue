<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label='所属分类'>
        <el-select v-model="model.categories" multiple>
          <!-- 通过父级name展示,id进行关联 -->
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='标题'>
        <el-input v-model="model.header"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type='submit'>保存</el-button>
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
      model: {},
      categories: []
    }
  },
  methods: {
    async save () {
      let res
      // 有id修改 无id新建
      if (this.id) {
        res = await this.$http.put(`/rest/articles/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/articles', this.model)
        // {
        //   id: this.id,
        //   name: this.model.name
        // }
      }
      console.log(res)
      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchList () {
      const res = await this.$http.get(`/rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get('/rest/categories')
      this.categories = res.data
    }
  },

  created () {
    this.fetchCategories()
    this.id && this.fetchList()
  }
}

</script>

<style>
</style>
