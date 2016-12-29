# Design for Example 1

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

### SOLib
Module taking no parameters. Exposes two methods:
```
<void> unanswered(<Object> input, <Function> callback)
```
Takes an object of user inputs, makes API request to StackOverflow to get unanswered questions for given tags, executes the `callback` with the response.

```
<void> answerers(<Object> input, <Function> callback)
```
Takes an object of user inputs, makes API request to StackOverflow to get top answerers for given tag, executes the `callback` with the response.

### View
One base module, and two derived modules (one for unanswered questions, one for top answerers).

Base module (`View`) takes one parameter: an object with an API compatible with the `document` object.
Exposes three methods:
```
<String> generateResults(<Object> data)
```
Takes object of response data, returns search result markup as a string.

```
<String> generateSummary(<Object> data)
```
Takes object of response data, returns search summary markup as a string.

```
<void> render(<Object> data)
```
Takes object of response data, renders updated search results to the DOM.

Derived modules `UnansweredView` and `AnswerersView` take one parameter: the base module `View`, and each overwrite the `generateResults` method.

### App
IIFE, attaches event listeners on form submissions.
