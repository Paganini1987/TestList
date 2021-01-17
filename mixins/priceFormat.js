export default {
    filters: {
        priceFormat(value) {
            return (
                value
                    .toString()
                    .replace(/\D/g, '')
                    .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/g, ' ') + ' ₽'
            )
        }
    }
}
