<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main">

        <b-row id="section-header">
          <div id="section-header-container">
            <img src="~/assets/sparrow/icon-128.png">
            <h3>{{ $t("sparrow.title") }}</h3>
          </div>
        </b-row>

        <b-row class="sparrow-preview">
          <b-col md="12">
            <img src="~/assets/sparrow/sparrow.png" style="max-width:280px;">
          </b-col>
        </b-row>
        <b-row class="sparrow-section-dark" style="padding-top:20px;padding-bottom:20px;">
          <b-col md="6" sm="12" style="padding-top:40px;">
            <div style="max-width:280px;margin: 0 auto;text-align:center;">
              <h4>Buy, store and send tokens globally</h4>
              <p>Sparrow equips you with a key vault, secure login, and token wallet - <b>everything you need to manage your digital assets</b>.</p>
            </div>
          </b-col>
          <b-col md="6" sm="12" style="padding-top:40px;">
            <div style="max-width:280px;margin: 0 auto;text-align:center;">
              <h4>Explore blockchain apps</h4>
              <p>Sparrow provides the simplest yet most secure way to connect to blockchain-based applications. You are always in control when interacting on the new decentralized web</b>.</p>
            </div>
          </b-col>
        </b-row>
        <b-row class="sparrow-section-dark-2">
          <b-col md="12">
            <b-row style="text-align:center;">
              <h4 style="margin: 15px auto;">Supported Browsers</h4>
            </b-row>
          </b-col>
          <b-col v-if="hasMetaMask" md="12">
            <b-row style="text-align:center;">
              <b-alert show style="margin: 0 auto;">Warning: do not install Sparrow in the same browser as MetaMask, a conflict will occur.</b-alert>
            </b-row>
          </b-col>
          <b-col md="6" style="text-align:center;padding:25px 0 25px 15px;">
            <a href="https://addons.mozilla.org/en-US/firefox/addon/ubiq-sparrow/" target="_blank" style="color:#fff">
              <img src="~/assets/browsers/firefox.png" width="64px;">
              <h6>Firefox</h6>
            </a>
          </b-col>
          <b-col md="6" style="text-align:center;padding:25px 0 25px 15px;">
            <a href="https://chrome.google.com/webstore/detail/sparrow/fbeiiganbeffhobegddakpmplljhmfnd" target="_blank" style="color:#fff">
              <img src="~/assets/browsers/chrome.png" width="64px;">
              <h6 style="margin:0;padding:0">Chrome</h6>
            </a>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Sparrow',
  computed: {
    hasMetaMask() {
      return window.ethereum?.isMetaMask
    }
  }
}
</script>
