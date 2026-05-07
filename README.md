# Лабораторная работа №6
Знакомство с promise и fetch, борка клиентской части

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)

## Цель работы и основная задача
Лабораторная состоит из 2-х частей:

Первая часть данной лабораторной работы заключается в изменении механизма взаимодействия с внешним API: в прошлой лабораторной работе использовался XMLHttpRequest, в этой - современный метод fetch. В ходе выполнения работы предстоит познакомиться с кратким полезным теоретическим материалом, кодом реализации простого взаимодействия с внешним API, получением данных и выводом их в интерфейс пользователя, и выполнить задания по варианту.

Вторая часть лабораторной работы заключается в сборке клиентской части приложения: необходимо "сбилдить" клиентскую часть (ЛР №3) с помощью системы сборки, а также добавить в серверную часть (ЛР №4) возможность раздачи клиентской части в качестве статики во избежание проблем с CORS.


### *Класс Ajax на fetch (замена XMLHttpRequest)*

```js
class Ajax {
    async get(url, callback) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            callback(data, response.status);
        } catch (error) {
            console.error('Ошибка GET запроса:', error);
            callback(null, 0);
        }
    }

    async post(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            callback(responseData, response.status);
        } catch (error) {
            console.error('Ошибка POST запроса:', error);
            callback(null, 0);
        }
    }

    async patch(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            callback(responseData, response.status);
        } catch (error) {
            console.error('Ошибка PATCH запроса:', error);
            callback(null, 0);
        }
    }

    async delete(url, callback) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            
            if (response.status === 204) {
                callback(null, 204);
            } else {
                const data = await response.json();
                callback(data, response.status);
            }
        } catch (error) {
            console.error('Ошибка DELETE запроса:', error);
            callback(null, 0);
        }
    }
}

export const ajax = new Ajax();
```

### *Конфигурация Vite (vite.config.js)*
  
```js
export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
};
```

### *JSON-файл карточек*

```js
        [
            {
                id: 1,
                src: "https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg",
                title: "Освоение Сибири",
                text: "Движение на восток через вечную мерзлоту и тайгу: от отряда Ермака до Транссиба. Три века пути, который превратил окраину в опору страны."
            },
            {
                id: 2,
                src: "https://i.pinimg.com/1200x/b0/ba/00/b0ba00dc9bfcc7d041aa84c52e151609.jpg",
                title: "Озеро Байкал",
                text: "Сибирское чудо света: древнейшее, глубочайшее и чистейшее озеро планеты. Священное море с хрустальным льдом и неповторимой природой."
            },
            {
                id: 3,
                src: "https://company.rzd.ru/api/media/resources/200978",
                title: "Транссибирская магистраль",
                text: "Главная артерия Евразии: 9288 километров от Кремля до океана. Дорога, связавшая Европу и Азию, время и пространство."
            }
        ];
```
### *Добавленные скрипты для работы с Vite в package.json*
  
```js
{
  "name": "lab_6",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bootstrap": "^5.3.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

### *Сервер Express.js с добавленной раздачей статических файлов(src/index.js)*

```js
const express = require('express');
const path = require('path');
const settlementsRouter = require('./routes/settlements');
const settlementsService = require('./services/settlementsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/settlements.json');
settlementsService.init(DATA_FILE_PATH);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/settlements', settlementsRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    console.log(`Документация: http://localhost:${PORT}`);
});
```

