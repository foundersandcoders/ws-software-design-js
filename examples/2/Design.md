# Design for Example 2

## Components
### Fetch
Module taking one parameter: an object with an API compatible with the XMLHttpRequest object.
Exposes one method:
```
<void> get(<String> url[, <Function> success[, <Function> failure]])
```
Makes get request to provided URL.

### Input
Module taking no parameters. Exposes one method:
```
<Object> serialise(<Node> node)
```
Takes a `Node` object, intended to be a `<form>` element, searches it for `<input>` tags, and returns an object where the key-value pairs are formed from the `name` and `value` attributes of each `<input>` tag.

### View
Module takes one parameter: an object with an API compatible with the `document` object.
Exposes one methods:
```
<void> render(<String> markup, <String> target)
```
Renders given `markup` to the DOM, using `target` as a selector.

### Applet
Module taking no parameters. Exposes one method:
```
<void> register(<Object> app)
```
Takes an 'applet' with the following API, and 'registers' it by setting up the event listener:
```
<String> source()
<String> url(<Object> input)
<String> generateResults(<Object> response)
<String> generateSummary(<Object> response)
<String> resultsSelector()
<String> summarySelector()
```
One 'applet' for unanswered questions (`Unanswered`), and one for top answerers (`Answerers`).

### App
IIFE, registers applets.
