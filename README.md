# StackOverflow Reputation Builder
In this repo we'll be approaching the problem of creating a small, relatively simple client-side app. We'll use the example of a simple app built on top of the StackOverflow API to explore how one might go about designing a JS application which needs to communicate with a server via AJAX, and then actually implement it using TDD.

This process may well seem overkill for the size of app we are building. It is. The point is, however, to use a simple example to explore ideas that are just as applicable to larger, more complex apps.

## Contents
1. [User Requirements](#user-requirements)
2. [Architectural Principles](#architectural-principles)
3. [Exercise 1: Architecture](#exercise-1-architecture)
4. [Design Patterns](#design-patterns)
5. [Exercise 2: Design of Components](#exercise-2-design-of-components)
6. [TDD](#tdd)
7. [Exercise 3: First iteration](#exercise-3-first-iteration)
8. [Review](#review)
9. [Exercise 4: Second iteration](#exercise-4-second-iteration)
10. [Notes](#notes)

## User Requirements
Our end-user is asking us to develop a simple app, which will allow them to do the following things:
1. To retrieve a list of unanswered StackOverflow questions for any given set of tags
2. To retrieve a list of top StackOverflow answerers for any given tag

Our job now is to break down the requirements to into lower level technical blocks that allow us to design our code.

## Architectural Principles
When we are thinking about architecture, we are thinking about the high-level structure of the code; how each part of the app might interact with all the others to produce the behaviour we seek.

A general design principle that makes it easier to design systems is to try to group related bits of functionality into a _'component'_. The exact definition of what a component is, depends on many things, not least of which the scale you are working on, the technologies you are working with, the level of abstraction you are working at, as well as (to a lesser extent) your experience and aesthetic sensibilities.

For now, lets consider what components our app will need in order to provide the functionality the user wants.

First of all, since the user wants to get information from StackOverflow, some component of our app will need to use the StackOverflow REST API.

Secondly, in both requirements, the user is asking for information based on some input that they provide. This implies we need some way to capture user input, and some way to display the information they are asking for once we have it.

So we have the following components:
* API wrapper - makes and parses API requests
* Presentation - updates the DOM
* Input Capture - captures user input from DOM

## Exercise 1: Architecture
Time limit: 15 minutes
TBD

## Design Patterns
We shall make use of the following concepts and patterns when designing our app:
* [Single responsibility]()
* [Module pattern]()
* [Observer pattern]()
* [Dependency injection]()

## Exercise 2: Design of Components
Time Limit: 1 hour
TBD

## TDD
TBD

## Exercise 3: First iteration
Time Limit: 2 hours
TBD

## Review
Time Limit: 1 hour

## Exercise 4: Second iteration
Time Limit: 2 hours
TBD

## Notes
1. In this exercise, we developed an architecture in a relatively ad-hoc way. In the same way that there exist software design patterns, there also exist software architecture patterns. For example, some of you may be aware of the MVC (Model-View-Controller) pattern, which has often been used for UI. We deliberately avoided introducing MVC in particular, and architecture patterns more generally
