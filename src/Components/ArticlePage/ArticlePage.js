import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Redirect } from "react-router-dom";

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsPerPage: 15,
      articles: JSON.parse(localStorage.getItem("articles"))
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    window.scrollTo(0, 0);
  };

  render() {
    // let { LinkArticles } = this.props.location.state;
    //============================================================WORKING ON REDIRECT IF NO DATA==============================================================\\
    if (
      this.state.articles.length ||
      this.props.location.state.LinkArticles.length
    ) {
      //Pagination
      let activePageIndex = parseInt(this.state.activePage, 10);
      let itemsPerPageIndex = parseInt(this.state.itemsPerPage, 10);
      let indexOfLastTrail = activePageIndex * itemsPerPageIndex;
      let indexOfFirstTrail = indexOfLastTrail - itemsPerPageIndex;
      let renderedArticles = (
        this.state.articles || this.props.location.state.LinkArticles
      ).slice(indexOfFirstTrail, indexOfLastTrail);

      var mappedArticles = renderedArticles.map((item, i) => {
        return (
          <a key={i} className="articleLink" href={item.url}>
            <div className="newsArticleSubContainer">
              <div className="newsArticleImageContainer">
                <img
                  className="newsArticleImage"
                  src={item.listingImage.url}
                  alt={item.listingImage.altText}
                />
              </div>
              <div className="newsArticleContentContainer">
                <div className="newsArticleTitleContainer">
                  <h2 className="newsArticleTitle">{item.title}</h2>
                </div>
                <div className="newsArticleDescriptionContainer">
                  <p className="newsArticleDescription">
                    {item.listingDescription}
                  </p>
                </div>
              </div>
            </div>
          </a>
        );
      });
    } else {
      return <Redirect to="/" />;
    }
    return (
      <div className="newsArticleContainer">
        <div
          style={{
            textAlign: "center",
            border: "#2e3031 4px ridge",
            margin: "0 0 20px 0"
          }}
        >
          <h1
            style={{ fontSize: "48px", letterSpacing: "0.19em", margin: "5px" }}
          >
            Colorado National Park Services Articles
          </h1>
        </div>
        {mappedArticles}
        <div className="paginationContainer">
          {/* <PaginationContainer acticePage={this.state.activePage} articles={this.state.articles || this.props.location.state.LinkArticles} handlePageChange={this.handlePageChange}/> */}
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={15}
            totalItemsCount={
              this.state.articles.length ||
              this.props.location.state.LinkArticles.length
            }
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default ArticlePage;
