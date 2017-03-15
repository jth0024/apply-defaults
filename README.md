# apply-defaults
A simple utility to apply default values to any object.

## Installation

```bash
npm install apply-defaults
```


## Usage

The default export is a curried function that takes two arguments: `defaults: Object` and an optional `customizer: Function`, and returns a merging function. The merging function takes a single argument: `target: Object`, and it returns a new object with merged keys. For most use cases, you can provide a `defaults` argument and ignore the customizer.

```javascript
import applyDefaults from 'apply-defaults';

function printPerson(person) {
  const personDefaults = applyDefaults({ name: '', age: 0 });
  console.log(personDefaults(person));
}

const person = { name: 'Greg' };
printPerson(person);
// { name: 'Greg', age: 0 }
```

For special cases, you can provide the optional customizer function to implement more advanced merging functionality. The customizer function is invoked with three arguments: `target: Object`, `defaults: object`, and `key: string`, and it should return the new value for the given key. A common example would be to allow keys with undefined or null values.

```javascript
import applyDefaults from 'apply-defaults';
import { has } from 'lodash';

function customizer(target, defaults, key) {
  return has(target, key)
    ? target[key]
    : defaults[key];
}

function printPerson(person) {
  const personDefaults = applyDefaults(
    { name: '', occupation: '' },
    customizer
  );
  console.log(personDefaults(person));
}

const person = { name: 'Greg', occupation: undefined };
printPerson(person);
// { name: 'Greg', occupation: undefined }
```
