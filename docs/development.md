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

Spacing

Base space between elements `base: 4, md: 8`

## FAQ

### 1. Where dispatch triggered and where we connect to the store?

In any types of HOC - `containers`, `pages`, `layouts`, `App.tsx`

### 2. Why we need `layouts`?

For holding common structure of pages (header, main, footer, etc.)

### 4. Why we need `pages`?

For spleeting aplicatons by screens

### 5. Why we need `containers`?

For spliting screens to logical blocks
