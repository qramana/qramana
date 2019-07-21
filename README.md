# qramana

 `qramana` is a TypeScript library for quantum calculation.

## Quick start

### Install

To install current release

```bash
npm install @qramana/qramana
```

### Try your first qubit.

Write your first qubit definition to typescript code in `qubit.ts`,

```ts
import * as q from '@qramana/qramana';

const qubit = new q.Qubit({value: "|0>"});
console.log(qubit.toString());
```

and run it.

```
$ tsc qubit.ts
$ node qubit.js
|0>
```

## Acknowledgement

This software is supported by IPA Mitou Target Project 2018 (Category: quantum logic gate).
See the abstract [here](https://www.ipa.go.jp/jinzai/target/2018/koubo2_index.html) (written in Japanese).
