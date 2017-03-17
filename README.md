# JavaScript ASCII Library 

Output objects' structure in text / ASCII format:

![ascii-tree](https://cloud.githubusercontent.com/assets/132681/19949075/b3214c36-a147-11e6-9535-72971a1580b0.gif)

Live text example:

```
 +- Test
     +- self: Test <recursion>
     +- props: Object
         +- a: 1
         +- b: "hello"
         +- c: true
         +- d : Tue Nov 01 2016 00:24:11 GMT+0000 (GMT)
         +- e: function (a, b, c)
         +- f: Object
             +- foo: Array[3]
             |   +- 0: 1
             |   +- 1: 2
             |   +- 2: 3
             +- bar: Object
                 +- x: 1
                 +- y: 2
                 +- z: 3
```

## Usage

### Creating a tree

Load the library, then:

```
var str = Ascii.tree(object, options)
```

### Options


`depth`

- Depth to iterate to
- Number
- Defaults to 5

`recursive`
 
- Recurse into self-referencing objects
- Boolean
- Defaults to false,

`sort`

- Alphabetically sort properties
- Boolean
- Defaults to false

`group`

- Sort by property type
- String
- Valid values 'prop' or 'func'
- Defaults to null

`classes`
   
- Lookup table of `{name:Class}` instances to correctly infer type
- Object
- Defaults to null

## Demo

Run the HTML demo to interactively test the library's settings.

## WIP

To do:

- Additional iteration options
- Include/exclude options
- Ignore options
- Custom render function
- Custom filter function
- Custom naming function

Planned:

- Table output
