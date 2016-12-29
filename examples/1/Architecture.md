# Architecture for Example 1

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

We'd like to have a component that understands the StackOverflow API and knows which AJAX requests it needs to make to get the data we need.

We'd like to have a component that understands how to parse the data the user gives us through the HTML form.

We'd like to have a component that understands how to transform the response data from StackOverflow into the markup we wish to present to the user, and how to re-render the view.

We'll then need an overarching component that ties all these things together into a working app.

## Components
This architecture has the following elements:
* Fetch -- makes AJAX requests
* Input -- parses form submission data into useful form
* SOLib -- makes the required requests to the StackOverflow API
* View  -- transforms response data into markup and re-renders view
* app   -- ties individual components together

## Criticism
* Notice how the description of the "View" component contains an "and". This is a hint that it is responsible for more than one thing, and it might be possible to break it into two components. Whether this is useful or even sensible needs thought and depends on the specifics of your app.
* Consider the two user requirements. They map, essentially, onto two API requests to the StackOverflow API. This means there are areas of our code that are directly coupled to the nature of the StackOverflow API. We can identify where they are: The `SOLib` component understands which endpoints to hit, the `View` component understands how to transform the response data into markup, and the `app` component understands which HTML forms correspond to which information is being requested from the app. This means that if there are changes or additions to the user requirements (implying different or additional API requests), we would potentially have to change three files.
