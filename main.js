const newQuote = document.querySelector(".new-quote");
const copyQuote = document.querySelector(".copy");

const container = document.getElementById("container");
const author = document.querySelector(".author");
const quote = document.querySelector(".quote");

const quoteInfo = document.querySelectorAll(".info");

document.addEventListener("DOMContentLoaded", getQuote);
newQuote.addEventListener("click", getQuote);
copyQuote.addEventListener("click", copy);

let quoteText;
function getQuote() {
  fetch(
    "https://api.quotable.io/random?tag=Famous-quotes,inspiration&maxLength=80"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data) container.classList.toggle("fade");
      quoteText = data.content;
      setTimeout(() => {
        quote.textContent = `"${data.content}"`;
        author.textContent = data.author;
      }, 200);

      setTimeout(() => {
        container.classList.toggle("fade");
      }, 1000);
    })
    .catch((error) => {
      quote.textContent = error;
      for (let elem of quoteInfo) {
        elem.textContent = "Quote missing";
      }
      author.textContent = "Oops! it's been an error!";
    });
}

async function copy() {
  let content = quoteText;

  await navigator.clipboard.writeText(content);
  alert("Copied to the clipboard");
}
