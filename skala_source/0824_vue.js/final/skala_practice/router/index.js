import {
    createRouter,
    createWebHistory,
} from 'vue-router'

const routes = [

    // =========================
    // 종합실습 4
    // =========================

    {
        path: '/prac4',
        name: 'practice4-home',
        component: () =>
            import('../prac_4/views/WeatherHomeView.vue'),
    },

    {
        path: '/prac4/about',
        name: 'practice4-about',
        component: () =>
            import('../prac_4/views/WeatherAboutView.vue'),
    },

    {
        path: '/prac4/guide',
        name: 'practice4-guide',
        component: () =>
            import('../prac_4/views/WeatherGuideView.vue'),
    },

    {
        path: '/prac4/weather/:cityId',
        name: 'practice4-detail',
        component: () =>
            import('../prac_4/views/WeatherDetailView.vue'),
    },


    // =========================
    // 종합실습 5
    // =========================

    {
        path: '/prac5',
        name: 'practice5-home',
        component: () =>
            import('../prac_5/views/WeatherHomeView.vue'),
    },

    {
        path: '/prac5/about',
        name: 'practice5-about',
        component: () =>
            import('../prac_5/views/WeatherAboutView.vue'),
    },

    {
        path: '/prac5/weather/:cityId',
        name: 'practice5-detail',
        component: () =>
            import('../prac_5/views/WeatherDetailView.vue'),
    },


    // =========================
    // 종합실습 6
    // =========================

    {
        path: '/prac6',
        name: 'practice6-home',
        component: () =>
            import('../prac_6/views/WeatherHomeView.vue'),
    },

    {
        path: '/prac6/about',
        name: 'practice6-about',
        component: () =>
            import('../prac_6/views/WeatherAboutView.vue'),
    },

    {
        path: '/prac6/weather/:cityId',
        name: 'practice6-detail',
        component: () =>
            import('../prac_6/views/WeatherDetailView.vue'),
    },


    // =========================
    // 종합실습 7
    // =========================

    {
        path: '/prac7',
        name: 'practice7-home',
        component: () =>
            import('../prac_7/views/WeatherHomeView.vue'),
    },

    {
        path: '/prac7/about',
        name: 'practice7-about',
        component: () =>
            import('../prac_7/views/WeatherAboutView.vue'),
    },

    {
        path: '/prac7/weather/:cityId',
        name: 'practice7-detail',
        component: () =>
            import('../prac_7/views/WeatherDetailView.vue'),
    },


    // =========================
    // 존재하지 않는 주소
    // 반드시 가장 마지막
    // =========================

    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () =>
            import('../prac_4/views/NotFoundView.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router