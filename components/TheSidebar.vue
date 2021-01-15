<template>
    <aside>
        <h2 :class="$style.title">
            Каталог
        </h2>
        <nav>
            <ul :class="$style.categories">
                <li :class="$style.item">
                    <NuxtLink :class="$style.link" to="/catalog/1">Рюкзаки</NuxtLink>
                </li>
                <li :class="$style.item">
                    <NuxtLink :class="$style.link" to="/catalog/2">Футболки</NuxtLink>
                </li>
                <li :class="$style.item">
                    <NuxtLink :class="$style.link" to="/catalog/3">Рубашки</NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
export default {
    name: 'TheSidebar'
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
    transition: 0.3s
    &:hover
        color: $grey

.nuxt-link-active
    color: $black
    border-bottom: 1px solid currentColor
    pointer-events: none
</style>
