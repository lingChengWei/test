<template>
  <div style="width: 100%; height: 100%">
    <router-view />
  </div>
</template>

<script>
  import TopBar from "@/components/TopBar";
  import SideBar from "@/components/SideBar";
  export default {
    components: { TopBar, SideBar },
  };
</script>

<style lang="scss">
  #app {
    height: 100%;
    width: 100%;
  }

  /* Webkit浏览器（Chrome, Safari） */
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #afafaf;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
</style>
