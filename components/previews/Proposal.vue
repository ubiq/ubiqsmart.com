<template>
  <nuxt-link :to="'/escher/proposal/' + info.contract">
    <b-card class="card-preview-proposal">
      <strong slot="header">{{info.title}} <span class="badge badge-secondary badge-header float-right">{{info.type}}</span></strong>
      <b-row>
        <b-col md="10">
          <vue-markdown :source="desc"></vue-markdown>
        </b-col>
        <b-col md="2">
          <PieChart :chart-data="chartData" :options="options" :height="150" :styles="{height: '100%'}"/>
        </b-col>
      </b-row>
    </b-card>
  </nuxt-link>
</template>

<script>
import PieChart from '~/components/charts/Pie.vue'
import VueMarkdown from 'vue-markdown'
import axios from 'axios'
export default {
  props: ['info'],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        }
      },
      chartData: {},
      desc: '',
      discussion: '#'
    }
  },
  methods: {
    configChart: function () {
      let labels = []
      let data = []
      for (var i = 0; i < this.info.candidates.length; i++) {
        labels.push(this.info.candidates[i].title)
        let percent = (this.info.candidates[i].totalWeight / this.info.totalWeight) * 100
        data.push(percent)
      }
      this.chartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: ['#222', '#CCC', '#555'],
            data: data,
            borderWidth: [0, 0, 0]
          }
        ]
      }
    },
    fetch: function () {
      if (this.info.type === 'UIP') {
        axios.get('https://raw.githubusercontent.com' + this.info.uip)
          .then(github => {
            let desc = github.data.substring(github.data.indexOf('##')).replace(/##/g, '#####')
            if (desc.length > 550) {
              desc = desc.substr(0, 550) + '...'
            }
            this.desc = desc
          })
          .catch(e => {
            this.errors.push(e)
          })
      } else {
        axios.get('https://api.github.com/repos' + this.info.data)
          .then(github => {
            let desc = github.data.body
            if (desc.length > 500) {
              desc = desc.substr(0, 500) + '...'
            }
            this.desc = desc
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  },
  created () {
    this.configChart()
    this.fetch()
  },
  components: {
    PieChart,
    'vue-markdown': VueMarkdown
  }
}
</script>
