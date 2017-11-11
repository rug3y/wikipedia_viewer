<template>
    <div>
        <div id="random"><a v-bind:href="random_article" target="_blank">Click here for a random article</a></div>
        <div><input v-model="search" type="text" v-on:keyup.enter="searchArticles" placeholder="Search for articles"></input></div>

        <!-- <p v-model="article_list">{{article_list}}</p> -->

        <div v-for="item in article_list">
            <a class="article-link" :href="url + item.pageid" target="_blank">
                <div class="article-extract">
                    <h3>{{ item.title }}</h3>
                    <p>"{{ item.extract }}"</p>
                </div>
            </a>
        </div>


    </div>
</template>

<script>
const vm = this;
export default {
    name: 'WikiViewer',
    data() {
        return {
            random_article: "https://en.wikipedia.org/wiki/Special:Random",
            article_list: [],
            search: "",
            url: "http://en.wikipedia.org?curid="
        }
    },
    methods: {
        searchArticles() {
            const vm = this
            vm.$http.get('https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+vm.search, {
                headers: {
                    'Api-User-Agent': 'FCCWikipediaViewer/0.1 (https://github.com/rug3y)'
                }
            })
            .then(function(response) {
                console.log(response.data.query)
                vm.article_list = response.data.query.pages
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }
}
</script>

<style>
body {
    background-color: #262626;
}

#random {
    margin-bottom: 2em;
}

#random a {
    font-size: 2em;
    color: white;
}

input {
    margin-bottom: 20px;
}

.article-link {
    color:#262626;
}

.article-extract {
    display: inline-block;
    width: 80%;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    background-color: white;
    padding: 5px 10px 5px 10px;
}
</style>