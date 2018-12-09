<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main">
        <b-row id="team-section-1" class="justify-content-md-center">
          <div v-for="(item, index) in team" :key="index">
            <b-card :class="{ 'card-team': true, 'card-team-selected': selected === item, 'text-center': true}" v-on:click="setSelected(item)">
              <img :src="require('~/assets/team/' + item + '.jpg')"/>
              <h5>{{ $t('team.' + item + '.name') }}</h5>
              <strong>{{ $t('team.' + item + '.role') }}</strong>
              <hr/>
              <span v-for="(social, subindex) in $t('team.' + item + '.social')" :key="subindex">
                <a class="team-social" :href="social.url" target="_blank"><fa :icon="['fab', social.icon]"/></a>
              </span>
            </b-card>
          </div>
        </b-row>
        <b-row id="team-section-2">
          <b-col md="5">
            <div class="section-content content-even">
              <h4>{{ $t('team.' + selected + '.name') }}</h4>
              <hr/>
              <p>{{ $t('team.' + selected + '.desc') }}</p>
            </div>
          </b-col>
          <b-col md="7" style="text-align:right;">
            <img src="~/assets/team.svg" width="80%">
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Team',
  data () {
    return {
      team: ['jy', 'lw', 'kh', 'ab', 'as', 'kl'],
      selected: 'jy'
    }
  },
  methods: {
    setSelected (item) {
      this.selected = item
    }
  }
}
</script>
