<template>
  <div class="row">
    <form class="col s12" @submit.prevent="carReg()">
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
      <br>
      <span v-if="registererror" class="badge red" data-badge-caption="Ошибка регистрации"></span>
    <span v-if="registered" class="badge green" data-badge-caption="Машина зарегистрирована"></span>
    
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    
    data(){
        return{
            number:'',
            model:'',
            registered:false,
            registererror:false
        }
    },
    methods:{
        ...mapActions(['registerCar']),
        carReg(){
            this.registerCar({num:this.number, mark:this.model}).then((response)=>{
                if(response.status==200){this.registered=true;this.number=this.model='';}
                else{
                    this.registererror=true
                    console.log('RESPONSE:'+response)
                }
            })

        }}
}
</script>



<style lang="scss" scoped>
.btn{
    float: left;
}
.badge{
    color: white;
}
</style>