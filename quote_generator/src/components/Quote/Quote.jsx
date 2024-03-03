import { useState } from 'react';
import "./Quote.css";

function Quote() {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const quote_api = "https://type.fit/api/quotes";

    const generateQuote = () => {
        fetch(quote_api)
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setQuote(data[randomIndex].text);
                setAuthor(data[randomIndex].author);
            })
            .catch(error => console.log("Error fetching quotes:", error));
    };

    const speakQuote = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(quote);
        synth.speak(utterance);
    };

    const copyQuote = () => {
        navigator.clipboard.writeText(`${quote} - ${author}`);
    };

    const shareToFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?quote=${quote} - ${author}`;
        window.open(url, '_blank');
    };

    return (
        <div className='container rounded shadow p-3 w-50'>
            <h1>Quote Generator</h1>
            {quote ? (
                <>
                    <p className='quote-text'>{`\u275D${quote}\u275E`}</p>
                    <p className="author">{`By - ${author}`}</p>
                    <div className='d-flex justify-content-center align-items-center mt-4'>
                        <button onClick={speakQuote} className='btn action-btn'>
                            <i className="fa-solid fa-volume-high"></i>
                        </button>
                        <button onClick={copyQuote} className='btn action-btn'>
                            <i className="fa-solid fa-copy"></i>
                        </button>
                        <button onClick={shareToFacebook} className='btn action-btn'>
                            <i className="fa-brands fa-facebook"></i>
                        </button>
                    </div>
                </>
            ) : (
                <p>Please click <b>New Quote</b> to generate new quote. </p>
            )}
            <button onClick={generateQuote} className='btn' id='new_quote_btn'>New Quote</button>
        </div>
    );
}

export default Quote;
