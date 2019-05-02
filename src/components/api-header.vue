<template>
  <header class="header navbar-fixed-top">
    <b-navbar role="navigation">
      <b-container>
        <b-col cols="12">
          <b-navbar-brand class="logo">
            <a class="logo-wrap" href="/">
              <img class="logo-img logo-img-main" src="../assets/img/favicon.png" alt="logo_icon">
              <img class="logo-img logo-img-active" src="../assets/img/favicon.png" alt="logo_icon">
            </a>
          </b-navbar-brand>
          <div class="menu-container">
            <button
              type="button"
              class="navbar-toggle position"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-expanded="true" aria-controls="navbar-collapse"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="toggle-icon"></span>
            </button>
          </div>
          <!-- <div class="collapse navbar-collapse"> -->
            <b-col class="menu-container collapse navbar-collapse">
              <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item">
                  <router-link to="login" data-toggle="collapse" data-target=".navbar-collapse" class="nav-item-child nav-item-hover" active-class="active">login</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="register" data-toggle="collapse" data-target=".navbar-collapse" class="nav-item-child nav-item-hover" active-class="active">register</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="users" data-toggle="collapse" data-target=".navbar-collapse" class="nav-item-child nav-item-hover" active-class="active">users</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="schedule" data-toggle="collapse" data-target=".navbar-collapse" class="nav-item-child nav-item-hover" active-class="active">schedule</router-link>
                </li>
              </ul>
            </b-col>
          <!-- </div> -->
        </b-col>
      </b-container>
    </b-navbar>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "api-header"
});
</script>

