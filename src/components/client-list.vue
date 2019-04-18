<template>
  <div>
    <b-table
      v-model="data"
      :items="records"
      :fields="column"
      striped
      hover
      :current-page="currentPage"
      :per-page="perPageperPage">
    </b-table>
    <b-row>
      <b-col md="6" class="">
        <b-pagination :total-rows="records.length" :per-page="perPage" 
        v-model="currentPage" class=""/>
      </b-col>
      <b-col md="6" class="">
        <b-form-group horizontal label="Per page" class="">
          <b-form-select :option="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>

    </b-row>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import service from '../micro-services/clientService';

export default Vue.extend({
  name: 'client-list',
  data() {
    return {
      copyOfOrigin: [],
      records: [
       
      ],
      error: '',
      perPage: 5,
      currentPage: 1,
      pageOptions: [5, 10, 15],
      column: [
        {
          key: "name",
          sortable: true,
          label: "Name",
          class: "options-column"
        },
        {
          key: "ipaddress",
          sortable: true,
          label: "IP Address"
        },
        {
          key: "description",
          sortable: false,
          label: "Description",
        },
        {
          key: "contactName",
          sortable: true,
          label: "Contact Name",
        },
        {
          key: "email",
          sortable: true,
          label: "Email",
        },
        {
          key: "token",
          sortable: false,
          label: "token",
        }
      ]
      
    };
  },
  created: function(){
    this.getData();
  },
  computed: {
    totalRows(): number {
      return this.records.length;
    }
  },
  methods: {
    getData() {
      service.getAll()
      .then((resp) => {
        this.records = resp.data;
      })
      .catch((err) => {
        this.error = err;
      });
    }
  },
})


</script>

