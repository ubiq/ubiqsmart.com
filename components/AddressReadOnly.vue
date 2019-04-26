<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <Blockie :address="address" size="med" inline="true"/>
    </div>
    <input class="form-control" type="text" :value="address" style="margin-left:5px;" readonly/>
    <div class="input-group-append">
      <button class="btn btn-primary btn-append" type="button" v-clipboard:copy="address" v-clipboard:success="success" v-clipboard:error="error">Copy</button>
    </div>
  </div>
</template>

<script>

import Blockie from '~/components/Blockie.vue'

export default {
  name: 'ReadOnly',
  props: ['address'],
  methods: {
    makeToast(variant = null, title = '', message = '') {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-right',
        solid: true,
        variant: variant,
        appendToast: true
      })
    },
    success: function (e) {
      this.makeToast('success', 'Contract address copied to clipboard', address)
    },
    error: function (e) {
      this.makeToast('danger', 'Unable to copy contract address to clipboard', address)
    }
  },
  components: {
    Blockie
  }
}
</script>
