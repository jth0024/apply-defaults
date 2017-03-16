# apply-defaults
A simple utility to apply default values to any object.

## Installation

```bash
npm install apply-defaults
```


## Usage

The default export is a function that accepts two arguments, `defaults` and an optional `customizer`, and returns a merging function. The merging function accepts one argument, `target`, and it returns a new object with merged keys.

```javascript
import applyDefaults from 'apply-defaults';

function printPerson(person) {
  const defaultProps = { name: '', age: 0 };
  const withDefaults = applyDefaults(defaultProps);
  console.log(withDefaults(person));
}

const person = { name: 'Greg' };
printPerson(person);
// { name: 'Greg', age: 0 }
```

For advanced use-cases, you can provide a customizer function to implement your own merging functionality. The function should accept three arguments: `target`, `defaults`, and `key`, and it should return a value to be assigned for the given key. For example, you might implement a customizer that allows keys to contain null values.

```javascript
import applyDefaults from 'apply-defaults';
import { has } from 'lodash';

const customizer = (target, defaults, key) =>
  (has(target, key) ? target[key] : defaults[key]);

function printPerson(person) {
  const defaultProps = { name: '', age: 0 };
  const withDefaults = applyDefaults(defaultProps, customizer);
  console.log(withDefaults(person));
}

const person = { name: 'Greg', age: null };
printPerson(person);
// { name: 'Greg', age: null }
```
