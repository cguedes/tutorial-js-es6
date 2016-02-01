import { message } from './module1'

QUnit.test("can import named const", assert => {
    assert.equal("Hello world", message)
});

import { add } from './module1'

QUnit.test("can import named function", assert => {
    assert.equal(6, add(2, 4));
});

QUnit.test("true", assert => {
    assert.equal(1,1);
});

QUnit.test("also true", assert => {
    assert.equal(1,1);
});
