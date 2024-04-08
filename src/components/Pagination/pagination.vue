<template>
  <el-pagination
    @size-change="changeSize"
    @current-change="changeCurrent"
    :page-sizes="pageSizes"
    :current-page.sync="currentPage"
    :page-size="limit"
    :total="total"
    background
    layout="total, sizes, prev, pager, next, jumper"
  ></el-pagination>
</template>

<script>
  export default {
    props: {
      total: {
        type: Number,
        default: () => 0,
      },

      pageSizes: {
        type: Array,
        default: () => ["50"],
      },
    },
    data() {
      return {
        limit: 10,
        currentPage: 1, // 默认当前页码
        currentLimit: this.limit,
      };
    },
    watch: {
      limit: {
        //深度监听，可监听到对象、数组的变化
        handler(val, oldVal) {
          console.log("页面的条数传递到分页组件改变了", val, oldVal);
          this.currentLimit = val;
        },
        deep: true, //true 深度监听
      },
    },
    methods: {
      changeCurrent(page) {
        console.log("改变页码", page, this.limit);
        this.$emit("pagination", { page: page, limit: this.limit });
      },
      changeSize(limit) {
        this.limit = limit;
        this.currentPage = 1;
        console.log("显示条数", limit);
        this.$emit("pagination", { page: this.currentPage, limit: this.limit });
      },
      changePage(val) {
        console.log("传递进来分页组件的参数", val);
        this.currentPage = val; // 接收传递进来的页码
        console.log("当前页码", this.currentPage);
        console.log("total", this.total);
        this.$emit("pagination", { page: val, limit: this.limit });
      },
      // 刷新页面
      flushPage() {
        this.$emit("pagination", {
          page: this.currentPage,
          limit: this.currentLimit,
        });
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  };
</script>
