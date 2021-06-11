<template>
  <div class="info">
    <ul class="collapsible">
      <li v-for="(item, index) in getProfileCars" v-bind:key="index">
        <div class="collapsible-header">
          {{ item.model }} - {{ item.number }}
        </div>
        <div class="collapsible-body">
          <table v-if="item.parked == true" class="centered">
            <thead>
              <tr>
                <td v-if="item.status==1">Место зарезервировано</td>
                <td v-else>Машина на парковке</td>
              </tr>
            </thead>
            <tr>
              <td>Парковка:</td>
              <td>{{ item.adress }}</td>
            </tr>
            <tr>
              <td>Номер места:</td>
              <td>{{ item.space_id }}</td>
            </tr>
            <tr>
              <td>этаж:</td>
              <td>{{ item.floor }}</td>
            </tr>
            <tr>
              <td>Стоянка от:</td>
              <td>{{ item.time_from }}</td>
            </tr>
            <tr>
              <td>Стоянка до:</td>
              <td>{{ item.time_to }}</td>
            </tr>
          </table>
          <div v-else>
            <div> <button class="btn" @click="showParkingWin">
              {{objects.parkButtonText}}
            </button></div>
            <form v-if="objects.parking" class="col s12" @submit.prevent="park(item.number)">
              <div class="input-field col s12">
                <select v-model="objects.adress">
                  <option value="" disabled selected>Выберите парковку</option>
                  <option
                    v-for="(item, index) in getParkingAdresses"
                    v-bind:key="index"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
              <div class="row">
                <div class="input-field col s6">
                  <input type="text" class="validate" v-model="objects.hours" />
                  <label for="last_name">Часы</label>
                </div>
              </div>
              <input type="submit" value="Поставить на стоянку" class="btn"  />
            </form>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import M from "materialize-css";

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      objects: {
        parking: false,
        adress:'',
        hours:'',
        parkButtonText:'Поставить на стоянку'
      },
      instances: "",
    };
  },
  computed: mapGetters(["getProfileCars", "getParkingAdresses"]),
  methods: {
    ...mapActions(["loadProfileCars", "loadParkings","parkCar"]),
    showParkingWin() {
      this.objects.parking=!this.objects.parking;
      if(this.objects.parking)this.objects.parkButtonText="Отмена"
      else this.objects.parkButtonText="Поставить на стоянку"
    },
    park(number){
      let parkInfoObject={};
      parkInfoObject["number"]=number;
      parkInfoObject["hours"]=this.objects.hours;
      parkInfoObject["adress"]=this.objects.adress;
      this.parkCar(parkInfoObject).then((response)=>{
        if(response.data.message=="Car parked"){
          alert('Машина запаркована!');
          this.objects.hours='';
          this.objects.adress='';
          this.loadProfileCars();
        }
        else if(response.data.message=="No free places"){
          alert('На выбранной парковке нет мест');
        }
        else if(response.data.message=="Not enough moeny"){
          alert('У вас не достаточно средств. Пополните баланс!')
        }
      });

    },
    updatePage(){
        this.loadProfileCars();
        this.loadParkings();
    }
  },
  mounted() {
    this.loadProfileCars();
    this.loadParkings();
    var elems = document.querySelectorAll(".collapsible");
    this.instances = M.Collapsible.init(elems);
    var elems_dropdown = document.querySelectorAll("select");
    M.FormSelect.init(elems_dropdown);
    setInterval(() => {
      this.updatePage();
    }, 2000);
  },
  updated(){
      var elems_dropdown = document.querySelectorAll("select");
      M.FormSelect.init(elems_dropdown);
  }
};
</script>
<style lang="scss" scoped>
.information {
  text-align: left;
  span {
    float: right;
  }
}
</style>