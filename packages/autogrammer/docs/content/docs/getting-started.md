---
title: 'Getting Started'
layout: 'layouts/page.html'
displayOrder: 2

eleventyNavigation:
  key: getting-started
  parent: Docs
  order: 0
---

## Installation

You can install `autogrammer` with:

```bash
npm install autogrammer
```
## Quick Start

```javascript
import { pipeline, } from '@xenova/transformers'
import Autogrammer from 'autogrammer'

const autogrammer = new Autogrammer({
  language: 'json'
})

const prompt = `Return the following address in a JSON object: 

"1600 Pennsylvania Avenue NW, Washington, DC 20500"`

const result = await autogrammer.execute(prompt)
console.log(result)
console.log(JSON.parse(result))
```

## Using a JSON Schema

```javascript
import { pipeline, } from '@xenova/transformers'
import { autogram } from 'autogrammer'

const prompt = `Return the following address in a JSON object: 

"1600 Pennsylvania Avenue NW, Washington, DC 20500"`

const result = await autogram(prompt, {
  language: 'json',
  languageOptions: {
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        number: { type: 'number', },
        street_name: { type: 'string', },
        street_type: { enum: ['Street', 'Avenue', 'Boulevard',], },
      },
      required: ['number', 'street_name', 'street_type',],
    }
  }
})
console.log(JSON.parse(result))
``` 
