<template>
  <div class="info">
    <ul class="collapsible">
      <li v-for="(item,index) in objects" v-bind:key="index" >
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
export default {
  data() {
    return {
      objects: {
        car1: {
          number: "О320ВМ",
          from: "15:00",
          to: "16:00",
          address: "moskovskaya 153",
        },
        car2: {
          number: "О157ВМ",
          from: "12:00",
          to: "14:00",
          address: "moskovskaya 153",
        },
        car3: {
          number: "V156DF",
          from: "05:00",
          to: "23:00",
          address: "moskovskaya 153",
        },
      },
      instances:''
    };
  },
  methods: {
  },
  mounted() {
    
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