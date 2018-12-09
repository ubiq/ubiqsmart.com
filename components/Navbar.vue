<template>
  <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#"><img src="~/assets/logo.svg" width="26" height="26"></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">{{ $t("navbar.home")}}</b-nav-item>
        <b-nav-item to="/wallets">{{ $t("navbar.wallets")}}</b-nav-item>
        <b-nav-item to="/markets">{{ $t("navbar.markets")}}</b-nav-item>
        <b-nav-item-dropdown  right>
          <span slot="button-content">{{ $t("navbar.info.title") }}</span>
          <b-dropdown-item to="/mining">{{ $t("navbar.info.mining") }}</b-dropdown-item>
          <b-dropdown-item to="/monetary-policy">{{ $t("navbar.info.monetaryPolicy") }}</b-dropdown-item>
          <b-dropdown-item to="/team" class="d-none d-md-block">{{ $t("navbar.info.team") }}</b-dropdown-item>
          <b-dropdown-divider/>
          <b-dropdown-item href="https://blog.ubiqsmart.com/tagged/guides-and-tutorials" target="_blank">{{ $t("navbar.info.guides") }}</b-dropdown-item>
          <b-dropdown-item href="https://blog.ubiqsmart.com/tagged/monthly" target="_blank">{{ $t("navbar.info.reports") }}</b-dropdown-item>
          <b-dropdown-item href="https://blog.ubiqsmart.com/research/home" target="_blank">{{ $t("navbar.info.research") }}</b-dropdown-item>
          <b-dropdown-divider class="d-none d-md-block"/>
          <b-dropdown-item to="/escher" class="d-none d-md-block">{{ $t("navbar.info.escher") }}</b-dropdown-item>
          <b-dropdown-item to="/uip1" class="d-none d-md-block">{{ $t("navbar.info.uip1") }}</b-dropdown-item>
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
