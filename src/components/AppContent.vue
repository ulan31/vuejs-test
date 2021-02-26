<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <div v-if="isLoading" class="spinner-border" />

    <template v-else>
      <div v-if="isCached" class="alert alert-success text-start">
        <h4 class="alert-heading">Data was cached!</h4>
        <p>You can clear cache and load data again.</p>
        <hr/>
        <button @click="cacheClear()" class="btn btn-sm btn-primary mr-auto">
          Clear cache
        </button>
      </div>

      <data-table
        :rows="dataForTable"
        :columns="columns"
      />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Amount',
        prop: 'amount',
        width: '35%',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
    dataForTable() {
      return this.data.map((item) => {
        item.date = this.$options.filters.date(item.date);
        item.amount = this.$options.filters.amount(item.amount);
        return item;
      });
    },
  },

  created() {
    this.load();
  },

  methods: {
    ...mapActions([
      'load',
      'cacheClear',
    ]),
  },
};
</script>
