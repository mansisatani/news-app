import React, { Component } from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import  PropTypes  from 'prop-types';
import InfinitScroll from 'react-infinite-scroll-component'

export default class News extends Component {

    static defaultProps={
        country : "in",
        pageSize : 8,
        category: "science"
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

        constructor(props){
            super(props);
            this.state = {
                articles: [],
                loading: true,
                page: 1,
                totalResults: 0
            }
            document.title = `${this.capitalizeFirstLetter(this.props.category)}-newsMonkey`
        }

async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
        articles: parsedData.articles ,
        totalResults: parsedData.totalResults,
        loading:false
    })
    this.props.setProgress(100);
}

async componentDidMount(){
// console.log("cdm");
this.updateNews()

}

// handlePrevious= async ()=>{
//     console.log("previous");
//     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=7122767105a44a6eb355302a829fd6a6&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
//     // this.setState({loading:true});
//     // let data = await fetch(url);
//     // let parsedData = await data.json()
//     // console.log(parsedData);

//     // this.setState({
//     //     page: this.state.page - 1,
//     //     articles: parsedData.articles,
//     //     loading:false
//     // })

//     this.setState({page: this.state.page - 1});
//     this.updateNews()
// }

// handleNext= async ()=>{
//     console.log("next");

//     // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){

//     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&&apikey=7122767105a44a6eb355302a829fd6a6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
//     //     this.setState({loading:true});
//     //     let data = await fetch(url);
//     //     let parsedData = await data.json()
        
    
//     //     this.setState({
//     //         page: this.state.page + 1,
//     //         articles: parsedData.articles,
//     //         loading:false
//     //     })
//     this.setState({page: this.state.page + 1});
//     this.updateNews()
//     }

fetchMoreData = async() => {
    
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    // console.log(parsedData);
    this.setState({
        articles: this.state.articles.concat(parsedData.articles) ,
        totalResults: parsedData.totalResults
    })
}

    render() {

        // console.log("render");
        return (
            <>

                <h2 className="container my-3" style={{marging: "50px",textAlign:'center'}}>NewsMonkey Top-{this.capitalizeFirstLetter(this.props.category)} Headlines.</h2>
                {this.state.loading && <Spinner />} 

        <InfinitScroll
        dataLength = {this.state.articles.length}
        next = {this.fetchMoreData}
        hasMore = {this.state.articles.length !== this.state.totalResults}
        loader={<Spinner />}
        >

        <div className="container">
                <div className="row">

                {this.state.articles.map((element)=>{
                    return  <div className="col-md-3" key={element.url}>
                    <NewsItem 
                    title = {element.title ? element.title.slice(0,45): ""} 
                    description={element.description ? element.description.slice(0,88): ""} 
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />
                    </div>
                })}
                </div>
                </div>
        </InfinitScroll>
                {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
            </>

        )
    }
}