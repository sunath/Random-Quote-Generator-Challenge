import { useCallback, useEffect, useState } from "react";
import "./Quotes.css";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);

  const [randomIndex, setRandomIndex] = useState(0);

  const [quoteCardClasses, setQuoteClasses] = useState("card");

  const selecteARandomIndex = () => {
    const maxHigh = quotes.length;
    const nextIndex = Math.floor(Math.random() * maxHigh);
    setRandomIndex(nextIndex);
    onQuoteChange();
  };

  const onQuoteChange = () => {
    setQuoteClasses("card");
    setInterval(() => {
      setQuoteClasses("card animate__animated animate__bounceIn");
    }, 100);
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((e) => e.json())
      .then((e) => {
        setQuotes(e.quotes, null);
        console.log(e.quotes);
        selecteARandomIndex();
        return;
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="main">
      <div className={quoteCardClasses}>
        {quotes.length > 0 && (
          <Quote
            quote={quotes[randomIndex].quote}
            author={quotes[randomIndex].author}
          />
        )}

        <div className="card-footer">
          <button
            href="#"
            class="btn btn-primary"
            onClick={selecteARandomIndex}
          >
            Next Quote
          </button>
        </div>
      </div>
    </div>
  );
}

function Quote(props) {
  return (
    <div className="card-body">
      <h5 className="card-title">{props.quote}</h5>
      <p className="card-text">{props.author}</p>
    </div>
  );
}
