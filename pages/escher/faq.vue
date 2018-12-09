<template>
  <b-row class="justify-content-md-center">
    <b-col md="12">
      <div id="accordion">
        <div role="tablist" class="accordion">
          <b-card no-body class="mb-1 faq">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-btn block href="#" v-b-toggle.contract>
                {{ $t("escher.faq1") }}
              </b-btn>
            </b-card-header>
            <b-collapse id="contract" accordion="faqAccordion" role="tabpanel">
              <b-card-body>
                <no-ssr>
                  <AddressReadOnly :address="escherContract"/>
                </no-ssr>
              </b-card-body>
            </b-collapse>
          </b-card>
          <div v-for="(item, index) in faqs" :key="index">
            <b-card no-body class="mb-1 faq">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle="'accordion' + index" >{{ item.question }}</b-btn>
              </b-card-header>
              <b-collapse :id="'accordion' + index" accordion="faqAccordion" role="tabpanel">
                <b-card-body>
                  <span v-html="item.answer"/>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

import AddressReadOnly from '~/components/AddressReadOnly.vue'

export default {
  name: 'Faq',
  layout: 'escher',
  data () {
    return {
      escherContract: '0xcf3222b7FDa7a7563b9E1E6C966Bead04AC23c36',
      faqs: this.$t('escher.faqs')
    }
  },
  components: {
    AddressReadOnly
  }
}

</script>
