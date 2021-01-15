<template>
    <div>
        <the-header />
        <div :class="commonStyles.container">
            <nuxt />
        </div>
        <the-cart />
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
