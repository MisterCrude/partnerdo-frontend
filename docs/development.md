# Development

## Commands

#### _Update packages_

-   `$ yarn cache clean`
-   `$ sudo rm -R node_modules && rm yarn.lock`
-   `$ yarn upgrade --latest`
-   `$ yarn install`

<br/><br/>

## Style guide

-   Submit button shoult be inside from component `<form />` and `<ComponentForm />`

<br/><br/>

#### _TYPOGRAPHY_

<br/>

Main text

```jsx
<Text color="gray.500" fontSize="sm" />
```

Secondary text

```jsx
<Text color="gray.800" />
```

Main text

```jsx
<Text />
```

<br/>

#### _COLORS_

<br/>

```jsx
// Buttons color
<IconButton
    bgColor="gray.800"
    icon={<EditIcon color="white" />}
    _active={{ bgColor: 'gray.800' }}
    _hover={{ bgColor: 'gray.600' }}
/>
```

```jsx
// Text colors
red.500 // error

// Background colors
gray.800
red.100 // error
green.100 // success
orange.100 // info
```

<br/><br/>

## Spacing

Base space between elements `base: 4, md: 8`

<br/><br/>

## FAQ

### 1. Where dispatched and selected data from store?

> **OLD** > ~~In any types of HOC - `containers`, `pages`, `layouts`, `App.tsx`~~  
> **NEW**
> In `screens/<some_screen>/modules`

### 2. Why we need `layouts`?

> For holding common structure of pages (header, main, footer, etc.)

### 4. Why we need `pages`?

> For spleeting aplicatons by screens

### 5. Why we need `containers`?

> For spliting screens to logical blocks
