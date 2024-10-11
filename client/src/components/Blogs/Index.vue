<template>
    <div>
        <div class="blog-header">
            <h2>ส่วนจดัการบล็อก</h2>
            <div>
                <button v-on:click="navigateTo('/blog/create')">create blog</button>
                <strong> จํานวน blog: </strong> {{ blogs.length }}
            </div>
            <br>
        </div>
        <div v-if="blogs.length === 0" class="empty-blog">
            ***ไม่มีข้อมูล***
        </div>
        <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-list">
            <!-- <p>id: {{ blog.id }}</p> -->
            <div class="blog-pic">
                <transition name="fade">
                    <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
                        <img :src="BASE_URL + blog.thumbnail" alt="thumbnail">
                    </div>
                </transition>
            </div>
            <h3>{{ blog.title }}</h3>
            <div v-html="blog.content.slice(0, 200) + '...'"></div>
            <div class="blog-info">
                <p><strong>Category:</strong> {{ blog.category }}</p>
                <p><strong>Create:</strong> {{ blog.createdAt }}</p>
                <!-- <p>status: {{ blog.status }}</p> -->
                <p>
                    <button v-on:click="navigateTo('/blog/' + blog.id)">ดู blog</button>
                    <button v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
                    <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
                </p>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
    </div>
</template>
<script>
import BlogsService from '@/services/BlogsService'
export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            blogs: []
        }
    },
    async created() {
        this.blogs = (await BlogsService.index()).data
    },
    methods: {
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setBlog', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteBlog(blog) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await BlogsService.delete(blog)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.blogs = (await BlogsService.index()).data
        }
    }
}
</script>
<style scoped>
.empty-blog {
    width: 100%;
    text-align: center;
    padding: 10px;
    background: darksalmon;
    color: white;
}

/* thumbnail */
.thumbnail-pic img {
    width: 200px;
    padding: 5px 10px 0px 0px;
}

.blog-info {
    float: left;
}

.blog-pic {
    float: left;
}

.clearfix {
    clear: both;
}

.blog-list {
    border: solid 1px #dfdfdf;
    margin-bottom: 10px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}

.blog-header {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}
</style>