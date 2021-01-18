<template>
    <aside>
        <h2 :class="$style.title">
            Каталог
        </h2>
        <nav>
            <ul :class="$style.categories">
                <li
                    v-for="category in categories"
                    :key="category.id"
                    :class="$style.item"
                >
                    <NuxtLink
                        :class="$style.link"
                        :active-class="$style.active"
                        :to="'/catalog/' + category.id"
                    >
                        {{ category.name }}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'TheSidebar',
    computed: {
        ...mapGetters({
            categories: 'data/GET_CATEGORIES_LIST'
        })
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.title
    font-size: 32px
    font-weight: 700
    line-height: 1
    margin-bottom: 24px

.item
    &:not(:last-of-type)
        margin-bottom: 16px

.link
    font-size: 16px
    line-height: 20px
    color: $grey-light
    text-decoration: none
    border-bottom: 1px solid transparent
    white-space: nowrap
    transition: 0.3s
    &:hover
        color: $grey

.active
    color: $black
    border-color: currentColor
    pointer-events: none
</style>
