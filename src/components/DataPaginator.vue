<template>
  <nav v-if="show">
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ disabled: isFirst }"
        @click="goto(1)"
      >
        <a class="page-link" href="javascript:;">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="item in pages"
        :key="item"
        class="page-item"
        :class="{ disabled: item === value }"
        @click="goto(item)"
      >
        <a class="page-link" href="javascript:;">
          {{ item }}
        </a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: isLast }"
        @click="goto(pages)"
      >
        <a class="page-link" href="javascript:;">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

  name: 'DataPaginator',

  props: {
    value: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
  },

  computed: {
    show() {
      return this.pages > 1;
    },
    isFirst() {
      return this.value === 1;
    },
    isLast() {
      return this.value === this.pages;
    },
  },

  methods: {
    goto(page) {
      if (page === this.value) {
        return;
      }

      this.$emit('input', page);
    },
  },
};
</script>
