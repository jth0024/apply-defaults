import sinon from 'sinon';
import test from 'ava';
import { isFunction } from 'lodash';
import applyDefaults from './index';

test('given no args, it returns a fn', t => {
  const fn = applyDefaults();
  t.true(isFunction(fn));
});

test('given defaults, it returns a fn', t => {
  const fn = applyDefaults({});
  t.true(isFunction(fn));
});

test('given defaults and customizer, it returns a fn', t => {
  const customizer = () => 'baz';
  const defaults = { foo: 'baz' };
  const fn = applyDefaults(defaults, customizer);
  t.true(isFunction(fn));
});

test('given no args, it returns a fn that returns target', t => {
  const target = { foo: 'bar' };
  const result = applyDefaults()(target);
  t.is(result, target);
});

test('given defaults = "", it returns a function that returns target', t => {
  const target = { foo: 'bar' };
  const result = applyDefaults('fooie')(target);
  t.is(result, target);
});

test('given defaults and customizer, it returns a fn that invokes customizer', t => {
  const customizer = sinon.spy(() => 'bar');
  const defaults = { foo: 'baz' };
  const target = { foo: 'bar' };
  applyDefaults(defaults, customizer)(target);
  t.true(customizer.called);
});

test('given defaults, it returns a fn that overwrites target keys that have undefined values', t => {
  const target = { foo: undefined };
  const defaults = { foo: 'baz' };
  const expected = { foo: 'baz' };
  const result = applyDefaults(defaults)(target);
  t.deepEqual(result, expected);
});

test('given defaults, it returns a fn that preserves target keys that have defined values', t => {
  const target = { foo: 'bar' };
  const defaults = { foo: 'baz' };
  const result = applyDefaults(defaults)(target);
  t.deepEqual(target, result);
});
