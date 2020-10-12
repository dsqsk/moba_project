<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data='items'>
      <el-table-column prop='_id' label='ID' width='250px'></el-table-column>
      <el-table-column prop='name' label='英雄名称'></el-table-column>
      <el-table-column prop='title' label='英雄称号'></el-table-column>
      <el-table-column prop='icon' label='英雄头像'>
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:4rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑
          </el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetchList () {
      const res = await this.$http.get('/rest/heroes')
      this.items = res.data
    },
    // 删除分类
    async remove (row) {
      this.$confirm(`是否删除英雄'${row.name}'`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$http.delete(`/rest/heroes/${row._id}`)
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetchList()
        })
    }
  },
  created () {
    this.fetchList()
  }
}
</script>

<style>
</style>
