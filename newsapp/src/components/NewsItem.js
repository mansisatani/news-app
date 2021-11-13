import React, { Component } from 'react'

export default class NewsItem extends Component {

render() {

let {title,description,imageUrl,newsUrl,author,date,source} = this.props;

        return (
            <div className="my-3">
                <div className="card">
            <div style={{
                display : "flex",
                justifyContent : "flex-end",
                position : "absolute",
                right : "0"
            }}>

            
                <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={!imageUrl ? "https://i.ytimg.com/vi/LRQra4nL14I/hqdefault.jpg" : imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a rel= "noreferrer" target="_blank" href={newsUrl} className="btn btn-sm btn-dark">read more</a>
                </div>
            </div>
            </div>
        )
    }
}
