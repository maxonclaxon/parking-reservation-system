<template>
  <div class="info">
    <ul class="collapsible">
      <li v-for="(item,index) in getProfileCars" v-bind:key="index" >
        <div class="collapsible-header">
          {{item.model}} - {{ item.number }}
        </div>
        <div class="collapsible-body" >
          <table class="centered">
            <thead>
              <tr><td>Машина на стоянке!</td></tr>
            </thead>
            <tr>
              <td>Парковка:</td>
              <td>Парковка</td>
            </tr>
            <tr>
              <td>Стоянка от:</td>
              <td>время</td>
            </tr>
            <tr>
              <td>Стоянка до:</td>
              <td>время</td>
            </tr>
          </table>
          <br><button class="btn">Поставить на стоянку</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import M from 'materialize-css'

import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      objects: {
        
      },
      instances:''
    };
  },
  computed: mapGetters(["getProfileCars"]),
  methods:mapActions(['loadProfileCars']),
  mounted() {
    this.loadProfileCars();
    var elems = document.querySelectorAll(".collapsible");
    this.instances = M.Collapsible.init(elems);

    
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