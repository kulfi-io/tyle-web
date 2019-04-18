<template>
  <div class="bg-color-moss-light">
    <b-container class="content-lg">
      <b-row class="account">
        <b-col cols="12" class="account-header">
          <h2 class="title">Users</h2>
        </b-col>

        <b-col cols="12" class="account-body" >
          <kulfi-table :target="'users'" :content="content"  :defaultSort="'id'"
          />
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
import User from "../models/user";
import KulfiTable from "../components/kulfi/kulfi-table.vue";
import Service from "../micro-services/userService";

export default Vue.extend({
  components: {
    KulfiTable
  },
  data: function() {
    return {
      dataset: Array<String>(),
    }
  },
  methods: {
    content: function() {
      var _self = this;

      Service.getAll()
      .then((resp) => {
          var _data = Service.mapDataItem(resp.data as {}[]);
          if(_data) {
            _self.dataset = _data ;
          }
      })
      .catch((err) => {
        console.log('err', err);
      });
    
    }
  }
})
</script>



