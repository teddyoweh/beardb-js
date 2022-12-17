VERIFY-SSL
==========

SSL certificate verification for node.js

[![Build Status](https://travis-ci.org/onmodulus/ssl.png?branch=master)](https://travis-ci.org/onmodulus/ssl)

## Docs
This module uses the OpenSSL command line utility - documentation can be found
at [openssl.org](http://www.openssl.org/docs/apps/openssl.html).

## Usage

    var ssl = require('ssl')
      , cert = 'encrypted certificate'
      , caFile = 'file.ca'
      , key = 'key.pem'
      , pass = 'abcdefg';

    ssl.toFile(cert, { fileName: 'cert.pem' } function(err, file) {
      if (err) return console.error(err)
      console.log('Wrote string content to file %s', file);
    });

    ssl.verify(caFile, cert, function(err, status) {
      if (err) return console.error(err);
      console.log(status);
    });

    ssl.removePassphrase(cert, pass, { newKeyName: 'opencert.pem' }, function(err) {
      if (err) return console.error(err);
      console.log('passphrase removed!');
    });
