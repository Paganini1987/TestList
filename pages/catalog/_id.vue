<template>
    <div>
        <transition-group name="list" tag="ul" :class="$style.list">
            <li
                v-for="product in sortedProducts"
                :key="product.id"
                v-position
                :class="$style.item"
            >
                <product-card :key="product.id" :product="product" />
            </li>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/ProductCard.vue'
export default {
    name: 'Category',
    components: { ProductCard },
    directives: {
        position: {
            inserted(el) {
                el.style.top = el.offsetTop + 'px'
                el.style.left = el.offsetLeft - 10 + 'px'
            }
        }
    },
    async validate({ params, store }) {
        const categories = await store.dispatch('data/LOAD_CATEGORIES_LIST')
        return categories.some(category => category.id === +params.id)
    },
    async asyncData({ store, params, error }) {
        let products

        try {
            products = await store.dispatch(
                'data/LOAD_PRODUCTS_LIST',
                params.id
            )
        } catch (err) {
            console.log(err)
            return error({
                statusCode: 404,
                message: 'Сервер не доступен'
            })
        }

        return { products }
    },
    computed: {
        ...mapGetters({
            sortBy: 'data/GET_SORT_BY'
        }),
        sortedProducts() {
            return [...this.products].sort(
                (a, b) => a[this.sortBy] - b[this.sortBy]
            )
        }
    }
}
</script>

<style lang="sass" module>
.list
    position: relative
    display: flex
    flex-wrap: wrap
    min-width: 100%
    margin: 0 -8px

.item
    width: calc(25% - 16px)
    margin: 8px

@media (max-width: 1023px)
    .item
        width: calc(33% - 16px)
        margin: 8px

@media (max-width: 767px)
    .item
        width: calc(50% - 16px)
        margin: 8px

</style>
<style lang="sass">
.list
    &-move
        transition: all 600ms ease-in-out 50ms
    &-enter-active
        transition: all 300ms ease-out

    &-leave-active
        position: absolute
        transition: all 200ms ease-in
        opacity: 0
        z-index: 0

    &-enter, &-leave-to
        opacity: 0

    &-enter
        transform: scale(0.9)
</style>
