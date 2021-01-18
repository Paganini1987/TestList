<template>
    <article :class="$style.card">
        <div :class="$style.image">
            <picture>
                <source
                    :srcset="
                        'https://frontend-test.idaproject.com' + product.photo
                    "
                >
                <img
                    v-lazy="
                        'https://frontend-test.idaproject.com' + product.photo
                    "
                    :alt="product.name"
                >
            </picture>
        </div>
        <card-rating
            :key="product.id"
            :class="$style.rating"
            :value="product.rating"
        />
        <button
            :class="[$style.button, { [$style.inCart]: inCart }]"
            aria-label="Добавить в корзину"
            @click="addToCart"
        >
            <svg
                fill="none"
                width="12"
                height="13"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <use xlink:href="#cart-icon" />
            </svg>
        </button>
        <div :class="$style.footer">
            <h3 :class="$style.name">
                {{ product.name }}
            </h3>
            <h4 :class="$style.price">
                {{ product.price | priceFormat }}
            </h4>
        </div>
    </article>
</template>

<script>
import { mapGetters } from 'vuex'
import CardRating from './CardRating.vue'
import priceFromat from '@/mixins/priceFormat'
export default {
    name: 'ProductCard',
    components: { CardRating },
    mixins: [priceFromat],
    props: {
        product: {
            type: Object,
            reqired: true,
            default: () => {}
        }
    },
    computed: {
        ...mapGetters({
            products: 'data/GET_CART_PRODUCTS'
        }),
        inCart() {
            return this.products.some(p => +p.id === +this.product.id)
        }
    },
    methods: {
        addToCart() {
            this.$store.dispatch('data/UPDATE_CART', {
                product: this.product,
                action: 'add'
            })
        }
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.card
    position: relative
    display: flex
    flex-direction: column
    background-color: $white
    box-shadow: 0px 4px 16px rgba($black, 0.05)
    border-radius: 8px
    font-size: 14px
    line-height: 18px
    padding-top: 18px
    height: 100%

.image
    position: relative
    margin-bottom: 16px
    &::before
        content: ''
        display: block
        padding-top: 75%
    img
        display: block
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: contain

.footer
    flex-grow: 1
    display: flex
    flex-direction: column
    justify-content: flex-end
    padding: 0 16px 16px

.name
    flex-grow: 1
    color: $grey
    margin-bottom: 6px

.price
    font-weight: 700
    white-space: nowrap

.rating
    position: absolute
    top: 20px
    left: 20px

.button
    position: absolute
    top: 0px
    right: 0px
    margin: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding: 18px
    color: $grey-light
    background-color: transparent
    transition: 0.3s
    &:hover
        color: $black

.inCart
    color: $black
    cursor: default
</style>
