<template>
    <article :class="$style.card">
        <div :class="$style.image">
            <picture>
                <source
                    srcset="https://frontend-test.idaproject.com/upload/product/backpack0-6b2b.pa1mgx.jpg"
                />
                <img
                    src="https://frontend-test.idaproject.com/upload/product/backpack0-6b2b.pa1mgx.jpg"
                    alt="Рюкзак Louis Vuitton Discovery"
                />
            </picture>
        </div>
        <product-card-rating :class="$style.rating" :value="4" />
        <button :class="$style.button" aria-label="Добавить в корзину">
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
            <h3 :class="$style.name">Рюкзак Louis Vuitton Discovery</h3>
            <h4 :class="$style.price">150 000 ₽</h4>
        </div>
    </article>
</template>

<script>
import ProductCardRating from './ProductCardRating.vue'
export default {
    components: { ProductCardRating },
    name: 'ProductCard'
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.card
    position: relative
    background-color: $white
    box-shadow: 0px 4px 16px rgba($black, 0.05)
    border-radius: 8px
    font-size: 14px
    line-height: 18px
    padding-top: 18px

.image
    position: relative
    &::before
        content: ''
        display: block
        padding-top: 60%
    img
        display: block
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: contain

.footer
    padding: 0 16px 16px

.name
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
    padding: 0
    margin: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding: 18px
    color: inherit
    background-color: transparent
    transition: 0.3s
    &:hover
        color: $grey-light
</style>
