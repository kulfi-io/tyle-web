<template>
  <div class="bg-color-moss-light">
    <b-container class="content-lg">
      <b-row class="account">
        <b-col cols="12" class="account-header">
          <h2 class="title">Schedule</h2>
        </b-col>

        <b-col cols="12" class="account-body" >
            <kulfi-calendar />
        </b-col>

        <b-col cols="12" class="account-footer">
          <span class="required-field">*</span>
          - required field
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import KulfiCalendar from '../components/kulfi/calendar/kulfi-calendar.vue';
export default Vue.extend({
    components: {
        KulfiCalendar
    }
    
})
</script>
