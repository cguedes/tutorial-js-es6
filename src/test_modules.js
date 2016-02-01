import { message } from './module1'
QUnit.test("can import named", assert => {
    assert.equal("Hello world", message)
});