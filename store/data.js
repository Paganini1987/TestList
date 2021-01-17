export const state = () => ({
    categoriesList: [],
    cart: [],
    sortBy: 'price'
})

export const actions = {
    async LOAD_CATEGORIES_LIST({ commit }) {
        const data = await this.$axios.$get(
            'https://frontend-test.idaproject.com/api/product-category'
        )

        commit('SET_CATEGORIES_LIST', data)
        return data
    },
    async LOAD_PRODUCTS_LIST({ commit }, category = 1) {
        const data = await this.$axios.$get(
            'https://frontend-test.idaproject.com​/api/product',
            {
                params: {
                    category
                }
            }
        )

        return data
    },
    UPDATE_CART({ commit, state }, { product, action }) {
        // проверим на наличие в корзине данного товара
        const index = product && state.cart.findIndex(p => p.id === product.id)

        if (index >= 0 && action === 'remove') {
            // удалим
            commit('REMOVE_FROM_CART', index)
        } else if (index < 0 && action === 'add') {
            // добавим
            commit('ADD_TO_CART', product)
        } else if (action === 'reset') {
            commit('RESET_CART')
        }

        // Обновим локальное состояние корзины
        window.localStorage.testList = JSON.stringify(state.cart)
    },
    LOAD_LOCAL_CART({ commit, state }) {
        // Загрузим сохранённое состояние корзины
        if (window.localStorage.testList) {
            commit('UPDATE_CART_FROM_LOCAL', JSON.parse(window.localStorage.testList))
        }
    },
    UPDATE_SORT_BY({ commit }, sort) {
        commit('SET_SORT_BY', sort)
    }
}

export const mutations = {
    SET_CATEGORIES_LIST(state, data) {
        state.categoriesList = data
    },
    ADD_TO_CART(state, data) {
        state.cart.push(data)
    },
    REMOVE_FROM_CART(state, data) {
        state.cart.splice(data, 1)
    },
    RESET_CART(state, data) {
        state.cart = []
    },
    UPDATE_CART_FROM_LOCAL(state, data) {
        state.cart = data
    },
    SET_SORT_BY(state, data) {
        state.sortBy = data
    }
}

export const getters = {
    GET_CATEGORIES_LIST: state => state.categoriesList,
    GET_CART_PRODUCTS: state => state.cart,
    GET_CART_PRODUCTS_QUANTITY: state => state.cart.length,
    GET_SORT_BY: state => state.sortBy
}
