<template>
    <div :class="$style.wrapper" ref="wrapper">
        <button @click="active = !active" :class="$style.button">
            <h3>Сортировать по:</h3>
            <span>{{ currentSort }}</span>
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
        <transition name="filter">
            <ul v-if="active" :class="$style.drop">
                <li v-for="(option, i) in options" :key="i" :class="$style.item">
                    <label :class="$style.option">
                        <input
                            v-model="sort"
                            type="radio"
                            name="sort"
                            :value="option.value"
                        />
                        <span>{{ option.name }}</span>
                    </label>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'CatalogFiltersSort',
    data() {
        return {
            active: false,
            options: [
                {
                    name: 'По цене',
                    value: 'price'
                },
                {
                    name: 'По популярности',
                    value: 'rating'
                }
            ]
        }
    },
    computed: {
        currentSort() {
            return this.options.filter(option => option.value === this.sort)[0]
                .name
        },
        sort: {
            get() {
                return this.$store.getters['data/GET_SORT_BY']
            },
            set(value) {
                this.updateSortBy(value)
            }
        }
    },
    methods: {
        ...mapActions({
            updateSortBy: 'data/UPDATE_SORT_BY'
        })
    },
    mounted() {
        document.addEventListener('keyup', evt => {
            if (evt.keyCode === 27) {
                this.active = false
            }
        })
        document.addEventListener('click', evt => {
            if (!evt.target.closest(`.${this.$style.wrapper}`)) {
                this.active = false
            }
        })
    },
    watch: {
        sort() {
            this.active = false
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
    input
        position: absolute
        width: 1px
        height: 1px
        overflow: hidden
        clip: rect(0 0 0 0)
        &:checked
            & + span
                color: $black
                background-color: $grey-extra-light
                cursor: default
    span
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
<style lang="sass">
.filter
    &-enter-active, &-leave-active
        transition: .5s
    &-enter, &-leave-active
        transform: translateY(-10px)
        opacity: 0
</style>
