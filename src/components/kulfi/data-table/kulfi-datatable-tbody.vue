<template>
    <tbody>
        <tr v-for="item in dataContent()" :key="item.id">
            <td scope="col" v-for="column in columns()" :key="column">
                {{ item[column] }}
            </td>
        </tr>
    </tbody>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-tbody",
    props: ['dataContent', 'columns']
})
</script>

<style lang="scss" scoped>
    $default-color: #0ba360;
    .table {
        color: #666;

        tbody tr:hover {
            color: #0ba360;;
        }



    }

</style>


