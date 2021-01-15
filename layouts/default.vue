<template>
    <div>
        <the-header />
        <div :class="commonStyles.container">
            <nuxt />
        </div>
        <the-sprites />
    </div>
</template>
<script>
import TheHeader from '@/components/TheHeader'
import TheSprites from '@/components/TheSprites'
import commonStyles from '@/assets/sass/common.sass?module'
export default {
    components: { TheHeader, TheSprites },
    data () {
        return {
            commonStyles
        }
    }
}
</script>
