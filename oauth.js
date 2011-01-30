var OAuth;

if(OAuth === undefined) {
    OAuth = function(settings) {
        this.requestToken = function(callback) {
            var url = OAuthSimple().sign({
                path:settings.request_url,
                parameters: {oauth_callback:'oob'},
                signatures:{
                    api_key:settings.consumer_key,
                    shared_secret:settings.consumer_secret
                }
            }).signed_url;
            $.get(url, function(data) {
               localStorage.request_token = data;
               callback(OAuthSimple()._parseParameterString(data));
            });
        }
        
        this.accessToken = function(verifier, callback) {
            request_token = OAuthSimple()._parseParameterString(localStorage.request_token);
            var url = OAuthSimple().sign({
                path:settings.access_url,
                parameters: {
                    oauth_verifier:verifier,
                    oauth_token:request_token.oauth_token
                },
                signatures:{
                    api_key:settings.consumer_key,
                    shared_secret:settings.consumer_secret,
                    oauth_secret:request_token.oauth_token_secret
                }                
            }).signed_url;
            $.get(url, function(data) {
                localStorage.access_token = data;
                localStorage.removeItem('request_token');
                callback(OAuthSimple()._parseParameterString(data));
            });
        }
        
        this.signedRequest =  function(url, method, content, dataType, success, failure) {
            var access_token = OAuthSimple()._parseParameterString(localStorage.access_token);
            var signedUrl = OAuthSimple().sign({
                path:url,
                action:method || 'GET',
                parameters: {},
                signatures:{
                    api_key:settings.consumer_key,
                    shared_secret:settings.consumer_secret,
                    oauth_token:access_token.oauth_token,
                    oauth_secret:access_token.oauth_token_secret
                }
            }).signed_url;
            $.ajax({
                type:method,
                url:signedUrl,
                data:content,
                dataType:dataType,
                success:success,
                failure:failure
            })
        }
        
        this.authorized = function() {
            return localStorage.access_token;
        }
        
        return this;
    }
    
}

