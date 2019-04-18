<template>
  <div>
    <api-header></api-header>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <api-footer></api-footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import apiHeader from './components/api-header.vue';
import apiFooter from './components/api-footer.vue';

export default Vue.extend({
  name: "App",
  components: {
    apiHeader,
    apiFooter,
  }
});
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>



