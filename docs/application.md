# Application structure

## `/`

-   `cypress/` - ...
-   `public/` - ...
-   `docs/` - linked documentation files with README.md
-   `src/` - source dir for project
-   `index.tsx` - reactDOM render and fetch initial data here

## `src/`

-   `assets/` - svg and text files, images, etc
-   `components/` - holds reusable React components
-   `models/` - ...
-   `store/` - redux store configuration and reducers
-   `stroies/` - holds multicomponent stories (icon, typography, etc.)
-   `slices/` - redux store slices (redux toolkit)
-   `layouts/` - includes common structure of screen (header, main, footer, etc.)
-   `utils/` - holds small helper methods witch you can use throughout the application
-   `services/` - holds code snippets witch you can use throughout the application
-   `screens/` - ...
-   `theme/` - holds custom theme config for chakra UI
-   `hooks/` - holds our custom React Hooks

## `src/componenets/ExampleComponent/`

-   `ExampleComponent.stories.tsx/` - strories used for generated storybooks
-   `index.ts/` - entry point
-   `ExampleComponent.tsx/` - component file
-   `ExampleComponent.test.tsx/` - component tests file
-   `AnotherComponent.tsx/` - some small component used `ExampleComponent`
-   `types.ts/` - types shared across components inside `ExampleComponent` dir

## `src/screens/ExampleScreen/`

-   `components` - put here components which used ONLY within current screen
-   `modules` - put here module component which used ONLY within current screen
