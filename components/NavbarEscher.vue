<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="~/assets/logo.svg" width="26" height="26"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t("navbar.home")}}</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/escher/faq">{{ $t("escher.navbar.faq")}}</b-nav-item>
        <no-ssr>
          <b-nav-item-dropdown right>
            <span slot="button-content">{{ $t("escher.navbar.airdrops") }}</span>
            <b-dropdown-item v-if="airdropsActive && airdropsActive.length > 0" :to="'/escher/airdrop/' + airdropsActive[0].contract">{{ $t("escher.navbar.active") }} <span class="badge badge-secondary badge-nav float-right">{{airdropsActive.length}}</span></b-dropdown-item>
            <b-dropdown-item v-if="airdropsPending && airdropsPending.length > 0" to="/escher/airdrops/pending">{{ $t("escher.navbar.pending") }} <span class="badge badge-secondary badge-nav float-right">{{airdropsPending.length}}</span></b-dropdown-item>
            <b-dropdown-item v-if="airdropsHistoric && airdropsHistoric.length > 0" to="/escher/airdrops/historic">{{ $t("escher.navbar.historic") }} <span class="badge badge-secondary badge-nav float-right">{{airdropsHistoric.length}}</span></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <span slot="button-content">{{ $t("escher.navbar.proposals") }}</span>
            <b-dropdown-item v-if="proposalsActive && proposalsActive.length > 0" to="/escher/proposals/active">{{ $t("escher.navbar.active") }} <span class="badge badge-secondary badge-nav float-right">{{proposalsActive.length}}</span></b-dropdown-item>
            <b-dropdown-item v-if="proposalsPending && proposalsPending.length > 0" to="/escher/proposals/pending">{{ $t("escher.navbar.pending") }} <span class="badge badge-secondary badge-nav float-right">{{proposalsPending.length}}</span></b-dropdown-item>
            <b-dropdown-item v-if="proposalsHistoric && proposalsHistoric.length > 0" to="/escher/proposals/historic">{{ $t("escher.navbar.historic") }} <span class="badge badge-secondary badge-nav float-right">{{proposalsHistoric.length}}</span></b-dropdown-item>
          </b-nav-item-dropdown>
        </no-ssr>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    airdropsActive () {
      return this.$store.state.airdrops.active
    },
    airdropsPending () {
      return this.$store.state.airdrops.pending
    },
    airdropsHistoric () {
      return this.$store.state.airdrops.historic
    },
    proposalsActive () {
      return this.$store.state.proposals.active
    },
    proposalsPending () {
      return this.$store.state.proposals.pending
    },
    proposalsHistoric () {
      return this.$store.state.proposals.historic
    }
  }
}
</script>
