import * as assert from 'assert';
import * as util from 'util';

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
    testObject: TestSuite.Object

    constructor(suiteName: string, tests: TestSuite.Test[], options?: TestSuite.Options) {
        this.suiteName = suiteName;
        this.tests = tests;
        this.testObject = new TestSuite.Object(options === undefined ? {} : options);
    }

    runSuite(): Mocha.Suite {
        return describe(this.suiteName, () => {
            if(this.testObject.debug)
                console.log("\n== Running suite %O ==", this.suiteName);
            for (const test of this.tests) {
                test.runTest(this.testObject);
            }
        })
    }
}

export namespace TestSuite {
    export type Options = {
        debug?: boolean
    }
    export class Object {
        debug: boolean;

        constructor(options: TestSuite.Options) {
            this.debug = options.debug !== undefined && options.debug;
        }

        log(expected: any, actual: any) {
            if(!this.debug)
                return;
            console.log("Expected: %s", util.inspect(expected, true, 50, true));
            console.log("Actual: %s", util.inspect(actual, true, 50, true));
        }
    }
    export class Test {
        testName: string;
        testFunc: (testObject: TestSuite.Object) => any;
        testObject: TestSuite.Object | null

        constructor(testName: string, testFunc?: (testObject: TestSuite.Object) => any, options?: TestSuite.Options) {
            this.testName = testName;
            if(testFunc === undefined)
                this.testFunc = this.__instantFailure;
            else
                this.testFunc = testFunc;
            this.testObject = options === undefined ? null : new TestSuite.Object(options);
        }

        runTest(testObject: TestSuite.Object): Mocha.Test {
            return it(this.testName, () => {
                let tObject = this.testObject === null ? testObject : this.testObject;
                if(tObject.debug)
                    console.log("\n-- Running test %O --", this.testName);
                this.testFunc(tObject)
            });
        }

        private __instantFailure() {
            assert.fail("Not Implemented");
        }
    }
}