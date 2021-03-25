<template>
    <div class="profile">
        <div class="imageholder">
            <div class="badge">U</div>
        </div>
        <div class="info">
            <ul class="collection menu">
                <li v-on:click="toinfo" class="collection-item">Информация</li>
                <li v-on:click="tocars" class="collection-item">Машины</li>
                <li v-on:click="toreg" class="collection-item">Зарегистрировать машину</li>
            </ul>
        </div>
        <router-view/> 
        
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        toinfo(){
            this.$router.push('/profile/information')
        },
        tocars(){
            this.$router.push('/profile/cars')
        },
        toreg(){
            this.$router.push('/profile/carreg')
        }
        
    },
    mounted(){
        this.tocars();
    }
}
</script>

<style lang="scss" scoped>
@import "../css/main.scss";
.profile{
    height: 100%;
    width: 100%;
    .imageholder{
        display: table;
        margin-left: auto;
        margin-right: auto;
        margin-top: 75px;
        .badge {
        height: 150px;
        width: 150px;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        border-radius: 50%;
        background: $color_main;
        color: white;
        font-size: 35px;
        }
    }
    .menu{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        li{
            flex-grow: 1;
            border-bottom:1px solid $color_sub;
            border-top: 1px solid $color_sub;
            font-size: 15px;
            &:hover{
                background-color: $color_sub;
                transition-duration: 1s;
            }
        }
    }
    .information{
        text-align: left;
        span{
            float: right;
        }
    }
}
</style>