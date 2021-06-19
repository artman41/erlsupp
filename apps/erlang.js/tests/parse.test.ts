import * as assert from 'assert';
import { ErlangJs } from '../src/erlangJs';
import { TestSuite, TestSuiteCollection } from './test_suite';

/*
new TestSuiteCollection([
    new TestSuite("Terms", [
        new TestSuite.Test("Atom Good (1)", atomGood1),
        new TestSuite.Test("Atom Good (2)", atomGood2),
        new TestSuite.Test("Atom Bad (1)", atomBad1),
        new TestSuite.Test("Atom Bad (2)", atomBad2),
        new TestSuite.Test("Tuple0"),
        new TestSuite.Test("Tuple1"),
        new TestSuite.Test("List0"),
        new TestSuite.Test("List1"),
    ])
]).run();
*/

/***************/
/*    Terms    */
/***************/

function atomGood1() {
    let expected = {
        type: "Atom",
        value: "good_atom"
    };
    let actual = ErlangJs.parse("good_atom");
    assert.strictEqual(actual, expected);
}

function atomGood2() {
    let expected = {
        type: "Atom",
        value: "good atom"
    };
    let actual = ErlangJs.parse("'good atom'");
    assert.strictEqual(actual, expected);
}

function atomBad1() {
    let expected = null;
    let actual = ErlangJs.parse("GOOD_atom");
    assert.strictEqual(actual, expected);
}

function atomBad2() {
    let expected = null;
    let actual = ErlangJs.parse("good atom");
    assert.strictEqual(actual, expected);
}

function Tuple0() {
    assert.fail("Not Implemented");
}

function List0() {
    assert.fail("Not Implemented");
}