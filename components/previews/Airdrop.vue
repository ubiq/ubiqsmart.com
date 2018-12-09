<template>
  <b-row>
    <nuxt-link :to="'/escher/airdrop/' + info.contract">
      <b-col md="12">
        <b-card class="card-preview-airdrop">
          <strong slot="header">{{info.title}}</strong>
          <b-row>
            <div style="display:inline-block;">
              <p>Claim period, block <strong>{{ info.startBlock }}</strong> to <strong>{{ info.endBlock }}</strong> with an airdrop ratio of <strong>{{ info.multiplier }} ESCH </strong> per 1 UBQ. <span> A Total amount of <strong>{{ totalClaimed }} ESCH</strong> has been claimed.</span></p>
            </div>
            <div class="input-group">
              <div class="input-group-prepend">
                <no-ssr>
                  <Blockie :address="info.contract" size="med" inline="true"/>
                </no-ssr>
              </div>
              <input class="form-control" type="text" :value="info.contract" style="margin-left:5px;cursor:pointer;" readonly/>
            </div>
          </b-row>
        </b-card>
      </b-col>
    </nuxt-link>
  </b-row>
</template>

<script>
import Blockie from '~/components/Blockie.vue'

export default {
  props: ['info'],
  computed: {
    totalClaimed: function () {
      return this.info.totalClaimed * this.info.multiplier
    }
  },
  components: {
    Blockie
  }
}
</script>
