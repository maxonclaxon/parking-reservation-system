<template>
  <div class="info">
    <ul class="collection information">
      <li class="collection-item">
        Баланс: <span>{{ getProfileInfo.balance }}</span>
      </li>
      <li class="collection-item">
        Количество стоянок за месяц: <span>{{ getProfileInfo.stands }}</span>
      </li>
      <li class="collection-item">
        Среднее время стоянки: <span>{{ getProfileInfo.time }}</span>
      </li>
      <li class="collection-item">
        Средняя стоимость <span>{{ getProfileInfo.cost }}</span>
      </li>
      <li class="collection-item">
        Скидка <span>{{ getProfileInfo.discount }}%</span>
      </li>
      <li>
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">Пополнить баланс</div>
            <div class="collapsible-body">
              <div>
                <form class="col s12" @submit.prevent="addBalance()">
                  <div class="input-field col s12">
                    <select v-model="agr">
                      <option value="" disabled selected>Агрегатор</option>
                      <option v-for="(item, index) in shops"
                      v-bind:key="index"
                      :value="item">{{item}}</option>
                    </select>
                  </div>
                  <div class="row">
                      <div class="input-field col s6">
                          <input type="text" class="validate" v-model="value">
                          <label for="">Сумма</label>
                      </div>
                  </div>
                  <input type="submit" value="Пополнить баланс" class="btn">
                </form>
               
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import M from "materialize-css";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      shops: ["Ю-Money", "PayMaster", "Z-Payment", "Vallent-One"],
      agr: "",
      value: '',
    };
  },
  computed: mapGetters(["getProfileInfo"]),
  methods: {
    ...mapActions(["loadProfileInfo", "addToBalance"]),
    addBalance(){
        this.addToBalance(parseFloat(this.value)).then((response)=>{
            if(response.data.message=="Balance added"){
                alert('Баланс успешно пополнен')
                this.loadProfileInfo();
                this.agr="";
                this.value='';
            }
            else{
                alert('Баланс не пополнен')
            }
        })
    }
  },
  mounted() {
    this.loadProfileInfo();
    var elems = document.querySelectorAll(".collapsible");
    this.instances = M.Collapsible.init(elems);
    var elems_dropdown = document.querySelectorAll("select");
    M.FormSelect.init(elems_dropdown);
  },
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