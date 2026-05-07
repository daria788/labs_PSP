# Лабораторная работа №4
Создание бэкенда на Express.js

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)
- [Дополнительные задания (задал преподаватель)](#дополнительные-задания-задал-преподаватель)

## Цель работы

Целью данной лабораторной работы является создание серверной части приложения на платформе Node.js с использованием фреймворка Express.js. В ходе выполнения работы необходимо разработать REST API для управления карточками, реализовать хранение данных в JSON-файле, настроить архитектуру приложения в соответствии с паттерном Layered Architecture (слоистая архитектура) и протестировать работоспособность сервиса.

## Основное задание
**В рамках лабораторной работы необходимо:**
1)Настроить проект Express.js со слоистой архитектурой (routes, controllers, services, data).
2)Реализовать REST API для работы с карточками по теме "Освоение Сибири":
 - GET /settlements — получить все карточки
 - GET /settlements/:id — получить по ID
 - POST /settlements — создать карточку
 - PATCH /settlements/:id — обновить карточку
 - DELETE /settlements/:id — удалить карточку
3)Данные хранить в settlements.json, чтение/запись через fileService.js.
4)Настроить middleware: парсинг JSON, логирование, CORS, обработка ошибок.
5)Протестировать API через Postman.

### *JSON-файл карточек*

Хранение данных приложения в формате JSON. Каждая карточка содержит поля id, src (ссылка на изображение), title (название) и text (описание). JSON-файл выступает в роли упрощённой базы данных.

```js
[
  {
    "id": 1,
    "src": "https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg",
    "title": "Освоение Сибири",
    "text": "Движение на восток через вечную мерзлоту и тайгу: от отряда Ермака до Транссиба. Три века пути, который превратил окраину в опору страны."
  },
  {
    "id": 2,
    "src": "https://i.pinimg.com/1200x/b0/ba/00/b0ba00dc9bfcc7d041aa84c52e151609.jpg",
    "title": "Озеро Байкал",
    "text": "Сибирское чудо света: древнейшее, глубочайшее и чистейшее озеро планеты."
  },
  {
    "id": 3,
    "src": "https://company.rzd.ru/api/media/resources/200978",
    "title": "Транссибирская магистраль",
    "text": "Главная артерия Евразии: 9288 километров от Кремля до океана."
  }
]
```

### *services/fileService.js - сервис для работы с файловой системой.*
  
```js
const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = { readData, writeData };
```

### *services/settlementsService.js - слой бизнес-логики для управления карточками*

Содержит методы:
- findAll — получение всех карточек с возможностью фильтрации по названию
- findOne — поиск карточки по ID
- create — создание новой карточки с автоматической генерацией ID (максимальный ID + 1)
- remove — удаление карточки по ID
  
```js
const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (region, minPopulation) => {
    let settlements = fileService.readData(dataFilePath);
    
    if (region) {
        settlements = settlements.filter(s => 
            s.title && s.title.toLowerCase().includes(region.toLowerCase())
        );
    }
    
    return settlements;
};

const findOne = (id) => {
    const settlements = fileService.readData(dataFilePath);
    return settlements.find(s => s.id === id);
};

const create = (cardData) => {
    const settlements = fileService.readData(dataFilePath);
    
    const newId = settlements.length > 0 
        ? Math.max(...settlements.map(s => s.id)) + 1 
        : 1;
        
    const newCard = { 
        id: newId, 
        src: cardData.src || '',
        title: cardData.title,
        text: cardData.text
    };
    
    settlements.push(newCard);
    fileService.writeData(dataFilePath, settlements);
    
    return newCard;
};

const update = (id, cardData) => {
    const settlements = fileService.readData(dataFilePath);
    const index = settlements.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    settlements[index] = { ...settlements[index], ...cardData, id: settlements[index].id };
    fileService.writeData(dataFilePath, settlements);
    
    return settlements[index];
};

const remove = (id) => {
    const settlements = fileService.readData(dataFilePath);
    const filteredSettlements = settlements.filter(s => s.id !== id);
    
    if (filteredSettlements.length === settlements.length) {
        return false;
    }
    
    fileService.writeData(dataFilePath, filteredSettlements);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
```
-  settlementsController — обработка запросов
  
```js
const settlementsService = require('../services/settlementsService');

const getAllSettlements = (req, res) => {
    const { title } = req.query; 
    const settlements = settlementsService.findAll(title); 
    res.json(settlements);
};

const getSettlementById = (req, res) => {
    const id = parseInt(req.params.id);
    const settlement = settlementsService.findOne(id);
    
    if (!settlement) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(settlement);
};

const createSettlement = (req, res) => {
    const { title, text, src } = req.body;
    
    // Валидация для карточек
    if (!title || !text) {
        return res.status(400).json({ error: 'Поля title и text обязательны' });
    }
    
    const newCard = settlementsService.create({
        title,
        text,
        src: src || ''
    });
    
    res.status(201).json(newCard);
};

const updateSettlement = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedSettlement = settlementsService.update(id, req.body);
    
    if (!updatedSettlement) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedSettlement);
};

const deleteSettlement = (req, res) => {
    const id = parseInt(req.params.id);
    const success = settlementsService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send();
};

module.exports = {
    getAllSettlements,
    getSettlementById,
    createSettlement,
    updateSettlement,
    deleteSettlement
};
```
- routes/settlement.js — маршрутизация

```js
const express = require('express');
const router = express.Router();
const settlementsController = require('../controllers/settlementsController');

router.get('/', settlementsController.getAllSettlements);
router.get('/:id', settlementsController.getSettlementById);
router.post('/', settlementsController.createSettlement);
router.patch('/:id', settlementsController.updateSettlement);
router.delete('/:id', settlementsController.deleteSettlement);

module.exports = router;
```
### *index.js — точка входа*
  
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

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'API поселений Сибири и Дальнего Востока',
        version: '1.0.0',
        endpoints: {
            settlements: '/settlements',
            statistics: '/settlements/statistics'
        }
    });
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

## Дополнительные задания (задал преподаватель)
 
**Добавить метод PUT**

 - settlementsService.js — добавлен метод replace
```js
const replace = (id, cardData) => {
    const settlements = fileService.readData(dataFilePath);
    const index = settlements.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    settlements[index] = {
        id: id,
        src: cardData.src || '',
        title: cardData.title || '',
        text: cardData.text || ''
    };
    fileService.writeData(dataFilePath, settlements);
    
    return settlements[index];
};
```


- settlementsController.js — добавлен replaceSettlement
```js
const replaceSettlement = (req, res) => {
    const id = parseInt(req.params.id);
    const { src, title, text } = req.body;
    
    if (!title || !text) {
        return res.status(400).json({ error: 'Поля title и text обязательны для полной замены' });
    }
    
    const replacedSettlement = settlementsService.replace(id, { src, title, text });
    
    if (!replacedSettlement) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(replacedSettlement);
};
```


- settlements.js (роутер) — добавлен PUT-маршрут
```js
const express = require('express');
const router = express.Router();
const settlementsController = require('../controllers/settlementsController');

router.get('/', settlementsController.getAllSettlements);
router.get('/:id', settlementsController.getSettlementById);
router.post('/', settlementsController.createSettlement);
router.put('/:id', settlementsController.replaceSettlement);     
router.patch('/:id', settlementsController.updateSettlement);    
router.delete('/:id', settlementsController.deleteSettlement);

module.exports = router;
```
