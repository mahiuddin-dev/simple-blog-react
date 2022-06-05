import axios from "../utils/axios";

export const newsCategory = {
  technology: "technology",
  science: "science",
  sport: "sport",
  business: "business",
  entertainment: "entertainment",
  health: "health",
};

const MAX_ITEM_PER_PAGE = 10;

export default class News {
  constructor(category) {
    this._category = category;
    this._searchTerm = "";
    this._pageSize = MAX_ITEM_PER_PAGE;
    this._currentPage = 1;
    this._totalPage = 1;
  }
  async getNews() {
    try {
      const { data } = await axios.get(this._getURL());
      this._totalPage = Math.ceil(data.totalResults / this._pageSize);
      return {
        articles: data.articles,
        totalPage: this._totalPage,
        currentPage: this._currentPage,
        category: this._category,
        totalResults: data.totalResults,
        isNext: this._isNext(),
        isPrev: this._isPrev(),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  nextPage() {
    if (this._isNext()) {
      this._currentPage++;
      return this.getNews();
    }
  }

  previousPage() {
    if (this._isPrev()) {
      this._currentPage--;
      return this.getNews();
    }
  }

  setCurrentPage(pageNumber) {
    if (pageNumber < 1 && pageNumber > this._totalPage) {
      throw new Error("Invalid page number");
    }
    this._currentPage = pageNumber;
    return this.getNews();
  }

  changeCategory(category) {
    this._category = category;
    this._currentPage = 1;
    return this.getNews();
  }

  search(term) {
    this._searchTerm = term;
    return this.getNews();
  }

  _getURL() {
    let url = "/?";
    if (this._category) url += `category=${this._category}`;
    if (this._searchTerm) url += `&q=${this._searchTerm}`;
    if (this._pageSize) url += `&pageSize=${this._pageSize}`;
    if (this._currentPage) url += `&page=${this._currentPage}`;

    return url;
  }

  _isNext() {
    return this._currentPage < this._totalPage;
  }
  _isPrev() {
    return this._currentPage > 1;
  }
}
