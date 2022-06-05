import React, { Component } from "react";

import News, { newsCategory } from "../news";

import Header from "./header";
import NewsList from "./newslist";
import Pagination from "./pagination";
import Loading from "./loading";

const news = new News(newsCategory.technology);

class App extends Component {
  state = {
    data: {},
    isLoading: true,
  };

  componentDidMount() {
    news
      .getNews()
      .then((data) => {
        this.setState({ data: data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  }

  next = () => {
    if (this.state.data.isNext) {
      this.setState({ isLoading: true });
    }

    news
      .nextPage()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        console.log(e);
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  };

  previous = () => {
    if (this.state.data.isPrev) {
      this.setState({ isLoading: true });
    }

    news
      .previousPage()
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  };

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  };

  search = (searchTerm) => {
    this.setState({ isLoading: true });
    news
      .search(searchTerm)
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((e) => {
        alert("Something is wrong");
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      isPrev,
      isNext,
      category,
      articles,
      totalResults,
      currentPage,
      totalPage,
    } = this.state.data;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
              search={this.search}
              category={category}
              changeCategory={this.changeCategory}
            />
            <div className="d-flex">
              <p className="text-block-50">
                About {totalResults} results found
              </p>
              <p className="text-block-50 ms-auto">
                {currentPage} page of {totalPage}
              </p>
            </div>
            {this.state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <NewsList news={articles} />
                <Pagination
                  next={this.next}
                  prev={this.previous}
                  isNext={isNext}
                  isPrev={isPrev}
                  totalPage={totalPage}
                  currentPage={currentPage}
                  handlePageChange={this.handlePageChange}
                  goToPage={this.goToPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
