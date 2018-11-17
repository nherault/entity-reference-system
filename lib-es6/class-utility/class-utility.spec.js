var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { applyMixins, deepCopy, initializer, reset } from './class-utility';
describe('class-utility', function () {
    describe('initializer', function () {
        it('initializer - destination empty', function () {
            expect(initializer({}, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
        });
        it('initializer - destination with own data', function () {
            expect(initializer({ ownProps1: 'ownProps1', ownProps2: 'ownProps2' }, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
                id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
        it('initializer - destination with mix own data / same data', function () {
            expect(initializer({
                deepProperties: { otherProps: 'otherProps' },
                label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            }, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
                id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
        it('Destructuring - destination with mix own data / same data', function () {
            expect(__assign({ deepProperties: { otherProps: 'otherProps' }, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2' }, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
                id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
    });
    describe('deepCopy', function () {
        it('deepCopy - destination empty', function () {
            expect(deepCopy({}, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
        });
        it('deepCopy - destination with own data', function () {
            expect(deepCopy({ ownProps1: 'ownProps1', ownProps2: 'ownProps2' }, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
                id: 10, label: 'name',
                ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
        it('deepCopy - destination with mix own data / same data', function () {
            expect(deepCopy({
                deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e'] },
                label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            }, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({
                deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', 'a', 'b', 'c'] },
                id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
        it('deepCopy - destination with source array', function () {
            expect(deepCopy({
                deepProperties: { otherProps: 'otherProps' },
                label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            }, [{ id: 10, label: 'name' }, { deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }]))
                .toEqual({
                deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'b', 'c'] },
                id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
    });
    describe('reset', function () {
        it('reset', function () {
            expect(reset({
                deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
                label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            }, {
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c', { a: 3, b: 2, c: 4 }] },
                id: 10, label: 'name',
            }))
                .toEqual({
                deepProperties: { props1: undefined, otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
                id: undefined, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
        it('reset - without reseting unknown properties', function () {
            expect(reset({
                deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
                label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            }, {
                deepProperties: { props1: 'props1', array: ['a', 'b', 'c', { a: 3, b: 2, c: 4 }] },
                id: 10, label: 'name',
            }, false))
                .toEqual({
                deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
                id: 10, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
            });
        });
    });
    describe('applyMixins', function () {
        it('applyMixins', function () {
            expect(applyMixins({}, { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
                .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
        });
    });
});
//# sourceMappingURL=../../src/src/class-utility/class-utility.spec.js.map