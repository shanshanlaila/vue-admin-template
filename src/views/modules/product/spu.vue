<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="dataForm">
          <el-form-item label="分类">
            <category-cascader :catelogPath.sync="catelogPath"></category-cascader>
          </el-form-item>
          <el-form-item label="品牌">
            <brand-select style="width:160px"></brand-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select style="width:160px" v-model="dataForm.status" clearable>
              <el-option label="新建" :value="0"></el-option>
              <el-option label="上架" :value="1"></el-option>
              <el-option label="下架" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检索">
            <el-input style="width:160px" v-model="dataForm.key" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchSpuInfo">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <spuinfo :catId="catId"></spuinfo>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Spuinfo from "./spuinfo";
import PubSub from 'pubsub-js'
import CategoryCascader from '@/views/common/category-cascader.vue'
import BrandSelect from '@/views/common/brand-select.vue'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { CategoryCascader, Spuinfo, BrandSelect },
  props: {},
  data() {
    //这里存放数据
    return {
      catId: 0,
      catelogPath: [],
      dataForm: {
        status: "",
        key: "",
        brandId: 0,
        catelogId: 0
      },
      catPathSub: null,
      brandIdSub: null

    };
  },
  //方法集合
  methods: {
    searchSpuInfo() {
      console.log("搜索条件", this.dataForm);
      this.PubSub.publish("dataForm",this.dataForm);
    }
  },
  //生命周期挂载完成（可以访问DOM元素）
  mounted() {
    this.catPathSub = PubSub.subscribe("catPath", (msg, val) => {
      this.dataForm.catelogId = val[val.length-1];
    });
    this.brandIdSub = PubSub.subscribe("brandId", (msg, val) => {
      this.dataForm.brandId = val;
    });
  },
  beforeDestroy() {
     PubSub.unsubscribe(this.catPathSub);
     PubSub.unsubscribe(this.brandIdSub);
  },
};
</script>
