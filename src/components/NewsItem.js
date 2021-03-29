import * as React from "react";
import logo from '../logo.svg';

export default class NewsItem extends React.Component {
    formatTime(time){
        const dt = new Date(time);
        const ds = (dt.toDateString());
        const h = (dt.getHours());
        const min = (dt.getMinutes() > 9 ? dt.getMinutes() : '0' + dt.getMinutes());
        return `${ds} @ ${h}:${min}`;
    }

    render() {
        return <a rel="noreferrer" href={this.props.article.url} target="_blank" className="newsItem">
            <span> score {this.props.article.score}</span>
            <img src={logo} alt="dummy" />
            <div className="text">
                <h2 className="newsTitle">{this.props.article.title}</h2>
                <p className="metaText"><i>Published, {this.formatTime(this.props.article.time)} by [{this.props.article.by}], karma {this.props.article.author.karma}</i></p>
            </div>
        </a>
    }
}
