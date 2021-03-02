const colors = [
  // Array of colors to randomly select for background colors.
  "#23235c",
  "#144416",
  "#fa9191",
  "#5f5f63",
  "#0f0fd1",
  "#105266",
  "#236d63",
  "#195f42",
  "#28e696",
  "#117ac0",
  "#a81fa8",
  "#a8295a",
  "#7a1fa5",
  "#98a51f",
  "#3b5c40",
];

const hunterQuotes = [
  // Array of random quotes I know/say.
  {
    quote: "Somebody come get her, she's dancing like a stripper.",
    author: "Laura Parry",
  },
  {
    quote: '"You miss 100% of the shots you don\'t take." -Wayne Gretzky',
    author: "Michael Scott",
  },
  {
    quote: "She got a big booty so I call her big booty.",
    author: "2 Chainz",
  },
  {
    quote: "If you don't love Laura than there is something wrong with you.",
    author: "Hunter Lacefield",
  },
  {
    quote: "Steelers are going to win the super bowl.",
    author: "Hunter Lacefield",
  },
  {
    quote: "I'm not superstitious, I'm a little stitious",
    author: "Michael Scott",
  },
  {
    quote:
      "Wake up campers. It's a glorious morning! Today is evaluation day. The key word here is 'value'. Do you have any? Not yet, but by the end of the summer this camp is going to be full of skinny winners!",
    author: "Tony Perkins",
  },
  {
    quote:
      "Who is Seymour Butts? No one has seen more butts than you uncle Tony.",
    author: "Josh",
  },
  {
    quote: "Congratulations Mr. Simms, you're the fattest boy in camp!",
    author: "Lars",
  },
  {
    quote:
      "Would I rather be feared or loved? Easy, both. I want people to be afraid of how much they love me.",
    author: "Michael Scott",
  },
];

let quotesData;
let currentQuote = ""; // assigned these out side of all functions so they can be used in multiple functions. One to assign the quote and another to call upon
let currentAuthor = "";

// Function section that will handle quote and color changes.

function getRandomHunterQuote() {
  return hunterQuotes[Math.floor(Math.random() * hunterQuotes.length)];
  //This function gets a random quote from array randomHunterQuote
}

//This entire function handles when Hunter-quote-button is clicked
function getHunterQuote() {
  /*This variable calls upon getRandomHunterQuote function and sets the new quote and author to the variable every time
    the button is clicked*/
  let randomHunterQuote = getRandomHunterQuote();

  /*These can not have let or const in them in order to work properly with encodeURIComponent (also can't just simply use 
  randomHunterQuote.quote.)... Also it has to go here before all of the changes and after randomHunterQuote or it doesn't work
  because the quotes are inside this function. The twitter.attr function is a completely different function.*/
  currentQuote = randomHunterQuote.quote;
  currentAuthor = randomHunterQuote.author;

  // Section in function where we change twitter link to add current quote and author and set up a tweet. (still inside getHunterQuote function)

  $("#tweet-quote").click(function () {
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" -' + currentAuthor)
    );
  });

  // Section where we change quote and color changes with animate when page is loaded and Hunter-quote-button is clicked.

  /* First, we get rid of the element by using opacity: 0 for the first 500 miliseconds. Then in the same animate () we add another
       parameter that is a function. In said function we bring the container back with full opacity while changing the quote as well.
       This way the animation gets rid of the element in the first 500 miliseconds before changing the quote.
       */
  $("#text-container").animate({ opacity: 0 }, 500, function () {
    $("#text-container").animate({ opacity: 1 }, 500); // Brings back quote in full opacity
    $("#text").text(randomHunterQuote.quote); // Changes quote
    $("#author").text(randomHunterQuote.author); // Changes author
  });

  /* randomColorIndex has to be inside function or colors will only change once as the index will stay 
    the same and will not chang when new-quote-button is clicked*/
  const randomColorIndex = Math.floor(Math.random() * colors.length);

  // Changes button background color in 1 second
  $(".button").animate({ backgroundColor: colors[randomColorIndex] }, 1000);
  $("body").animate(
    {
      // Changes the body's background color and text color in 1 second using animation.
      backgroundColor: colors[randomColorIndex],
      color: colors[randomColorIndex],
    },
    1000
  );
}

/* This section is using JSON APIs and AJAX to generate random quotes from a different site. (copied from FCC for now as 
    I have not learned this yet, but I will in the next course of Data Visualization) */
function getProperQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json",
    },
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
        console.log("quotesData");
        console.log(quotesData);
      }
    },
  });
}

//Take the array of new quores and return one random quote by using Math.random for index.
function getRandomProperQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

// Same as getHunterQuote code just calling upon function getRandomProperQuote() instead and replacing quotes with that.
function getProperQuote() {
  let randomProperQuote = getRandomProperQuote();
  $("#text-container").animate({ opacity: 0 }, 500, function () {
    $("#text-container").animate({ opacity: 1 }, 500);
    $("#text").text(randomProperQuote.quote);
    $("#author").text(randomProperQuote.author);
  });
  // Changes button background color in 1 second
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  $(".button").animate({ backgroundColor: colors[randomColorIndex] }, 1000);
  $("body").animate(
    {
      // same as code for getHunterQuotes
      backgroundColor: colors[randomColorIndex],
      color: colors[randomColorIndex],
    },
    1000
  );
  // Must add the tweet section in here as well in order to change with new proper quotes as well.
  $("#tweet-quote").click(function () {
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + currentQuote + '" -' + currentAuthor)
    );
  });
}
// Will do function getHunterQuote when site is loaded.
$(document).ready(function () {
  getProperQuotes(); //Need to have this called when first loading to have the database loaded for when the new-quote-button is clicked
  getHunterQuote();
});

// Will call on function getHunterQuote when #Hunter-quote-button is loaded.
$("#Hunter-quote-button").click(getHunterQuote);
//Only need name of function being clicked. Do not need the () following...

$("#new-quote-button").click(getProperQuote);
