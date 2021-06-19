import * as assert from 'assert';

export class TestSuiteCollection {
    suites: TestSuite[]

    constructor(suites: TestSuite[]) {
        this.suites = suites;
    }

    run(): void {
        for (const suite of this.suites) {
            suite.runSuite();
        }
    }
}

export class TestSuite {
    suiteName: string;
    tests: TestSuite.Test[]

    constructor(suiteName: string, tests: TestSuite.Test[]) {
        this.suiteName = suiteName;
        this.tests = tests;
    }

    runSuite(): Mocha.Suite {
        return describe(this.suiteName, () => {
            for (const test of this.tests) {
                test.runTest();
            }
        })
    }
}

export namespace TestSuite {
    export class Test {
        testName: string;
        testFunc: () => any;

        constructor(testName: string, testFunc?: () => any) {
            this.testName = testName;
            if(testFunc === undefined)
                this.testFunc = this.__instantFailure;
            else
                this.testFunc = testFunc;
        }

        runTest(): Mocha.Test {
            return it(this.testName, this.testFunc);
        }

        private __instantFailure() {
            assert.fail("Not Implemented");
        }
    }
}