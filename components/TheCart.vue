<template>
    <div>
        <transition name="overlay">
            <div
                @click.self="updateCartState(false)"
                v-show="opened"
                :class="$style.overlay"
                tabindex="0"
            ></div>
        </transition>
        <transition name="cart">
            <div
                v-show="opened"
                :class="[$style.cart, { [$style.sending]: sending }]"
                data-simplebar
            >
                <div :class="$style.top">
                    <h2 :class="$style.title">Корзина</h2>
                    <button
                        @click="updateCartState(false)"
                        :class="$style.close"
                    >
                        <svg
                            fill="none"
                            width="14"
                            height="14"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <use xlink:href="#close-icon" />
                        </svg>
                    </button>
                </div>

                <template v-if="quantity === 0">
                    <p>
                        Пока что вы&nbsp;ничего не&nbsp;добавили в&nbsp;корзину.
                    </p>
                    <button
                        @click="updateCartState(false)"
                        :class="$style.button"
                    >
                        Перейти к выбору
                    </button>
                </template>

                <template v-else>
                    <h3 :class="$style.subtitle">Товары в корзине</h3>
                    <transition-group
                        name="cartList"
                        tag="ul"
                        :class="$style.list"
                    >
                        <li
                            v-for="product in products"
                            :key="product.id"
                            :class="$style.item"
                        >
                            <cart-item :product="product" :key="product.id" />
                        </li>
                    </transition-group>
                    <h3 :class="$style.subtitle">Оформить заказ</h3>
                    <form @submit.prevent="submit" :class="$style.form">
                        <input
                            v-model="formData.name"
                            @blur="focusLost('name')"
                            :class="[
                                $style.input,
                                { [$style.invalid]: !validation.name }
                            ]"
                            type="text"
                            name="name"
                            placeholder="Ваше имя"
                        />
                        <input
                            v-model="formData.tel"
                            @blur="focusLost('tel')"
                            :class="[
                                $style.input,
                                { [$style.invalid]: !validation.tel }
                            ]"
                            type="tel"
                            name="tel"
                            placeholder="Телефон"
                        />
                        <input
                            v-model="formData.address"
                            @blur="focusLost('address')"
                            :class="[
                                $style.input,
                                { [$style.invalid]: !validation.address }
                            ]"
                            type="text"
                            name="address"
                            placeholder="Адрес"
                        />
                        <button
                            :class="$style.button"
                            type="submit"
                            :disabled="sending"
                        >
                            {{ sending ? 'Отправка' : 'Отправить' }}
                        </button>
                    </form>
                </template>

                <transition name="success">
                    <div
                        v-if="showSuccess"
                        @click="showSuccess = false"
                        :class="$style.success"
                    >
                        <div>
                            <img src="/ok-hand.png" />
                            <h3>Заявка успешно отправлена</h3>
                            <p>Вскоре наш менеджер свяжется с Вами</p>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartItem from './CartItem.vue'
import 'simplebar'
import '../node_modules/simplebar/dist/simplebar.css'

export default {
    components: { CartItem },
    name: 'TheCart',
    data() {
        return {
            blur: {
                name: false,
                tel: false,
                address: false
            },
            formData: {
                name: '',
                tel: '',
                address: ''
            },
            defFormData: {
                name: '',
                tel: '',
                address: ''
            },
            process: false,
            sending: false,
            showSuccess: false
        }
    },
    directives: {
        mask: {
            bind(el, binding) {
                el.value = '+7 ___ ___-__-__'
            }
        }
    },
    computed: {
        ...mapGetters({
            opened: 'applicationState/GET_CART_STATE',
            products: 'data/GET_CART_PRODUCTS',
            quantity: 'data/GET_CART_PRODUCTS_QUANTITY'
        }),
        validation() {
            return {
                name:
                    this.formData.name !== '' ||
                    (!this.blur.name && !this.process),
                tel:
                    this.formData.tel !== '' ||
                    (!this.blur.tel && !this.process),
                address:
                    this.formData.address !== '' ||
                    (!this.blur.address && !this.process)
            }
        },
        isValid() {
            return Object.keys(this.validation).every(key => {
                return this.validation[key]
            })
        }
    },
    methods: {
        // eslint-disable-next-line
        ...mapActions({
            updateCartState: 'applicationState/UPDATE_CART_STATE'
        }),
        submit() {
            this.process = true

            if (this.isValid) {
                // Симуляция отправки формы
                this.sending = true
                setTimeout(() => {
                    this.showSuccess = true
                    this.process = false
                    this.sending = false
                    this.resetForm()

                    setTimeout(() => {
                        this.showSuccess = false
                    }, 3000)
                }, 1500)
            }
        },
        focusLost(name) {
            this.blur[name] = true
        },
        resetForm() {
            this.formData = Object.assign({}, this.defFormData)
            Object.keys(this.blur).forEach(key => {
                this.blur[key] = false
            })
            this.$store.dispatch('data/UPDATE_CART', { action: 'reset' })
        }
    },
    created() {
        this.$store.dispatch('data/LOAD_LOCAL_CART')
    },
    mounted() {
        document.addEventListener('keyup', evt => {
            if (evt.keyCode === 27) {
                this.updateCartState(false)
            }
        })
    }
}
</script>

<style lang="sass" module>
@import '@/assets/sass/variables.sass'

.cart
    position: fixed
    top: 0
    right: 0
    bottom: 0
    width: 460px
    background-color: $white
    box-shadow: -4px 0px 16px rgba($black, 0.05)
    border-radius: 8px 0px 0px 8px
    padding: 52px 48px
    z-index: 500

.sending
    cursor: wait

.overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background-color: rgba($white, 0.8)
    z-index: 500

.top
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 24px

.title
    font-size: 32px
    line-height: 41px
    font-weight: 700

.close
    position: relative
    margin: 0
    padding: 0
    box-shadow: none
    -webkit-appearance: none
    border-radius: 0
    border: none
    cursor: pointer
    padding-right: 0
    color: inherit
    background-color: transparent
    transition: 0.3s
    &:hover
        color: $grey-light

.subtitle
    font-size: 18px
    line-height: 23px
    color: $grey
    margin-bottom: 16px

.list
    position: relative
    margin-bottom: 32px

.item
    &:not(:last-of-type)
        margin-bottom: 12px

.form
    font-size: 16px
    line-height: 21px

.input
    display: block
    width: 100%
    background-color: $grey-extra-light
    border-radius: 8px
    padding: 14px
    font-size: inherit
    color: inherit
    line-height: inherit
    border: none
    box-shadow: none
    transition: 0.3s
    &::placeholder
        color: $grey-light
    &:not(:last-of-type)
        margin-bottom: 16px

.invalid
    box-shadow: 0 0 0 2px $red

.button
    display: block
    width: 100%
    -webkit-appearance: none
    border: none
    box-shadow: none
    background-color: $black
    border-radius: 8px
    font-size: inherit
    color: $white
    line-height: inherit
    margin-top: 24px
    padding: 14px
    text-align: center
    cursor: pointer
    transition: background-color 0.3s
    &:hover
        background-color: $grey
    &:disabled
        opacity: 0.5
        pointer-events: none

.success
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: $white
    text-align: center
    img
        display: block
        max-width: 100%
        height: auto
        margin: 0 auto 24px
    h3
        font-size: 24px
        line-height: 31px
        color: #000
        margin-bottom: 2px
    p
        font-size: 16px
        line-height: 21px
        color: $grey
</style>
<style lang="sass">
@import '@/assets/sass/variables.sass'

.cart
    &-enter-active, &-leave-active
        transition: transform .5s
    &-enter, &-leave-active
        transform: translateX(100%)

.success, .overlay
    &-enter-active, &-leave-active
        transition: opacity .5s
    &-enter, &-leave-active
        opacity: 0

.cartList
    &-move
        transition: all 600ms ease-in-out 50ms
    &-enter-active
        transition: all 300ms ease-out

    &-leave-active
        position: absolute
        left: 0
        width: 100%
        transition: all 200ms ease-in
        opacity: 0
        z-index: 0

    &-enter, &-leave-to
        opacity: 0

    &-enter
        transform: translateY(10px)
        opacity: 0
</style>
