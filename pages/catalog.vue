<template>
    <div :class="$style.catalog">
        <the-sidebar :class="$style.sidebar" />
        <div>
            <catalog-filters :class="$style.filters" />
            <NuxtChild />
        </div>
    </div>
</template>
<script>
import TheSidebar from '@/components/TheSidebar.vue'
import CatalogFilters from '@/components/CatalogFilters.vue'

export default {
    name: 'Catalog',
    components: { TheSidebar, CatalogFilters }
}
</script>
<style lang="sass" module>
.catalog
    display: flex

.sidebar
    padding-top: 32px
    margin-right: 50px

.filters
    margin: 42px 0 34px
</style>
