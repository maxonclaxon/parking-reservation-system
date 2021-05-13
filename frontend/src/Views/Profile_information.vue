<template>
    <div class="info">
            <ul class="collection information">
                <li class="collection-item">Количество стоянок за месяц: <span>{{getProfileInfo.stands}}</span></li>
                <li class="collection-item">Среднее время стоянки: <span>{{getProfileInfo.time}}</span></li>
                <li class="collection-item">Средняя стоимость <span>{{getProfileInfo.cost}}</span></li>
                <li class="collection-item">Скидка <span>{{getProfileInfo.discount}}%</span></li>
            </ul>
        </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: mapGetters(["getProfileInfo"]),
    methods:{
        ...mapActions(['loadProfileInfo']),
    },
    mounted(){
        this.loadProfileInfo();

    }
}
</script>

<style lang="scss" scoped>
.information{
        text-align: left;
        span{
            float: right;
        }
    }
</style>