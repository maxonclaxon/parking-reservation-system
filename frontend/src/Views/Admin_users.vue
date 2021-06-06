<template>
    <div>
        <div class="Search" v-if="search_form">
            
          <div class="row block" >
              Поиск пользователя
            <form class="col s12" @submit.prevent="search()">
              <div class="row">
                <div class="input-field col s6">
                  <input  id="first_name" type="text" class="validate" v-model="profileInfo.login">
                  <label for="first_name">Логин</label>
                </div>
                <div class="input-field col s6">
                  <input id="last_name" type="text" class="validate" v-model="profileInfo.name">
                  <label for="last_name">Имя</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input id="first_name" type="text" class="validate" v-model="profileInfo.phone">
                  <label for="first_name">Номер телефона</label>
                </div>
                <div class="input-field col s6">
                  <input id="last_name" type="text" class="validate" v-model="profileInfo.car_num">
                  <label for="last_name">Номер машины</label>
                </div>
              </div>
              <input type="submit" value="Поиск" class="btn">
            </form>
          </div>
            
        </div>
        <div class="UserData" v-else>
          
          <ul class="collection with-header">
            <li class="collection-header"><h4>{{getProfileObject.profiles[0]}}</h4></li>
            <li class="collection-item">Паспорт: {{getProfileObject.passport}}</li>
            <li class="collection-item">Вод. Удост.: {{getProfileObject.license}}</li>
            <li class="collection-item">ФИО: {{getProfileObject.fio}}</li>
            <li class="collection-item">Номер тел.: {{getProfileObject.phone}}</li>
            <li class="collection-item">Баланс: {{getProfileObject.balance}}</li>
            <li class="collection-item">Машины:
              <div class="car" v-for="car in getProfileObject.cars" :key="car">
                {{car}}
              </div>
            </li>
            <li class="collection-item">Парковки:
              
              <ul class="collection">
                  <li class="collection-item avatar" v-for="park in getProfileObject.parks" :key="park">
                     
                      <span class="title">{{park.number}}</span>
                      <p>С : {{park.time_from}} <br>
                         ПО: {{park.time_to}}
                       </p>
                       <span class="status">Статус: {{park.status==0? 'Завершена':'В процессе'}}</span>
                      <!-- <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> -->
                  </li>
              </ul>
                      
            </li>
          </ul>
                
        
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            profileInfo:{
              login:"",
              name:"",
              phone:"",
              car_num:""
            },
            search_form:true
        }
    },
    computed:mapGetters(["getProfileObject"]),
    methods:{
      ...mapActions(["getProfileByInfo"]),
        search(){
            if(this.profileInfo.login=="" && this.profileInfo.name=="" && this.profileInfo.phone=="" && this.profileInfo.car_num=="" ){
              alert('Для поиска должно быть заполнено хотя бы одно поле');
              return
            }
            this.getProfileByInfo(this.profileInfo).then((response)=>{
              if(response.data.message=='Найдено несколько пользователей, уточните поисковой запрос'){
                alert('Найдено несколько пользователей, уточните поисковой запрос.');
                return;
              }
              else if(response.data.message=='OK'){
                this.search_form=false;
               
              }
              else if(response.data.message=='Профиль не найден'){
                alert('Профиль не найден')
               
              }
            })
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
.block{
    width: 80%;
    margin: 0 auto;
}
.UserData{
  .collection{
    width: 60%;
    margin: 50px auto;
    text-align: left;
    .collection-item{
      font-size: 1.2em;
      display: flex;
      .car{
        margin: 0 30px;
      }
    }
  }
}
.collection-item{
  .avatar{
    span{
      margin-right: 50px;
    }
    p{
      font-size: 0.8em;
    }
    .status{
      margin: 0 auto;
    }
}
}
</style>