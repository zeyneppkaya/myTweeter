/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Escape function to prevent scripts being passed in as a tweet
  const escapeMe = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // A function to add a tweet to the database
  const createTweetElement = function(tweet) {
    const $tweet = $('<article>').addClass("tweet");

    const htmlTweet = `
    <header>
    <img src="${tweet.user.avatars}">
    <h4>${tweet.user.name}</h4>
    <span class="handle">${tweet.user.handle}</span>
    </header>
    <div class="inner-tweets">
    <p>${escapeMe(tweet.content.text)}</p>
    </div>
    <footer class="tweet-footer">${timeago.format(tweet.created_at)}<span>
    <i class="far fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="far fa-heart"></i>
    </span>
    </footer>`;

    let myNewTweet = $tweet.append(htmlTweet);
    return myNewTweet;
  };

  // loops through tweets and calls createTweetElement for each tweet
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
    const myNewTweet = $('textarea').serialize();
    const tweet = $('textarea').val().trim();
    const characterLimit = 140;
    
    if (tweet.length > characterLimit) {
      $('.error').text('This tweet exceeds the character limit of 140.');
      $error.slideDown(500);
      setTimeout(() => { 
        $error.slideUp(500) 
      }, 3000);
    } else if (tweet === '') {
      $('.error').text('This tweet is empty.');
      $error.slideDown(500);
      setTimeout(() => {
        $error.slideUp(500) 
      }, 3000);
    } else {
      $.post(
        '/tweets',
        myNewTweet
      )
      .then(function() {
        $('textarea').val('');
        $('.tweets').empty();
        loadTweets(myNewTweet);
        $('.counter').text('140');
      });
    }
  });

  //Hiding the error message so it is not visible when the form is first displayed
  const $error = $('form').children('h4');
  $error.hide();

});