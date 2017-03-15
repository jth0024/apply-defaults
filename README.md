# apply-defaults
Ever needed a more flexible Object.assign? This helper allows you to apply default keys to an object based on custom logic.

## Installation

```bash
npm install apply-defaults
```


## Usage

The default export is a curried function that takes two arguments: `defaults: Object` and an optional `customizer: Function`, and returns a merging function. The merging function takes a single argument: `target: Object`, and it returns a new object with merged keys. For most use cases, you can provide a `defaults` argument and ignore the customizer.

```javascript
import applyDefaults from 'apply-defaults';

const defaults = { foo: 'bar' };
const target = { name: 'Greg' };
const result = applyDefaults(defaults)(target);

console.log(result);
// { foo: 'bar', name: 'Greg' }
```

For special cases, you can provide the optional customizer function to implement more advanced merging functionality. The customizer function is invoked with three arguments: `target: Object`, `defaults: object`, and `key: string`, and it should return the new value for the given key. A common example would be to allow keys with undefined or null values.

```javascript
import applyDefaults from 'apply-defaults';
import { has } from 'lodash';

const defaults = { foo: 'bar' };
const target = { foo: null };
const result = applyDefaults(defaults, customizer)(target);

console.log(result);
// { foo: null }

function customizer(target, defaults, key) {
  return has(target, key)
    ? target[key]
    : defaults[key];
}
```
