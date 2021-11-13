import React,{useEffect,useState} from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem'
import  PropTypes  from 'prop-types';
import InfinitScroll from 'react-infinite-scroll-component'

const News =(props)=> {

const [articles,setArticles] = useState([])
const [loading,setLoading]= useState(true)
const [page,setPage] = useState(1)
const [totalResult,setTotalResult] = useState(0)
 // document.title = `${this.capitalizeFirstLetter(props.category)}-newsMonkey`

const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);

    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResult)
    setLoading(false)

    props.setProgress(100);
}

useEffect(()=>{
    updateNews();
},[])

const fetchMoreData = async() => {
    
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles( articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResult)
    
}
return (<>
    <h2 className="container my-3" style={{marging: "50px",textAlign:'center'}}>NewsMonkey Top-{capitalizeFirstLetter(props.category)} Headlines.</h2>
        {loading && <Spinner />} 

        <InfinitScroll
        dataLength = {articles.length}
        next = {fetchMoreData}
        hasMore = {articles.length !== totalResult}
        loader={<Spinner />}
        >

        <div className="container">
                <div className="row">

                {articles.map((element)=>{
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

            </>

        )
    }

    News.defaultProps={
        country : "in",
        pageSize : 8,
        category: "science"
    }

    News.propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }

export default News;