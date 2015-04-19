process.env.NODE_ENV = 'test';

var request = require('supertest');
var app = require('../bin/www');
var Browser = require('zombie');
var assert = require('assert');

describe('email form', function() {
  before(function() {
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  it("should show an email form", function() {
    assert.ok(this.browser.success);
    assert.equal(this.browser.text('h1'), 'Angular.js');
    assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');
  });

  it("should be able to send email");
});