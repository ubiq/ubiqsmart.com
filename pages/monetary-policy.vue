<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main">
        <b-row id="mp-section-1">
          <b-col md="5">
            <div class="section-content">
              <h4>{{ $t("monetaryPolicy.section1.title") }}</h4>
              <hr/>
              <p>{{ $t("monetaryPolicy.section1.text") }}</p>
            </div>
          </b-col>
          <b-col md="7" style="text-align:right;">
            <img src="~/assets/monetary-policy.svg" width="80%">
          </b-col>
        </b-row>
        <b-row id="mp-section-2">
          <b-col md="7">
            <Chart :chart-data="chartData" :options="chartOptions" :height="300" :styles="{height: '300px'}"/>
          </b-col>
          <b-col md="5" style="text-align:right;">
            <div class="section-content content-even">
              <h4>{{ $t("monetaryPolicy.section2.title") }}</h4>
              <hr/>
              <p>{{ $t("monetaryPolicy.section2.text") }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row no-gutters id="mp-section-3" class="text-center">
          <Table/>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Chart from '~/components/charts/Bar.vue'
import Table from '~/components/tables/MonetaryPolicy.vue'
export default {
  name: 'MonetaryPolicy',
  data () {
    return {
      chartData: {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
        datasets: [{
          label: this.$t('monetaryPolicy.blockReward'),
          backgroundColor: '#61bf83',
          data: [8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1]
        },
        {
          label: this.$t('monetaryPolicy.inflationRate'),
          backgroundColor: '#c9de7d',
          data: [7.29, 6.00, 4.89, 3.91, 3.04, 2.23, 1.46, 0.73, 0.72, 0.72, 0.71, 0.71]
        }]
      },
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              fontColor: '#ffffff'
            }
          }],
          xAxes: [{
            ticks: {
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
