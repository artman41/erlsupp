import * as assert from 'assert';
import { Atom, Token, Tuple } from '../src/erlangJs/lexer/tokens';
import { TestSuite, TestSuiteCollection } from './test_suite';

new TestSuiteCollection([
    new TestSuite("Tuple", [
        new TestSuite.Test("Get Token Properties", getTokenProps),
        new TestSuite.Test("Get Element by Index", getElemByIndex),
        new TestSuite.Test("Set Element by Index", setElemByIndex),
    ])
]).run();

const testAtom = new Atom("test atom");
const testTuple = new Tuple(testAtom);

function getTokenProps() {
    let expectedType = Token.Type.TUPLE;
    assert.strictEqual(expectedType, testTuple.type);
    assert.deepStrictEqual([testAtom], testTuple.value);
}

function getElemByIndex() {
    assert.strictEqual(testAtom, testTuple[0]);
}

function setElemByIndex() {
    let setterFun = () => testTuple[0] = new Atom("setter atom");
    assert.throws(setterFun, Error, "Tuple is readonly")
}