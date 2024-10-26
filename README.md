# Dynamic Templating React Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/erikologic/dynamic-template)

This is a demo project to showcase a powerful 100% typesafe templating system.

## Uses:

- [React](https://react.dev/): create-react-app + react-router-dom just for demo purposes, can be readapted for Next etc.
- [TypeScript](https://www.typescriptlang.org/)
- [Typebox](https://github.com/sinclairzx81/typebox): an amazing library to create JSON schemas using TypeScript and extract interfaces from them
- [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form): reads the JSON schema and renders a form accordingly
- [Monaco Editor](https://microsoft.github.io/monaco-editor/): VSC backend run in-browser, used to edit the configuration JSON, with IntelliSense support based on the JSON schema.
- [MUI](https://mui.com/material-ui/): just because it comes with both basic building blocks and charts!

## Who needs this?

You have a complex React application with many features that require being configured particularly according to the various users/scenarios needs.

## How it works?

- [`src/lib/chartComponents/*`](src/lib/chartComponents/SimpleBarChart.tsx)  
   Contains the ChartComponents that can be used in this demo templating system.  
   Each ChartComponent exports:

            - `Component`: the corresponding React component.
            - `jsonSchema`: describes the configuration of the React component.
            - `slug`: a unique identifier for the component.

- [`src/lib/chartComponents/index.ts`](src/lib/chartComponents/index.ts)  
   Exports all the ChartComponents in a single array.

- [`src/jsonSchema.ts`](src/jsonSchema.ts)  
   Some mangling to expose the correct JSON schema.

- [`src/pages/configuration.tsx`](src/pages/configuration.tsx)  
   Simulates a configuration repository using the Browser LocalStorage API.

- [`src/pages/Dashboard.tsx`](src/pages/Dashboard.tsx)  
   Reads the configuration and renders the appropriate component with the right props.

- [`src/lib/TypeToComp.tsx`](src/lib/TypeToComp.tsx)  
   A complex (perhaps too much?) TypeScript type system to help TSC in tracking the correct types for the right components.

- [`src/pages/FormEditor.tsx`](src/pages/FormEditor.tsx)  
   Uses `rjsf` to render a form based on the JSON schema.  
   The form is completely dynamic, meaning no maintenance is required to add new fields or components.  
   _`rjsf` is a neat library that can be extended to support custom components and has a lot of options to customize the form and the various widgets. Check their [Playground](https://rjsf-team.github.io/react-jsonschema-form/) for more examples._

- [`src/pages/JsonEditor.tsx`](src/pages/JsonEditor.tsx)  
   Uses Monaco Editor to edit the JSON schema, offering a Diff view to compare changes and IntelliSense integration thanks to the JSON schema declarations.

### How can I rearrange the Dashboard?

- Launch the app and change the configuration either using the Form or the JSON editor.
- Save, and the app will refresh to update the configuration.  
   _Both the Form and the JSON editor are locked so that a wrong configuration could not be stored._
- The Dashboard will update accordingly.

### How can I add a new ChartComponent?

- Create a new ChartComponent in `src/lib/chartComponents/`.
- Make sure to export the correct keys: `Component`, `jsonSchema`, `slug`.
- Add the new ChartComponent to the `charts` array in `src/lib/chartComponents/index.ts`.

### Sounds complicated, can you give me an example?

Sure, check commit [1fe4a03](https://github.com/erikologic/dynamic-template/commit/1fe4a036afd53fad83d8ac53e2ae13de880234e0)!

3 files are modified:

- `src/configuration.tsx` to add a default configuration for the new component.
- `src/lib/chartComponents/StraightAnglePieChart.tsx` to create the new ChartComponent.
- `src/lib/chartComponents/index.ts` to export the new ChartComponent.

## What is this missing?

Some ideas that I delivered:

- Templating affecting routing, being able to configure the path of a page and compose its components using this same system, including updating the NavBar.
- A proper configuration storage including:
  - Optimistic concurrency to avoid overwriting changes made to the same configuration by another user.
  - Aliased configurations, to be able to deploy 2 configurations for the same scenario and compare side by side.
- More complex (nasty?) nesting!
- RJSF UISchema and Custom Widgets.
- Monaco Diff/Single view switch e.g., to allow un/collapsing JSON structures.
- Mix this up with some solid framework like Next.js

## Is this good for production?

Yes, it's running solidly in prod.

We weren't sure whether non-engineers would be able to use the JSON editor, but it turned out to be quite intuitive.

## I find the lack of testing disturbing

I'm a TDD addict. I hear you.

This system is 100% typesafe.  
The only untested behavior is the configuration get/put functions, which can be tested with any of your regular Adapter testing strategies.

## Wanna know more?

Reach me on [LinkedIn](https://www.linkedin.com/in/enrico-graziani-10ba5a140/)
