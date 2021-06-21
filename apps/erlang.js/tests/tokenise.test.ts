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
    Multiply,
    Divide,
    Compare,
    Parenthesis,
    Fun,
    Delimiter,
    BooleanOp
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
        new TestSuite.Test("Multiply (1)", multiply1),
        new TestSuite.Test("Multiply (2)", multiply2),
        new TestSuite.Test("Multiply (3)", multiply3),
        new TestSuite.Test("Multiply (4)", multiply4),
        new TestSuite.Test("Divide (1)", divide1),
        new TestSuite.Test("Divide (2)", divide2),
        new TestSuite.Test("Divide (3)", divide3),
        new TestSuite.Test("Divide (4)", divide4),
        new TestSuite.Test("Compare (1)", compare1),
        new TestSuite.Test("Compare (2)", compare2),
        new TestSuite.Test("Compare (3)", compare3),
        new TestSuite.Test("Compare (4)", compare4),
        new TestSuite.Test("Compare (5)", compare5),
        new TestSuite.Test("Compare (6)", compare6),
        new TestSuite.Test("Compare (7)", compare7),
        new TestSuite.Test("Compare (8)", compare8),
        new TestSuite.Test("Compare (9)", compare9),
        new TestSuite.Test("Compare (10)", compare10),
        new TestSuite.Test("Compare (11)", compare11),
        new TestSuite.Test("Compare (12)", compare12),
        new TestSuite.Test("Compare (13)", compare13),
        new TestSuite.Test("Compare (14)", compare14),
        new TestSuite.Test("Compare (15)", compare15),
        new TestSuite.Test("Compare (16)", compare16),
    ]),
    new TestSuite("Boolean Operators", [
        new TestSuite.Test("And (1)", and1),
        new TestSuite.Test("And (2)", and2),
        new TestSuite.Test("And (3)", and3),
        new TestSuite.Test("And (4)", and4),
        new TestSuite.Test("AndAlso (1)", andAlso1),
        new TestSuite.Test("AndAlso (2)", andAlso2),
        new TestSuite.Test("AndAlso (3)", andAlso3),
        new TestSuite.Test("AndAlso (4)", andAlso4),
        new TestSuite.Test("Or (1)", or1),
        new TestSuite.Test("Or (2)", or2),
        new TestSuite.Test("Or (3)", or3),
        new TestSuite.Test("Or (4)", or4),
        new TestSuite.Test("OrElse (1)", orElse1),
        new TestSuite.Test("OrElse (2)", orElse2),
        new TestSuite.Test("OrElse (3)", orElse3),
        new TestSuite.Test("OrElse (4)", orElse4),
    ]),
    new TestSuite("Expressions", [
        new TestSuite.Test("Anonymous Function (1)", anonymousFunction1),
        new TestSuite.Test("Anonymous Function (2)", anonymousFunction2),
        new TestSuite.Test("Anonymous Function (3)", anonymousFunction3),
        new TestSuite.Test("Add X and Y",            addXAndY),
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

function multiply1() {
    let expected = [new Multiply(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var * atom");
    assert.deepStrictEqual(actual, expected);
}

function multiply2() {
    let expected = [new Multiply(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom * atom");
    assert.deepStrictEqual(actual, expected);
}

function multiply3() {
    let expected = [new Multiply(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" * atom");
    assert.deepStrictEqual(actual, expected);
}

function multiply4() {
    let expected = [new Multiply(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var * ");
    assert.deepStrictEqual(actual, expected);
}

function divide1() {
    let expected = [new Divide(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var / atom");
    assert.deepStrictEqual(actual, expected);
}

function divide2() {
    let expected = [new Divide(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom / atom");
    assert.deepStrictEqual(actual, expected);
}

function divide3() {
    let expected = [new Divide(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" / atom");
    assert.deepStrictEqual(actual, expected);
}

function divide4() {
    let expected = [new Divide(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var / ");
    assert.deepStrictEqual(actual, expected);
}

function compare1(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var == atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare2(testObject: TestSuite.Object) {
    let expected = [new Compare(new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom == atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare3(testObject: TestSuite.Object) {
    let expected = [new Compare(null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" == atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare4(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var == ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare5(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), new Atom("atom"), {not: true})];
    let [actual, _] = ErlangJs.tokenise("Var /= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare6(testObject: TestSuite.Object) {
    let expected = [new Compare(new Atom("atom"), new Atom("atom"), {not: true})];
    let [actual, _] = ErlangJs.tokenise("atom /= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare7(testObject: TestSuite.Object) {
    let expected = [new Compare(null, new Atom("atom"), {not: true})];
    let [actual, _] = ErlangJs.tokenise(" /= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare8(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), null, {not: true})];
    let [actual, _] = ErlangJs.tokenise("Var /= ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare9(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), new Atom("atom"), {exact: true})];
    let [actual, _] = ErlangJs.tokenise("Var =:= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare10(testObject: TestSuite.Object) {
    let expected = [new Compare(new Atom("atom"), new Atom("atom"), {exact: true})];
    let [actual, _] = ErlangJs.tokenise("atom =:= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare11(testObject: TestSuite.Object) {
    let expected = [new Compare(null, new Atom("atom"), {exact: true})];
    let [actual, _] = ErlangJs.tokenise(" =:= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare12(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), null, {exact: true})];
    let [actual, _] = ErlangJs.tokenise("Var =:= ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare13(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), new Atom("atom"), {exact: true, not: true})];
    let [actual, _] = ErlangJs.tokenise("Var =/= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare14(testObject: TestSuite.Object) {
    let expected = [new Compare(new Atom("atom"), new Atom("atom"), {exact: true, not: true})];
    let [actual, _] = ErlangJs.tokenise("atom =/= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare15(testObject: TestSuite.Object) {
    let expected = [new Compare(null, new Atom("atom"), {exact: true, not: true})];
    let [actual, _] = ErlangJs.tokenise(" =/= atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function compare16(testObject: TestSuite.Object) {
    let expected = [new Compare(new Variable("Var"), null, {exact: true, not: true})];
    let [actual, _] = ErlangJs.tokenise("Var =/= ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

/*********************/
/* Boolean Operators */
/*********************/

function and1(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.AND, new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var and atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function and2(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.AND, new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom and atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function and3(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.AND, null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" and atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function and4(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.AND, new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var and ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function andAlso1(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ANDALSO, new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var andalso atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function andAlso2(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ANDALSO, new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom andalso atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function andAlso3(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ANDALSO, null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" andalso atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function andAlso4(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ANDALSO, new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var andalso ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function or1(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.OR, new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var or atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function or2(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.OR, new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom or atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function or3(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.OR, null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" or atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function or4(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.OR, new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var or ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function orElse1(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ORELSE, new Variable("Var"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("Var orelse atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function orElse2(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ORELSE, new Atom("atom"), new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise("atom orelse atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function orElse3(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ORELSE, null, new Atom("atom"))];
    let [actual, _] = ErlangJs.tokenise(" orelse atom");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function orElse4(testObject: TestSuite.Object) {
    let expected = [new BooleanOp(BooleanOp.Type.ORELSE, new Variable("Var"), null)];
    let [actual, _] = ErlangJs.tokenise("Var orelse ");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

/***************/
/* Expressions */
/***************/

function anonymousFunction1() {
    let funName = Keyword.parse(new Atom("fun"));
    let expected = [new Fun(funName, [], [new Fun.Case(new Parenthesis(), new Atom("ok"))], true)];
    let [actual, _] = ErlangJs.tokenise("fun() -> ok end");
    assert.deepStrictEqual(actual, expected);
}

function anonymousFunction2(testObject: TestSuite.Object) {
    let funName = Keyword.parse(new Atom("fun"));
    let expected = [new Fun(funName, [], [
        new Fun.Case(new Parenthesis(new Integer(1)), new Tuple(new Atom("ok"), new Atom("case1"))),
        new Fun.Case(new Parenthesis(new Integer(2)), new Tuple(new Atom("ok"), new Atom("case2"))),
        new Fun.Case(new Parenthesis(new Integer(3)), new Tuple(new Atom("ok"), new Atom("case3"))),
        new Fun.Case(new Parenthesis(new Variable("_")), new Tuple(new Atom("error"), new Atom("badarg"))),
    ], true)];
    let [actual, _] = ErlangJs.tokenise(`fun
        (1) -> {ok, case1};
        (2) -> {ok, case2};
        (3) -> {ok, case3};
        (_) -> {error, badarg}
    end`);
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function anonymousFunction3(testObject: TestSuite.Object) {
    let funName = Keyword.parse(new Atom("fun"));
    let expected = [new Fun(funName, [], [
        new Fun.Case(new Parenthesis(), ...[
            new Atom("first"), new Delimiter(","),
            new Atom("second"), new Delimiter(","),
            new Atom("third"),
        ]),
    ], true)];
    let [actual, _] = ErlangJs.tokenise(`fun() ->
        first,
        second,
        third
    end`);
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function addXAndY(testObject: TestSuite.Object) {
    let expected = [new Fun(
        new Atom("add"), 
        [],
        [new Fun.Case(
            new Parenthesis(new Variable("X"), new Variable("Y")),
            ...[new Add(new Variable("X"), new Variable("Y"))]
        )]
    )];
    let [actual, _] = ErlangJs.tokenise(`
        add(X, Y) ->
            X + Y.
    `);
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}