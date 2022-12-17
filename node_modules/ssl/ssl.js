//
//     SSL
//     Verify SSL certificates; convert files; remove passcode from
//        private keys.
//     Copyright(c) 2013 Modulus <feedback@modulus.io>
//     MIT Licensed
//

var fs = require('fs')
  , exec = require('child_process').exec
  , path = require('path')
  , util = require('util');

var ssl = exports;

//
// Execute the specified command using the specified callback.
//
ssl._runCommand = function(cmd, fn) {
  exec(cmd, fn);
};

//
// Removes a passphrase from a private key and overwrites the original file
//    with the new file.
//
ssl.removePassphrase = function(file, pass, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts.newKeyName = opts.newKeyName || 'newPrivteKey.pem';
  opts.informExt = opts.informExt || 'PEM';
  opts.outformExt = opts.outformExt || 'PEM';

  var cmd = util.format(
    'openssl rsa -passin pass:%s -inform %s -in %s -outform %s -out',
    pass,
    opts.informExt,
    file,
    opts.outformExt,
    opts.newKeyName);

  ssl._runCommand(cmd, function(error) {
    if (error) return callback(error);

    fs.readFile(opts.newKeyName, function(err, data) {
      if (err) return callback(err);
      fs.writeFile(file, data, function(err) {
        if (err) return callback(err);

        callback(null);
      });
    });
  });
};

//
// Convert a .pem file to a .der file.
//
ssl.toDer = function(file, derFileName, callback) {
  var cmd = util.format(
    'openssl x509 -in %s -outform der -out %s',
    file,
    derFileName);

  ssl._runCommand(cmd, function(error) {
    if (error) return callback(error);
    callback(null);
  });
};

//
// Saves a string representation of a key to a file. Specify the file and
//    location using options `folderName`, `name`, and `ext`.
//
ssl.toFile = function(string, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }

  opts.folderName = opts.folderName || 'temp';
  opts.name = opts.name || 'temp';
  opts.ext = opts.ext || '.pem';

  var dirPath = path.resolve(opts.folderName);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

  fs.writeFile(opts.folderName + '/' + opts.name + opts.ext, string, function(err) {
    if (err) return callback(err, null);
    return callback(null, opts.name + opts.ext);
  });
};

//
// Convert the specified file to a .pem file with the specified name.
//
ssl.toPem = function(file, pemFileName, callback) {
  var cmd = util.format(
    'openssl x509 -in %s -inform der -text -outform pem -out %s',
    file,
    pemFileName);

  ssl._runCommand(cmd, function(error) {
    if (error) return callback(error);
    callback(null);
  });
};

//
// Verifies the validity of the specified .PEM certificate.
//
exports.verify = function(caFile, file, callback) {
  var cmd = util.format('openssl verify -CAfile %s %s', caFile, file);

  ssl._runCommand(cmd, function(error, stdout, stderr) {
    if (error || stderr) return callback(error || stderr, null);

    var remaining = stdout;
    var index = stdout.indexOf('\n');

    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      index = line.indexOf(' ');
      var firstWord = line.substring(0, index);

      if (firstWord === 'error') {
        return callback(line, null);
      }

      index = remaining.indexOf('\n');
    }

    callback(null, stdout);
  });
};
