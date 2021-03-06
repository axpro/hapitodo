'use strict';

const IndexRoute = require('../../server/route/indexRoute');
const TestServer = require('../testServer');

const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;

const testServer = new TestServer();

testServer.route(IndexRoute);

describe('server/route/indexRoute', () => {

    it('has path /', (done) => {

        testServer.inject({
            method: 'get',
            url: '/'
        }, (res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.contain('<!doctype html>');

            testServer.inject({
                method: 'get',
                url: '/css/main.css'
            }, (res) => {

                expect(res.statusCode).to.equal(200);
                expect(res.result).to.contain('body');

                return done();
            });
        });
    });
});
