import React from "react";

const TextLink = ({ item, isTitle, isContent }) => (
  <a
    style={{ color: "#424242" }}
    href={item.url}
    target="_blank"
    rel="noreferrer noopener"
  >
    {isTitle ? (
      <h5 className="card-title">{item.title}</h5>
    ) : isContent ? (
      <p className="card-text">{item.content}</p>
    ) : null}
  </a>
);

function getDateTime(dateTimeStr) {
  return new Date(dateTimeStr).toDateString();
}

const NewsItem = ({ item }) => (
  <div className="card mb-4">
    {item.urlToImage && (
      <img className="card-img-top" src={item.urlToImage} alt={item.title} />
    )}
    <div className="card-body">
      <TextLink item={item} isTitle={true} isContent={false} />
      <TextLink item={item} isTitle={false} isContent={true} />
      <div className="mt-2 align-item-center d-flex">
        <small>
          <strong> Publiced at {getDateTime(item.publishedAt)} </strong>
        </small>
        <div
          className="ms-auto"
          style={{
            padding: "0.25rem 0.5rem",
            background: "#ededed",
            color: "#424242",
            borderRadius: "00.25rem",
            display: "inline-block",
          }}
        >
          <small> {item.source.name} </small>
        </div>
      </div>
    </div>
  </div>
);

function NewsList({ news }) {
  return (
    <div>
      {news && news.length === 0 && <h4> No news </h4>}
      {news &&
        news.map((item) => <NewsItem key={item.title} item={item} />)}
    </div>
  );
}

export default NewsList;
