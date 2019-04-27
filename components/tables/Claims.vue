<template>
  <b-row>
    <b-col md="12">
      <b-table class="mb-0" responsive="sm" hover :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage">
        <template slot="HEAD_identicon" slot-scope="data">
          <em><fa :icon="['fas', 'user']"/></em>
        </template>
        <div slot="identicon" class="identicon" slot-scope="data">
          <Blockie :address="data.item.address" size="small"/>
        </div>
        <div slot="address" slot-scope="data">
          <div><a :href="'https://ubiqscan.io/address/' + data.value" target="_blank">{{formatAddress(data.value)}}</a></div>
        </div>
        <div slot="balance" slot-scope="data">
          <strong>{{data.value}}</strong>
        </div>
        <div slot="escher" slot-scope="data">
          <strong>{{escher(data.item.balance)}}</strong>
        </div>
      </b-table>
      <nav style="margin-right:-4px;">
        <b-pagination size="md" align="right" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next"/>
      </nav>
    </b-col>
  </b-row>
</template>

<script>
import Blockie from '~/components/Blockie.vue'
import util from '~/scripts/util'

export default {
  props: {
    items: {
      type: Array
    },
    escher: {
      type: Function
    }
  },
  data: () => {
    return {
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      fields: {
        identicon: {
          class: 'text-center identicon-column'
        },
        address: {
          label: 'Address'
        },
        balance: {
          label: 'Balance (UBQ)',
          class: 'text-right'
        },
        escher: {
          label: 'Escher (ESCH)',
          class: 'text-right'
        }
      }
    }
  },
  methods: {
    getRowCount (items) {
      return items.length
    },
    formatAddress (address) {
      return util.toChecksumAddress(address)
    }
  },
  components: {
    Blockie
  }
}
</script>
