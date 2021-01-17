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
    components: { TheSidebar, CatalogFilters },
    async asyncData({ store, error }) {
        try {
            await store.dispatch('data/LOAD_CATEGORIES_LIST')
        } catch (err) {
            console.log(err)
            return error({
                statusCode: 404,
                message: 'Сервер не доступен'
            })
        }
    }
}
</script>
<style lang="sass" module>
.catalog
    display: flex

.sidebar
    flex-shrink: 0
    max-width: 20%
    padding-top: 32px
    margin-right: 50px

.filters
    margin: 42px 0 34px
</style>
