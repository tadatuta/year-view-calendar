# react-project-stub

Берем [create-react-app](CRA.md) и делаем удобно.

## Готовим заново

### Создаем заготовку проекта

```sh
npx create-react-app react-project-stub --typescript
```

### Подключаем storybook

```sh
npx -p @storybook/cli sb init
```

### Настраиваем storybook для работы с TypeScript
#### Добавляем необходимые зависимости

```sh
# обязательно
npm i @types/storybook__react --save-dev

# опционально
npm i @types/storybook__addon-actions --save-dev
npm i @storybook/addon-info @types/storybook__addon-info react-docgen-typescript-loader --save-dev
```

#### Создаем конфиг для webpack

```sh
touch touch .storybook/webpack.config.js
```
со следующим содержанием:

```sh
module.exports = (baseConfig, env, config) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                options: {
                    presets: [['react-app', { flow: false, typescript: true }]],
                }
            },
            require.resolve('react-docgen-typescript-loader'),
        ]
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
```

#### Правим .storybook/config.ts

```js
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}
addDecorator(withInfo);

configure(loadStories, module);
```

### Подключаем webpack-bundle-analyzer

```sh
npm i webpack-bundle-analyzer --save-dev
```
и добавляем в `package.json` в секцию `scripts`:
```
"analyze": "npm run build -- --stats && webpack-bundle-analyzer build/bundle-stats.json"
```

### Подключаем Лего
```sh
npm i lego-on-react @yandex-lego/components --save-dev --registry=http://npm.yandex-team.ru
```
