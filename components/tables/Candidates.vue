<template>
  <b-row>
    <b-col md="12">
      <b-table class="mb-0" responsive="sm" :items="items" :fields="fields">
        <div slot="index" class="identicon" slot-scope="data">
          <strong>{{data.item.index}}</strong>
        </div>
        <div slot="title" slot-scope="data">
          <strong>{{data.item.title}}</strong>
        </div>
        <div slot="votes" slot-scope="data">
          <strong>{{data.item.totalVotes}}</strong>
        </div>
        <div slot="weight" slot-scope="data">
          <b-progress :value="calcProgress(data.item.totalWeight)" variant="info" style="width:100%;" v-b-popover.hover="data.item.totalWeight" title="Weight (ESCH)"></b-progress>
        </div>
        <div slot="percent" slot-scope="data">
          <strong>{{calcProgress(data.item.totalWeight).toFixed(4)}}</strong>
        </div>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array
    },
    totalWeight: {
      type: String
    },
    contractInstance: {
      type: Object
    }
  },
  data: () => {
    return {
      fields: {
        index: {
          label: '#',
          class: 'text-center identicon-column'
        },
        title: {
          label: ''
        },
        votes: {
          label: 'Votes',
          class: 'text-center'
        },
        weight: {
          label: 'Weight (ESCH)'
        },
        percent: {
          label: '%',
          class: 'text-center'
        }
      }
    }
  },
  methods: {
    calcProgress: function (weight) {
      if (weight !== '0') {
        return (weight / this.totalWeight) * 100
      } else {
        return 0
      }
    }
  }
}
</script>
