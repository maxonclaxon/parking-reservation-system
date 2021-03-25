<template>
  <div class="row">
    <form class="col s12" @submit.prevent="registerCar({num:number, mark:model})">
      <div class="row">
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" v-model="number"/>
          <label for="last_name" >Номер</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate" v-model="model"/>
          <label for="last_name">Модель</label>
        </div>
      </div>
      <input type="submit" value="Зарегистрировать" class="btn">
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    
    data(){
        return{
            number:'',
            model:'',
        }
    },
    methods:mapActions(['registerCar'])
}
</script>



<style lang="scss" scoped>
.btn{
    float: left;
}
</style>