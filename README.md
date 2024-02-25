# Dependency Injection (DI)

Этот проект, который показывает принцип работы __DI__, использует `UserService.ts`, чтобы создать и удалить тестового пользователя.

## Запустить проект

1. `npm i`
2. `npm run start`

## Поменять зависимости

```ts
/* 📁 ./src/inversify.config.ts */

// ...
container.bind<IDB>(TYPES.DB).to(MockDB /* или JSONDB */)
//...
```

## Ссылки

- [Dependency Injection простыми словами](https://www.youtube.com/watch?v=u6gAVCEJjQ4), Андрей Мелихов
