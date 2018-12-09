<template>
  <b-row class="justify-content-md-center">
    <b-col md="12" style="margin-top:15px;">
      <div v-if="type === 'historic'" v-for="(item, index) in historic" :key="index">
        <Preview :info="item"/>
      </div>
      <div v-if="type === 'pending'" v-for="(item, index) in pending" :key="index">
        <Preview :info="item"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Preview from '~/components/previews/Airdrop.vue'

export default {
  name: 'Airdops',
  layout: 'escher',
  computed: {
    historic () {
      return this.$store.state.airdrops.historic
    },
    pending () {
      return this.$store.state.airdrops.pending
    },
    type () {
      return this.$route.params.id
    }
  },
  components: {
    Preview
  }
}
</script>
