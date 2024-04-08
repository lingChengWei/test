<template>
  <div class="index">
    <div class="top">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        style="padding: 10px"
      >
        <el-tab-pane label="抖音榜" name="dyrx_info"></el-tab-pane>
        <el-tab-pane label="直播榜" name="zbrx_info"></el-tab-pane>
        <el-tab-pane label="视频榜" name="sprx_info"></el-tab-pane>
      </el-tabs>
      <div class="box">
        <div class="left">商品分类</div>
        <div class="center">
          <div class="content">
            <div
              v-for="item in goodeType"
              :key="item.id"
              @click="clickType(item)"
            >
              <div
                :class="[
                  formData.selectTypeId === item.name ? 'active' : '',
                  'type',
                ]"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="left">时间</div>
        <div class="center">
          <div class="content">
            <el-radio-group
              @input="clickDataValue"
              v-model="formData.cycle"
              size="mini"
              style="margin-right: 24px"
            >
              <el-radio-button :label="1">日榜</el-radio-button>
              <el-radio-button :label="7">周榜</el-radio-button>
              <el-radio-button :label="30">月榜</el-radio-button>
            </el-radio-group>

            <div
              style="
                line-height: 22px;
                color: #69718c;
                font-size: 14px;
                padding: 3px 12px;
              "
            >
              {{
                formData.cycle == 1
                  ? "日榜"
                  : formData.cycle == 7
                  ? "周榜"
                  : formData.cycle == 30
                  ? "月榜"
                  : ""
              }}
            </div>
            <el-select
              v-model="formData.dateValue"
              @change="selectValue"
              clearable
              placeholder="请选择"
              size="mini"
              :class="[
                formData.cycle === 1
                  ? 'wid1'
                  : formData.cycle === 7
                  ? 'wid2'
                  : formData.cycle === 30
                  ? 'wid3'
                  : '',
              ]"
              style="margin-right: 12px"
            >
              <el-option
                v-for="item in formData.date"
                :key="item.date"
                :label="item.date"
                :value="item.date"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="right">
          <el-button size="mini" icon="el-icon-upload2">导出</el-button>
          <el-button size="mini" icon="el-icon-tickets">快速创建</el-button>
        </div>
      </div>
    </div>
    <div class="main" style="">
      <el-table
        :data="tableData"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{
          position: 'sticky',
          top: '200',
        }"
        @cell-click="clickTable"
      >
        <el-table-column
          label="排名"
          prop="rank"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column prop="address" label="主图" width="50">
          <template slot-scope="scope">
            <div style="display: flex">
              <el-popover placement="bottom" width="200" trigger="hover">
                <div>
                  <img :src="scope.row.cover" alt="" />
                </div>
                <img
                  slot="reference"
                  :src="scope.row.cover"
                  style="height: 48px; width: 48px; margin-right: 12px"
                />
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="标题">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.title"
              placement="top"
              :open-delay="300"
            >
              <div>{{ scope.row.title }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="150" align="center">
          <template slot-scope="scope">
            <div>
              <div>￥ {{ scope.row.price / 100 }}</div>
              <el-tag size="mini">规格</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="宝贝id"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="comment1" label="文本1">
          <template slot-scope="scope">
            <div><el-input v-model="scope.row.comment1"></el-input></div>
          </template>
        </el-table-column>
        <el-table-column prop="comment2" label="文本2">
          <template slot-scope="scope">
            <div><el-input v-model="scope.row.comment2"></el-input></div>
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="bPushGoods(scope.row)"
            >
              推送
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: center; margin-top: 24px">
        <pagination
          ref="pagination"
          :total="total"
          @pagination="getBGoods"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getGoods,
    getDyrsGoods,
    getZbrxGoods,
    getSprxGoods,
    updataGoods,
    getBGoods,
    bPushGoods,
  } from "@/api";
  import getDateValue from "@/utils/getdate";
  export default {
    data() {
      return {
        activeName: "dyrx_info",
        total: 0,
        loading: false,
        formData: {
          selectTypeId: "不限",
          statistics: 1,
          cycle: 1,
          date: [],
          dateValue: "",
          value: "",
        },
        uploadValueForm: {
          value1: "",
          value2: "",
        },
        goodeType: [
          { id: 1, name: "不限" },
          { id: 2, name: "服饰内衣" },
          { id: 3, name: "鞋靴箱包" },
          { id: 4, name: "运动户外" },
          { id: 5, name: "钟表配饰" },
          { id: 6, name: "珠宝文玩" },
          { id: 7, name: "美妆" },
          { id: 8, name: "个护家清" },
          { id: 9, name: "食品饮料" },
          { id: 10, name: "生鲜" },
          { id: 11, name: "鲜花园艺" },
          { id: 12, name: "母婴" },
          { id: 13, name: "宠物玩具" },
          { id: 14, name: "乐器" },
          { id: 15, name: "图书教育" },
          { id: 16, name: "礼品文创" },
          { id: 17, name: "3C数码家电" },
          { id: 18, name: "智能家居" },
          { id: 19, name: "二手商品" },
          { id: 20, name: "虚拟充值" },
          { id: 21, name: "本地生活" },
          { id: 22, name: "奢侈品" },
          { id: 23, name: "汽车整车" },
          { id: 24, name: "医疗健康" },
          { id: 25, name: "滋补保健" },
          { id: 26, name: "酒类" },
          { id: 27, name: "原料包装" },
        ],
        tableData: [],
      };
    },
    mounted() {
      this.clickDataValue(1);
    },
    methods: {
      // 获取
      getList() {
        this.$refs.pagination.changePage(1);
      },

      // 获取数据
      async getBGoods(params) {
        console.log("日期", this.formData.value);
        const data = {
          queries: [
            {
              product_type: String(this.formData.cycle),
              category: this.formData.selectTypeId,
            },
          ],
          table: this.activeName,
        };
        try {
          this.loading = true;
          const res = await getBGoods(data);

          console.log("res", res, res.data.length);

          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        } catch (err) {
          this.loading = false;
          console.log("err", err);
        }
      },
      // 上传内容
      async uploadValue(row, index) {
        console.log("val", row, this.uploadValueForm, index);
        const data = {
          table: "dyrx_info",
          flag: "1",
          updates: [
            {
              product_id: row.productid,
              comments: {
                comment1: row.comment1 ? row.comment1 : "",
                comment2: row.comment2 ? row.comment2 : "",
              },
            },
          ],
        };
        try {
          const res = await updataGoods(data);
          console.log("res", res);
          this.$message.success(res.message);
          console.log("111111111", this.$refs[`popover-${index}`]);
          document.body.click();
          this.getList();
        } catch (err) {
          console.log("err", err);
        }
      },
      // 单个推送商品
      async bPushGoods(row) {
        console.log("row", row);
        const data = {
          table: "dyrx_info",
          flag: "1",
          updates: [
            {
              product_id: row.productid,
              comments: {
                comment1: row.comment1 ? row.comment1 : "",
                comment2: row.comment2 ? row.comment2 : "",
              },
            },
          ],
        };
        try {
          const res = await bPushGoods(data);
          console.log("res", res);
          this.$message.success(res.data);
          this.getList();
        } catch (err) {
          this.$message.error("推送失败");
        }
      },
      // 点击表格
      clickTable(item) {
        console.log("item", item);
      },

      // 点击tab事件
      handleClick(tab) {
        console.log(tab.name);
        this.getList();
      },

      // 切换商品类目
      clickType(item) {
        console.log("item", item);
        this.formData.selectTypeId = item.name;
        this.getList();
      },

      selectValue(val) {
        console.log("val", val);
        console.log("this.formData.date", this.formData.date);
        const findValue = this.formData.date.find((item) => item.date === val);
        console.log("findValue", findValue);
        this.formData.value = findValue.val;
        this.getList();
      },

      // 选择日周月榜
      clickDataValue(val) {
        console.log("val", val);
        this.formData.date = [];
        this.formData.dateValue = "";
        if (val === 7) {
          let date = getDateValue.getYearToCurrentWeeks();
          this.formData.date = date;
          console.log("date2", date);
          let length = date.length - 1;
          console.log("length", date[length]);
          this.formData.dateValue = date[length].date;
          this.formData.value = date[length].val;
        } else if (val === 1) {
          let date = getDateValue.getYearDays();
          console.log("date11", date);
          this.formData.date = date;
          let length = date.length - 1;
          console.log("length", date[length]);
          this.formData.dateValue = date[length].date;
          this.formData.value = date[length].val;
        } else if (val === 30) {
          let date = getDateValue.getYearToCurrentMonthDays();
          console.log("date11", date);
          this.formData.date = date;
          let length = date.length - 1;
          console.log("length", date[length]);
          this.formData.dateValue = date[length].date;
          this.formData.value = date[length].val;
        }
        this.getList();
      },
    },
  };
</script>

<style lang="scss" scoped>
  ::v-deep .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #fff;
    border-color: #dcdfe6;
    color: #409eff;
    box-shadow: 0px 0 0 0;
  }
  .wid1 {
    width: 90px;
    ::v-deep .el-input__inner {
      background-color: #ecf5ff;
      // color: #000;
    }
  }
  .wid2 {
    width: 130px;
    ::v-deep .el-input__inner {
      background-color: #ecf5ff;
      // color: #000;
    }
  }
  .wid3 {
    width: 110px;
    ::v-deep .el-input__inner {
      background-color: #ecf5ff;
      // color: #000;
    }
  }

  .index {
    height: 100%;
    width: 100%;
  }
  .top {
    background-color: #fff;
    padding: 10px;
    .box {
      padding: 10px;
      display: flex;
      align-items: flex-start;
      .left {
        flex-shrink: 0;
        width: 56px;
        min-width: 28px;
        padding: 3px 12px;
        margin: 0 16px 12px 0;
        font-size: 14px;
        line-height: 22px;
        color: #69718c;
      }
      .center {
        flex: 1;
        width: 100%;
        padding-top: 10px;
        margin-top: -10px;
        overflow: hidden;
        color: #3d455f;
        .content {
          width: 100%;
          display: flex;
          flex-flow: wrap;
          .type {
            display: inline-block;
            padding: 3px 8px;
            margin-right: 8px;
            margin-bottom: 12px;
            font-size: 14px;
            line-height: 22px;
            color: #3d455f;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.3s;
          }
          .type:hover {
            background-color: #edf1fd;
            transition: all 0.3s;
          }
          .active {
            font-weight: 500;
            color: #4975e9;
            background: #edf1fd;
            transition: all 0.3s;
          }
        }
      }
      .right {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: flex-end;
        min-width: 102px;
        min-height: 28px;
        margin-left: 16px;
      }
    }
  }
  .main {
    margin-top: 10px;
    background-color: #fff;
    padding: 0px 0px 24px;
  }
</style>
