<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main">
        <b-row id="mp-section-1">
          <b-col md="5">
            <div class="section-content">
              <h4>{{ $t("mining.section1.title") }}</h4>
              <hr/>
              <p v-html="$t('mining.section1.text')"/>
            </div>
          </b-col>
          <b-col md="7" style="text-align:right;">
            <img src="~/assets/mining.svg" width="80%">
          </b-col>
        </b-row>
        <b-row id="mp-section-2">
          <b-col md="7">
            <Chart :chart-data="chartData" :options="chartOptions" :height="300" :styles="{height: '300px'}"/>
          </b-col>
          <b-col md="5" style="text-align:right;">
            <div class="section-content content-even">
              <h4>{{ $t("mining.section2.title") }}</h4>
              <hr/>
              <p>{{ $t("mining.section2.text") }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row no gutters id="mp-section-3" class="text-center">
          <Table/>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Chart from '~/components/charts/Bar.vue'
import Table from '~/components/tables/MiningPools.vue'
export default {
  name: 'Mining',
  data () {
    return {
      chartData: {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [{
          label: 'UBQ',
          backgroundColor: '#61bf83',
          data: [1.00, 1.09, 1.19, 1.28, 1.37, 1.46, 1.55, 1.63]
        },
        {
          label: 'ETH',
          backgroundColor: '#c9de7d',
          data: [1.00, 1.55, 2.09, 2.64, 3.19, 3.73, 4.28, 4.83]
        }]
      },
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              fontColor: '#ffffff'
            },
            scaleLabel: {
              display: true,
              labelString: this.$t('mining.sizeDAG'),
              fontColor: '#ffffff'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: '#ffffff'
            },
            scaleLabel: {
              display: true,
              labelString: this.$t('mining.numYears'),
              fontColor: '#ffffff'
            }
          }]
        },
        legend: {
          display: true,
          labels: {
            fontColor: '#ffffff'
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    Chart,
    Table
  }
}
</script>
