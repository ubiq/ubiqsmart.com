<template>
  <b-row class="justify-content-md-center">
    <b-col sm="12">
      <b-modal id="fusionModal" centered size="lg" class="text-left">
        <div slot="modal-title">Claim with Fusion</div>
        <ul>
          <li>Go to the <code>CONTRACTS</code> page in Fusion</li>
          <li>Press <code>WATCH CONTRACT</code></li>
          <li>In the <code>CONTRACT ADDRESS</code> field insert the contract address</li>
          <li>In the <code>CONTRACT NAME</code> field enter <code>Escher {{title}}</code></li>
          <li>In the <code>JSON INTERFACE</code> field insert the ABI / JSON</li>
          <li>Press <code>OK</code></li>
          <li>Open <code>Escher {{title}}</code>
          <li>Select function -> <code>claim</code></li>
          <li>Execute from -> Address you wish to claim from</li>
          <li>Press <code>EXECUTE</code>
          <li>Send the transaction. <strong>Send 0 UBQ</strong>, any claims with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the claim.</li>
        </ul>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="secondary" type="button" v-clipboard:copy="abi" v-clipboard:success="copyAbiSuccess" v-clipboard:error="copyAbiError">
            Copy ABI / JSON
          </b-btn>
          <b-btn size="sm" class="float-right icon-left" variant="secondary" type="button" v-clipboard:copy="contract" v-clipboard:success="copyContractSuccess" v-clipboard:error="copyContractError">
            Copy Contract Address
          </b-btn>
        </div>
      </b-modal>
      <b-modal id="pyrusModal" centered size="lg" class="text-left">
        <div slot="modal-title">Claim with Pyrus</div>
          <b-alert show>If claiming from a Ledger Nano S, ensure contracts is enabled in the Ubiq application settings on the device.</b-alert>
          <ul>
            <li>Go to the <a href="https://pyrus.ubiqsmart.com/#contracts" target="_blank">Contracts</a> page in Pyrus</li>
            <li>In the <code>Contract Address</code> field insert the contract address</li>
            <li>In the ABI / JSON Interface enter the ABI / JSON</li>
            <li>Press <code>Access</code></li>
            <li>Select function -> <code>claim</code></li>
            <li>Send the transaction. <strong>Send 0 UBQ</strong>, any claims with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the claim. The recommended gas limit is 100000.</li>
          </ul>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="secondary" type="button" v-clipboard:copy="abi" v-clipboard:success="copyAbiSuccess" v-clipboard:error="copyAbiError">
            Copy ABI / JSON
          </b-btn>
          <b-btn size="sm" class="float-right icon-left" variant="secondary" type="button" v-clipboard:copy="contract" v-clipboard:success="copyContractSuccess" v-clipboard:error="copyContractError">
            Copy Contract Address
          </b-btn>
        </div>
      </b-modal>
      <b-modal id="claimsModal" centered hide-footer size="xl" class="text-left">
        <div slot="modal-title">Claims Received</div>
        <b-row>
          <b-col md="12">
            <BarChart :chart-data="charts.bar" :options="chartOptions.bar" :height="300" :styles="{height: '300px'}"/>
          </b-col>
        </b-row>
        <ClaimsTable :items="claims" :escher="toEscher"></ClaimsTable>
      </b-modal>
      <b-card class="card-main">
        <h4 class="text-center">{{ title }}</h4>
        <b-row class="justify-content-md-center">
          <h4>
            <b-badge class="icon-left">Start Block : {{ startBlock }}</b-badge>
            <b-badge class="icon-left">End Block : {{ endBlock }}</b-badge>
            <b-badge>Blocks Remaining : {{ blocksRemaining }}</b-badge>
          </h4>
        </b-row>
        <hr/>
        <div id="airdrop-section-1">
          <b-alert v-if="block < startBlock" variant="danger" show>The claim period has not started yet for this airdrop. All claims will be rejected by the claim contract until block {{ startBlock }}</b-alert>
          <b-alert v-if="block >= endBlock" variant="danger" show>The claim period has finished for this airdrop.</b-alert>
          <p>Valid claims will receive {{ multiplier }} ESCH per 1 UBQ held in their claim address at block {{ endBlock }}.</p>
          <b-row>
            <b-col md="6">
              <div class="vote-with">
                <b-btn v-b-modal.fusionModal class="btn btn-secondary icon-left" type="button">Claim with Fusion</b-btn>
                <b-btn v-b-modal.pyrusModal class="btn btn-secondary">Claim with Pyrus</b-btn>
              </div>
            </b-col>
            <b-col md="6" class="text-right">
              <b-btn v-b-modal.claimsModal class="btn btn-secondary icon-left">Claims</b-btn>
              <b-btn v-b-modal.participationModal class="btn btn-secondary">Participation</b-btn>
            </b-col>
          </b-row>
          <b-alert show style="margin-top:15px;margin-bottom:0px;">
            No UBQ are transferred when signaling, the claim mechanism simply registers your address for this airdrop. As such, the entire UBQ balance stored at that address would be counted towards the airdrop. The balance at the airdrop claims defined end block ({{endBlock}}) is used, not the balance when the claim is made. No UBQ is consumed other than the tx fee.
          </b-alert>
        </div>
        <div id="airdrop-section-2">
          <no-ssr> <!-- dont render this server side -->
            <AddressSubmit :submit="checkClaim" type="claim"/>
          </no-ssr>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import ABI from '~/scripts/claim'
import AddressSubmit from '~/components/SubmitAddress.vue'
import BarChart from '~/components/charts/Bar.vue'
import ClaimsTable from '~/components/tables/Claims.vue'
import PieChart from '~/components/charts/Pie.vue'

export default {
  name: 'airdrop',
  layout: 'escher',
  watch: {
    '$route': {
      handler: function (from, to) {
        this.contract = this.$route.params.id
        this.fetch()
      },
      immediate: true
    }
  },
  data () {
    return {
      contract: '',
      abi: ABI,
      title: '-',
      startBlock: '-',
      endBlock: '-',
      multiplier: 1,
      totalClaimedEscher: '-',
      totalClaimedUbiq: '-',
      totalClaims: '-',
      claims: [],
      errors: [],
      charts: {
        pie: null,
        bar: null
      },
      // chart options need to be passed as a prop to avoid a vue-chartjs bug
      chartOptions: {
        pie: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: true,
            labels: {
              fontColor: 'rgba(255,255,255,0.5)',
              fontFamily: "'Avenir', 'Helvetica', 'Arial', 'sans-serif'"
            }
          }
        },
        bar: {
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              ticks: {
                min: 1
              },
              fontColor: 'rgba(255,255,255,0.5)',
              type: 'logarithmic'
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  },
  computed: {
    block () {
      return this.$store.state.latestBlock
    },
    blocksRemaining () {
      return this.block >= this.endBlock ? 0 : this.endBlock - this.block
    }
  },
  created () {
    this.fetch(this.contract)
  },
  components: {
    AddressSubmit,
    ClaimsTable,
    BarChart,
    PieChart
  },
  methods: {
    fetch: function () {
      axios.get('https://escher.ubiqscan.io/airdrop/' + this.contract)
        .then(response => {
          this.startBlock = response.data.startBlock
          this.endBlock = response.data.endBlock
          this.totalClaimedUbiq = response.data.totalClaimed
          this.title = response.data.title
          this.multiplier = response.data.multiplier
          this.totalClaimedEscher = this.toEscher(response.data.totalClaimed)
          var percentClaimed = ((this.totalClaimedUbiq / this.$store.state.totalUbiq) * 100).toFixed(4)
          this.charts.pie = {
            labels: ['Claimed', 'Unclaimed'],
            datasets: [
              {
                backgroundColor: ['#00ea90', '#222'],
                data: [percentClaimed, (100 - percentClaimed)],
                borderWidth: [0, 0]
              }
            ]
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get('https://escher.ubiqscan.io/claims/' + this.contract)
        .then(response => {
          this.totalClaims = response.data.length
          var latestClaims = response.data
          if (latestClaims.length > 50) {
            latestClaims = latestClaims.slice(latestClaims.length - 50)
          }
          var barChart = {
            data: [],
            labels: []
          }
          latestClaims.forEach(function (claim) {
            barChart['data'].push(claim.balance)
            barChart['labels'].push(claim.address)
          })
          this.charts.bar = {
            labels: barChart.labels,
            datasets: [
              {
                label: 'UBQ',
                backgroundColor: '#00ea90',
                data: barChart.data
              }
            ]
          }
          this.claims = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    toEscher: function (ubq) {
      return (ubq * this.multiplier).toFixed(8)
    },
    copyContractSuccess: function (e) {
      this.$notify({
        group: 'normal',
        text: 'Contract address copied to clipboard',
        type: 'success'
      })
    },
    copyContractError: function (e) {
      this.$notify({
        group: 'normal',
        text: 'Unable to copy contract address to clipboard',
        type: 'error'
      })
    },
    copyAbiSuccess: function (e) {
      this.$notify({
        group: 'normal',
        text: 'ABI / JSON copied to clipboard',
        type: 'success'
      })
    },
    copyAbiError: function (e) {
      this.$notify({
        group: 'normal',
        text: 'Unable to copy ABI / JSON to clipboard',
        type: 'error'
      })
    },
    checkClaim: function (address) {
      var validator = new RegExp(/^0x[0-9a-fA-F]{40}$/i)
      if (validator.test(address)) {
        axios.get('https://escher.ubiqscan.io/claim/' + this.contract + '/' + address.toLowerCase())
          .then(response => {
            if (!response.data.error) {
              this.$notify({
                group: 'normal',
                text: 'Claim was received successfully',
                type: 'success'
              })
            } else {
              this.$notify({
                group: 'normal',
                text: 'Claim not found',
                type: 'error'
              })
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.$notify({
          group: 'normal',
          text: 'Invalid address',
          type: 'error'
        })
      }
    }
  }
}
</script>
