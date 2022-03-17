<template>
  <div>
    <!-- 活动正在进行导航-->
    <el-breadcrumb style="padding-bottom:15px " separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动用户表</el-breadcrumb-item>
      <el-breadcrumb-item>已结束</el-breadcrumb-item>
    </el-breadcrumb>
    <p>0:已结束 1:正在进行</p>
    <!--    页面内容-->
    <el-card>
      <!--    搜索头部-->
      <el-row :gutter="40" style="padding-bottom: 15px">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" @keyup.enter.native="Search"
                    clearable>
            <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!--          <el-button type="primary" size="mini" @click="addUser">添加活动</el-button>-->
        </el-col>
        <el-col :span="4" style="  position:absolute; left:90%;">
          <el-button type="primary" icon="el-icon-refresh-right" @click="getUserList"></el-button>
        </el-col>
      </el-row>
      <!--      渲染数据表格-->
      <el-table
          :data="UserList.data"
          border
          style="width: 100%">
        <el-table-column
            type="index"
            width="35">
        </el-table-column>
        <el-table-column
            prop="applyID"
            label="报名顺序ID"
            width="100">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="用户UID"
            width="250">
        </el-table-column>
        <el-table-column
            prop="activeName"
            label="活动名称"
            width="450">
        </el-table-column>
        <el-table-column
            prop="w_id"
            label="作品ID"
            width="300">
        </el-table-column>
        <el-table-column
            prop="activeCode"
            label="活动状态"
            width="100">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="操作"
            width="300">
          <div slot-scope="scope">
            <!--            <el-tooltip class="item" effect="dark" content="查看" placement="top">-->
            <!--              <el-button icon="el-icon-search" size="mini"></el-button>-->
            <!--            </el-tooltip>-->
            <!--         <el-button type="primary" size="mini" @click="updateUser(scope.row)">查看/编辑</el-button>-->
            <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!--      分页控件-->
      <el-pagination
          @size-change="SizeChange"
          @current-change="CurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="UserList.count">
      </el-pagination>
      <!--      编辑用户dialog对话框-->
      <el-dialog
          title="编辑活动"
          :visible.sync="dialogUpdateUser"
          width="30%">
        <!--        内容区域-->
        <el-form :model="UpdateUserList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="活动状态" prop="activeCode">
            <el-input v-model="UpdateUserList.activeCode"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdateUser = false">取 消</el-button>
    <el-button type="primary" @click="updateUser1">保 存</el-button>
  </span>
      </el-dialog>
      <!--      添加用户-->
      <el-dialog
          title="添加活动"
          :visible.sync="dialogAddUser"
          width="30%">
        <!--        内容区域-->
        <el-form :model="AddUserList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!--          <el-form-item label="姓名">-->
          <!--            <el-input v-model="UpdateUserList.u_name" disabled></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item label="活动名称" prop="activeName">
            <el-input v-model="AddUserList.activeName" ></el-input>
          </el-form-item>
          <el-form-item label="活动预览" prop="activePicture">
            <el-input v-model="AddUserList.activePicture" ></el-input>
          </el-form-item>
          <el-form-item label="活动海报" prop="activeNote">
            <el-input v-model="AddUserList.activeNote" ></el-input>
          </el-form-item>
          <!--          <el-form-item label="活动状态" prop="activeCode">-->
          <!--            <el-input v-model="AddUserList.activeCode"></el-input>-->
          <!--          </el-form-item>-->
          <el-button type="primary" @click="addUser1" class="a">添 加</el-button>
        </el-form>

      </el-dialog>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  //数据
  data() {
    return {
      input3: null,
      page: 1,
      limit: 10,
      UserList: [],
      UpdateUserList: {
        ApplyID:'',
        UID:'',
        activeID:'',
        w_id:'',
      },
      AddUserList:{
        ApplyID:'',
        UID:'',
        activeID:'',
        w_id:'',
      },
      dialogAddUser: false,
      dialogUpdateUser: false,
    }
  },
  //方法
  methods: {
    // 添加
    addUser(){
      this.dialogAddUser = !this.dialogAddUser
    },
    addUser1(){
      this.dialogAddUser = !this.dialogAddUser,
          this.$http.get("/Activecontroller/addActiveInfo", {
            params: {
              activeName:this.AddUserList.activeName,
              activePicture:this.AddUserList.activePicture,
              activeNote:this.AddUserList.activeNote,
              activeCode:1
            }
          }).then((res) => {
            console.log(res)
            this.UserList = res.data;
            if (res.data.code === 1) {
              this.$message.success("添加成功")
              this.getUserList();
            } else this.$message.error("添加失败")
          })
    },
    //关键字搜索
    Search() {
      console.log(this.input3)
      this.$http.get("/UserController/queryWhereUser", {
        params: {
          page: 1,
          limit: 10,
          Keyword: this.input3,
        }
      }).then((res) => {
        console.log(res.data)
        this.UserList = res.data;
        if (res.data.code === 1) {
          this.$message.success("搜索成功")
        } else this.$message.error("搜索失败")
      })
    },
    //请求查看活动列表数据
    getUserList() {
      this.$http.get("/Applyconntroller/selectinformationsByok", {
        params: {
          page: this.page,
          limit: this.limit,
          activeCode:0
        }
      }).then((res) => {
        // console.log(res)
        this.UserList = res.data;
        if (res.data.code === 1) {
          // this.$message.success("请求成功")
        } else this.$message.error("请求失败")
      })
    },
    //编辑按钮事件
    updateUser(row) {
      this.dialogUpdateUser = !this.dialogUpdateUser
      this.UpdateUserList = row;
      console.log(this.UpdateUserList)
    },
    //确定编辑事件
    updateUser1() {
      this.dialogUpdateUser = !this.dialogUpdateUser,
          this.$http.get("/Activecontroller/updateActiveInfo", {
            params: {
              activeID:this.UpdateUserList.activeID,
              activeCode:this.UpdateUserList.activeCode,
              stateCode: this.UpdateUserList.stateCode,
              jurisdiction: this.UpdateUserList.jurisdiction,
            }
          }).then((res) => {
            console.log(res)
            this.UserList = res.data;
            if (res.data.code === 1) {
              this.$message.success("保存成功")
              this.getUserList();
            } else this.$message.error("保存失败")
          })
    },




    //删除按钮事件
    deleteUser(row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get("/Applyconntroller/deleteApply", {
          params: {
            ApplyID: row.applyID,
          }
        }).then((res) => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message.success("删除成功")
            this.getUserList();
          } else this.$message.error("删除失败")
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //每页条数发生改变时触发
    SizeChange(limit) {
      this.limit = limit;
      this.getUserList();
    },
    //页码发生改变时触发
    CurrentChange(page) {
      this.page = page;
      this.getUserList();
    },
  },
  //  钩子函数
  created() {
    this.getUserList();
  }
}
</script>

<style scoped>

</style>