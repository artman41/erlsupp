import * as assert from 'assert';
import { Atom, Token, List } from '../src/erlangJs/lexer/tokens';
import { TestSuite, TestSuiteCollection } from './test_suite';

new TestSuiteCollection([
    new TestSuite("List", [
        new TestSuite.Test("Get Token Properties", getTokenProps),
        new TestSuite.Test("Get Element by Index", getElemByIndex),
        new TestSuite.Test("Set Element by Index", setElemByIndex),
    ])
]).run();

const testAtom = new Atom("test atom");
const testList = new List(testAtom);

function getTokenProps() {
    let expectedType = Token.Type.LIST;
    assert.strictEqual(expectedType, testList.type);
    assert.deepStrictEqual([testAtom], testList.value);
}

function getElemByIndex() {
    assert.strictEqual(testAtom, testList[0]);
}

function setElemByIndex() {
    let setterFun = () => testList[0] = new Atom("setter atom");
    assert.throws(setterFun, Error, "List is readonly")
}