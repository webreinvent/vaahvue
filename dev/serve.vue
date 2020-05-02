<script>
import Vue from 'vue';
import { VaahvueSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VaahvueSample,
  }
});
</script>

<template>
  <div id="app">
    <vaahvue-sample />
  </div>
</template>
