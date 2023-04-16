<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :data="categoryList"
      :props="defaultProps"
      node-key="catId"
      ref="menuTree"
      @node-click="nodeClick"
      :filter-node-method="filterNode"
      :highlight-current="true"
    ></el-tree>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      filterText: '',
      categoryList: [],
      expandedKey: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  //计算属性类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val)
    }
  },
  //方法集合
  methods: {
    //树节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    /**
     * 获取分类数据
     * @returns {Promise<void>}
     */
    getData() {
      let that = this
      this.$API.category.reqGetCategoryList().then(
        Response => {
          that.categoryList = Response.categoryList
        }
      )
    },
    /**
     * 点击分类节点事件
     * @param data
     * @param node
     * @param component
     */
    nodeClick(data, node, component) {
      console.log('子组件category的节点被点击', data, node, component)
      //向父组件发送事件；
      this.$emit('tree-node-click', data, node, component)
    }
  },
  created() {
    this.getData()
  }

}
</script>
<style scoped>

</style>
