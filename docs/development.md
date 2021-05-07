# Development

## Update packages

-   `$ yarn cache clean`
-   `$ yarn update --latest`
-   Remove `node_modules\` and `yarn.lock`
-   `$ yarn update --latest`

## Style guide

### Typography

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

### Colors

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
red.500 // error color
gray.800 // background color
```

## Spacing

Base space between elements `base: 4, md: 8`

## FAQ

### 1. Where dispatched and selected data from store?

**OLD**
~~In any types of HOC - `containers`, `pages`, `layouts`, `App.tsx`~~
**NEW**
In `screens/<some_screen>/modules`

### 2. Why we need `layouts`?

For holding common structure of pages (header, main, footer, etc.)

### 4. Why we need `pages`?

For spleeting aplicatons by screens

### 5. Why we need `containers`?

For spliting screens to logical blocks
