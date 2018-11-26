import React from 'react';
import { Link } from 'react-router-dom';
import './HomeArticles.scss';


const HomeArticles = (props) => {
    let { fixedArticles, allArticles, cutArticles } = props

    return ( 
        <div className='newsArticleContainer'>
        <div style={{textAlign: "center", border: "#2e3031 4px ridge", margin: "0 0 20px 0"}}>
            <h1 style={{fontSize:"2em", letterSpacing:"0.19em", margin: "5px"}}>News and Articles</h1>
        </div>
    {cutArticles(fixedArticles).map((article, i) => {
        return <a key={i} className='articleLink' href={article.url}>
        <div className='newsArticleSubContainer'>
            <div className='newsArticleImageContainer'>
                <img className='newsArticleImage' src={article.listingImage.url} alt={article.listingImage.altText}/>
            </div>
            <div className='newsArticleContentContainer'>
                <div className='newsArticleTitleContainer'>
                    <h2 className='newsArticleTitle'>{article.title}</h2>
                </div>
                <div className='newsArticleDescriptionContainer'>
                    <p className='newsArticleDescription'>{article.listingDescription}</p>
                </div>
            </div>
        </div>
    </a> 
    })}
    <div>
        <Link id='allArticlesLink' to={{pathname:'/All Articles', state:{LinkArticles: allArticles}}}>See All Articles</Link>
    </div>
</div>
     );
}
 
export default HomeArticles;