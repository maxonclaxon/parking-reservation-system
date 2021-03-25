<template>
  <div class="info">
    <ul class="collapsible">
      <li v-for="(item,index) in getProfileCars" v-bind:key="index" >
        <div class="collapsible-header">
          {{ item.number }}
        </div>
        <div class="collapsible-body" >
          <span>{{item.number}}{{item.from}}-{{item.to}}{{item.address}}</span>
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