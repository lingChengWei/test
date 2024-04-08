<template>
  <div style="margin-right: 10px">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      router
      :default-active="activeMenu"
      @close="handleClose"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">网页A</span>
      </el-menu-item>
      <el-menu-item index="summaryList">
        <i class="el-icon-document"></i>
        <span slot="title">汇总表</span>
      </el-menu-item>
      <el-menu-item index="employeeEnd">
        <i class="el-icon-setting"></i>
        <span slot="title">员工端</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "SideBar",
    computed: {
      // 获取当前菜单选项
      activeMenu() {
        const route = this.$route;
        const { meta, path } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return path;
      },
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
</script>
