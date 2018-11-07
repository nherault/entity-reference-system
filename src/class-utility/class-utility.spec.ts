import { applyMixins, deepCopy, initializer, reset } from './class-utility';

describe('class-utility', () => {
  describe('initializer', () => {

    it('initializer - destination empty', () => {
      expect(initializer(
        {},
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
    });

    it('initializer - destination with own data', () => {
      expect(initializer(
        { ownProps1: 'ownProps1', ownProps2: 'ownProps2' },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({
          deepProperties:
            { props1: 'props1', array: ['a', 'b', 'c'] },
          id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });

    it('initializer - destination with mix own data / same data', () => {
      expect(initializer(
        {
          deepProperties: { otherProps: 'otherProps' },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({
          deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
          id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });

    it('Destructuring - destination with mix own data / same data', () => {
      expect(
        {
          deepProperties: { otherProps: 'otherProps' },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
          ...{ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } },
        })
        .toEqual({
          deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
          id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });
  });

  describe('deepCopy', () => {
    it('deepCopy - destination empty', () => {
      expect(deepCopy(
        {},
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
    });

    it('deepCopy - destination with own data', () => {
      expect(deepCopy(
        { ownProps1: 'ownProps1', ownProps2: 'ownProps2' },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({
          deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] },
          id: 10, label: 'name',
          ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });

    it('deepCopy - destination with mix own data / same data', () => {
      expect(deepCopy(
        {
          deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e'] },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        },
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({
          deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', 'a', 'b', 'c'] },
          id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });

    it('deepCopy - destination with source array', () => {
      expect(deepCopy(
        {
          deepProperties: { otherProps: 'otherProps' },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        },
        [{ id: 10, label: 'name' }, { deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }]))
        .toEqual({
          deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'b', 'c'] },
          id: 10, label: 'name', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });
  });

  describe('reset', () => {
    it('reset', () => {
      expect(reset(
        {
          deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        },
        {
          deepProperties: { props1: 'props1', array: ['a', 'b', 'c', { a: 3, b: 2, c: 4 }] },
          id: 10, label: 'name',
        }))
        .toEqual({
          deepProperties: { props1: undefined, otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
          id: undefined, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });

    it('reset - without reseting unknown properties', () => {
      expect(reset(
        {
          deepProperties: { otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
          label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        },
        {
          deepProperties: { props1: 'props1', array: ['a', 'b', 'c', { a: 3, b: 2, c: 4 }] },
          id: 10, label: 'name',
        }, false))
        .toEqual({
          deepProperties: { props1: 'props1', otherProps: 'otherProps', array: ['a', 'd', 'e', { a: 1, b: 2 }] },
          id: 10, label: 'oldName', ownProps1: 'ownProps1', ownProps2: 'ownProps2',
        });
    });
  });

  describe('applyMixins', () => {
    it('applyMixins', () => {
      expect(applyMixins(
        {},
        { id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } }))
        .toEqual({ id: 10, label: 'name', deepProperties: { props1: 'props1', array: ['a', 'b', 'c'] } });
    });
  });
});
