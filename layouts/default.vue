<template>
    <div :class="$style.layout">
        <the-header />
        <div :class="[commonStyles.container, $style.content]">
            <nuxt />
        </div>
        <client-only>
            <the-cart />
        </client-only>
        <the-sprites />
    </div>
</template>
<script>
import TheHeader from '@/components/TheHeader'
import TheSprites from '@/components/TheSprites'
import commonStyles from '@/assets/sass/common.sass?module'
import TheCart from '@/components/TheCart.vue'
export default {
    components: { TheHeader, TheSprites, TheCart },
    data () {
        return {
            commonStyles
        }
    }
}
</script>

<style lang="sass" module>
.layout
    display: flex
    flex-direction: column
    min-height: 100vh

.content
    display: flex
    flex-direction: column
    flex-grow: 1
</style>
