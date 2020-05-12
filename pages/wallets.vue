<template>
  <b-row class="justify-content-md-center" no-gutters>
    <b-col md="12">
      <b-card class="card-main">
        <b-row class="wallet-section" no-gutters>
          <b-col md="6">
            <div class="section-content content-odd">
              <h4>{{ $t("wallets.fusion.title") }} ({{ $t("wallets.desktop") }})</h4>
              <hr/>
              <p>{{ $t("wallets.fusion.text") }}</p>
              <b-row class="download">
                <a href="https://github.com/ubiq/fusion/releases" target="_blank" class="btn btn-secondary">{{ $t("wallets.fusion.download") }}</a>
                <span class="platforms ml-auto">
                  <fa :icon="['fab', 'windows']" class="icon-left"/>
                  <fa :icon="['fab', 'apple']" class="icon-left"/>
                  <fa :icon="['fab', 'linux']"/>
                </span>
              </b-row>
            </div>
          </b-col>
          <b-col md="6">
            <div class="wallet-image">
              <img id="fusion-image" :src="require('~/assets/wallets/fusion.png')"/>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section-dark" no-gutters>
          <b-col md="6">
            <div class="wallet-image d-none d-md-flex">
              <img id="pyrus-image" :src="require('~/assets/wallets/pyrus.png')"/>
            </div>
          </b-col>
          <b-col md="6">
            <div class="section-content content-even">
              <h4>{{ $t("wallets.pyrus.title") }} ({{ $t("wallets.browser") }})</h4>
              <hr/>
              <p>{{ $t("wallets.pyrus.text") }}</p>
              <b-row class="download">
                <a href="https://pyrus.ubiqsmart.com" target="_blank" class="btn btn-secondary">{{ $t("wallets.pyrus.download") }}</a>
              </b-row>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section" no-gutters>
          <b-col md="6">
            <div class="section-content content-odd">
              <h4>{{ $t("wallets.sparrow.title") }} ({{ $t("wallets.extension") }})</h4>
              <hr/>
              <span v-html="$t('wallets.sparrow.text')"/>
              <b-row class="download">
                <a href="https://chrome.google.com/webstore/detail/sparrow/jpaojkhpgnlemgnapadbomenipmljljp" target="_blank" class="btn btn-secondary">{{ $t("wallets.sparrow.download") }}</a>
                <span class="platforms ml-auto">
                  <fa :icon="['fab', 'chrome']"/>
                </span>
              </b-row>
            </div>
          </b-col>
          <b-col md="6">
            <div class="wallet-image">
              <img id="sparrow-image" :src="require('~/assets/wallets/sparrow.jpg')"/>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section-dark" no-gutters>
          <b-col md="6">
            <div class="wallet-image d-none d-md-flex">
              <img id="dexwallet-image" :src="require('~/assets/wallets/dexwallet.jpg')"/>
            </div>
          </b-col>
          <b-col md="6">
            <div class="section-content content-even">
              <h4>{{ $t("wallets.dexwallet.title") }} ({{ $t("wallets.mobile") }})</h4>
              <hr/>
              <p>{{ $t("wallets.dexwallet.text") }}</p>
              <b-row class="download">
                <a href="https://www.dexwallet.io/" target="_blank" class="btn btn-secondary">{{ $t("wallets.dexwallet.download") }}</a>
                <span class="platforms platforms-dark ml-auto">
                  <fa :icon="['fab', 'apple']" class="icon-left"/>
                  <fa :icon="['fab', 'android']"/>
                </span>
              </b-row>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section" no-gutters>
          <b-col md="6">
            <div class="section-content content-odd">
              <h4>{{ $t("wallets.guarda.title") }}</h4>
              <hr/>
              <p>{{$t("wallets.guarda.text")}}</p>
              <b-row class="download">
                <a href="https://guarda.com/" target="_blank" class="btn btn-secondary">{{ $t("wallets.guarda.download") }}</a>
                <span class="platforms ml-auto">
                  <fa :icon="['fab', 'android']"/>
                  <fa :icon="['fab', 'chrome']" class="icon-left"/>
                  <fa :icon="['fab', 'windows']" class="icon-left"/>
                  <fa :icon="['fab', 'apple']" class="icon-left"/>
                  <fa :icon="['fab', 'linux']"/>
                </span>
              </b-row>
            </div>
          </b-col>
          <b-col md="6">
            <div class="wallet-image">
              <img id="guarda-image" :src="require('~/assets/wallets/guarda.png')"/>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section-dark" no-gutters>
          <b-col md="6">
            <div class="wallet-image d-none d-md-flex">
              <img id="trezor-image" :src="require('~/assets/wallets/trezor.jpg')"/>
            </div>
          </b-col>
          <b-col md="6">
            <div class="section-content content-even">
              <h4>{{ $t("wallets.trezor.title") }} ({{ $t("wallets.hardware") }})</h4>
              <hr/>
              <span v-html="$t('wallets.trezor.text')"/>
              <b-row class="download">
                <a href="https://trezor.io/" target="_blank" class="btn btn-secondary">{{ $t("wallets.trezor.download") }}</a>
              </b-row>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section" no-gutters>
          <b-col md="6">
            <div class="section-content content-odd">
              <h4>{{ $t("wallets.ledger.title") }} ({{ $t("wallets.hardware") }})</h4>
              <hr/>
              <span v-html="$t('wallets.ledger.text' )"/>
              <b-row class="download">
                <a href="https://ledger.com/" target="_blank" class="btn btn-secondary">{{ $t("wallets.ledger.download") }}</a>
              </b-row>
            </div>
          </b-col>
          <b-col md="6">
            <div class="wallet-image">
              <img id="ledger-image" :src="require('~/assets/wallets/ledger.jpg')"/>
            </div>
          </b-col>
        </b-row>

        <b-row class="wallet-section-dark" no-gutters>
          <b-col md="6">
            <div class="wallet-image">
              <img id="gubiq-image" :src="require('~/assets/wallets/gubiq.png')"/>
            </div>
          </b-col>
          <b-col md="6">
            <div class="section-content content-even">
              <h4>{{ $t("wallets.gubiq.title") }} ({{ $t("wallets.server") }})</h4>
              <hr/>
              <p>{{ $t('wallets.gubiq.text' )}}</p>
              <b-row class="download">
                <a href="https://github.com/ubiq/go-ubiq/releases" target="_blank" class="btn btn-secondary">{{ $t("wallets.gubiq.download") }}</a>
                <span class="platforms platforms-dark ml-auto">
                  <fa :icon="['fab', 'windows']" class="icon-left"/>
                  <fa :icon="['fab', 'apple']" class="icon-left"/>
                  <fa :icon="['fab', 'linux']"/>
                </span>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Wallets'
}
</script>
