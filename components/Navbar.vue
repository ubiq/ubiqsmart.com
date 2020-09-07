<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="~/assets/logo.svg" width="26" height="26"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item to="/">{{ $t("navbar.home")}}</b-nav-item>
        <b-nav-item to="/markets">{{ $t("navbar.markets")}}</b-nav-item>
        <b-nav-item to="/mining">{{ $t("navbar.mining") }}</b-nav-item>
        <b-nav-item to="/wallets">{{ $t("navbar.wallets")}}</b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/sparrow">{{ $t("navbar.sparrow")}}</b-nav-item>
        <b-nav-item to="/escher">{{ $t("navbar.escher")}}</b-nav-item>
        <b-nav-item-dropdown  right>
          <span slot="button-content">{{ $t("navbar.info.title") }}</span>
          <b-dropdown-item href="https://blog.ubiqsmart.com/tagged/guides-and-tutorials" target="_blank">{{ $t("navbar.info.guides") }}</b-dropdown-item>
          <b-dropdown-item href="https://blog.ubiqsmart.com/tagged/monthly" target="_blank">{{ $t("navbar.info.reports") }}</b-dropdown-item>
          <b-dropdown-item href="https://blog.ubiqsmart.com/research/home" target="_blank">{{ $t("navbar.info.research") }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown  right>
          <span slot="button-content">{{ $t("navbar.social") }}</span>
          <b-dropdown-header>Official</b-dropdown-header>
          <b-dropdown-item href="https://discord.gg/XaqzJB4" target="_blank"><fa :icon="['fab', 'discord']"/> Discord</b-dropdown-item>
          <b-dropdown-item href="https://twitter.com/ubiqsmart" target="_blank"><fa :icon="['fab', 'twitter']"/> Twitter</b-dropdown-item>
          <b-dropdown-item href="https://github.com/ubiq/" target="_blank"><fa :icon="['fab', 'github']"/> Github</b-dropdown-item>
          <b-dropdown-header>Community Driven</b-dropdown-header>
          <b-dropdown-item href="https://www.reddit.com/r/Ubiq/" target="_blank"><fa :icon="['fab', 'reddit']"/> Reddit</b-dropdown-item>
          <b-dropdown-item href="https://twitter.com/CryptoUbiq" target="_blank"><fa :icon="['fab', 'twitter']"/> Twitter</b-dropdown-item>
          <b-dropdown-item href="https://www.ubiqescher.com/" target="_blank"><fa :icon="['fab', 'chrome']"/> Website</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
