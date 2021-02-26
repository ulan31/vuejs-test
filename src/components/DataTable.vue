<template>
  <div class="data-table">
    <table class="data-table__table">
      <thead>
      <th v-for="column in columns" :key="`header-${column.prop}`" :width="column.width">
        {{ column.label }}
      </th>
      </thead>
      <tbody>
      <tr v-for="row in paginatedRows" :key="`row-${row.id}`">
        <td v-for="column in columns" :key="`row-${row.id}-${column.prop}`" :data-label="column.label">
          {{ row[column.prop] }}
        </td>
      </tr>
      </tbody>
    </table>
    <div class="data-table__paginator">
      <data-paginator
        v-model="page"
        :pages="pageCount"
      />
    </div>
  </div>
</template>

<script>
export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    paginatedRows() {
      const first = (this.page - 1) * this.pageSize;
      const last = first + this.pageSize;
      return this.rows.slice(first, last);
    },
  },
};
</script>
<style lang="scss" scoped>
$mobile: "only screen and (max-width: 768px)";
$border: 2px solid #2c3e50;

.data-table__table {
  width: 100%;
  table-layout: fixed;
  margin-bottom: 40px;
  th, td {
    padding: 15px;
    border: $border;
    overflow: hidden;
  }
  tr {
    transition: all 100ms ease-out;
  }
}
@media #{$mobile} {
  .data-table__table {
    thead {
      position: absolute;
      clip: rect(0 0 0 0);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
    }
    tr {
      display: block;
      outline: $border;
      margin-bottom: 20px;
    }
    th, td {
      text-align: left;
      border: none;
      padding: 15px 20px;
    }
    td {
      display: flex;
      flex-direction: column;
      &:before {
        content: attr(data-label);
        font-weight: bold;
      }
    }
  }
}
</style>
