<template>
  <div>
    <!--    面包屑导航-->
    <el-breadcrumb style="padding-bottom:15px " separator="/">
      <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
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
          <el-button type="primary">添加用户</el-button>
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
            prop="username"
            label="用户名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="用户ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="地址"
            width="180">
        </el-table-column>
        <el-table-column
            prop="i_sign"
            label="个签">
        </el-table-column>
        <el-table-column
            prop="money"
            label="积分">
        </el-table-column>
        <el-table-column
            prop="user_id"
            label="操作"
            width="250">
          <div slot-scope="scope">
            <!--            <el-tooltip class="item" effect="dark" content="查看" placement="top">-->
            <!--              <el-button icon="el-icon-search" size="mini"></el-button>-->
            <!--            </el-tooltip>-->
            <el-button type="primary" size="mini" @click="updateUser(scope.row)">查看/编辑</el-button>
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
          title="编辑用户"
          :visible.sync="dialogUpdateUser"
          width="30%">
        <!--        内容区域-->
        <el-form :model="UpdateUserList" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input v-model="UpdateUserList.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-input v-model="UpdateUserList.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户ID" prop="uid">
            <el-input v-model="UpdateUserList.uid" disabled></el-input>
          </el-form-item>
          <el-form-item label="点赞数" prop="i_like">
            <el-input v-model="UpdateUserList.i_like" disabled></el-input>
          </el-form-item>
          <el-form-item label="关注数量" prop="i_focus">
            <el-input v-model="UpdateUserList.i_focus" disabled></el-input>
          </el-form-item>
          <el-form-item label="粉丝数量" prop="i_fans">
            <el-input v-model="UpdateUserList.i_fans" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="UpdateUserList.address"></el-input>
          </el-form-item>
          <el-form-item label="星座" prop="birthday">
            <el-input v-model="UpdateUserList.birthday"></el-input>
          </el-form-item>
          <el-form-item label="个签" prop="i_sign">
            <el-input v-model="UpdateUserList.i_sign"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="money">
            <el-input v-model="UpdateUserList.money"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogUpdateUser = false">取 消</el-button>
    <el-button type="primary" @click="updateUser1">保 存</el-button>
  </span>
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
        user_id: '',
        address: '',
        sex:'',
        i_sign:'',
        i_like:'',
        i_focus:'',
        i_fans:'',
        birthday:'',
        money:'',
      },
      dialogUpdateUser: false,
    }
  },
  //方法
  methods: {
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
    //请求查看用户列表数据
    getUserList() {
      this.$http.get("/Usercontroller/selectUserInfos", {
        params: {
          page: this.page,
          limit: this.limit
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
          this.$http.get("/Usercontroller/updateUserInfo", {
            params: {
              user: this.UpdateUserList,
              id:this.UpdateUserList.id,
              username: this.UpdateUserList.username,
              sex: this.UpdateUserList.sex,
              UID: this.UpdateUserList.uid,
              address: this.UpdateUserList.address,
              I_sign:this.UpdateUserList.i_sign,
              I_like:this.UpdateUserList.i_like,
              I_focus:this.UpdateUserList.i_focus,
              I_fans:this.UpdateUserList.i_fans,
              birthday:this.UpdateUserList.birthday,
              money:this.UpdateUserList.money,
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
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get("/Usercontroller/deleteUserInfo", {
          params: {
            id: row.id,
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
