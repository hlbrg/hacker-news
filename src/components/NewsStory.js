import * as React from "react";
import logo from '../logo.svg';

export default class NewsStory extends React.Component {
    formatTime(time){
        const dt = new Date(time);
        const ds = (dt.toDateString());
        const h = (dt.getHours());
        const min = (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes());
        return `${ds} @ ${h}:${min}`;
    }

    render() {
        return <a rel="noreferrer" href={this.props.story.url} target="_blank" className="newsItem">
            <span> score {this.props.story.score}</span>
            <img src={logo} alt="dummy" />
            <div className="text">
                <h2 className="newsTitle">{this.props.story.title}</h2>
                <p className="metaText"><i>Published, {this.formatTime(this.props.story.time)} by [{this.props.story.by}], karma {this.props.story.author.karma}</i></p>
            </div>
        </a>
    }
}
