var common = require('./common');

describe('Blacklisted commands', function () {
  'use strict';

  var client,
    server,
    options = {
      'commandBlacklist': [
        'DELE',
        'retr',
      ]
    };

  beforeEach(function (done) {
    server = common.server(options);
    client = common.client(done);
  });

  it('DELE should reply 502', function (done) {
    client.execute('DELE', function (error) {
      error.code.should.eql(502);
      done();
    });
  });

  it('RETR should reply 502', function (done) {
    client.get('/myfile', function (error) {
      error.code.should.eql(502);
      done();
    });
  });

  it('Non-blacklisted commands should be ok', function(done) {
    client.raw('NOOP', function (error, response) {
      common.should.not.exist(error);
      response.code.should.equal(200);
      done();
    });
  });

  afterEach(function () {
    server.close();
  });
});
