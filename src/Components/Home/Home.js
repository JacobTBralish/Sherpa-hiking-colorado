import React, { Component } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../LoadingSpinner';
import HomeArticles from '../HomeArticles/HomeArticles';

import './Home.scss';

const ArticlesWithData = withData('https://api.nps.gov/api/v1/articles?stateCode=CO&limit=150&api_key=psv6nTyqb2edegMQfeIeAK92ZRlC45pmHnvEqUAH')(HomeArticles);

const Home = () => {
    return ( 
        <div className='homeContainer'>
            <div className='homeSubContainer'>
                <div className='welcomeMessageContainer'>
                    <h1 className='welcomeMessage'>Welcome to Sherpa Hiking Colorado
                        <img className='welcomeMessagePicture' alt='' src='https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/flagofColoradoCO.jpg' />
                    </h1>
                </div>
                <div className='imageContainer'>
                    <img className='homeImage'  alt=''></img>
                </div>
                <div>
                    <ArticlesWithData />
                </div>
            </div>
        </div>
     );
}
 
export default Home;

function withData(url) {
    return function(WrappedComponent) {
        return class extends Component {
            state = {
                isLoading: false,
                data: null,
                error: null
            }

            componentDidMount() {
                this.setState({ isLoading: true  })
                axios.get(url).then(response => {
                    console.log('response: ', response);
                    this.setState({ data: response.data.data, isLoading: false  });
                }).catch(error => {
                    console.log('Error in HOC',error)
                    this.setState({ error });
                })
            }

            render() {
                const { isLoading, data, error } = this.state;
                let cutArticles = (data) => {
                    let fixedData = [];
                    var tmp = data.slice(data);
                    for (var i = 0; i < 4; i++) {
                      var index = Math.floor(Math.random() * tmp.length);
                      var removed = tmp.splice(index, 1);
                        fixedData.push(removed[0]);
                    }
                    return fixedData
                } 
                // let fixedArticles = this.cutArticles(data)
                return <div>
                    {error
                    ? <div>Oh no! There was an issue loading the data</div>
                :(isLoading || !data)
                ? <LoadingSpinner />
                : <WrappedComponent cutArticles={cutArticles} fixedArticles={data} allArticles={data} />
                }
                </div>
            }
        }
    }
}

// class Home extends Component {
//     constructor() {
//         super();
//         this.state = {
//             isDesktop: false 
//           };
      
//           this.updatePredicate = this.updatePredicate.bind(this);
//         }
//         componentDidMount() {
//           this.updatePredicate();
//           window.addEventListener("resize", this.updatePredicate);
//           window.scrollTo(0,0);
//         }
      
//         componentWillUnmount() {
//           window.removeEventListener("resize", this.updatePredicate);
//         }
      
//         updatePredicate = () => {
//           this.setState({ isDesktop: window.innerWidth > 550 });
//         }
    
//     render() { 
//         const isDesktop = this.state.isDesktop;

//         return ( 
//         <div className='homeContainer'>
//             <div className='homeSubContainer'>
//             <div className='welcomeMessageContainer'>
//                 <h1 className='welcomeMessage'>Welcome to Sherpa Hiking Colorado
//                     <img className='welcomeMessagePicture' src='https://statesymbolsusa.org/sites/statesymbolsusa.org/files/primary-images/flagofColoradoCO.jpg' />
//                 </h1>
//             </div>
//                 <div className='imageContainer'>
//                 {isDesktop ? (
//                     <img className='homeImage'  src={HomeImage} alt={HomeImage} ></img>
//                 ) : (
//                     <img className='homeImage'  src={MobileHomeImage} alt={MobileHomeImage} ></img>
//                 )}
//                 </div>
//             </div>
//         </div>
//          );
//     }
// }
 
// export default Home;