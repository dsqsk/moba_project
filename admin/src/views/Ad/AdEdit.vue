<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label='名称'>
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label='广告'>
        <el-button icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
        <el-row types="flex">
          <!-- 通过el-col循环数据 -->
          <el-col :md="18" v-for="(item,index) in model.items" :key="index">
            <el-form-item label="跳转链接" style="margin-top:2rem">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="banner" style="margin-top:2rem">
              <!-- <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                  :on-success="afterUpload"> -->
              <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        items: []
      }
    }
  },
  methods: {
    async save () {
      let res // eslint-disable-line no-unused-vars
      // 有id修改 无id新建
      if (this.id) {
        res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
      } else {
        res = await this.$http.post('/rest/ads', this.model)
        // {
        //   id: this.id,
        //   name: this.model.name
        // }
      }
      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetchList () {
      const res = await this.$http.get(`/rest/ads/${this.id}`)
      this.model = { ...this.model, ...res.data }
    }
  },

  created () {
    this.id && this.fetchList()
  }
}

</script>

<style>
</style>
