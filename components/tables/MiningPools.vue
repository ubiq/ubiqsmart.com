<template>
  <b-table striped hover :items="items" :fields="fields">
    <div slot="url" slot-scope="data">
      <a :href="data.value" target="_blank">{{ data.value }}</a>
    </div>
  </b-table>
</template>

<script>
import Pools from '~/scripts/pools.js'
export default {
  data () {
    return {
      items: Pools.get(),
      fields: {
        name: {
          label: this.$t('mining.name')
        },
        url: {
          label: this.$t('mining.url')
        }
      }
    }
  }
}
</script>
