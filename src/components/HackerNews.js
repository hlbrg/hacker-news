import * as React from "react";
import NewsItem from "./NewsItem";

const FIRST_500_STORIES_API_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const STORY_URL = "https://hacker-news.firebaseio.com/v0/item/";//${id}.json";
const AUTHOR_URL = "https://hacker-news.firebaseio.com/v0/user/";//${id}.json";
const ARTICLE_COUNT = 10;

export default class HackerNews extends React.Component {
    articleCount;
    articleList = [];

    constructor(props) {
        super(props);
        this.state = {
            articleComponents:[]
        }
    }

    getRandomBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    getArticleIds(ids) {
        if (!ids) return [];
        let selectedArray = [];
        for (let i = 0; i < this.articleCount; i++){
            selectedArray.push(ids[this.getRandomBetween(0, ids.length - 1)])
        }
        return selectedArray;
    }

    updateState() {
        this.setState({
            articleComponents: this.articleList.map((article) =>
                <NewsItem key={article.id} article={article}/>
            )
        })
    }

    onAuthor(article, author) {
        article.author = author
        this.articleList.push(article)
        this.articleList.sort(this.sortArticles)
        this.updateState();
    }

    getAuthor(article) {
        if (!article) return
        fetch(AUTHOR_URL + article.by + ".json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.onAuthor(article, result)
                },
                (error) => {
                    console.log("result error ", error)
                }
            )
    }

    sortArticles(a, b) {
        return a.score === b.score ? 0 : (a.score > b.score ? 1 : -1 );
    }

    loadArticles(ids) {
        let articleIds = this.getArticleIds(ids)
        for (let articleIndex = 0; articleIndex < articleIds.length; articleIndex++)
            fetch(STORY_URL + articleIds[articleIndex] + ".json")
                .then(res => res.json())
                .then(
                    (result) => {
                        this.getAuthor(result)
                    },
                    (error) => {
                        console.log("result error ", error)
                    }
                )
    }

    componentDidMount() {
        this.articleCount = (this.props.config && this.props.config.articleCount) || ARTICLE_COUNT
        fetch(FIRST_500_STORIES_API_URL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.loadArticles(result)
                },
                (error) => {
                    console.log("result error ", error)
                }
            )
    }

    render() {
        return <div className="content">
            <h1 className="mainTitle">Top Hacker News stories!</h1>
            {this.state.articleComponents}
        </div>;
    }
}
