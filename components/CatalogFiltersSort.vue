<template>
    <div :class="$style.wrapper">
        <button @click="active = !active" :class="$style.button">
            <h3>Сортировать по:</h3>
            <span>цене</span>
            <svg
                fill="none"
                width="5"
                height="3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
            >
                <use xlink:href="#arrow-icon" />
            </svg>
        </button>
        <ul v-if="active" :class="$style.drop">
            <li :class="$style.item">
                <button :class="$style.option">
                    По цене
                </button>
            </li>
            <li :class="$style.item">
                <button :class="$style.option">
                    По популярности
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CatalogFiltersSort',
    data () {
        return {
            active: false
        }
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.wrapper
    position: relative

.button
    display: flex
    align-items: center
    padding: 0
    margin: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding: 6px
    color: inherit
    background-color: transparent
    font-size: 16px
    line-height: 21px
    span
        color: $grey
        margin-left: 6px
        margin-right: 4px

.drop
    position: absolute
    top: 100%
    left: 0
    width: 100%
    background-color: $white
    box-shadow: 0px 4px 16px rgba($black, 0.05)
    border-radius: 8px
    padding: 8px 0
    font-size: 14px
    line-height: 18px
    color: $grey-light
    z-index: 10

.option
    display: block
    width: 100%
    padding: 4px 12px
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    background-color: transparent
    font-size: inherit
    line-height: inherit
    color: inherit
    text-align: left
    margin: 0
    transition: 0.3s
    &:hover
        color: $black
        background-color: $grey-extra-light
</style>
