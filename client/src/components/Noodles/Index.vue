<template>
    <div>
        <div class="noodle-header">
            <h2>ส่วนจัดการบะหมี่</h2>
            <div>
                <form>
                    <input type="text" v-model="search" placeholder="Search">
                </form>
            </div>
            <div>
                <button v-on:click="navigateTo('/noodle/create')">Create noodle</button>
                <ul class="categories">
                    <li v-for="cate in production" v-bind:key="cate.index">
                        <a v-on:click.prevent="setProduction(cate)" href="#">{{ cate }}</a>
                    </li>
                    <li class="clear">
                        <a v-on:click.prevent="setProduction(' ')" href="#">Clear</a>
                    </li>
                </ul>
                <div class="clearfix"></div>

                <strong>จำนวน noodle: </strong> {{ filteredNoodles.length }}
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

        <transition-group name="fade">
            <div v-for="noodle in filteredNoodles" v-bind:key="noodle.id" class="noodle-list">
                <div class="noodle-pic">
                    <div class="thumbnail-pic" v-if="noodle.thumbnail !== 'null'">
                        <img :src="BASE_URL + noodle.thumbnail" alt="thumbnail">
                    </div>
                </div>
                <h3>{{ noodle.brand }}</h3>
                <div v-html="noodle.taste.slice(0, 200) + '...'"></div>
                <div class="noodle-info">
                    <p><strong>Production:</strong> {{ noodle.production }}</p>
                    <p><strong>Create:</strong> {{ noodle.createdAt }}</p>
                    <p>
                        <button v-on:click="navigateTo('/noodle/' + noodle.id)">ดู noodle</button>
                        <button v-on:click="navigateTo('/noodle/edit/' + noodle.id)">แก้ไข noodle</button>
                        <button v-on:click="deleteNoodle(noodle)">ลบข้อมูล</button>
                    </p>
                </div>
                <div class="clearfix"></div>
            </div>
        </transition-group>

        <div id="noodle-list-bottom">
            <div v-if="noodles.length === filteredNoodles.length && filteredNoodles.length > 0">
                โหลดข้อมูลครบแล้ว
            </div>
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
    updated() {
        let sens = document.querySelector('#noodle-list-bottom')
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
        }, 700),
        '$route.query.search': {
            immediate: true,
            async handler(value) {
                this.noodles = []
                this.results = []
                this.loading = true
                this.results = (await NoodlesService.index(value)).data
                this.appendResults()
                this.results.forEach(noodle => {
                    if (this.production.length > 0) {
                        if (this.production.indexOf(noodle.production) === -1) {
                            this.production.push(noodle.production)
                        }
                    } else {
                        this.production.push(noodle.production)
                    }
                })
                this.loading = false
                this.search = value
            }
        }
    },
    computed: {
        filteredNoodles() {
            if (this.search.trim() === '') {
                return this.results;
            }
            return this.results.filter(noodle => {
                return noodle.brand.toLowerCase().includes(this.search.toLowerCase()) ||
                    noodle.taste.toLowerCase().includes(this.search.toLowerCase()) ||
                    noodle.production.toLowerCase().includes(this.search.toLowerCase());
            });
        }
    },
    data() {
        return {
            BASE_URL: "http://localhost:8081/assets/uploads/",
            noodles: [],
            search: '',
            results: [],
            production: [],
            loading: false
        }
    },
    methods: {
        setProduction(keyword) {
            if (keyword === ' ') {
                this.search = ''
                console.log('clear search')
            } else {
                this.search = keyword
            }
        },
        appendResults() {
            if (this.noodles.length < this.results.length) {
                let toAppend = this.results.slice(
                    this.noodles.length,
                    LOAD_NUM + this.noodles.length
                )
                this.noodles = this.noodles.concat(toAppend)
            }
        },
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteNoodle(noodle) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await NoodlesService.delete(noodle)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async refreshData() {
            this.noodles = (await NoodlesService.index()).data
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
</style>
