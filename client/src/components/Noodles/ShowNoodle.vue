<template>
    <div>
        <h1> -</h1>

        <div class="container">
            <!-- Display Thumbnail -->
        <div class="noodle-pic">
            <div class="thumbnail-pic" v-if="noodle.thumbnail !== 'null'">
                <img :src="BASE_URL + noodle.thumbnail" alt="thumbnail">
            </div>
        </div>

        <!-- Noodle Information -->
        <p>id: {{ noodle.id }}</p>
        <p>ยี่ห้อ: {{ noodle.brand }}</p>
        <p>รสชาติ: {{ noodle.taste }}</p>
        <p>ผลิตที่: {{ noodle.production }}</p>
        <p>
            <button v-on:click="navigateTo('/noodle/edit/'+ noodle.id)">แก้ไข noodle</button>
            <button v-on:click="navigateTo('/noodles')">กลับ </button>
        </p>
        </div>

    </div>
</template>

<script>
    import NoodlesService from '@/services/NoodlesService'

    export default {
        data() {
            return {
                noodle: null,
                BASE_URL: "http://localhost:8081/assets/uploads/" // Add the base URL here
            }
        },
        async created() {
            try {
                let noodleId = this.$route.params.noodleId
                this.noodle = (await NoodlesService.show(noodleId)).data
            } catch (error) {
                console.log(error)
            }
        },
        methods: {
            navigateTo(route) {
                this.$router.push(route)
            }
        }
    }
</script>

<style scoped>
.thumbnail-pic img {
    width: 200px;
    padding: 5px 10px 0px 0px;
}
.noodle-pic {
    margin-bottom: 20px;
}
</style>
