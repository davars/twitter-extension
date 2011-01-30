var settings = {
  'request_url': 'https://api.twitter.com/oauth/request_token',
  'authorize_url': 'https://api.twitter.com/oauth/authorize',
  'access_url': 'https://api.twitter.com/oauth/access_token',
  'consumer_key': 'IlB9BcRX8nRcfn4M95Px8A',
  'consumer_secret': '9utn3m5SR0pssNXKLDWmTQdpYbs01v9bqhRLHY', 
  'scope': 'https://api.twitter.com/',
  'app_name': 'Home Timeline'
};

var Twitter;

if(Twitter === undefined) {
    Twitter = function() {
        var oauth = OAuth(settings);
        this.getTimeline = function(callback) {
            oauth.signedRequest("https://api.twitter.com/1/statuses/home_timeline.json", "GET", null, "json", callback);
        }
        
        this.getAuthorizeUrl = function(callback) {
            oauth.requestToken(function(request_token) {
               callback('https://api.twitter.com/oauth/authorize?oauth_token=' + request_token.oauth_token); 
            });
        }
        
        this.enterPin = function(pin, callback) {
            oauth.accessToken(pin, callback);
        }
        return({
            name: "twitter.js",
            getTimeline: this.getTimeline,
            getAuthorizeUrl: this.getAuthorizeUrl,
            enterPin: this.enterPin
        });
    }();
}

