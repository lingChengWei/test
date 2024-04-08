<template>
  <div
    style="
      height: 100%;
      width: 100%;
      display: flex;
      margin: 0px auto;
      flex-direction: column;
    "
  >
    <div style="margin-bottom: 10px">
      <div style="height: 60px">
        <TopBar />
      </div>
    </div>
    <div style="flex: 1; display: flex; justify-content: center">
      <div style="width: 1300px">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/TopBar";
  import SideBar from "@/components/SideBar";
  export default {
    components: { TopBar, SideBar },
  };
</script>
