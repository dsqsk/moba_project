<template>
  <div class="loginContrainer">
    <el-card header="请登录">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primay" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async login () {
      const res = await this.$http.post('login', this.model)
      localStorage.token = res.data.token
      this.$message({
        type: 'success',
        message: '登陆成功'
      })
      this.$router.push('/')
    }
  }
}
</script>

<style>
.loginContrainer {
  width: 50%;
  margin: 5rem auto;
}
</style>
