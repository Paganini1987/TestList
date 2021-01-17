<template>
    <section :class="$style.section">
        <h1>Страница не найдена</h1>
        <NuxtLink to="/">На главную</NuxtLink>
    </section>
</template>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.section
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    flex-grow: 1
    h1
        font-size: 32px
        line-height: 41px
        margin-bottom: 10px
        font-weight: 700
    a
        font-size: 16px
        line-height: 21px
        color: $grey
        text-decoration: underline

</style>
