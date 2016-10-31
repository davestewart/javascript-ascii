# JavaScript ASCII Library 

Output objects' structure in text / ASCII format:

```
 +- [object Object]
     +- self: Object <recursion>
     +- props: Object
         +- a: 1
         +- b: "hello"
         +- c: true
         +- d: Object
             +- foo: Array[3]
             |   +- 0: 1
             |   +- 1: 2
             |   +- 2: 3
             +- bar: function (a, b, c)
             +- baz: Object
                 +- x: 1
                 +- y: 2
                 +- z: 3
```

## Usage

Load the library, then:

```
var str = Ascii.tree(object, options)
```

Options:

- `depth` : Number, defaults to 5
- `recursive` : Boolean, defaults to false
- `sort` : Boolean, defaults to false

## Demo

Run the HTML demo to interactively test the library's settings.

## WIP

Additional features coming soon:

- Additional iteration options
- Better sorting options
- Include/exclude options
- Ignore options
- Custom render function
- Custom filter function

Coming later:

- Table output
