/*
 * Client-side JS
 */

 // Creates the tweet box element with a template to be loaded on to the page
const createTweetElement = function(tweet) {
  let $tweet = `
    <article class="tweet-box">
      <header class="tweet-header">
        <img class="tweet-header-pic" src=${tweet.user.avatars}>
        <span class="tweet-header-name">${tweet.user.name}</span>
        <span class="tweet-username">${tweet.user.handle}</span>
      </header>
      <p class="tweet-body">
        ${escape(tweet.content.text)}
      </p>
      <footer class="tweet-footer">
        <div>
          <span>${Math.round((new Date().getTime() - tweet.created_at) / 86400000)} Days Ago</span>
        </div>
        <div>
          <button class="btn"><i class="fa fa-flag"></i></button>
          <button class="btn"><i class="fa fa-share-alt"></i></button>
          <button class="btn"><i class="fa fa-heart"></i></button>
        </div>
      </footer>
    </article>
  `;
  return $tweet;
};

// Renders each tweet in a given tweets database
const renderTweets = function(tweets) {
  for (const tweet in tweets) {
    const tweetHTML = createTweetElement(tweets[tweet]);
    $('#tweet-container').prepend(tweetHTML);
  }
};

// Prints the rendered tweets
const printTweet = function() {
  $.ajax('/tweets', {method: 'GET'})
    .then(function(data) {
      renderTweets(data);
    });
};

// Prints an indiviual tweet
const printLastTweet = function(tweet) {
  const tweetHTML = createTweetElement(tweet);
  $('#tweet-container').prepend(tweetHTML);
};

// Creates an error message element with a given error message
const createErrorElem = function(errorMsg) {
  let errorElem = `
  <div class="error-box">
    <img class="error-image" src="/images/tweet-error.png">
    <span class="error-text">${errorMsg}</span>
    <img class ="error-image" src="/images/tweet-error.png">
  </div>  
  `;
  $('#error-container').append(errorElem);
};

// Removes html elements in a given string to prevent script from being passed into the form
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Functions to run after basic page html is loaded
$(document).ready(function() {
  
  // Checks if form is empty and under character limit
  // Submits if tweet is valid, then retrieved the database
  // and prints the submitted tweet
  $(".tweet-form").submit(function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length === 0) {
      $('#error-container').empty();
      createErrorElem('Type in a message to tweet!');
    } else if ($("#tweet-text").val().length > 140) {
      $('#error-container').empty();
      createErrorElem('Tweet is too long!');
    } else {
      $('#error-container').empty();
      $.post('/tweets', $(this).serialize()).then(
        function() {
          $("#tweet-text").val('');
          $(".counter").html('140');
          $.ajax('/tweets', {method: 'GET'})
            .then(function(data) {
              printLastTweet(data[data.length - 1]);
            });
        });
    }
  });

  // Prints existing tweets from database upon page load
  printTweet();
});
