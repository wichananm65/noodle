<template>
    <div>
        <div class="blog-header">
            <h2>ส่วนจัดการบลอ็ก</h2>
            <div>
                <form>
                    <input type="text" v-model="search" placeholder="Search">
                </form>
            </div>
            <div>
                <button v-on:click="navigateTo('/blog/create')">Create blog</button>
                <ul class="categories">
                    <li v-for="cate in category" v-bind:key="cate.index">
                        <a v-on:click.prevent="setCategory(cate)" href="#">{{ cate }}</a>
                    </li>
                    <li class="clear">
                        <a v-on:click.prevent="setCategory(' ')" href="#">Clear</a>
                    </li>
                </ul>
                <div class="clearfix"></div>

                <strong>จำนวน blog: </strong> {{ filteredBlogs.length }}
            </div>
            <br>
        </div>

        <div v-if="filteredBlogs.length === 0 && loading === false" class="empty-blog">
            *** ไม่มีข้อมูล ***
        </div>

        <div id="blog-list-bottom">
            <div class="blog-load-finished" v-if="blogs.length === filteredBlogs.length && filteredBlogs.length > 0 && loading === false">
                โหลดข้อมูลครบแล้ว
            </div>
        </div>

        <transition-group name="fade">
            <div v-for="blog in filteredBlogs" v-bind:key="blog.id" class="blog-list">
                <div class="blog-pic">
                    <div class="thumbnail-pic" v-if="blog.thumbnail !== 'null'">
                        <img :src="BASE_URL + blog.thumbnail" alt="thumbnail">
                    </div>
                </div>
                <h3>{{ blog.title }}</h3>
                <div v-html="blog.content.slice(0, 200) + '...'"></div>
                <div class="blog-info">
                    <p><strong>Category:</strong> {{ blog.category }}</p>
                    <p><strong>Create:</strong> {{ blog.createdAt }}</p>
                    <p>
                        <button v-on:click="navigateTo('/blog/' + blog.id)">ดู blog</button>
                        <button v-on:click="navigateTo('/blog/edit/' + blog.id)">แก้ไข blog</button>
                        <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </transition-group>

        <div id="blog-list-bottom">
            <div v-if="blogs.length === filteredBlogs.length && filteredBlogs.length > 0">
                โหลดข้อมูลครบแล้ว
            </div>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'
import _ from 'lodash'
import ScrollMonitor from 'scrollMonitor'

let LOAD_NUM = 3
let pageWatcher

export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            blogs: [],
            search: '',
            results: [],
            category: [],
            loading: false
        }
    },
    async created() {
        // Fetch all blogs when the component is created
        this.loading = true;
        this.results = (await BlogsService.index()).data;
        this.blogs = this.results; // Set blogs to show all by default
        this.category = [...new Set(this.results.map(blog => blog.category))]; // Unique categories
        this.loading = false;
    },
    updated() {
        let sens = document.querySelector('#blog-list-bottom')
        pageWatcher = ScrollMonitor.create(sens)
        pageWatcher.enterViewport(this.appendResults)
    },
    beforeUpdated() {
        if (pageWatcher) {
            pageWatcher.destroy()
            pageWatcher = null
        }
    },
    watch: {
        search: _.debounce(function (value) {
            // Filtering happens in the computed property
            console.log('search: ' + value)
        }, 700)
    },
    computed: {
        filteredBlogs() {
            if (this.search.trim() === '') {
                return this.blogs; // Return all blogs by default
            }
            return this.blogs.filter(blog => {
                return blog.title.toLowerCase().includes(this.search.toLowerCase()) ||
                    blog.content.toLowerCase().includes(this.search.toLowerCase()) ||
                    blog.category.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    methods: {
        setCategory(keyword) {
            if (keyword === ' ') {
                this.search = ''
                console.log('clear search')
            } else {
                this.search = keyword
            }
        },
        appendResults() {
            if (this.blogs.length < this.results.length) {
                let toAppend = this.results.slice(
                    this.blogs.length,
                    LOAD_NUM + this.blogs.length
                )
                this.blogs = this.blogs.concat(toAppend)
            }
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
            this.results = (await BlogsService.index()).data;
            this.blogs = this.results; // Refresh blogs to show all
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

#blog-list-bottom {
    padding-top: 4px;
}

.blog-load-finished {
    padding: 4px;
    text-align: center;
    background: seagreen;
    color: white;
}

.categories {
    padding: 0;
    list-style: none;
    float: left;
}

.categories li {
    float: left;
    padding: 2px;
}

.categories li a {
    padding: 5px 10px;
    background: paleturquoise;
    color: black;
    text-decoration: none;
}

.categories li.clear a {
    background: tomato;
    color: white;
}
</style>
