<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item lable='名称'>
        <el-input v-model="model.name"></el-input>
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
      model: {
        name: ''
      }
    }
  },
  methods: {
    async save () {
      let res
      // 有id修改 无id新建
      if (this.id) {
        res = await this.$http.put(`categories/${this.id}`, {
          id: this.id,
          name: this.model.name
        })
      } else {
        res = await this.$http.post('categories', {
          id: this.id,
          name: this.model.name
        })
      }
      console.log(res)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch () {
      const res = await this.$http.get(`categories/${this.id}`)
      this.model = res.data
    }
  },
  created () {
    this.id && this.fetch()
  }
}
</script>

<style>
</style>
