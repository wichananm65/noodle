<template>
    <div>
        <h1>Show Noodle</h1>
        <p>id: {{ noodle.id }}</p>
        <p>brand: {{ noodle.brand }}</p>
        <p>taste: {{ noodle.taste }}</p>
        <p>production: {{ noodle.production }}</p>
        <p>
        <button v-on:click="navigateTo('/noodle/edit/' + noodle.id)">แก้ไข noodle</button>
        <button v-on:click="navigateTo('/noodles')">กลับ</button>
        </p>
    </div>
</template>

<script>
    import NoodlesService from '@/services/NoodlesService'
    export default {
        data () {
            return {
                noodle: null
            }
        },
        async created () {
            try {
                let noodleId = this.$route.params.noodleId
                this.noodle = (await NoodlesService.show(noodleId)).data
            } catch (error) {
                console.log (error)
            }
        },
        methods : {
            navigateTo (route) {
                this.$router.push(route)
            },
        }
    }
</script>

<style scoped>
</style>
