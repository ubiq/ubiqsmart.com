<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card id="card-escher-home">
        <b-row id="section-1">
          <b-col md="5">
            <div class="section-content">
              <h4>{{ $t("escher.title") }}</h4>
              <hr/>
              <p>{{ $t("escher.desc") }} <nuxt-link to="/escher/faq">{{ $t("escher.faq") }}</nuxt-link></p>
            </div>
          </b-col>
          <b-col md="7" style="text-align:center;">
            <img src="~/assets/graphic-2.svg" width="80%">
          </b-col>
        </b-row>
      </b-card>
      <div v-for="(item, index) in pending" :key="index">
        <Preview :info="item"/>
      </div>
      <div v-for="(item, index) in active" :key="index">
        <Preview :info="item"/>
      </div>
      <div v-for="(item, index) in historic" :key="index">
        <Preview :info="item"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import Preview from '~/components/previews/Proposal.vue'

export default {
  layout: 'escher',
  computed: {
    active () {
      return this.$store.state.proposals.active
    },
    pending () {
      return this.$store.state.proposals.pending
    },
    historic () {
      return this.$store.state.proposals.historic
    }
  },
  components: {
    Preview
  }
}
</script>
