var fs  = require('fs')
  , ssl = require('../ssl');

var testKeyString = '-----BEGIN ENCRYPTED PRIVATE KEY-----' + '\n' +
  'MIICxjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIXm2FMdwCVu8CAggA\n' +
  'MBQGCCqGSIb3DQMHBAgP5I+dolfZrwSCAoA2HFh8GO5T8OA0WapbPSL3v1UXRX2M\n' +
  'ObFN7wbc8ZE61Yoi9ZGBP9SOFakrOnUO6zHVE1laYdjFp3sJ8cZGu348Z4tjNTnu\n' +
  'bPKh5PeE6AJt0KCMRjkd42xLKEKL3b2+4BoxD/2dTTvFZImQO61j4YnOkd15JiYc\n' +
  'G5XOIwhRI54leezpUYZv6e3jfYj7bRAXEePY/yBY6xpwRv26uinQViTQ7V6sEex5\n' +
  'A5dTM+Z4Okf798PN65RIO1KjS57VNG/Eabgs/3gUInJ/Lep/ZOUq9JiNLvUqm1/p\n' +
  'F0mO/dMMM1JWa3PKBBUP7X1g1nahywBCf/n3gFmNiw96QGY6HRhMbbEs0y3pyVMk\n' +
  'PoES91op8mfZERZRnjcLjUq6QOFiGUDAdAHoiOO1sC1Q6RpwADK2Q4MfAu4VCle0\n' +
  '6iKd6+OcM87J0DDIAS0HgIIULdBLNYHI8F7q13keF1UqUK/lk5iKXWZVg3X/VGQV\n' +
  'wcGPkd64XezPBDrOzqSALzEz4ZvZ4oRBYgXSykMLgEtId6viH9adi8MC4WxB0qa8\n' +
  '6Efuufy1BjIySbCoK3q4tQRWmggsbKucQGCPZQ2aF2SNrP5FfwuHQMKbWM2wnBXD\n' +
  'bWMHQsBftaneso6tnEYxlDqJwLTLDmqp5NDOTFUIbx/htZZDQzduUdhbjTKFicym\n' +
  'kFURcnZF21iAa5jVgXkxMwsz2m50M99TFtGIrU/PHIVlhNqAAQPfOGPvs7MvIZqx\n' +
  'KfQDYg626gEI/uv/8Lune4gvgFH1mbwgdpaGVXT9iXwv1kghHk7l5IA1+dzMA/xx\n' +
  'myds9j7Yk08z06PRrNOIc55J9sXCnlQ6hhl113W/1hjlPetD26BpykIt\n' +
  '-----END ENCRYPTED PRIVATE KEY-----';

describe('SSL', function() {

  describe('#removePassphrase', function() {
    it('should execute the correct command with the correct options', function(done) {
      var opts = {
        newKeyName: '/path/to/new.pem'
      , informExt: 'TEST'
      , outformExt: 'TEST'
      }, cmd = null;

      spyOn(ssl, '_runCommand').andCallFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.removePassphrase('test.pem', 'secret', opts, function() {
        expect(ssl._runCommand).wasCalled();
        expect(cmd).toEqual('openssl rsa -passin pass:secret -inform TEST -in test.pem -outform TEST -out /path/to/new.pem');
        done();
      });
    });
  });

  describe('#toDer', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').andCallFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.toDer('test.pem', 'test.der', function() {
        expect(ssl._runCommand).wasCalled();
        expect(cmd).toEqual('openssl x509 -in test.pem -outform der -out test.der');
        done();
      });
    });
  });

  describe('#toFile', function() {
    it('should save the string key to a file', function(done) {
      var opts = {
        folderName: __dirname
      , name: 'test'
      , ext: '.pem'
      };

      ssl.toFile(testKeyString, opts, function() {
        var exists = fs.existsSync(__dirname + '/test.pem');
        expect(exists).toEqual(true);
        fs.unlink(__dirname + '/test.pem');
        done();
      });
    });
  });

  describe('#toPem', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').andCallFake(function() {
        cmd = arguments[0];
        arguments[1]();
      });

      ssl.toPem('test.crt', 'test.pem', function() {
        expect(ssl._runCommand).wasCalled();
        expect(cmd).toEqual('openssl x509 -in test.crt -inform der -text -outform pem -out test.pem');
        done();
      });
    });
  });

  describe('#verify', function() {
    it('should execute the correct command', function(done) {
      var cmd = null;

      spyOn(ssl, '_runCommand').andCallFake(function() {
        cmd = arguments[0];
        arguments[1](null, '', '');
      });

      ssl.verify('test.ca', 'test.pem', function() {
        expect(ssl._runCommand).wasCalled();
        expect(cmd).toEqual('openssl verify -CAfile test.ca test.pem');
        done();
      });
    });
  });
});
