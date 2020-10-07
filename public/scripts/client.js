/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const renderTweets = function(tweets) {
  for (const tweet in tweets) {

    const tweetHTML = createTweetElement(tweets[tweet]);
    console.log(tweetHTML);
    console.log($('#tweet-container'));

    $('#tweet-container').append(tweetHTML);
    console.log($('tweet-container'));
  }
}

const createTweetElement = function(tweet) {
  let $tweet = `
    <article class="tweet-box">
      <header class="tweet-header">
        <img class="tweet-header-pic" src="/images/user-profile.png">
        <span class="tweet-header-name">${tweet.user.name}</span>
        <span class="tweet-username">${tweet.user.handle}</span>
      </header>
      <p class="tweet-body">
        ${tweet.content.text}
      </p>
      <footer class="tweet-footer">
        <div>
          <span>${Math.round((new Date().getTime()-tweet.created_at)/86400000)} Days Ago</span>
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
}

$(document).ready(function() {
  renderTweets(data);
});