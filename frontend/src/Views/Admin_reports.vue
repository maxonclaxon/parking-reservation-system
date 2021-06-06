<template>
    <div class="report">
          <div class="reportvalues">
              <form class="datepick" @submit.prevent="make_Report()">
                  <select v-model="parking" required>
                    <option value="" selected disabled>Выберите парковку</option>
                    <option value="" >Отчёт по всем парковкам</option>
                    <option
                        v-for="(item, index) in getParkingAdresses"
                        v-bind:key="index"
                        :value="item"
                    >
                        {{ item }}
                    </option>
                 </select>
                  <label for="">Отчёт от: </label>
                  <input type="text" class="datepicker from" required placeholder="Выберите дату" v-model="date_from">
                  <label for="">Отчёт до: </label>
                  <input type="text" class="datepicker to" required placeholder="Выберите дату" v-model="date_to"><br>
                  <div class="input-field col s12">
                  
                  </div>
                  <input type="submit" value="Создать отчёт" class="btn">
              </form>
          </div>
          <div class="Rep" v-if="reported">
              
                <ul class="collection">
                <li class="collection-item">Количество стоянок за период: {{getReport.stands_count}}</li>
                <li class="collection-item">Приток: {{getReport.money}} Рублей</li>
                <li class="collection-item">Среднее время стоянки: {{getReport.mean_time}} часа</li>
                <li class="collection-item">Заполняемость мест: {{getReport.mean_places}}</li>
                </ul>
                        
          </div>
    </div>
</template>

<script>
import M from "materialize-css";
import {mapActions, mapGetters} from 'vuex';
let mothConvertObj={
    'Jan':'01',
    'Feb':'02',
    'Mar':'03',
    'Apr':'04',
    'May':'05',
    'Jun':'06',
    'Jul':'07',
    'Aug':'08',
    'Sep':'09',
    'Oct':'10',
    'Nov':'11',
    'Dec':'12'
}
export default {
    data(){
        return{
            parking:'',
            date_from:'',
            date_to:'',
            reported:false
        }
    },
    computed: mapGetters(["getParkingAdresses", "getReport"]),
    mounted() {
        var elems = document.querySelectorAll('.datepicker');
        let options={
            format:'dd-mm-yyyy',
            autoClose:true,
        }
        this.instances = M.Datepicker.init(elems,options);
        var elems_dropdown = document.querySelectorAll("select");
        M.FormSelect.init(elems_dropdown);
    },
    methods: {
        ...mapActions(["makeReport"]),
        make_Report(){
            let date_from = M.Datepicker.getInstance(document.querySelector('.from')).date.toString().split(' ')
            let day_from = date_from [2]
            let year_from = date_from [3]
            let month_from = mothConvertObj[date_from [1]]
            let finaldate_from = year_from+'-'+month_from+'-'+day_from
            let date_to = M.Datepicker.getInstance(document.querySelector('.to')).date.toString().split(' ')
            let day_to = date_to[2]
            let year_to = date_to[3]
            let month_to = mothConvertObj[date_to[1]]
            let finaldate_to = year_to+'-'+month_to+'-'+day_to
            let reportObj={}
            reportObj['date_from']=finaldate_from 
            reportObj['date_to']=finaldate_to 
            console.log(this.parking)
            if(this.parking!=''&&this.parking!='Отчёт по всем парковкам')reportObj['parking']=this.parking
            this.makeReport(reportObj)
            this.reported=true;

        }
    },
}
</script>


<style lang="scss" scoped>
.report{
    width: 60%;
    margin: 50px auto;
    form{
        margin: 0 auto;
        width: 30%;
    }
}
</style>