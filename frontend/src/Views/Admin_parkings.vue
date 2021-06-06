<template>
    <div>
        <ul class="collapsible">
      <li v-for="(item, index) in getParkings" v-bind:key="index">
        <div class="collapsible-header">
         {{item.adress}}
        </div>
        <div class="collapsible-body">
            Свободных мест: {{item.spaces}} 
            <div style="margin-top:20px" v-if="!placeAdding" @click="placeAdding=!placeAdding"> 
                    <button class="btn" >
                Добавить новое место
                </button>
            </div>
            <form v-else class="col s12" @submit.prevent="addPlace(item.adress)">
              <div class="row">
                <div class="input-field col s6">
                  <input type="text" class="validate" v-model="floor" required/>
                  <label for="last_name">Этаж</label>
                </div>
                <div class="input-field col s6">
                  <input type="text" class="validate" v-model="count"  required/>
                  <label for="last_name">Кол-во мест</label>
                </div>
              </div>
              <input type="submit" value="Добавить места" class="btn"  />
            </form>
        </div>
      </li>
      <li>
          <button class="btn" v-if="!parkingAdding"
          @click="parkingAdding=!parkingAdding">
            Добавить парковку
          </button>
          <form v-else class="col s12" @submit.prevent="add_parking()">
              <div class="row">
                <div class="input-field col s6">
                  <input type="text" class="validate" v-model="parking_adress" required />
                  <label for="last_name">Адрес</label>
                </div>
              </div>
              <input type="submit" value="Добавить Парковку" class="btn"  />
            </form>
          </li>
      
    </ul>
    </div>
</template>

<script>
import M from "materialize-css";
import { mapGetters, mapActions } from 'vuex';
export default {
    
    data(){
        return{
            placeAdding:false,
            floor:'',
            count:'',
            parkingAdding:false,
            parking_adress:'',
        }
    },
    computed:mapGetters(["getParkings"]),
    methods: {
        ...mapActions(["loadParkings","addParkingPlace", "addParking"]),
        addPlace(adress){
            for (let i = 0; i < this.count; i++) {
                this.addParkingPlace({adress:adress,floor: this.floor});            
            }
            alert('Парковочные места добавлены!')
            this.placeAdding=false
            this.floor=''
            this.count=''
            this.loadParkings();
        },
        add_parking(){
            this.addParking(this.parking_adress).then((response)=>{
                if(response.data.message=='Parking added') alert('Парковка добавлена')
            });
            this.loadParkings();
            this.parkingAdding=false;
        }

    },
    mounted() {
        this.loadParkings();
         var elems = document.querySelectorAll(".collapsible");
        this.instances = M.Collapsible.init(elems);
        var elems_dropdown = document.querySelectorAll("select");
        M.FormSelect.init(elems_dropdown);
    },
}
</script>

<style lang="scss" scoped>
    .collapsible{
        width: 60%;
        margin: 50px auto;
        text-align: left;
        .collection-item{
            button{
                float: right;
            }
        }
    }
</style>