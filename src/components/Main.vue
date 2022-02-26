<template>
  <!--  <div style="h">-->
  <el-container style="height: 100%;">
    <!--    头部内容-->
    <el-header>
      <div>
        <img class="logo" src="../assets/logo.png">
        <span class="title" style="color: #fff">纯阅坊后台管理系统</span>
        <i class="el-icon-s-operation" style=" padding-left:20px;font-size: 20px; color: #dadada"
           @click="isCollapse=!isCollapse"></i>
      </div>
      <div>
        <el-button type="info" @click="quit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!--      侧边栏内容-->
      <el-aside :width="isCollapse?'64px':'200px'">
        <!--        <div style=" text-align: center;color: #fff;background: rgb(74,80,100);cursor: pointer"-->
        <!--             @click="isCollapse=!isCollapse">|||-->
        <!--        </div>-->
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :unique-opened="true"
            :router="true"
            :collapse-transition="false"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#FFD700">
          <el-submenu :index="item.id+''" v-for="item in router" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index="item2.path+''" v-for="item2 in item.children" :key="item2.id">
              <i :class="item2.icon"></i>
              <span slot="title">{{ item2.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
      <!--      主体内容-->
      <el-main>
            <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!--  </div>-->
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      router: [

        {
          id: 1,
          name: "用户管理",
          icon: "el-icon-user",
          children: [
            {
              id: 1,
              name: "用户列表",
              path: "user",
              icon: "el-icon-user",
            },
          ]
        },
        {
          id: 3,
          name: "好文推送",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 1,
              name: "内容管理",
              path: "note",
              icon: "el-icon-user",
            },
          ]
        },
        {
          id: 9,
          name: "轮播图管理",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 1,
              name: "内容管理",
              path: "show",
              icon: "el-icon-user",
            },
          ]
        },
        {
          id: 2,
          name: "一起刷",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 2,
              name: "未审批",
              icon: "el-icon-edit",
              path: "content",
            },
            {
              id: 3,
              name: "已审批",
              icon: "el-icon-headset",
              path: "music"
            }
          ]
        },
        {
          id: 4,
          name: "书库",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 1,
              name: "内容管理",
              path: "book",
              icon: "el-icon-user",
            },
          ]
        },
        {
          id: 5,
          name: "一起写题目",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 1,
              name: "内容管理",
              path: "title",
              icon: "el-icon-user",
            },
          ]
        },
        {
          id: 8,
          name: "一起写作品",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 2,
              name: "未审批",
              icon: "el-icon-edit",
              path: "write",
            },
            {
              id: 3,
              name: "已审批",
              icon: "el-icon-headset",
              path: "writer"
            }
          ]
        },
        {
          id: 10,
          name: "活动管理",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 2,
              name: "正在进行",
              icon: "el-icon-edit",
              path: "active1",
            },
            {
              id: 3,
              name: "已结束",
              icon: "el-icon-headset",
              path: "active2"
            }
          ]
        },
        {
          id: 11,
          name: "活动用户表",
          icon: "el-icon-edit-outline",
          children: [
            {
              id: 2,
              name: "正在进行",
              icon: "el-icon-edit",
              path: "activeuser1",
            },
            {
              id: 3,
              name: "已结束",
              icon: "el-icon-headset",
              path: "activeuser2"
            }
          ]
        },
      ],
      isCollapse: false
    }
  },
  methods: {
    quit() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

.logo {
  height: 60px;
  vertical-align: top;
  margin-right: 16px;
}

.title {
  font-size: 33px;
  color: #000000;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.el-header {
  background: rgb(55, 61, 65);
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}

.el-aside {
  background: rgb(51, 55, 68);
}

.el-main {
  background: rgb(234, 237, 241);
}


</style>
