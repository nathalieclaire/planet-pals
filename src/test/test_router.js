const assert = require('assert');
const router = require('../router');

describe('router', function () {
  it('should add a route with get', function (done) {
    router.get('/', function (req, res) { res.test_value = 'This is route: "/"' })
    let request = { method: 'GET', url: "/" };
    let result = { test_value: null };
    router.handle(request, result)
    assert.equal(result.test_value, 'This is route: "/"');
    done();
  })
  it('should not throw on a bad route', function (done) {
    let result = { end: () => (undefined), writeHead: () => (undefined) };
    assert.doesNotThrow(() => (router.handle('some foobar', result)))
    done();
  })
});
