## Vue 过滤器

合理的过滤器可以极大节省开发时间, 以下是日常开发中总结的几个比较常用的过滤器:

`时间过滤器`、`金额过滤器`、`数组过滤器`、`多数组过滤器`、`布尔过滤器`

### 时间过滤器: `filterTime`

基本用法:

- `Date.now() | filterTime`
- `new Date() | filterTime`
- `{{ '2022-01-01' | filterTime }}`

自定义用法:

- `Date.now() | filterTime('YYYY-MM-DD HH:mm:ss.SSS')`

```vue
<!-- livedemo: {} -->
<script>
export default {};
</script>

<template>
  <div class="demo-filter-time">
    <div class="line-group">
      <div class="group-title">当前时间(默认格式, 秒级)</div>
      <div>
        <label>时间戳:</label>
        <span>{{ Date.now() | filterTime }}</span>
      </div>
      <div>
        <label>日期类型:</label>
        <span>{{ new Date() | filterTime }}</span>
      </div>
      <div>
        <label>字符串:</label>
        <span>{{ '2020-01-24 00:00:00' | filterTime }}</span>
      </div>
    </div>

    <div class="line">
      <label>当前时间(自定义格式, 秒级):</label>
      <span>{{ Date.now() | filterTime('YYYY-MM-DD HH:mm:ss') }}</span>
    </div>

    <div class="line">
      <label>当前时间(精确到毫秒级):</label>
      <span>{{ Date.now() | filterTime('YYYY-MM-DD HH:mm:ss.SSS') }}</span>
    </div>

    <div class="line">
      <label>非法时间:</label>
      <span>{{ 'abcdefg' | filterTime('YYYY-MM-DD HH:mm:ss.SSS') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.demo-filter-time {
  .line-group,
  .line {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #0000000d;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  label {
    color: #999;
    width: 300px;
    display: inline-block;
  }
  .line-group {
    .group-title {
      color: #999;
      margin-left: 0;
    }
    & > div {
      padding-top: 10px;
      margin-left: 20px;
      label {
        width: 280px;
      }
    }
  }
}
</style>
```

### 数组过滤器: `filterArray`

基本用法: itemArray 格式为为 `[{id, name}]`

- `itemId | filterArray(itemArray)`

自定义用法:

- `itemId | filterArray(itemArray, 'keyProp', 'valueProp', 'defaultValue')`

```vue
<!-- livedemo: {} -->
<script>
export default {
  data() {
    return {
      tag: 'IT',
      user: 'Henry',
      userDefault: 'china',

      tagList: [
        { id: 'IT', name: '科技' },
        { id: 'WAR', name: '战争' },
      ],
      userList: [
        { name: 'John', nameCN: '约翰' },
        { name: 'Henry', nameCN: '亨利' },
      ],
    };
  },
};
</script>

<template>
  <div class="demo-filter-array">
    <div class="line">
      <label>常规用法 ({{ tag }}):</label>
      <span>{{ tag | filterArray(tagList) }}</span>
    </div>

    <div class="line">
      <label>自定义用法 ({{ user }}):</label>
      <span>{{ user | filterArray(userList, 'name', 'nameCN') }}</span>
    </div>

    <div class="line">
      <label>默认值 ({{ userDefault }}):</label>
      <span>{{ userDefault | filterArray(userList, 'name', 'nameCN') }}</span>
    </div>

    <div class="line">
      <label>自定义默认值 ({{ userDefault }}):</label>
      <span>{{ userDefault | filterArray(userList, 'name', 'nameCN', '未知') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.demo-filter-array {
  .line {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #0000000d;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  label {
    color: #999;
    width: 200px;
    display: inline-block;
  }
}
</style>
```

### 金额过滤器: `filterMoney`

```vue
<!-- livedemo: {} -->
<script>
export default {};
</script>

<template>
  <div class="demo-filter-array">
    <div class="line">
      <label>基本用法:</label>
      <span>{{ '123456.783' | filterMoney }}</span>
    </div>

    <div class="line">
      <label>四舍五入:</label>
      <span style="margin-right: 20px;">
        {{ '.788' | filterMoney }}
      </span>
      <span style="margin-right: 20px;">
        {{ '456.788' | filterMoney }}
      </span>
      <span style="margin-right: 20px;">
        {{ '123456.788' | filterMoney }}
      </span>
      <span>{{ '123456123456.788' | filterMoney }}</span>
    </div>

    <div class="line">
      <label>非法场景:</label>
      <span>{{ 'a123456.788d' | filterMoney }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.demo-filter-array {
  .line {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #0000000d;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  label {
    color: #999;
    width: 200px;
    display: inline-block;
  }
}
</style>
```

### 多数组过滤器: `filterArrayMulti`

`filterArrayMulti` 是基于 `filterArray` 的二次封装

```vue
<!-- livedemo: {} -->
<script>
export default {
  data() {
    return {
      tagList: [
        { id: 'IT', name: '科技' },
        { id: 'WAR', name: '战争' },
      ],
      userList: [
        { name: 'John', nameCN: '约翰' },
        { name: 'Henry', nameCN: '亨利' },
      ],
    };
  },
};
</script>

<template>
  <div class="demo-filter-array">
    <div class="line">
      <label>基本用法 ['IT', 'WAR']:</label>
      <span style="margin-right: 20px;">
        {{ ['IT', 'WAR'] | filterArrayMulti(tagList) }}
      </span>
    </div>

    <div class="line">
      <label>自定义用法 ['John', 'china']:</label>
      <span>{{ ['John', 'china'] | filterArrayMulti(userList, 'name', 'nameCN') }}</span>
    </div>

    <div class="line">
      <label>自定义默认值及分隔符 ['John', 'china']:</label>
      <span>{{ ['John', 'china'] | filterArrayMulti(userList, 'name', 'nameCN', 'a', 'b') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.demo-filter-array {
  .line {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #0000000d;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  label {
    color: #999;
    width: 300px;
    display: inline-block;
  }
}
</style>
```

### 布尔过滤器: `filterBoolean`

默认 `true` 为 `是`, `false` 为 `否`, 可自定义

```vue
<!-- livedemo: {} -->
<script>
export default {};
</script>

<template>
  <div class="demo-filter-array">
    <div class="line">
      <label>默认用法:</label>
      <span style="margin-right: 20px;">
        {{ true | filterBoolean }}
      </span>
      <span>{{ false | filterBoolean }}</span>
    </div>

    <div class="line">
      <label>自定义:</label>
      <span style="margin-right: 20px;">
        {{ true | filterBoolean('通过', '拒绝') }}
      </span>
      <span>{{ false | filterBoolean('通过', '拒绝') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.demo-filter-array {
  .line {
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #0000000d;

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
    &:first-child {
      padding-top: 0;
    }
  }
  label {
    color: #999;
    width: 200px;
    display: inline-block;
  }
}
</style>
```

end ~\_~
