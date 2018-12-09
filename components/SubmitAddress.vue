<template>
  <div class="input-group">
    <div class="input-group-prepend">
      <Blockie :address="address" size="med" inline="true"/>
    </div>
    <input class="form-control" type="text" style="margin-left:5px;" placeholder="Enter your address" v-model="address"/>
    <div class="input-group-append">
      <button class="btn btn-secondary btn-append" type="button" v-on:click="submit(address)">Check your {{ type }}</i></button>
    </div>
  </div>
</template>

<script>

import Blockie from '~/components/Blockie.vue'

export default {
  name: 'Submit',
  props: ['submit', 'type'],
  data () {
    return {
      address: ''
    }
  },
  components: {
    Blockie
  }
}
</script>
