import * as React from "react";
import NewsStory from "./NewsStory";

export default class HackerNews extends React.Component{
    completeStories = [];

    constructor(props){
      super(props)
      this.state = { topStories: []}
    }

    //Returns number between 0 and length of ids array
    getRandomBetween(min, max){
      return Math.floor(Math.random() * max) + min;
    }

    //Returns array of ten random story ids
    getRandomStories(ids) {
      if (!ids) return [];
      let selectedRandomStories = [];

      for(let i = 0; i < 10; i++){
          selectedRandomStories.push(ids[this.getRandomBetween(0, ids.length -1)])
      }

      return selectedRandomStories;
    }

    //Sorts stories array by score ascending
    sortStories(a, b) {
        return a.score === b.score ? 0 : (a.score > b.score ? 1 : -1 );
    }

    getStories(allStoryIds){
        let selectedStories;
        if (!allStoryIds) return;

        selectedStories = this.getRandomStories(allStoryIds)
        for(let i = 0; i < selectedStories.length; i++){
            fetch(`https://hacker-news.firebaseio.com/v0/item/${selectedStories[i]}.json`)
            .then(response => response.json())
            .then(story => {
                this.getAuthor(story)
            })
        }
    }

    getAuthor(story){
        if (!story) return;

        fetch(`https://hacker-news.firebaseio.com/v0/user/${story.by}.json`)
        .then(response => response.json())
        .then(author => {
            story.author = author;
            this.completeStories.push(story)
            this.completeStories.sort(this.sortStories)
            this.setState({
                topStories: this.completeStories
            })
        })
    }

    componentDidMount(){
      fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(response => response.json())
      .then(allStoryIds => {
        this.getStories(allStoryIds)
      })
    }

    render(){
      return(
          <div className="content">
            <h1 className="mainTitle">Top Hacker News stories!</h1>
            <div className="topStories">
                {this.state.topStories.map(story =>
                    <NewsStory key={story.id} story={story} />
                )}
            </div>
          </div>
      )
    }
  }
