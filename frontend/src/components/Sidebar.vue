<template>
    
  <div>
        <ul id="slide-out" class="sidenav">
            <li><div class="user-view">
            <div class="background">
                <img src="images/office.jpg">
            </div>
            <a href="#user"><img class="circle" src="images/yuna.jpg"></a>
            <a href="#name"><span class="white-text name">John Doe</span></a>
            <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
            </div></li>
            <li><a href="#!">Профиль</a></li>
            <li><div class="divider"></div></li>
            <li><a href="#!">Поставить машину на стоянку</a></li>
            <li><div class="divider"></div></li>
            <li><a href="#!">Пополнить баланс</a></li>
            <li><div class="divider"></div></li>
            <li><a href="#!">О приложении</a></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
  </div>
        
</template>

<script >
//import $ from '../../node_modules/jquery/dist/jquery.slim';
export default ({
    data() {
        return {}
    },
    mounted(){
        
    }
})
</script>

<style lang="scss" scoped>

@import "../css/main.scss";
    .sidenav{
        li{
            text-align: left;
        }
        li:hover{
            background-color: $color_sub;
        }
    }
</style>
