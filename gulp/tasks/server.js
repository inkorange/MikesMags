var gulp = require('gulp');
const express = require('express')
const path = require('path')
const port = process.env.PORT || 3003
const app = express()

var options = require('../config').server;

gulp.task('webserver', function() {
    // serve static assets normally
    app.use(express.static(options.dest));
    app.use(options.css.root, express.static(options.css.dest));
    app.use(options.js.root, express.static(options.js.dest));

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    
    // passing through css requests
    app.get('*:file.css', function (request, response){
      var file = request.params.file
      response.sendFile(path.resolve(options.dest, options.css.root, file + ".css"))
    })

    // passing through api/php requests
    app.get('/api/*.php', function (request, response){
        var file = request.params.file
        response.sendFile(path.resolve(options.dest, options.api.root, file + ".php"))
    })

    // passing through JS directory requests
    app.get('*:file.js', function (request, response){
      var file = request.params.file
      response.sendFile(path.resolve(options.dest, options.js.root, file + ".js"))
    })

    // I am passing all other requests through to the main / route which will have the react Router handle
    app.get('*', function (request, response){
      response.sendFile(path.resolve(options.dest, '', 'index.html'))
    })

    app.listen(port)
    console.log("server started on port " + port)

});
