<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main text-center uip1">
        <b-row class="justify-content-md-center d-done d-md-block">
          <img src="~/assets/logo.svg" height="120"/>
        </b-row>
        <h3>{{ $t("uip1.title") }}</h3>
        <p>{{ $t("uip1.text1") }}</p>
        <b-alert show variant="success">{{ $t("uip1.text2") }}</b-alert>

        <h4 style="margin-top:40px;">{{ $t("uip1.essentialLinks") }}</h4>
        <ul>
          <li>
            <nuxt-link to="/escher/proposal/0xfcd0b547b89f001c17d50df98cf10ce406da5518">Proposal</nuxt-link>
          </li>
          <li>
            <a
              href="https://blog.ubiqsmart.com/introducing-ubqhash-8fa515befd7"
              target="_blank"
            >
              Introducing Ubqhash
            </a>
          </li>
          <li>
            <a
              href="https://blog.ubiqsmart.com/announcing-the-uip-1-hard-fork-84d9b8b3b924"
              target="_blank"
            >
              Announcing the UIP 1 Hard Fork
            </a>
          </li>
        </ul>
        <h4>{{ $t("uip1.ecosystem") }}</h4>
        <ul>
          <li>
            <a
              href="https://github.com/ubiq/go-ubiq/releases/tag/v2.0.1"
              target="_blank"
            >
              go-ubiq
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ubiq/ubqminer/releases/tag/v0.17.0-alpha.1.ubqhash"
              target="_blank"
            >
              ubqminer
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ubiq/open-ethereum-pool"
              target="_blank"
            >
              open-ethereum-pool
            </a>
          </li>
          <li>
            <a
              href="https://github.com/ubiq/ubqhash"
              target="_blank"
            >
              ubqhash
            </a>
          </li>
        </ul>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'Uip1'
}
</script>
