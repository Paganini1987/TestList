export const state = () => ({
    cartState: false
})

export const actions = {
    UPDATE_CART_STATE ({ commit }, state) {
        commit('SET_CART_STATE', state)
    }
}

export const mutations = {
    SET_CART_STATE (state, data) {
        state.cartState = data
    }
}

export const getters = {
    GET_CART_STATE: state => state.cartState
}
