## Vue 过滤器

### Vue 过滤器: `filterArray`

```vue
<!-- livedemo -->

<template>
  <div class="demo-001">
    <div>currentTag: {{ currentTag }}</div>
    <div class="green">tagList: {{ newTag }}</div>
  </div>
</template>

<style>
  .demo-001 {
    color: red;
  }
  .green {
    color: green;
  }
</style>

<script>
  export default {
    data() {
      return {
        currentTag: 'it',
        newTag: 'abc',

        tagList: [
          { id: 'it', name: '科技' },
          { id: 'tec', name: '教育' },
          { id: 'war', name: '战争' },
        ],
      };
    },
  };
</script>

```

- 又一个

```vue
<template>
  <div>{{ currentTag | filterArray(tagList, 'key', 'value') }}</div>
</template>

<script>
export default {
  data() {
    return {
      currentTag: 'it',

      tagList: [
        { key: 'it', value: '科技' },
        { key: 'tec', value: '教育' },
        { key: 'war', value: '战争' },
      ],
    };
  },
};
</script>
```

a
