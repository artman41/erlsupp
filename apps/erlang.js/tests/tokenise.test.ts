import * as assert from 'assert';
import { TestSuite, TestSuiteCollection } from './test_suite';
import { ErlangJs } from '../src/erlangJs';
import { LinePosition } from '../src/erlangJs/lexer/line_position';
import {
    Symbol,
    Atom,
    Variable,
    Number
} from "../src/erlangJs/lexer/tokens";

new TestSuiteCollection("Stage One", [
    new TestSuite("Terms", [
        new TestSuite.Test("Atom (1)", stageOne_atom1),
        new TestSuite.Test("Atom (2)", stageOne_atom2),
        new TestSuite.Test("Variable (1)", stageOne_variable1),
        new TestSuite.Test("Variable (2)", stageOne_variable2),
        new TestSuite.Test("Integer (1)", stageOne_integer1),
        new TestSuite.Test("Float (1)", stageOne_float1),
        new TestSuite.Test("Float (2)", stageOne_float2),
        new TestSuite.Test("Tuple (1)", stageOne_tuple1),
        new TestSuite.Test("Tuple (2)", stageOne_tuple2),
        new TestSuite.Test("Tuple (3)", stageOne_tuple3),
        new TestSuite.Test("Tuple (4)", stageOne_tuple4),
        new TestSuite.Test("List (1)", stageOne_list1),
        new TestSuite.Test("List (2)", stageOne_list2),
        new TestSuite.Test("List (3)", stageOne_list3),
        new TestSuite.Test("List (4)", stageOne_list4),
        new TestSuite.Test("Parenthesis (1)", stageOne_parenthesis1),
        new TestSuite.Test("Parenthesis (2)", stageOne_parenthesis2),
        new TestSuite.Test("Parenthesis (3)", stageOne_parenthesis3),
        new TestSuite.Test("Parenthesis (4)", stageOne_parenthesis4),
        new TestSuite.Test("Map (1)", stageOne_map1),
        new TestSuite.Test("Map (2)", stageOne_map2),
        new TestSuite.Test("Map (3)", stageOne_map3),
        new TestSuite.Test("Map (4)", stageOne_map4),
    ]),
    new TestSuite("Operators", [
        new TestSuite.Test("Setter (1)", stageOne_setter1),
        new TestSuite.Test("Setter (2)", stageOne_setter2),
        new TestSuite.Test("Setter (3)", stageOne_setter3),
        new TestSuite.Test("Setter (4)", stageOne_setter4),
        new TestSuite.Test("Append (1)", stageOne_append1),
        new TestSuite.Test("Append (2)", stageOne_append2),
        new TestSuite.Test("Append (3)", stageOne_append3),
        new TestSuite.Test("Append (4)", stageOne_append4),
        new TestSuite.Test("Subtract (1)", stageOne_subtract1),
        new TestSuite.Test("Subtract (2)", stageOne_subtract2),
        new TestSuite.Test("Subtract (3)", stageOne_subtract3),
        new TestSuite.Test("Subtract (4)", stageOne_subtract4),
        new TestSuite.Test("Add (1)", stageOne_add1),
        new TestSuite.Test("Add (2)", stageOne_add2),
        new TestSuite.Test("Add (3)", stageOne_add3),
        new TestSuite.Test("Add (4)", stageOne_add4),
        new TestSuite.Test("Minus (1)", stageOne_minus1),
        new TestSuite.Test("Minus (2)", stageOne_minus2),
        new TestSuite.Test("Minus (3)", stageOne_minus3),
        new TestSuite.Test("Minus (4)", stageOne_minus4),
        new TestSuite.Test("Multiply (1)", stageOne_multiply1),
        new TestSuite.Test("Multiply (2)", stageOne_multiply2),
        new TestSuite.Test("Multiply (3)", stageOne_multiply3),
        new TestSuite.Test("Multiply (4)", stageOne_multiply4),
        new TestSuite.Test("Divide (1)", stageOne_divide1),
        new TestSuite.Test("Divide (2)", stageOne_divide2),
        new TestSuite.Test("Divide (3)", stageOne_divide3),
        new TestSuite.Test("Divide (4)", stageOne_divide4),
    ]),
    new TestSuite("Comparators", [
        new TestSuite.Test("Equal (1)", stageOne_equal1),
        new TestSuite.Test("Equal (2)", stageOne_equal2),
        new TestSuite.Test("Equal (3)", stageOne_equal3),
        new TestSuite.Test("Equal (4)", stageOne_equal4),
        new TestSuite.Test("Not Equal (1)", stageOne_nequal1),
        new TestSuite.Test("Not Equal (2)", stageOne_nequal2),
        new TestSuite.Test("Not Equal (3)", stageOne_nequal3),
        new TestSuite.Test("Not Equal (4)", stageOne_nequal4),
        new TestSuite.Test("Exactly Equal (1)", stageOne_exequal1),
        new TestSuite.Test("Exactly Equal (2)", stageOne_exequal2),
        new TestSuite.Test("Exactly Equal (3)", stageOne_exequal3),
        new TestSuite.Test("Exactly Equal (4)", stageOne_exequal4),
        new TestSuite.Test("Exactly Not Equal (1)", stageOne_exnequal1),
        new TestSuite.Test("Exactly Not Equal (2)", stageOne_exnequal2),
        new TestSuite.Test("Exactly Not Equal (3)", stageOne_exnequal3),
        new TestSuite.Test("Exactly Not Equal (4)", stageOne_exnequal4),
    ]),
    new TestSuite("Boolean Operators", [
        new TestSuite.Test("And (1)", stageOne_and1),
        new TestSuite.Test("And (2)", stageOne_and2),
        new TestSuite.Test("And (3)", stageOne_and3),
        new TestSuite.Test("And (4)", stageOne_and4),
        new TestSuite.Test("AndAlso (1)", stageOne_andAlso1),
        new TestSuite.Test("AndAlso (2)", stageOne_andAlso2),
        new TestSuite.Test("AndAlso (3)", stageOne_andAlso3),
        new TestSuite.Test("AndAlso (4)", stageOne_andAlso4),
        new TestSuite.Test("Or (1)", stageOne_or1),
        new TestSuite.Test("Or (2)", stageOne_or2),
        new TestSuite.Test("Or (3)", stageOne_or3),
        new TestSuite.Test("Or (4)", stageOne_or4),
        new TestSuite.Test("OrElse (1)", stageOne_orElse1),
        new TestSuite.Test("OrElse (2)", stageOne_orElse2),
        new TestSuite.Test("OrElse (3)", stageOne_orElse3),
        new TestSuite.Test("OrElse (4)", stageOne_orElse4),
    ]),
    new TestSuite("Expressions", [
        new TestSuite.Test("Anonymous Function (1)", stageOne_anonymousFunction1),
        new TestSuite.Test("Anonymous Function (2)", stageOne_anonymousFunction2),
        new TestSuite.Test("Anonymous Function (3)", stageOne_anonymousFunction3),
        new TestSuite.Test("Add X and Y",            stageOne_addXAndY),
    ]),
]).run();

/***************/
/*    Terms    */
/***************/

function stageOne_atom1() {
    let expected = [new Atom("good_atom", new LinePosition(1, 1))];
    let actual = ErlangJs.tokenise("good_atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_atom2() {
    let expected = [new Atom("good atom", new LinePosition(1, 1))];
    let actual = ErlangJs.tokenise("'good atom'");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_variable1() {
    let expected = [new Variable("GOOD_VAR", new LinePosition(1, 1))];
    let actual = ErlangJs.tokenise("GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_variable2() {
    let expected = [new Variable("_GOOD_VAR", new LinePosition(1, 1))];
    let actual = ErlangJs.tokenise("_GOOD_VAR");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_integer1() {
    let expected = [new Number(1, new LinePosition(1, 1))];
    let actual = ErlangJs.tokenise("1");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_float1(testObject: TestSuite.Object) {
    let expected = [new Number(1, new LinePosition(1, 1)), new Symbol(".", new LinePosition(1, 2)), new Number(0, new LinePosition(1, 3))];
    let actual = ErlangJs.tokenise("1.0");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function stageOne_float2(testObject: TestSuite.Object) {
    let expected = [new Number(1, new LinePosition(1, 1)), new Symbol(".", new LinePosition(1, 2)), new Number(1, new LinePosition(1, 3))];
    let actual = ErlangJs.tokenise("1.1");
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function stageOne_tuple1() {
    let expected = [
        new Symbol("{", new LinePosition(1, 1)), 
        new Symbol("}", new LinePosition(1, 2))
    ];
    let actual = ErlangJs.tokenise("{}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_tuple2() {
    let expected = [
        new Symbol("{",  new LinePosition(1, 1)),
        new Atom("atom", new LinePosition(1, 2)),
        new Symbol("}",  new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise("{atom}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_tuple3() {
    let expected = [
        new Symbol("{",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Atom("atom2", new LinePosition(1, 9)),
        new Symbol("}",   new LinePosition(1, 14))
    ];
    let actual = ErlangJs.tokenise("{atom1, atom2}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_tuple4() {
    let expected = [
        new Symbol("{",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Symbol("{",   new LinePosition(1, 9)),
        new Atom("atom2", new LinePosition(1, 10)),
        new Symbol("}",   new LinePosition(1, 15)),
        new Symbol("}",   new LinePosition(1, 16))
    ];
    let actual = ErlangJs.tokenise("{atom1, {atom2}}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_list1() {
    let expected = [
        new Symbol("[", new LinePosition(1, 1)), 
        new Symbol("]", new LinePosition(1, 2))
    ];
    let actual = ErlangJs.tokenise("[]");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_list2() {
    let expected = [
        new Symbol("[",  new LinePosition(1, 1)),
        new Atom("atom", new LinePosition(1, 2)),
        new Symbol("]",  new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise("[atom]");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_list3() {
    let expected = [
        new Symbol("[",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Atom("atom2", new LinePosition(1, 9)),
        new Symbol("]",   new LinePosition(1, 14))
    ];
    let actual = ErlangJs.tokenise("[atom1, atom2]");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_list4() {
    let expected = [
        new Symbol("[",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Symbol("[",   new LinePosition(1, 9)),
        new Atom("atom2", new LinePosition(1, 10)),
        new Symbol("]",   new LinePosition(1, 15)),
        new Symbol("]",   new LinePosition(1, 16))
    ];
    let actual = ErlangJs.tokenise("[atom1, [atom2]]");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_parenthesis1() {
    let expected = [
        new Symbol("(", new LinePosition(1, 1)), 
        new Symbol(")", new LinePosition(1, 2))
    ];
    let actual = ErlangJs.tokenise("()");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_parenthesis2() {
    let expected = [
        new Symbol("(",  new LinePosition(1, 1)),
        new Atom("atom", new LinePosition(1, 2)),
        new Symbol(")",  new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise("(atom)");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_parenthesis3() {
    let expected = [
        new Symbol("(",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Atom("atom2", new LinePosition(1, 9)),
        new Symbol(")",   new LinePosition(1, 14))
    ];
    let actual = ErlangJs.tokenise("(atom1, atom2)");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_parenthesis4() {
    let expected = [
        new Symbol("(",   new LinePosition(1, 1)),
        new Atom("atom1", new LinePosition(1, 2)),
        new Symbol(",",   new LinePosition(1, 7)),
        new Symbol("(",   new LinePosition(1, 9)),
        new Atom("atom2", new LinePosition(1, 10)),
        new Symbol(")",   new LinePosition(1, 15)),
        new Symbol(")",   new LinePosition(1, 16))
    ];
    let actual = ErlangJs.tokenise("(atom1, (atom2))");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_map1() {
    let expected = [
        new Symbol("#", new LinePosition(1, 1)),
        new Symbol("{", new LinePosition(1, 2)), 
        new Symbol("}", new LinePosition(1, 3))
    ];
    let actual = ErlangJs.tokenise("#{}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_map2() {
    let expected = [
        new Symbol("#" , new LinePosition(1, 1)),
        new Symbol("{",  new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 3)),
        new Symbol("=>", new LinePosition(1, 8)),
        new Number(1,    new LinePosition(1, 11)),
        new Symbol("}",  new LinePosition(1, 12))
    ];
    let actual = ErlangJs.tokenise("#{atom => 1}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_map3() {
    let expected = [
        new Symbol("#",   new LinePosition(1, 1)),
        new Symbol("{",   new LinePosition(1, 2)),
        new Atom("atom1", new LinePosition(1, 3)),
        new Symbol("=>",  new LinePosition(1, 9)),
        new Number(1,     new LinePosition(1, 12)),
        new Symbol(",",   new LinePosition(1, 13)),
        new Atom("atom2", new LinePosition(1, 15)),
        new Symbol("=>",  new LinePosition(1, 21)),
        new Number(2,     new LinePosition(1, 24)),
        new Symbol("}",   new LinePosition(1, 25))
    ];
    let actual = ErlangJs.tokenise("#{atom1 => 1, atom2 => 2}");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_map4() {
    let expected = [
        new Symbol("#",   new LinePosition(1, 1)),
        new Symbol("{",   new LinePosition(1, 2)),
        new Atom("atom1", new LinePosition(1, 3)),
        new Symbol("=>",  new LinePosition(1, 9)),
        new Symbol("#",   new LinePosition(1, 12)),
        new Symbol("{",   new LinePosition(1, 13)),
        new Atom("atom2", new LinePosition(1, 15)),
        new Symbol("=>",  new LinePosition(1, 21)),
        new Number(2,     new LinePosition(1, 24)),
        new Symbol("}",   new LinePosition(1, 26)),
        new Symbol("}",   new LinePosition(1, 27))
    ];
    let actual = ErlangJs.tokenise("#{atom1 => #{ atom2 => 2 }}");
    assert.deepStrictEqual(actual, expected);
}

/*************/
/* Operators */
/*************/

function stageOne_setter1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Symbol("=",     new LinePosition(1, 5)), 
        new Atom("atom",    new LinePosition(1, 7))
    ];
    let actual = ErlangJs.tokenise("Var = atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_setter2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)), 
        new Symbol("=",  new LinePosition(1, 6)), 
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("atom = atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_setter3() {
    let expected = [
        new Symbol("=",     new LinePosition(1, 2)),
        new Atom("atom",    new LinePosition(1, 4))
    ];
    let actual = ErlangJs.tokenise(" = atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_setter4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("=",     new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var = ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_append1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("++",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("Var ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_append2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("++", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("atom ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_append3() {
    let expected = [
        new Symbol("++", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise(" ++ atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_append4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("++",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var ++ ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_subtract1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("--",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("Var -- atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_subtract2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("--", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("atom -- atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_subtract3() {
    let expected = [
        new Symbol("--", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise(" -- atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_subtract4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("--",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var -- ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_add1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("+",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 7))
    ];
    let actual = ErlangJs.tokenise("Var + atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_add2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("+", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("atom + atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_add3() {
    let expected = [
        new Symbol("+", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 4))
    ];
    let actual = ErlangJs.tokenise(" + atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_add4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("+",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var + ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_minus1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("-",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 7))
    ];
    let actual = ErlangJs.tokenise("Var - atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_minus2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("-", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("atom - atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_minus3() {
    let expected = [
        new Symbol("-", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 4))
    ];
    let actual = ErlangJs.tokenise(" - atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_minus4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("-",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var - ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_multiply1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("*",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 7))
    ];
    let actual = ErlangJs.tokenise("Var * atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_multiply2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("*", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("atom * atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_multiply3() {
    let expected = [
        new Symbol("*", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 4))
    ];
    let actual = ErlangJs.tokenise(" * atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_multiply4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("*",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var * ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_divide1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("/",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 7))
    ];
    let actual = ErlangJs.tokenise("Var / atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_divide2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("/", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("atom / atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_divide3() {
    let expected = [
        new Symbol("/", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 4))
    ];
    let actual = ErlangJs.tokenise(" / atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_divide4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("/",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var / ");
    assert.deepStrictEqual(actual, expected);
}

/***************/
/* Comparators */
/***************/

function stageOne_equal1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("==",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("Var == atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_equal2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("==", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("atom == atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_equal3() {
    let expected = [
        new Symbol("==", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise(" == atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_equal4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("==",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var == ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_nequal1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("/=",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("Var /= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_nequal2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("/=", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("atom /= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_nequal3() {
    let expected = [
        new Symbol("/=", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise(" /= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_nequal4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("/=",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var /= ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exequal1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("=:=",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("Var =:= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exequal2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("=:=", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 10))
    ];
    let actual = ErlangJs.tokenise("atom =:= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exequal3() {
    let expected = [
        new Symbol("=:=", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise(" =:= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exequal4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("=:=",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var =:= ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exnequal1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("=/=",    new LinePosition(1, 5)),
        new Atom("atom",    new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("Var =/= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exnequal2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)),
        new Symbol("=/=", new LinePosition(1, 6)),
        new Atom("atom", new LinePosition(1, 10))
    ];
    let actual = ErlangJs.tokenise("atom =/= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exnequal3() {
    let expected = [
        new Symbol("=/=", new LinePosition(1, 2)),
        new Atom("atom", new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise(" =/= atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_exnequal4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)),
        new Symbol("=/=",    new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var =/= ");
    assert.deepStrictEqual(actual, expected);
}

/*********************/
/* Boolean Operators */
/*********************/

function stageOne_and1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("and", new LinePosition(1, 5)), 
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("Var and atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_and2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)), 
        new Atom("and", new LinePosition(1, 6)), 
        new Atom("atom", new LinePosition(1, 10))
    ];
    let actual = ErlangJs.tokenise("atom and atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_and3() {
    let expected = [
        new Atom("and", new LinePosition(1, 2)), 
        new Atom("atom", new LinePosition(1, 6))
    ];
    let actual = ErlangJs.tokenise(" and atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_and4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("and", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var and ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_andAlso1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("andalso", new LinePosition(1, 5)), 
        new Atom("atom", new LinePosition(1, 13))
    ];
    let actual = ErlangJs.tokenise("Var andalso atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_andAlso2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)), 
        new Atom("andalso", new LinePosition(1, 6)), 
        new Atom("atom", new LinePosition(1, 14))
    ];
    let actual = ErlangJs.tokenise("atom andalso atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_andAlso3() {
    let expected = [
        new Atom("andalso", new LinePosition(1, 2)), 
        new Atom("atom", new LinePosition(1, 10))
    ];
    let actual = ErlangJs.tokenise(" andalso atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_andAlso4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("andalso", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var andalso ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_or1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("or", new LinePosition(1, 5)), 
        new Atom("atom", new LinePosition(1, 8))
    ];
    let actual = ErlangJs.tokenise("Var or atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_or2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)), 
        new Atom("or", new LinePosition(1, 6)), 
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise("atom or atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_or3() {
    let expected = [
        new Atom("or", new LinePosition(1, 2)), 
        new Atom("atom", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise(" or atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_or4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("or", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var or ");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_orElse1() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("orelse", new LinePosition(1, 5)), 
        new Atom("atom", new LinePosition(1, 12))
    ];
    let actual = ErlangJs.tokenise("Var orelse atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_orElse2() {
    let expected = [
        new Atom("atom", new LinePosition(1, 1)), 
        new Atom("orelse", new LinePosition(1, 6)), 
        new Atom("atom", new LinePosition(1, 13))
    ];
    let actual = ErlangJs.tokenise("atom orelse atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_orElse3() {
    let expected = [
        new Atom("orelse", new LinePosition(1, 2)), 
        new Atom("atom", new LinePosition(1, 9))
    ];
    let actual = ErlangJs.tokenise(" orelse atom");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_orElse4() {
    let expected = [
        new Variable("Var", new LinePosition(1, 1)), 
        new Atom("orelse", new LinePosition(1, 5))
    ];
    let actual = ErlangJs.tokenise("Var orelse ");
    assert.deepStrictEqual(actual, expected);
}

/***************/
/* Expressions */
/***************/

function stageOne_anonymousFunction1() {
    let expected = [
        new Atom("fun",  new LinePosition(1, 1)), 
        new Symbol("(",  new LinePosition(1, 4)), 
        new Symbol(")",  new LinePosition(1, 5)), 
        new Symbol("->", new LinePosition(1, 7)), 
        new Atom("ok",   new LinePosition(1, 10)), 
        new Atom("end",  new LinePosition(1, 13))
    ];
    let actual = ErlangJs.tokenise("fun() -> ok end");
    assert.deepStrictEqual(actual, expected);
}

function stageOne_anonymousFunction2(testObject: TestSuite.Object) {
    let expected = [
        new Atom("fun",   new LinePosition(1, 1)),
        // case 1
        new Symbol("(",   new LinePosition(2, 9)),
        new Number(1,     new LinePosition(2, 10)),
        new Symbol(")",   new LinePosition(2, 11)),
        new Symbol("->",  new LinePosition(2, 13)),
        new Symbol("{",   new LinePosition(2, 16)),
        new Atom("ok",    new LinePosition(2, 17)),
        new Symbol(",",   new LinePosition(2, 19)),
        new Atom("case1", new LinePosition(2, 21)),
        new Symbol("}",   new LinePosition(2, 26)),
        new Symbol(";",   new LinePosition(2, 27)), 
        // case 2
        new Symbol("(",   new LinePosition(3, 9)),
        new Number(2,     new LinePosition(3, 10)),
        new Symbol(")",   new LinePosition(3, 11)),
        new Symbol("->",  new LinePosition(3, 13)),
        new Symbol("{",   new LinePosition(3, 16)),
        new Atom("ok",    new LinePosition(3, 17)),
        new Symbol(",",   new LinePosition(3, 19)),
        new Atom("case2", new LinePosition(3, 21)),
        new Symbol("}",   new LinePosition(3, 26)),
        new Symbol(";",   new LinePosition(3, 27)), 
        // case 3
        new Symbol("(",   new LinePosition(4, 9)),
        new Number(3,     new LinePosition(4, 10)),
        new Symbol(")",   new LinePosition(4, 11)),
        new Symbol("->",  new LinePosition(4, 13)),
        new Symbol("{",   new LinePosition(4, 16)),
        new Atom("ok",    new LinePosition(4, 17)),
        new Symbol(",",   new LinePosition(4, 19)),
        new Atom("case3", new LinePosition(4, 21)),
        new Symbol("}",   new LinePosition(4, 26)),
        new Symbol(";",   new LinePosition(4, 27)), 
        // case 4
        new Symbol("(",    new LinePosition(5, 9)),
        new Variable("_",  new LinePosition(5, 10)),
        new Symbol(")",    new LinePosition(5, 11)),
        new Symbol("->",   new LinePosition(5, 13)),
        new Symbol("{",    new LinePosition(5, 16)),
        new Atom("error",  new LinePosition(5, 17)),
        new Symbol(",",    new LinePosition(5, 22)),
        new Atom("badarg", new LinePosition(5, 24)),
        new Symbol("}",    new LinePosition(5, 30)),
    new Atom("end",    new LinePosition(6, 5))
    ];
    let actual = ErlangJs.tokenise(`fun
        (1) -> {ok, case1};
        (2) -> {ok, case2};
        (3) -> {ok, case3};
        (_) -> {error, badarg}
    end`);
    testObject.log(expected, actual)
    assert.deepStrictEqual(actual, expected);
}

function stageOne_anonymousFunction3(testObject: TestSuite.Object) {
    let expected = [
        new Atom("fun",    new LinePosition(1, 1)),
        // Function Header
        new Symbol("(",    new LinePosition(1, 4)),
        new Symbol(")",    new LinePosition(1, 5)),
        new Symbol("->",   new LinePosition(1, 7)),
        // Body
        new Atom("first",  new LinePosition(2, 9)),
        new Symbol(",",    new LinePosition(2, 14)),
        new Atom("second", new LinePosition(3, 9)),
        new Symbol(",",    new LinePosition(3, 15)),
        new Atom("third",  new LinePosition(4, 9)),

        new Atom("end",    new LinePosition(5, 5))
    ];
    let actual = ErlangJs.tokenise(`fun() ->
        first,
        second,
        third
    end`);
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}

function stageOne_addXAndY(testObject: TestSuite.Object) {
    let expected = [
        new Atom("add",    new LinePosition(2, 9)),
        // Function Header
        new Symbol("(",    new LinePosition(2, 12)),
        new Variable("X",  new LinePosition(2, 13)),
        new Symbol(",",    new LinePosition(2, 14)),
        new Variable("Y",  new LinePosition(2, 16)),
        new Symbol(")",    new LinePosition(2, 17)),
        new Symbol("->",   new LinePosition(2, 19)),
        // Body
        new Variable("X",  new LinePosition(3, 13)),
        new Symbol("+",    new LinePosition(3, 15)),
        new Variable("Y",  new LinePosition(3, 17)),
        new Symbol(".",    new LinePosition(3, 18)),
    ];
    let actual = ErlangJs.tokenise(`
        add(X, Y) ->
            X + Y.
    `);
    testObject.log(expected, actual);
    assert.deepStrictEqual(actual, expected);
}