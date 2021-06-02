# Application structure

## `/`

-   `public/` - builded app

-   `docs/` - linked documentation files with README.md

-   `src/` - source dir for project

-   `index.tsx` - reactDOM render and fetch initial data here

<br/><br/>

## `src/`

-   `assets/` - svg and text files, images, etc

-   `components/` - holds reusable React components

-   `models/` - domain models existing on aplication (user, proposal, etc)

-   `store/` - redux store configuration and reducers

-   `stories/` - holds multicomponent stories (icon, typography, etc.)

-   `slices/` - redux store slices, actions, selectors (redux toolkit)

-   `layouts/` - includes common structure of screen (header, main, footer, etc.)

-   `utils/` - holds small helper methods witch you can use throughout the application

-   `services/` - holds code snippets witch you can use throughout the application

-   `screens/` - holds components loaded by router

-   `theme/` - holds custom theme config for chakra UI

-   `hooks/` - holds our custom React Hooks

<br/><br/>

## `src/componenets/ExampleComponent/`

-   `ExampleComponent.stories.tsx` - strories used for generated storybooks

-   `ExampleComponent.tsx` - component file

-   `ExampleComponent.test.tsx` - component tests file

-   `AnotherComponent.tsx` - some small component used `<ExampleComponent />`

-   `types.ts` - types shared across components inside `<ExampleComponent />` dir

-   `index.ts` - entry point

<br/><br/>

## `src/screens/ExampleScreen/`

-   `components/` - holds components which used ONLY within current screen

-   `modules/` - holds module component which used ONLY within current screen, move here some logic, useSelector, useDispatch etc

    > Trigger here connect here to store
