<template>
  <div
    style="
      height: 60px;
      background-color: #fff;
      position: fixed;
      top: 0px;
      z-index: 99;
      width: 100%;
      box-shadow: 4px 4px 4px 4px #f2f3f5;
      position: relative; /* 添加相对定位 */
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin: 0px 100px;
        align-items: center;
      "
    >
      <el-menu
        mode="horizontal"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        router
        :default-active="activeMenu"
        @close="handleClose"
      >
        <el-menu-item index="dyHotPush">
          <i class="el-icon-s-order"></i>
          <span slot="title">抖音榜</span>
        </el-menu-item>
        <el-menu-item index="zbHotPush">
          <i class="el-icon-video-camera-solid"></i>
          <span slot="title">直播榜</span>
        </el-menu-item>
        <el-menu-item index="spHotPush">
          <i class="el-icon-s-platform"></i>
          <span slot="title">视频榜</span>
        </el-menu-item>
        <el-menu-item index="summaryList">
          <i class="el-icon-document"></i>
          <span slot="title">汇总表</span>
        </el-menu-item>
        <el-menu-item index="employeeEnd">
          <i class="el-icon-user-solid"></i>
          <span slot="title">员工端</span>
        </el-menu-item>
      </el-menu>
      <!-- 头像 -->
      <div style="display: flex; align-items: center">
        <div style="padding: 0px 10px">
          <el-link type="primary" @click="dialogVisible = true">token</el-link>
        </div>
        <el-dropdown @command="handleCommand">
          <span class="avatar-dropdown">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog
      title="设置token"
      :visible.sync="dialogVisible"
      width="500px"
      :append-to-body="true"
    >
      <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入token"
        v-model="token"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataToken">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "TopBar",
    data() {
      return {
        dialogVisible: false,
      };
    },
    computed: {
      token() {
        return localStorage.getItem("token");
      },
      // 获取当前菜单选项
      activeMenu() {
        const route = this.$route;
        console.log("route", route);
        const { meta, path, name } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return name;
      },
    },
    methods: {
      async handleCommand(command) {
        switch (command) {
          case "token":
            break;
          case "logout":
            await this.$store.dispatch("logout");
            break;
        }
      },
      // 更新token
      updataToken() {
        localStorage.setItem("token", this.token);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
