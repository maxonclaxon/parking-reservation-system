<template>
    <div>
    <div class="Search">
        
  <div class="row block" v-if="search">
      Поиск пользователя
    <form class="col s12" @submit.prevent="search()">
      <div class="row">
        <div class="input-field col s6">
          <input  id="first_name" type="text" class="validate">
          <label for="first_name">Логин</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Имя</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="first_name" type="text" class="validate">
          <label for="first_name">Номер телефона</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Номер машины</label>
        </div>
      </div>
      <input type="submit" value="Поиск" class="btn">
    </form>
  </div>
        
    </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{
              login:"",
              name:"",
              phone_number:"",
              car_number:""
            },
            search_form:true
        }
    },
    methods:{
        search(){
            search_object=self.user;
            console.log('aa');
        }
    }
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
</style>