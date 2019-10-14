var express = require('express'),
    bodyParser = require('body-parser');
var OAuth2Server = require('oauth2-server');
var Request = OAuth2Server.Request;
   var  Response = OAuth2Server.Response;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
const model = {
    // We support returning promises.
    getAccessToken: function () {
        return new Promise('works!');
    },

    // Or, calling a Node-style callback.
    getAuthorizationCode: function (done) {
        done(null, 'works!');
    },

    // Or, using generators.
    getClient: function* () {
        yield somethingAsync();
        return 'works!';
    },

    // Or, async/wait (using Babel).
    getUser: async function () {
        await somethingAsync();
        return 'works!';
    }
};
const oauth = new OAuth2Server({
    model: model,
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 4 * 60 * 60
});

app.post('/oauth/token', function (req, res) {
    var request = new Request(req);
    var response = new Response(res);
    return oauth.token(request, response)
        .then(function (token) {
            console.log("obtainToken: token %s obtained successfully", token);
            res.json(token);
        }).catch(function (err) {
                console.log(err);
            res.status(err.code || 500).json(err);
        });
});
function authenticateHandler(options) {
    return function (req, res, next) {
        let request = new Request(req);
        let response = new Response(res);
        return oauth.authenticate(request, response, options)
            .then(function (token) {
                res.locals.oauth = { token: token };
                next();
            })
            .catch(function (err) {
                // handle error condition
            });
    }
}

app.listen(3000, function () {
    console.log('listening on *:3000');
});