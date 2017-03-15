import { isNil, isFunction, isObject } from 'lodash';

export default function applyDefaults(defaults, customizer) {
  if (!isObject(defaults)) return target => target;
  if (isFunction(customizer)) return target => mergeWithCustomizer(target, defaults, customizer);
  return target => mergeWithCustomizer(target, defaults, defaultCustomizer);
}

function defaultCustomizer(target, defaults, key) {
  return isNil(target[key])
    ? defaults[key]
    : target[key];
}

function mergeWithCustomizer(target, defaults, customizer) {
  return Object.keys(defaults).reduce(
    (acc, cur) => ({ ...acc, [cur]: customizer(acc, defaults, cur) }),
    target,
  );
}
