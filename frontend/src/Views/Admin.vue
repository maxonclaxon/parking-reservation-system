<template>
  <div>
    <nav class="block">
      <div class="nav-wrapper teal">
        <div class="logo left"><a href="#" class="brand-logo left">Админ-панель</a></div>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a @click="tousers()">Пользователи</a></li>
          <li><a @click="toparkings()">Паркинги</a></li>
          <li><a @click="toreports()">Отчёты</a></li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

  },
  methods: {
    tousers() {
      this.$router.push("/admin/users");
    },
    toparkings() {
      this.$router.push("/admin/parkings");
    },
    toreports() {
      this.$router.push("/admin/reports");
    },
  },
  mounted() {
    this.toparkings();
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.block {
  width: 80vw;
  margin: 0 auto;
}
nav{

    li{
        margin: 0 20px;
    }
}
.brand-logo{
  margin-left: 30px;
}

</style>