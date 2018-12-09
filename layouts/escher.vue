<template>
  <div class="app">
    <Navbar/>
    <no-ssr>
      <notifications position="top right" class="top-notification" group="normal" width='100%'/>
    </no-ssr>
    <div class="app-body container-fluid">
      <nuxt/>
    </div>
    <no-ssr>
      <x-particles class="particles-background" :config="config"></x-particles>
    </no-ssr>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '~/components/NavbarEscher'
import Footer from '~/components/Footer'
import particlesCfg from '~/scripts/particles.js'
import axios from 'axios'

export default {
  data () {
    return {
      config: {},
      errors: []
    }
  },
  created: function () {
    this.config = particlesCfg
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get('https://escher.ubiqscan.io/status')
        .then(response => {
          if (this.$store.state.totalEscher !== response.data.totalEscher) {
            this.$store.commit('setTotalEscher', response.data.totalEscher)
          }
          if (this.$store.state.totalUbiq !== response.data.totalUbiq) {
            this.$store.commit('setTotalUbiq', response.data.totalUbiq)
          }
          let latestBlock = response.data.block.number
          if (this.$store.state.latestBlock !== latestBlock) {
            this.$store.commit('setLatestBlock', latestBlock)
            if (!this.$store.state.proposals.historic) {
              this.getProposals()
            }
            if (!this.$store.state.airdrops.historic) {
              this.getAirdrops()
            }
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getAirdrops: function () {
      axios.get('https://escher.ubiqscan.io/airdrops')
        .then(response_ => {
          let self = this
          let airdrops = {
            active: [],
            pending: [],
            historic: []
          }
          response_.data.forEach(function (airdrop) {
            if (self.$store.state.latestBlock < airdrop.startBlock) {
              // pending
              airdrops.pending.push(airdrop)
            } else if (self.$store.state.latestBlock > airdrop.endBlock) {
              // historic
              airdrops.historic.push(airdrop)
            } else {
              // active
              airdrops.active.push(airdrop)
            }
          })
          this.$store.commit('setAirdrops', airdrops)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    getProposals: function () {
      axios.get('https://escher.ubiqscan.io/proposals')
        .then(response_ => {
          let self = this
          let proposals = {
            active: [],
            pending: [],
            historic: []
          }
          response_.data.forEach(function (proposal) {
            if (self.$store.state.latestBlock < proposal.startBlock) {
              // pending
              proposals.pending.push(proposal)
            } else if (self.$store.state.latestBlock > proposal.endBlock) {
              // historic
              proposals.historic.push(proposal)
            } else {
              // active
              proposals.active.push(proposal)
            }
          })
          this.$store.commit('setProposals', proposals)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>
