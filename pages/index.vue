<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <b-card class="card-main">

        <b-row id="section-header">
          <div id="section-header-container">
            <img src="~/assets/logo-full.svg">
            <h5>{{ $t("home.catchPhrase") }}</h5>
            <div>
              <nuxt-link to="/wallets" style="width:200px;" class="btn btn-secondary"><fa :icon="['fas', 'wallet']"/> Choose your wallet</nuxt-link>
              <a class="btn btn-secondary" style="width:200px;" href="https://discord.gg/HF6vEGF" target="_blank"><fa :icon="['fab', 'discord']"/> Join the discord</a>
            </div>
          </div>
        </b-row>

        <b-row>
          <b-col md="5">
            <div class="section-content content-odd">
              <h4>{{ $t("home.section1.title") }}</h4>
              <hr>
              <p>{{ $t("home.section1.text") }}</p>
            </div>
          </b-col>
          <b-col md="7" class="image-odd">
            <img src="~/assets/graphic-1.svg" width="80%">
          </b-col>
        </b-row>

        <b-row class="section-dark">
          <b-col md="7" class="image-even">
            <img src="~/assets/graphic-2.svg" width="80%">
          </b-col>
          <b-col md="5">
            <div class="section-content content-even">
              <h4>{{ $t("home.section2.title") }}</h4>
              <hr/>
              <p>{{ $t("home.section2.text1") }}</p>
              <p>{{ $t("home.section2.text2") }}</p>
            </div>
          </b-col>
        </b-row>

        <b-row class="section">
          <b-col md="5">
            <div class="section-content content-odd">
              <h4>{{ $t("home.section3.title") }}</h4>
              <hr/>
              <p v-html="$t('home.section3.text1')"/>
              <p v-html="$t('home.section3.text2')"/>
            </div>
          </b-col>
          <b-col md="7" class="image-odd">
            <img src="~/assets/graphic-3.svg" width="80%">
          </b-col>
        </b-row>

        <b-row class="section-dark">
          <b-col md="7" class="image-even">
            <img src="~/assets/graphic-4.svg" width="80%">
          </b-col>
          <b-col md="5">
            <div class="section-content content-even">
              <h4>{{ $t("home.section4.title") }}</h4>
              <hr></hr>
              <p> <nuxt-link to="/monetary-policy">{{ $t("home.section4.text1")}}</nuxt-link> {{ $t('home.section4.text2') }}</p>
              </span>
            </div>
          </b-col>
        </b-row>

        <b-row class="section">
          <b-col md="5">
            <div class="section-content content-odd">
              <h4>{{ $t("home.section5.title") }}</h4>
              <hr/>
              <p>{{ $t("home.section5.text1") }}</p>
              <p>{{ $t("home.section5.text2") }}</p>
            </div>
          </b-col>
          <b-col md="7" class="image-odd">
            <img src="~/assets/graphic-5.svg" width="70%">
          </b-col>
        </b-row>

        <b-row class="section-dark">
          <b-col md="7" class="image-even">
            <img src="~/assets/graphic-6.svg" width="80%">
          </b-col>
          <b-col md="5">
            <div class="section-content content-even">
              <h4>{{ $t("home.section6.title") }}</h4>
              <hr/>
              <p>{{ $t("home.section6.text1") }}</p>
              <p>{{ $t("home.section6.text2") }}</p>
            </div>
          </b-col>
        </b-row>

        <b-row class="section">
          <b-col md="5">
            <div class="section-content content-odd">
              <h4>{{ $t("home.section7.title") }}</h4>
              <hr/>
              <p>{{ $t("home.section7.text") }}</p>
            </div>
          </b-col>
          <b-col md="7" style="text-align:right;">
            <img src="~/assets/graphic-7.svg" width="80%">
          </b-col>
        </b-row>

      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Home'
}
</script>
