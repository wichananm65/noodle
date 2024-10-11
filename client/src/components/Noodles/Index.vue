<template>
    <div>
        <br>
        <div class="noodle-header">
            <h2>รายการบะหมี่</h2>
            <div class="input-group mb-3">
                <form>
                    <input type="text" v-model="search" placeholder="Search" class="form-control"
                        aria-label="search" aria-describedby="button-addon2">
                    <a v-on:click.prevent="setProduction(' ')" href="#">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Clear</button>
                    </a>
                </form>
            </div>
            <div>
                <ul class="categories">
                    <li v-for="cate in production" v-bind:key="cate.index">
                        <a v-on:click.prevent="setProduction(cate)" href="#">{{ cate }}</a>
                    </li>
                </ul>
                <div class="clearfix"></div>

                <strong>จำนวน noodle: </strong> {{ filteredNoodles.length }}
                <button v-on:click="navigateTo('/noodle/add')" class="btn btn-primary">Add</button>
            </div>
            <br>
        </div>

        <div v-if="filteredNoodles.length === 0 && loading === false" class="empty-noodle">
            *** ไม่มีข้อมูล ***
        </div>

        <div id="noodle-list-bottom">
            <div class="noodle-load-finished" v-if="noodles.length === filteredNoodles.length && filteredNoodles.length > 0 && loading === false">
                โหลดข้อมูลครบแล้ว
            </div>
        </div>
        <br>
        <transition-group name="fade">
            <div v-for="noodle in paginatedNoodles" v-bind:key="noodle.id" class="noodle-list">
                <div class="noodle-pic">
                    <div class="thumbnail-pic" v-if="noodle.thumbnail !== 'null'">
                        <img :src="BASE_URL + noodle.thumbnail" alt="thumbnail">
                    </div>
                </div>
                <h3>{{ noodle.brand }}</h3>
                <div v-html="noodle.taste.slice(0, 200) + '...'"></div>
                <div class="noodle-info">
                    <p><strong>ผลิตที่:</strong> {{ noodle.production }}</p>
                    <p><strong>Add:</strong> {{ noodle.addedAt }}</p>
                    <p>
                        <button v-on:click="navigateTo('/noodle/' + noodle.id)" class="btn btn-success">รายละเอียด</button>
                        <button v-on:click="navigateTo('/noodle/edit/' + noodle.id)" class="btn btn-warning">แก้ไข</button>
                        <button v-on:click="deleteNoodle(noodle)" class="btn btn-danger">ลบข้อมูล</button>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </transition-group>

        <div id="noodle-list-bottom">
            <div v-if="noodles.length === filteredNoodles.length && filteredNoodles.length > 0"></div>
        </div>

        <!-- Pagination Controls -->
        <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-info"><</button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="btn btn-info">></button>
        </div>
    </div>
</template>

<script>
import NoodlesService from '@/services/NoodlesService'
import _ from 'lodash'
import ScrollMonitor from 'scrollMonitor'

let LOAD_NUM = 3
let pageWatcher

export default {
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            noodles: [],
            search: '',
            results: [],
            production: [],
            loading: false,
            currentPage: 1,
            itemsPerPage: 5 // Set items per page to 5
        }
    },
    async created() {
        this.loading = true;
        this.results = (await NoodlesService.index()).data;
        this.noodles = this.results;
        this.production = [...new Set(this.results.map(noodle => noodle.production))];
        this.loading = false;
    },
    computed: {
        filteredNoodles() {
            if (this.search.trim() === '') {
                return this.noodles; // Return all noodles by default
            }
            return this.noodles.filter(noodle => {
                return noodle.brand.toLowerCase().includes(this.search.toLowerCase()) ||
                    noodle.taste.toLowerCase().includes(this.search.toLowerCase()) ||
                    noodle.production.toLowerCase().includes(this.search.toLowerCase());
            });
        },
        totalPages() {
            return Math.ceil(this.filteredNoodles.length / this.itemsPerPage);
        },
        paginatedNoodles() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredNoodles.slice(start, end);
        }
    },
    watch: {
        search: _.debounce(function (value) {
            this.currentPage = 1; // Reset to page 1 whenever the search changes
        }, 700)
    },
    methods: {
        setProduction(keyword) {
            if (keyword === ' ') {
                this.search = '';
                this.currentPage = 1;
            } else {
                this.search = keyword;
                this.currentPage = 1;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        appendResults() {
            if (this.noodles.length < this.results.length) {
                let toAppend = this.results.slice(this.noodles.length, LOAD_NUM + this.noodles.length);
                this.noodles = this.noodles.concat(toAppend);
            }
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        async deleteNoodle(noodle) {
            let result = confirm("Want to delete?");
            if (result) {
                try {
                    await NoodlesService.delete(noodle);
                    this.refreshData();
                } catch (err) {
                    console.log(err);
                }
            }
        },
        async refreshData() {
            this.results = (await NoodlesService.index()).data;
            this.noodles = this.results;
        }
    }
}
</script>

<style scoped>
.empty-noodle {
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

.noodle-info {
    float: left;
}

.noodle-pic {
    float: left;
}

.clearfix {
    clear: both;
}

.noodle-list {
    border: solid 1px #dfdfdf;
    margin-bottom: 10px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    padding: 5px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}

.noodle-header {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}

#noodle-list-bottom {
    padding-top: 4px;
}

.noodle-load-finished {
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

/* Pagination Styles */
.pagination-controls {
    text-align: center;
    margin-top: 20px;
}

button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Fade Transition Styles */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
