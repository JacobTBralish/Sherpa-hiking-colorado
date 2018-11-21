import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './HomeArticles.scss';

class HomeArticles extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: JSON.parse(localStorage.getItem("articles")) || [] }
    }

    async componentDidMount() {
        await axios.get('https://api.nps.gov/api/v1/articles?stateCode=CO&limit=150&api_key=psv6nTyqb2edegMQfeIeAK92ZRlC45pmHnvEqUAH').then(response => {
            this.setState({ articles: response.data.data  }, localStorage.setItem('articles', JSON.stringify(response.data.data)));
        })
    }

    cutArticles = (articles) => {
        let fixedArticles = [];
        var tmp = articles.slice(articles);
        for (var i = 0; i < 4; i++) {
          var index = Math.floor(Math.random() * tmp.length);
          var removed = tmp.splice(index, 1);
            fixedArticles.push(removed[0]);
        }
        return fixedArticles
    } 
    render() { 
        let mappedArticles = this.cutArticles(this.state.articles).map(article => {
            return (
            <a className='articleLink' href={article.url}>
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
            )
        })
        return ( 
            <div className='newsArticleContainer'>
                <div style={{textAlign: "center", border: "#2e3031 4px ridge", margin: "0 0 20px 0"}}>
                    <h1 style={{fontSize:"2em", letterSpacing:"0.19em", margin: "5px"}}>News and Articles</h1>
                </div>
                {mappedArticles}
                <div>
                    <Link id='allArticlesLink' to={{pathname:'/All Articles', state:{articles: this.state.articles}}}>See All Articles</Link>
                </div>
            </div>
         );
    }
}
 
export default HomeArticles;




// const HikingResources = () => {
//     return ( 
//         <div className='articleContainer'>
//         <div className='resourcesTitleContainer'>
//             <h1 className='resourcesTitle'>Useful Hiking Resources</h1>
//         </div>
//         <div className='articleLinkContainer'>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-tips/'><div>Fundimentals</div></a>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-gear/'><div>Hiking Gear</div></a>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-clothing/'><div>Hiking Clothing</div></a>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-with-kids/'><div>Hiking with Kids</div></a>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/hiking-with-dogs/'><div>Hiking with Dogs</div></a>
//             <a className='articleLinkSubContainer' href='https://www.theadventurejunkies.com/category/hiking/womens-hiking/'><div>Women's Hiking</div></a>
//         </div>
//     </div>
//      );
// }
 
// export default HikingResources;