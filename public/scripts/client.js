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

    let myNewTweet = $tweet.append(htmlTweet);
    return myNewTweet;
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

  $('#tweetForm').submit(function(event) {
    event.preventDefault();
  });

  $(function() {
    $('#tweet-button').on('click', function() {
      const myNewTweet = $('textarea').serialize();
      const newTweetsLength = $('textarea').serialize().length;
      const emptyTweet = $('textarea').val();
      const characterLimit = 140;
      if (newTweetsLength > characterLimit) {
        alert('This tweet exceeds the character limit of 140.');
        return
      } else if (emptyTweet === '') {
        alert('This tweet is empty.');
        return
      } else {
        $.post(
          '/tweets',
          myNewTweet
        )
        .then(function() {
        $('textarea').val('');
        $('.tweets').empty();
        loadTweets(myNewTweet);
        });
      }
    });
  });
});