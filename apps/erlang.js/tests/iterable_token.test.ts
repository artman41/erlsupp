import * as assert from 'assert';
import { Token, Atom, Tuple, List, Parenthesis } from '../src/erlangJs/lexer/tokens';
import { TestSuite, TestSuiteCollection } from './test_suite';

new TestSuiteCollection([
    new TestSuite("Tuple", [
        new TestSuite.Test("Get Token Properties", tupleGetTokenProps),
        new TestSuite.Test("Get Element by Index", tupleGetElemByIndex),
        new TestSuite.Test("Set Element by Index", tupleSetElemByIndex),
    ]),
    new TestSuite("List", [
        new TestSuite.Test("Get Token Properties", listGetTokenProps),
        new TestSuite.Test("Get Element by Index", listGetElemByIndex),
        new TestSuite.Test("Set Element by Index", listSetElemByIndex),
    ]),
    new TestSuite("Parenthesis", [
        new TestSuite.Test("Get Token Properties", parenthesisGetTokenProps),
        new TestSuite.Test("Get Element by Index", parenthesisGetElemByIndex),
        new TestSuite.Test("Set Element by Index", parenthesisSetElemByIndex),
    ]),
]).run();

const testAtom = new Atom("test atom");
const testTuple = new Tuple(testAtom);
const testList = new List(testAtom);
const testParenthesis = new Parenthesis(testAtom);

function listGetTokenProps() {
    let expectedType = Token.Type.LIST;
    assert.strictEqual(expectedType, testList.type);
    assert.deepStrictEqual([testAtom], testList.value);
}

function listGetElemByIndex() {
    assert.strictEqual(testAtom, testList[0]);
}

function listSetElemByIndex() {
    let setterFun = () => testList[0] = new Atom("setter atom");
    assert.throws(setterFun, Error, "List is readonly")
}

function tupleGetTokenProps() {
    let expectedType = Token.Type.TUPLE;
    assert.strictEqual(expectedType, testTuple.type);
    assert.deepStrictEqual([testAtom], testTuple.value);
}

function tupleGetElemByIndex() {
    assert.strictEqual(testAtom, testTuple[0]);
}

function tupleSetElemByIndex() {
    let setterFun = () => testTuple[0] = new Atom("setter atom");
    assert.throws(setterFun, Error, "Tuple is readonly")
}

function parenthesisGetTokenProps() {
    let expectedType = Token.Type.PARENTHESIS;
    assert.strictEqual(expectedType, testParenthesis.type);
    assert.deepStrictEqual([testAtom], testParenthesis.value);
}

function parenthesisGetElemByIndex() {
    assert.strictEqual(testAtom, testParenthesis[0]);
}

function parenthesisSetElemByIndex() {
    let setterFun = () => testParenthesis[0] = new Atom("setter atom");
    assert.throws(setterFun, Error, "Parenthesis is readonly")
}