<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="140px"
    >
      <el-form-item label="品牌名" prop="name">
        <el-input v-model="dataForm.name" placeholder="品牌名"></el-input>
      </el-form-item>
      <el-form-item label="品牌logo" prop="logo">
        <!-- <el-input v-model="dataForm.logo" placeholder="品牌logo地址"></el-input> -->
        <single-upload v-model="dataForm.logo"></single-upload>
      </el-form-item>
      <el-form-item label="介绍" prop="descript">
        <el-input v-model="dataForm.descript" placeholder="介绍"></el-input>
      </el-form-item>
      <el-form-item label="显示状态" prop="showStatus">
        <el-switch
          v-model="dataForm.showStatus"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="检索首字母" prop="firstLetter">
        <el-input v-model="dataForm.firstLetter" placeholder="检索首字母"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model.number="dataForm.sort" placeholder="排序"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import SingleUpload from '@/components/upload/singleUpload'

export default {
  components: { SingleUpload },
  data() {
    return {
      visible: false,
      dataForm: {
        brandId: '',
        name: '',
        logo: '',
        descript: '',
        showStatus: 1,
        firstLetter: '',
        sort: 0
      },
      dataRule: {
        name: [{ required: true, message: '品牌名不能为空', trigger: 'blur' }],
        logo: [
          { required: true, message: '品牌logo地址不能为空', trigger: 'blur' }
        ],
        descript: [
          { required: true, message: '介绍不能为空', trigger: 'blur' }
        ],
        showStatus: [
          {
            required: true,
            message: '显示状态[0-不显示；1-显示]不能为空',
            trigger: 'blur'
          }
        ],
        firstLetter: [
          {
            /**
             * validator 校验器
             * @param rule 校验规则
             * @param value 输入的值
             * @param callback 校验之后的回调
             */
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('首字母必须填写'))
              } else if (!/^[a-zA-Z]$/.test(value)) {
                callback(new Error('首字母必须a-z或者A-Z之间'))
              } else {
                /* 成功直接callback，不要传错误信息 */
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        sort: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('排序字段必须填写'))
              } else if (!Number.isInteger(value) || value < 0) {
                callback(new Error('排序必须是一个大于等于0的整数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    init(id) {
      //this.dataForm.brandId = id || 0
      this.dataForm.brandId = id
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.brandId) {
          // 修改，回显商品信息到表单
          this.$API.brand.reqBrandById(this.dataForm.brandId).then(
            Response => {
              this.dataForm.name = Response.data.name
              this.dataForm.logo = Response.data.logo
              this.dataForm.descript = Response.data.descript
              this.dataForm.showStatus = Response.data.showStatus
              this.dataForm.firstLetter = Response.data.firstLetter
              this.dataForm.sort = Response.data.sort
              this.$message.success('查询单个品牌成功～')
            }
          )
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$API.brand.reqAddOrEditBrand(this.dataForm).then(
            Response => {
              this.$message.success(Response.msg)
              this.visible = false
              this.$emit('refreshDataList')
            }
          )
        }
      })
    }
  }
}
</script>
