<template>
  <footer class="footer">
    <b-container>
      <b-row>
        <b-col md="2" class="d-none d-md-block" style="text-align:right;padding-top:10px;">
          <img src='../assets/footer.svg' height="140">
        </b-col>
        <b-col md="8" class="d-none d-md-block" style="padding-top:10px;">
          <h6><fa :icon="['fab', 'reddit']"/> Latest Discussions</h6>
          <hr style="margin: 5px 0px"/>
          <div v-for="(item, index) in reddit" :key="index">
            <a v-if="item.data.title.length < 90" :href="'https://reddit.com' + item.data.permalink" target="_blank">{{ item.data.title }}</a>
            <a v-else :href="'https://reddit.com' + item.data.permalink" target="_blank">{{ item.data.title.substr(0, 90) }}...</a>
            <hr style="margin: 5px 0px"/>
          </div>
        </b-col>
        <b-col md="2" class="social-col">
          <h6> <fa :icon="['fas', 'users']"/> Social</h6>
          <hr style="margin: 5px 0px"/>
          <ul class="social">
            <li><a href="https://twitter.com/ubiqsmart" target="_blank"><fa :icon="['fab', 'twitter']"/> Twitter</a></li>
            <li><a href="https://discord.gg/HF6vEGF" target="_blank"><fa :icon="['fab', 'discord']"/> Discord</a></li>
            <li><a href="https://github.com/ubiq/" target="_blank"><fa :icon="['fab', 'github']"/> Github</a></li>
            <li><a href="https://www.reddit.com/r/Ubiq/" target="_blank"><fa :icon="['fab', 'reddit']"/> Reddit</a></li>
            <li><a href="https://blog.ubiqsmart.com" target="_blank"><fa :icon="['fab', 'medium']"/> Blog</a></li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Footer',
  data () {
    return {
      reddit: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    fetch: function () {
      axios.get('https://www.reddit.com/r/Ubiq/new.json?sort=new')
        .then(response => {
          this.reddit = response.data.data.children.splice(0, 4)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
