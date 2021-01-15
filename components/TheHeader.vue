<template>
    <header :class="$style.header">
        <div :class="commonStyles.container">
            <div :class="$style.inner">
                <NuxtLink :class="$style.title" to="/">
                    TestList
                </NuxtLink>
                <button :class="$style.button" aria-label="Корзина">
                    <svg
                        fill="none"
                        width="24"
                        height="27"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <use xlink:href="#cart-icon" />
                    </svg>
                    <div :class="$style.icon">
                        3
                    </div>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import commonStyles from '@/assets/sass/common.sass?module'
export default {
    name: 'TheHeader',
    data () {
        return {
            commonStyles
        }
    }
}
</script>
<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.header
    background-color: $white
    border-radius: 0 0 8px 8px
    box-shadow: 0px 4px 16px rgba($black, 0.05)

.inner
    display: flex
    align-items: center
    justify-content: space-between
    min-height: 66px

.title
    font-size: 22px
    line-height: 1
    color: $grey
    font-weight: 700
    text-decoration: none
    transition: color 0.3s
    &:hover
        color: $grey-light
        text-decoration: none

.button
    display: block
    position: relative
    padding: 0
    margin: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding: 16px
    color: inherit
    background-color: transparent
    transition: 0.3s
    &:hover
        color: $grey-light

.icon
    position: absolute
    top: 10px
    right: 10px
    width: 12px
    line-height: 12px
    border-radius: 50%
    background-color: $grey-light
    color: $white
    font-size: 8px
    font-weight: 700
    text-align: center
</style>
