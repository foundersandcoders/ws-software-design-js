# Architecture for Example 2

## Description
Given the following user requirements:

> 1. Easily find questions that they can gain reputation points for answering.
> 2. Find aspirational targets by finding the top answerers for topics.

And consequently the following technical requirements:

> 1. Communicate with the StackOverflow API.
> 2. Allow the user to specify the information they want from StackOverflow.
> 3. Present the user with the information they requested once it is available to the app.

We begin to think about how our app should be structured.

The simplest way to allow the user to input structured information is with an HTML form.

We'd like to have a component that takes care of all AJAX requests and provides a simple interface to the rest of the app.

We'd like to have a component that understands how to parse the data the user gives us through the HTML form.

We'd like to have a component that re-renders the view given some arbitrary markup.

What we've mentioned so far is generic scaffolding that might undergird any number of simple REST API-focussed client-side apps.

What's left then, is the specific logic that fulfills our user requirements. Specifically:
* How do we turn user input into a request to a StackOverflow endpoint?
* How do we turn the response from the StackOverflow API into something to present to the user?

Observe that in this case, our two user requirements map quite neatly onto two API requests. This means the answer to these questions will be different for the first and second user requirements. This suggests it may be a good idea to have a component for each, such that each of these components then comes to represent an 'applet' or 'plugin', which exists in the context of the generic aspects of the app, and provides some specific behaviour through a standardised API.

We can conceive of sub-components, if we wish, to maintain a separation of concerns within each 'applet' or 'plugin'.

Finally, we'll then need an overarching component that ties all these things together into a working app.

## Components
This architecture has the following elements:
* Fetch      -- makes AJAX requests
* Input      -- parses form submission data into useful form
* View       -- transforms response data into markup and re-renders view
* Unanswered -- "applet" defining the behaviour required for user requirement 1
* Answerers  -- "applet" defining the behaviour required for user requirement 2
* app        -- ties individual components together

## Criticism
* Keep in mind that for the scale at which we are actually working, and for the functionality we've actually been asked to implement, this solution is probably over-engineered.
* ...
