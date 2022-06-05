import React, { Component } from "react";
import { newsCategory } from "../news";

class Header extends Component {
  state = {
    searchTerm: "",
  };
  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };
  handleKeypress = (event) => {
    if (event.key === "Enter") {
      this.props.search(this.state.searchTerm);
    }
  };

  render() {
    const { category } = this.props;
    return (
      <div className="my-4">
        <h1 className="mb-4" style={{ fontWeight: "300" }}>
          Black Buster Headline
        </h1>

        <input
          type="search"
          className="form-control"
          placeholder="type to search.."
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyPress={this.handleKeypress}
          id=""
        />

        <div className="my-4">
          {newsCategory &&
            Object.keys(newsCategory).map((item) => {
              if (category === newsCategory[item]) {
                return (
                  <button
                    onClick={() =>
                      this.props.changeCategory(newsCategory[item])
                    }
                    className="btn btn-sm btn-warning mr-2 mb-2"
                  >
                    {`#${newsCategory[item]}`}
                  </button>
                );
              } else {
                return (
                  <button
                    onClick={() =>
                      this.props.changeCategory(newsCategory[item])
                    }
                    className="btn btn-sm btn-light mr-2 mb-2"
                  >
                    {`#${newsCategory[item]}`}
                  </button>
                );
              }
            })}
        </div>
      </div>
    );
  }
}

export default Header;
