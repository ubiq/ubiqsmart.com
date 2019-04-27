<template>
  <b-row class="justify-content-md-center">
    <b-col sm="12">
      <b-modal id="fusionModal" centered size="lg" class="text-left">
        <div slot="modal-title">Vote with Fusion</div>
        <ul>
          <li>Go to the <code>CONTRACTS</code> page in Fusion</li>
          <li>Press <code>WATCH CONTRACT</code></li>
          <li>In the <code>CONTRACT ADDRESS</code> field insert the contract address</li>
          <li>In the <code>CONTRACT NAME</code> field enter <code>{{title}}</code></li>
          <li>In the <code>JSON INTERFACE</code> field insert the ABI / JSON</li>
          <li>Press <code>OK</code></li>
          <li>Open <code>{{title}}</code>
          <li>Select function -> <code>vote</code></li>
          <li>Enter the candiate number you wish to vote for</li>
          <li>Execute from -> Address you wish to vote from</li>
          <li>Press <code>EXECUTE</code>
          <li>Send the transaction. <strong>Send 0 UBQ</strong>, any transactions with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the vote.</li>
        </ul>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="secondary" type="button" v-clipboard:copy="abi" v-clipboard:success="copyAbiSuccess" v-clipboard:error="copyAbiError">
            Copy ABI / JSON
          </b-btn>
          <b-btn size="sm" class="float-right icon-left" variant="secondary" type="button" v-clipboard:copy="checksum" v-clipboard:success="copyContractSuccess" v-clipboard:error="copyContractError">
            Copy Contract Address
          </b-btn>
        </div>
      </b-modal>
      <b-modal id="pyrusModal" centered size="lg" class="text-left">
        <div slot="modal-title">Vote with Pyrus</div>
        <b-alert show>If voting from a Ledger Nano S, ensure contracts is enabled in the Ubiq application settings on the device.</b-alert>
        <ul>
          <li>Go to the <a href="https://pyrus.ubiqsmart.com/#contracts" target="_blank">Contracts</a> page in Pyrus</li>
          <li>In the <code>Contract Address</code> field insert the contract address</li>
          <li>In the ABI / JSON Interface insert the ABI /JSON</li>
          <li>Press <code>Access</code></li>
          <li>Select function -> <code>vote</code></li>
          <li>Enter the candiate number you wish to vote for</li>
          <li>Send the transaction. <strong>Send 0 UBQ</strong>, any transactions with more than 0 UBQ included will be rejected by the contract. Ensure you have a very small amount of UBQ (~0.001) to cover the gas fee in the account making the vote. The recommended gas limit is 100000.</li>
        </ul>
        <div slot="modal-footer" class="w-100">
          <b-btn size="sm" class="float-right" variant="secondary" type="button" v-clipboard:copy="abi" v-clipboard:success="copyAbiSuccess" v-clipboard:error="copyAbiError">
            Copy ABI / JSON
          </b-btn>
          <b-btn size="sm" class="float-right icon-left" variant="secondary" type="button" v-clipboard:copy="checksum" v-clipboard:success="copyContractSuccess" v-clipboard:error="copyContractError">
            Copy Contract Address
          </b-btn>
        </div>
      </b-modal>
      <b-modal id="participationModal" centered size="lg" class="text-left">
        <div slot="modal-title">Participation</div>
        <b-row>
          <b-col md="12">
            <PieChart :chart-data="charts.pie" :options="chartOptions.pie" :height="350" :styles="{height: '300px'}"/>
          </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100 text-center">
          <h4>
            <b-badge class="icon-left">Votes : {{ totalVotes }}</b-badge>
            <b-badge>Weight : {{ totalWeight }} ESCH</b-badge>
          </h4>
        </div>
      </b-modal>
      <b-modal id="votesModal" centered hide-footer size="xl" class="text-left">
        <div slot="modal-title">Votes Received</div>
        <b-row>
          <b-col md="12">
            <BarChart :chart-data="charts.bar" :options="chartOptions.bar" :height="300" :styles="{height: '300px'}"/>
          </b-col>
        </b-row>
        <VotesTable :items="votes"></VotesTable>
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
        <div id="proposal-section-1">
          <b-alert v-if="block < startBlock" variant="danger" show>The voting period has not started yet for this {{ type }}. All votes will be rejected by the voting contract until block {{ startBlock }}</b-alert>
          <b-alert v-if="block >= endBlock" variant="danger" show>The voting period has finished for this {{ type }}.</b-alert>
          <vue-markdown :source="desc"></vue-markdown>
          <b-row>
            <b-col md="6">
              <div class="vote-with">
                <b-btn v-b-modal.fusionModal class="btn btn-secondary icon-left" type="button">Vote with Fusion</b-btn>
                <b-btn v-b-modal.pyrusModal class="btn btn-secondary">Vote with Pyrus</b-btn>
              </div>
            </b-col>
            <b-col md="6" class="text-right">
              <b-btn v-b-modal.votesModal class="btn btn-secondary icon-left">Votes</b-btn>
              <b-btn v-b-modal.participationModal class="btn btn-secondary">Participation</b-btn>
            </b-col>
          </b-row>
          <b-alert show style="margin-top:15px;margin-bottom:0px;">
            No UBQ or ESCH are transferred when signaling, the vote mechanism simply registers your vote for this proposal. As such, the entire ESCH balance stored at that address would be counted towards the vote. The balance at the proposals defined end block ({{endBlock}}) is used, not the balance when the vote is made.
          </b-alert>
        </div>
        <div id="proposal-section-2">
          <CandidatesTable :items="candidates" :total-weight="totalWeight"></CandidatesTable>
        </div>
        <div id="proposal-section-3">
          <no-ssr> <!-- dont render this server side -->
            <AddressSubmit :submit="checkVote" type="vote"/>
          </no-ssr>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import util from '~/scripts/util'
import ABI from '~/scripts/vote'
import AddressSubmit from '~/components/SubmitAddress.vue'
import BarChart from '~/components/charts/Bar.vue'
import CandidatesTable from '~/components/tables/Candidates.vue'
import PieChart from '~/components/charts/Pie.vue'
import VotesTable from '~/components/tables/Votes.vue'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'proposal',
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
      totalWeight: '-',
      totalVotes: '-',
      type: 'proposal',
      votes: [],
      candidates: [],
      desc: '',
      discussion: '',
      errors: [],
      useWeb3: false,
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
    },
    checksum () {
      return util.toChecksumAddress(this.contract)
    }
  },
  components: {
    AddressSubmit,
    BarChart,
    PieChart,
    VotesTable,
    CandidatesTable,
    'vue-markdown': VueMarkdown
  },
  methods: {
    fetch: function () {
      axios.get('https://escher.ubiqscan.io/proposal/' + this.contract)
        .then(response => {
          this.startBlock = response.data.startBlock
          this.endBlock = response.data.endBlock
          this.type = response.data.type
          this.totalWeight = parseFloat(response.data.totalWeight).toFixed(8)
          this.title = response.data.title
          this.candidates = response.data.candidates
          if (response.data.type === 'UIP') {
            axios.get('https://raw.githubusercontent.com' + response.data.uip)
              .then(github => {
                this.desc = github.data.substring(github.data.indexOf('##')).replace(/##/g, '####')
                this.discussion = 'https://github.com' + response.data.data
              })
              .catch(e => {
                this.errors.push(e)
              })
          } else {
            axios.get('https://api.github.com/repos' + response.data.data)
              .then(github => {
                this.desc = github.data.body
                this.discussion = 'https://github.com' + response.data.data
              })
              .catch(e => {
                this.errors.push(e)
              })
          }
          var percentVoted = ((this.totalWeight / this.$store.state.totalEscher) * 100).toFixed(4)
          this.charts.pie = {
            labels: ['Voted', 'Outstanding'],
            datasets: [
              {
                backgroundColor: ['#00ea90', '#222'],
                data: [percentVoted, (100 - percentVoted)],
                borderWidth: [0, 0]
              }
            ]
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get('https://escher.ubiqscan.io/votes/' + this.contract)
        .then(response => {
          this.totalVotes = response.data.length
          var latestVotes = response.data
          if (latestVotes.length > 50) {
            latestVotes = latestVotes.slice(latestVotes.length - 50)
          }
          var barChart = {
            data: [],
            labels: []
          }
          latestVotes.forEach(function (claim) {
            barChart['data'].push(claim.balance)
            barChart['labels'].push(claim.address)
          })
          this.charts.bar = {
            labels: barChart.labels,
            datasets: [
              {
                backgroundColor: '#00ea90',
                label: 'ESCH',
                data: barChart.data
              }
            ]
          }
          this.votes = response.data.reverse()
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    makeToast(variant = null, title = '', message = '') {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-right',
        solid: true,
        variant: variant,
        appendToast: true
      })
    },
    copyContractSuccess: function (e) {
      this.makeToast('success', 'Contract address copied to clipboard', this.checksum)
    },
    copyContractError: function (e) {
      this.makeToast('danger', 'Unable to copy contract address to clipboard', this.checksum)
    },
    copyAbiSuccess: function (e) {
      this.makeToast('success', 'ABI / JSON copied to clipboard', this.checksum)
    },
    copyAbiError: function (e) {
      this.makeToast('danger', 'Unable to copy ABI / JSON to clipboard', this.checksum)
    },
    checkVote: function (address) {
      var validator = new RegExp(/^0x[0-9a-fA-F]{40}$/i)
      if (validator.test(address)) {
        axios.get('https://escher.ubiqscan.io/vote/' + this.contract + '/' + address.toLowerCase())
          .then(response => {
            if (!response.data.error) {
              this.makeToast('success', 'Vote was received successfully for candidate ' + response.data.candidate, util.toChecksumAddress(address))
            } else {
              this.makeToast('danger', 'Vote not found', util.toChecksumAddress(address))
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        this.makeToast('danger', 'Invalid address', util.toChecksumAddress(address))
      }
    }
  }
}
</script>
