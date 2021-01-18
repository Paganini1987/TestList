<template>
    <ul :class="$style.filters">
        <li>
            <catalog-filters-sort />
        </li>
    </ul>
</template>

<script>
import CatalogFiltersSort from './CatalogFiltersSort.vue'
export default {
    name: 'CatalogFilters',
    components: { CatalogFiltersSort }
}
</script>

<style lang="sass" module>
.filters
    display: flex
    align-items: center
    justify-content: flex-end
</style>
