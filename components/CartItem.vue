<template>
    <article :class="$style.item">
        <div :class="$style.image">
            <picture>
                <source
                    :srcset="'https://frontend-test.idaproject.com' + product.photo"
                />
                <img
                    :src="'https://frontend-test.idaproject.com' + product.photo"
                    :alt="product.name"
                />
            </picture>
        </div>
        <h3 :class="$style.name">{{ product.name }}</h3>
        <h4 :class="$style.price">{{ product.price | priceFormat }}</h4>
        <card-rating :class="$style.rating" :value="product.rating" />
        <button @click="removeFromCart" :class="$style.button">
            <svg
                fill="none"
                width="20"
                height="22"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <use xlink:href="#remove-icon" />
            </svg>
        </button>
    </article>
</template>

<script>
import CardRating from './CardRating.vue'
import priceFromat from '@/mixins/priceFormat'
export default {
    components: { CardRating },
    name: 'CartItem',
    props: {
        product: {
            type: Object,
            reqired: true
        }
    },
    mixins: [priceFromat],
    methods: {
        removeFromCart() {
            this.$store.dispatch('data/UPDATE_CART', { product: this.product, action: 'remove' })
        }
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.item
    display: grid
    width: 100%
    grid-template-columns: 70px 1fr min-content
    background: $white
    box-shadow: 0px 4px 16px rgba($black, 0.05)
    border-radius: 8px
    font-size: 14px
    line-height: 18px
    padding: 15px 22px
    column-gap: 34px

.image
    position: relative
    width: 100%
    grid-row: 1 / 4
    grid-column: 1
    &:before
        content: ''
        display: block
        padding-top: 60%
    img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: contain

.name
    color: $grey
    margin-bottom: 6px
    grid-row: 1
    grid-column: 2

.price
    font-weight: 700
    grid-row: 2
    grid-column: 2
    margin-bottom: 16px

.rating
    grid-row: 3
    grid-column: 2

.button
    display: block
    padding: 0
    margin: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    color: $grey-light
    background-color: transparent
    grid-row: 1 / 4
    grid-column: 3
    align-self: center
    transition: 0.3s
    &:hover
        color: $black
</style>
