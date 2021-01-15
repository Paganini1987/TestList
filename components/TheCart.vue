<template>
    <div>
        <transition name="overlay">
            <div @click.self="updateCartState(false)" v-show="opened" :class="$style.overlay"></div>
        </transition>
        <transition name="cart">
            <div v-show="opened" :class="$style.cart">
                <div :class="$style.top">
                    <h2 :class="$style.title">Корзина</h2>
                    <button
                        @click="updateCartState(false)"
                        :class="$style.close"
                    >
                        <svg
                            fill="none"
                            width="14"
                            height="14"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <use xlink:href="#close-icon" />
                        </svg>
                    </button>
                </div>
                <div :class="$style.subtitle">Товары в корзине</div>
                <ul>
                    <li :class="$style.item">
                        <cart-item />
                    </li>
                    <li :class="$style.item">
                        <cart-item />
                    </li>
                    <li :class="$style.item">
                        <cart-item />
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from './CartItem.vue'

export default {
    components: { CartItem },
    name: 'TheCart',
    computed: {
        ...mapGetters({
            opened: 'applicationState/GET_CART_STATE'
        })
    },
    methods: {
        // eslint-disable-next-line
        ...mapActions({
            updateCartState: 'applicationState/UPDATE_CART_STATE'
        })
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.cart
    position: fixed
    top: 0
    right: 0
    bottom: 0
    width: 460px
    background-color: $white
    box-shadow: -4px 0px 16px rgba($black, 0.05)
    border-radius: 8px 0px 0px 8px
    padding: 52px 48px
    z-index: 500

.overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background-color: rgba($white, 0.8)
    z-index: 500

.top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px

.title
    font-size: 32px
    line-height: 41px
    font-weight: 700

.close
    position: relative
    margin: 0
    padding: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding-right: 0
    color: inherit
    background-color: transparent
    transition: 0.3s
    &:hover
        color: $grey-light

.subtitle
    font-size: 18px
    line-height: 23px
    color: $grey
    margin-bottom: 16px

.item
    &:not(:last-of-type)
        margin-bottom: 12px
</style>
<style lang="sass">
.cart-enter-active, .cart-leave-active
    transition: transform .5s
.cart-enter, .cart-leave-active
    transform: translateX(100%)

.overlay-enter-active, .overlay-leave-active
    transition: opacity .5s
.overlay-enter, .overlay-leave-active
    opacity: 0
</style>
