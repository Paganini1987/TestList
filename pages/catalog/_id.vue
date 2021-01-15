<template>
    <div>
        <!-- <h3>Category {{ this.$route.params.id }}</h3> -->
        <ul :class="$style.list">
            <li v-for="i in 12" :key="i" :class="$style.item">
                <product-card />
            </li>
        </ul>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
    name: 'Category',
    components: { ProductCard }
}
</script>

<style lang="sass" module>
.list
    display: flex
    flex-wrap: wrap
    min-width: 100%
    margin: 0 -8px

.item
    width: calc(25% - 16px)
    margin: 8px
</style>
