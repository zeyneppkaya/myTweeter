/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // A function to add a tweet to the database
  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass("tweet");

    const timeAgo = timeago.format(tweet.created_at);

    const htmlTweet = `
    <header>
    <img src="${tweet.user.avatars}">
    <h4>${tweet.user.name}</h4>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="inner-tweets">
    <p>${tweet.content.text}</p>
    </div>
    <footer class="tweet-footer">${timeAgo}<span>
    <i class="far fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
    </span>
    </footer>`;

    let newTweet = $tweet.append(htmlTweet);
    return newTweet;
  };

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweetsArr) {
    for (const tweet of tweetsArr) {
      const $tweet = createTweetElement(tweet);
      $('.tweets').prepend($tweet);
    }
  };

  //Adding the tweets we make to /localhost:8080/tweets
  $('#tweetForm').submit(function(event) {
    console.log($(this));
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function() {
      });
  });

  //Fetching the tweets with Ajax
  const loadTweets = function() {
    $.ajax({
        url: 'http://localhost:8080/tweets', 
        method: 'GET' 
    })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };
  loadTweets();
});