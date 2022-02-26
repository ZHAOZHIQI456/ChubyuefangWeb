import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Login from '../components/Login'

Vue.use(Router)
const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    routes: [{
        //    路由地址
        path: '/',
        //    跳转的组件
        component: Login,
        },
        {
            //    路由地址
            path: '/main',
            //    跳转的组件
            component: Main,
            // 重定向
            redirect: "/welcome",
            children: [
                {
                    path: "/welcome",
                    name: "Welcome",
                    component: () => import("../components/Welcome")
                },
                {
                    path: "/user",
                    name: "User",
                    component: () => import("../components/User")
                },
                {
                    path: "/note",
                    name: "Note",
                    component: () => import("../components/Note")
                },
                {
                    path: "/content",
                    name: "Content",
                    component: () => import("../components/Content")
                },
                {
                    path: "/music",
                    name: "Music",
                    component: () => import("../components/Music")
                },
                {
                    path: "/book",
                    name: "Book",
                    component: () => import("../components/Book")
                },
                {
                    path: "/title",
                    name: "Title",
                    component: () => import("../components/Title")
                },
                {
                    path: "/write",
                    name: "Write",
                    component: () => import("../components/Write")
                },
                {
                    path: "/writer",
                    name: "Writer",
                    component: () => import("../components/Writer")
                },
                {
                    path: "/show",
                    name: "Show",
                    component: () => import("../components/Show")
                },
                {
                    path: "/active1",
                    name: "Active1",
                    component: () => import("../components/Active1")
                },
                {
                    path: "/active2",
                    name: "Active2",
                    component: () => import("../components/Active2")
                },
                {
                    path: "/activeuser1",
                    name: "Activeuser1",
                    component: () => import("../components/Activeuser1")
                },
                {
                    path: "/activeuser2",
                    name: "Activeuser2",
                    component: () => import("../components/Activeuser2")
                },
            ]
        }
    ]
})

