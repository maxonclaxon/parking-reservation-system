import {createWebHistory,createRouter} from 'vue-router'

export default new createRouter({
    mode:'history',
    history:createWebHistory(),
    routes:[
        {
            path:'',
            name:'Home',
            component:()=>import('@/App.vue')
        },
        {
            path:'/auth',
            component:()=>import('@/Views/Auth')
        }
    ]
})