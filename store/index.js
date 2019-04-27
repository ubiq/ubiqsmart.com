const BigNumber = require('bignumber.js')

export const state = () => ({
  locales: ['en'],
  locale: 'en',
  latestBlock: 0,
  totalEscher: 0,
  totalUbiq: 0,
  airdrops: {},
  proposals: {}
})

export const mutations = {
  setLocale (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  setAirdrops (state, payload) {
    state.airdrops = {
      active: payload.active,
      pending: payload.pending,
      historic: payload.historic.reverse()
    }
  },
  setLatestBlock (state, payload) {
    state.latestBlock = payload
  },
  setProposals (state, payload) {
    state.proposals = {
      active: payload.active,
      pending: payload.pending,
      historic: payload.historic.reverse()
    }
  },
  setTotalEscher (state, payload) {
    state.totalEscher = payload
  },
  setTotalUbiq (state, payload) {
    state.totalUbiq = new BigNumber(payload).div('1e18').toFixed()
  }
}
