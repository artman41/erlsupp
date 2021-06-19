import * as assert from 'assert';
import { TestSuite, TestSuiteCollection } from './test_suite';
import { ErlangJs } from '../src/erlangJs';
import { 
    Atom,
    Variable,
    Float,
    Integer,
    Tuple,
    List,
} from "../src/erlangJs/lexer/tokens";

new TestSuiteCollection([
    new TestSuite("Terms", [
        new TestSuite.Test("Atom (1)", atom1),
        new TestSuite.Test("Atom (2)", atom2),
        new TestSuite.Test("Variable (1)", variable1),
        new TestSuite.Test("Variable (2)", variable2),
        new TestSuite.Test("Integer (1)", integer1),
        new TestSuite.Test("Float (1)", float1),
        new TestSuite.Test("Float (2)", float2),
        new TestSuite.Test("Tuple (1)", tuple1),
        new TestSuite.Test("Tuple (2)", tuple2),
        new TestSuite.Test("Tuple (3)", tuple3),
        new TestSuite.Test("Tuple (4)", tuple4),
        new TestSuite.Test("List (1)", list1),
        new TestSuite.Test("List (2)", list2),
        new TestSuite.Test("List (3)", list3),
        new TestSuite.Test("List (4)", list4),
        // new TestSuite.Test("List1"),
    ])
]).run();

/***************/
/*    Terms    */
/***************/

function atom1() {
    let expected = [new Atom("good_atom")];
    let actual = ErlangJs.tokenise("good_atom");
    assert.deepStrictEqual(actual, expected);
}

function atom2() {
    let expected = [new Atom("good atom")];
    let actual = ErlangJs.tokenise("'good atom'");
    assert.deepStrictEqual(actual, expected);
}

function variable1() {
    let expected = [new Variable("GOOD_VAR")];
    let actual = ErlangJs.tokenise("GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function variable2() {
    let expected = [new Variable("_GOOD_VAR")];
    let actual = ErlangJs.tokenise("_GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function integer1() {
    let expected = [new Integer(1)];
    let actual = ErlangJs.tokenise("1");
    assert.deepStrictEqual(actual, expected);
}

function float1() {
    let expected = [new Float(1.0)];
    let actual = ErlangJs.tokenise("1.0");
    assert.deepStrictEqual(actual, expected);
}

function float2() {
    let expected = [new Float(1.1)];
    let actual = ErlangJs.tokenise("1.1");
    assert.deepStrictEqual(actual, expected);
}

function tuple1() {
    let expected = [new Tuple()];
    let actual = ErlangJs.tokenise("{}");
    assert.deepStrictEqual(actual, expected);
}

function tuple2() {
    let expected = [new Tuple(new Atom("atom"))];
    let actual = ErlangJs.tokenise("{atom}");
    assert.deepStrictEqual(actual, expected);
}

function tuple3() {
    let expected = [new Tuple(new Atom("atom1"), new Atom("atom2"))];
    let actual = ErlangJs.tokenise("{atom1, atom2}");
    assert.deepStrictEqual(actual, expected);
}

function tuple4() {
    let expected = [new Tuple(new Atom("atom1"), new Tuple(new Atom("atom2")))];
    let actual = ErlangJs.tokenise("{atom1, {atom2}}");
    assert.deepStrictEqual(actual, expected);
}

function list1() {
    let expected = [new List()];
    let actual = ErlangJs.tokenise("[]");
    assert.deepStrictEqual(actual, expected);
}

function list2() {
    let expected = [new List(new Atom("atom"))];
    let actual = ErlangJs.tokenise("[atom]");
    assert.deepStrictEqual(actual, expected);
}

function list3() {
    let expected = [new List(new Atom("atom1"), new Atom("atom2"))];
    let actual = ErlangJs.tokenise("[atom1, atom2]");
    assert.deepStrictEqual(actual, expected);
}

function list4() {
    let expected = [new List(new Atom("atom1"), new List(new Atom("atom2")))];
    let actual = ErlangJs.tokenise("[atom1, [atom2]]");
    assert.deepStrictEqual(actual, expected);
}