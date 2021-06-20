import * as assert from 'assert';
import { TestSuite, TestSuiteCollection } from './test_suite';
import { ErlangJs } from '../src/erlangJs';
import { 
    Atom,
    Keyword,
    Variable,
    Float,
    Integer,
    Tuple,
    List,
    Setter,
    Append,
    Subtract,
    Add,
    Minus,
    Compare,
    Parenthesis,
    Fun,
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
        new TestSuite.Test("Parenthesis (1)", parenthesis1),
        new TestSuite.Test("Parenthesis (2)", parenthesis2),
        new TestSuite.Test("Parenthesis (3)", parenthesis3),
        new TestSuite.Test("Parenthesis (4)", parenthesis4),
    ]),
    new TestSuite("Operators", [
        new TestSuite.Test("Setter (1)", setter1),
        new TestSuite.Test("Setter (2)", setter2),
        new TestSuite.Test("Setter (3)", setter3),
        new TestSuite.Test("Setter (4)", setter4),
        new TestSuite.Test("Append (1)", append1),
        new TestSuite.Test("Append (2)", append2),
        new TestSuite.Test("Append (3)", append3),
        new TestSuite.Test("Append (4)", append4),
        new TestSuite.Test("Subtract (1)", subtract1),
        new TestSuite.Test("Subtract (2)", subtract2),
        new TestSuite.Test("Subtract (3)", subtract3),
        new TestSuite.Test("Subtract (4)", subtract4),
        new TestSuite.Test("Add (1)", add1),
        new TestSuite.Test("Add (2)", add2),
        new TestSuite.Test("Add (3)", add3),
        new TestSuite.Test("Add (4)", add4),
        new TestSuite.Test("Minus (1)", minus1),
        new TestSuite.Test("Minus (2)", minus2),
        new TestSuite.Test("Minus (3)", minus3),
        new TestSuite.Test("Minus (4)", minus4),
        new TestSuite.Test("Compare (1)", compare1),
        new TestSuite.Test("Compare (2)", compare2),
        new TestSuite.Test("Compare (3)", compare3),
        new TestSuite.Test("Compare (4)", compare4),
    ]),
    new TestSuite("Expressions", [
        new TestSuite.Test("Anonymous Function", anonymousFunction),
        new TestSuite.Test("Add X and Y",        addXAndY),
    ]),
]).run();

/***************/
/*    Terms    */
/***************/

function atom1() {
    let expected = [new Atom("good_atom")];
    let [actual, _] = ErlangJs.tokenise("good_atom");
    assert.deepStrictEqual(actual, expected);
}

function atom2() {
    let expected = [new Atom("good atom")];
    let [actual, _] = ErlangJs.tokenise("'good atom'");
    assert.deepStrictEqual(actual, expected);
}

function variable1() {
    let expected = [new Variable("GOOD_VAR")];
    let [actual, _] = ErlangJs.tokenise("GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function variable2() {
    let expected = [new Variable("_GOOD_VAR")];
    let [actual, _] = ErlangJs.tokenise("_GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function integer1() {
    let expected = [new Integer(1)];
    let [actual, _] = ErlangJs.tokenise("1");
    assert.deepStrictEqual(actual, expected);
}

function float1() {
    let expected = [new Float(1.0)];
    let [actual, _] = ErlangJs.tokenise("1.0");
    assert.deepStrictEqual(actual, expected);
}

function float2() {
    let expected = [new Float(1.1)];
    let [actual, _] = ErlangJs.tokenise("1.1");
    assert.deepStrictEqual(actual, expected);
}

function tuple1() {
    let expected = [new Tuple()];
    let [actual, _] = ErlangJs.tokenise("{}");
    assert.deepStrictEqual(actual, expected);
}

function tuple2() {
    let expected = [new Tuple(new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("{atom}");
    assert.deepStrictEqual(actual, expected);
}

function tuple3() {
    let expected = [new Tuple(new Atom("atom1"), new Atom("atom2"))];
    let [actual, _] = ErlangJs.tokenise("{atom1, atom2}");
    assert.deepStrictEqual(actual, expected);
}

function tuple4() {
    let expected = [new Tuple(new Atom("atom1"), new Tuple(new Atom("atom2")))];
    let [actual, _] = ErlangJs.tokenise("{atom1, {atom2}}");
    assert.deepStrictEqual(actual, expected);
}

function list1() {
    let expected = [new List()];
    let [actual, _] = ErlangJs.tokenise("[]");
    assert.deepStrictEqual(actual, expected);
}

function list2() {
    let expected = [new List(new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("[atom]");
    assert.deepStrictEqual(actual, expected);
}

function list3() {
    let expected = [new List(new Atom("atom1"), new Atom("atom2"))];
    let [actual, _] = ErlangJs.tokenise("[atom1, atom2]");
    assert.deepStrictEqual(actual, expected);
}

function list4() {
    let expected = [new List(new Atom("atom1"), new List(new Atom("atom2")))];
    let [actual, _] = ErlangJs.tokenise("[atom1, [atom2]]");
    assert.deepStrictEqual(actual, expected);
}

function parenthesis1() {
    let expected = [new Parenthesis()];
    let [actual, _] = ErlangJs.tokenise("()");
    assert.deepStrictEqual(actual, expected);
}

function parenthesis2() {
    let expected = [new Parenthesis(new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("(atom)");
    assert.deepStrictEqual(actual, expected);
}

function parenthesis3() {
    let expected = [new Parenthesis(new Atom("atom1"), new Atom("atom2"))];
    let [actual, _] = ErlangJs.tokenise("(atom1, atom2)");
    assert.deepStrictEqual(actual, expected);
}

function parenthesis4() {
    let expected = [new Parenthesis(new Atom("atom1"), new Parenthesis(new Atom("atom2")))];
    let [actual, _] = ErlangJs.tokenise("(atom1, (atom2))");
    assert.deepStrictEqual(actual, expected);
}

/*************/
/* Operators */
/*************/

function setter1() {
    let expected = [new Setter(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var = atom");
    assert.deepStrictEqual(actual, expected);
}

function setter2() {
    let expected = [new Setter(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom = atom");
    assert.deepStrictEqual(actual, expected);
}

function setter3() {
    let expected = [new Setter(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" = atom");
    assert.deepStrictEqual(actual, expected);
}

function setter4() {
    let expected = [new Setter(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var = ");
    assert.deepStrictEqual(actual, expected);
}

function append1() {
    let expected = [new Append(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function append2() {
    let expected = [new Append(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function append3() {
    let expected = [new Append(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function append4() {
    let expected = [new Append(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var ++ ");
    assert.deepStrictEqual(actual, expected);
}

function subtract1() {
    let expected = [new Subtract(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var -- atom");
    assert.deepStrictEqual(actual, expected);
}

function subtract2() {
    let expected = [new Subtract(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom -- atom");
    assert.deepStrictEqual(actual, expected);
}

function subtract3() {
    let expected = [new Subtract(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" -- atom");
    assert.deepStrictEqual(actual, expected);
}

function subtract4() {
    let expected = [new Subtract(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var -- ");
    assert.deepStrictEqual(actual, expected);
}

function add1() {
    let expected = [new Add(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var + atom");
    assert.deepStrictEqual(actual, expected);
}

function add2() {
    let expected = [new Add(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom + atom");
    assert.deepStrictEqual(actual, expected);
}

function add3() {
    let expected = [new Add(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" + atom");
    assert.deepStrictEqual(actual, expected);
}

function add4() {
    let expected = [new Add(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var + ");
    assert.deepStrictEqual(actual, expected);
}

function minus1() {
    let expected = [new Minus(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var - atom");
    assert.deepStrictEqual(actual, expected);
}

function minus2() {
    let expected = [new Minus(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom - atom");
    assert.deepStrictEqual(actual, expected);
}

function minus3() {
    let expected = [new Minus(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" - atom");
    assert.deepStrictEqual(actual, expected);
}

function minus4() {
    let expected = [new Minus(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var - ");
    assert.deepStrictEqual(actual, expected);
}

function compare1() {
    let expected = [new Compare(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var == atom");
    assert.deepStrictEqual(actual, expected);
}

function compare2() {
    let expected = [new Compare(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom == atom");
    assert.deepStrictEqual(actual, expected);
}

function compare3() {
    let expected = [new Compare(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" == atom");
    assert.deepStrictEqual(actual, expected);
}

function compare4() {
    let expected = [new Compare(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var == ");
    assert.deepStrictEqual(actual, expected);
}

/***************/
/* Expressions */
/***************/

function anonymousFunction() {
    let funName = Keyword.tryParse(new Atom("fun"));
    if(funName === null)
        throw new Error("wobbly");
    let expected = [new Fun(funName, new Parenthesis(), [], [new Atom("ok")], true)];
    let [actual, _] = ErlangJs.tokenise("fun() -> ok end");
    assert.deepStrictEqual(actual, expected);
}

function addXAndY() {
    throw "Not Implemented";
    let [actual, _] = ErlangJs.tokenise(`
        add(X, Y) ->
            X + Y.
    `)
}