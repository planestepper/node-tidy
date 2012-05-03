/*
NodeJS binding for HTML Tidy

Originally posted on StackOverflow
http://stackoverflow.com/a/8220285/770155

Code modified to only output corrected partial HTML
*/

var spawn = require('child_process').spawn;
var fs = require('fs');

var tidy = (function() {
this.html = function(str, callback) {
    var buffer = '';
    var error = '';

    if (!callback) {
        throw new Error('No callback provided for tidy.html');
    }
    var ptidy = spawn(
        'tidy',
        [
            '--quiet', 'y',
            '--markup', 'y',
            '--output-xml', 'y',
            '--input-xml', 'y',
            '--show-warnings', 'n',
            '--quote-nbsp', 'y',
            '--preserve-entities', 'y',
            '--wrap', '0'
        ]);

    ptidy.stdout.on('data', function (data) {
        buffer += data;
    });

    ptidy.stderr.on('data', function (data) {
        error += data;
    });

    ptidy.on('exit', function (code) {
        //fs.writeFileSync('last_tidy.html', buffer, 'binary');
        callback(buffer);
    });

    ptidy.stdin.write(str);
    ptidy.stdin.end();      
}
return this;
})();

module.exports = tidy;