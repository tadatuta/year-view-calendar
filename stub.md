# Stub

Берем [create-react-app](CRA.md) и делаем удобно.

## Готовим заново

### Создаем заготовку проекта

```sh
npx create-react-app year-view-calendar --template typescript --use-npm
```

### Подключаем storybook

```sh
npx sb init
```

### Подключаем webpack-bundle-analyzer

```sh
npm i webpack-bundle-analyzer --save-dev
```
и добавляем в `package.json` в секцию `scripts`:
```
"analyze": "npm run build -- --stats && webpack-bundle-analyzer build/bundle-stats.json"
```
