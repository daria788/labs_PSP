# Лабораторная работа №5
Добаление AJAX запросов к API

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)

## Цель работы

Цель данной лабораторной работы - взаимодействие с внешним API через XMLHttpRequest. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого взаимодействия с внешним API, получение данных и вывод их в интерфейс пользователя, и затем выполнить задания по варианту.

## Основное задание
**В рамках лабораторной работы необходимо:**
1)Создать слой modules с двумя файлами:
  - ajax.js — класс для выполнения HTTP-запросов через XMLHttpRequest
  - stockUrls.js — класс для формирования URL-адресов API
2)Модифицировать главную страницу (pages/main/):
  - Убрать статические данные из кода
  - Загружать список карточек через GET-запрос к API (/settlements)
  - Отображать полученные данные через компоненты
3)Модифицировать страницу карточки (pages/product/):
  - Загружать данные одной карточки через GET-запрос по ID (/settlements/:id)
4)Решить проблему CORS одним из способов:
  - Расширение браузера CORS Unblock
  - Или настройка заголовков Access-Control-Allow-Origin на сервере
5)Выполнить задание по варианту


### *StockUrls — справочник URL-адресов (modules/stockUrls.js)*

```js
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }
    getStocks() {
        return `${this.baseUrl}/settlements`;
    }
    getStockById(id) {
        return `${this.baseUrl}/settlements/${id}`;
    }
    createStock() {
        return `${this.baseUrl}/settlements`;
    }
    removeStockById(id) {
        return `${this.baseUrl}/settlements/${id}`;
    }
    updateStockById(id) {
        return `${this.baseUrl}/settlements/${id}`;
    }
}
export const stockUrls = new StockUrls();
```

### *Ajax — класс для HTTP-запросов через XMLHttpRequest (modules/ajax.js)*
  
```js
class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    delete(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    _handleResponse(xhr, callback) {
        try {
            let data;
            if (xhr.responseText) {
                data = JSON.parse(xhr.responseText);  
            } else {
                data = null;                          
            }
            callback(data, xhr.status);
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
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
### *pages/main/index.js - главная страница*
  
```js
getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            if (status === 200 && data && Array.isArray(data)) {
                this.cardsData = data.map(item =>({
                    id:item.id,
                    title:item.name || item.title ||'Без названия',
                    text:item.description || item.text ||'',
                    src: item.src|| 'https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg'
                }));
                this.renderCards();
            }
        });
    }
```
- Методы addCard через POST-запрос к API и deleteCard через DELETE-запрос к API

```js
addCard() {
    const newCard = {
        src: this.cardsData[0]?.src || 'https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg',
        title: "Новая карточка",
        text: "Добавлена через API"
    };
    
    ajax.post(stockUrls.createStock(), newCard, (data, status) => {
        if (status === 201 || status === 200) {
            this.showToast("Успешно", "Карточка добавлена на сервер!");
            this.getData();
        } else {
            this.cardsData.push({ id: Date.now(), ...newCard });
            this.renderCards();
            this.showToast("Локально", "Карточка добавлена локально");
        }
    });
}

deleteCard(cardId) {
    ajax.delete(stockUrls.removeStockById(cardId), (data, status) => {
        console.log('DELETE ответ:', status);
        if (status === 200 || status === 204) {
            this.cardsData = this.cardsData.filter(item => item.id !== parseInt(cardId));
            this.renderCards();
            this.showToast("Удалено", `Карточка #${cardId} удалена`);
        } else if (status === 404) {
            this.cardsData = this.cardsData.filter(item => item.id !== parseInt(cardId));
            this.renderCards();
            this.showToast("Удалено локально", `Карточка #${cardId} удалена только локально`);
        } else {
            this.showToast("Ошибка", "Не удалось удалить карточку");
        }
    });
}
```
- Переход на страницу продукта с тостом
```js
clickCard(cardId) {
    const data = this.getData().find(item => item.id === parseInt(cardId));
    if (data) {
        this.showToast("Дальний Восток", `Вы выбрали: "${data.title}"`);
        setTimeout(() => {
            const productPage = new ProductPage(this.parent, cardId);
            productPage.render();
        }, 1500);
    }
}
```
### *Страница создания карточки (pages/create/index.js)*
  
```js
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {ajax} from "../../siberia-express/modules/ajax.js";
import {stockUrls} from "../../siberia-express/modules/stockUrls.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div id="header-container"></div>
            <div id="create-page" class="container mt-4" style="max-width: 600px;">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h3 class="mb-0">Создание новой карточки</h3>
                    </div>
                    <div class="card-body">
                        <form id="create-form">
                            <div class="mb-3">
                                <label for="card-title" class="form-label fw-bold">Название</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="card-title" 
                                    placeholder="Введите название"
                                    required
                                >
                            </div>
                            
                            <div class="mb-3">
                                <label for="card-text" class="form-label fw-bold">Описание</label>
                                <textarea 
                                    class="form-control" 
                                    id="card-text" 
                                    rows="4" 
                                    placeholder="Введите описание"
                                    required
                                ></textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="card-image" class="form-label fw-bold">Ссылка на изображение (URL)</label>
                                <input 
                                    type="url" 
                                    class="form-control" 
                                    id="card-image" 
                                    placeholder="https://example.com/image.jpg"
                                    value="https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg"
                                >
                                <small class="text-muted">Оставьте URL по умолчанию или вставьте свой</small>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-success flex-grow-1">
                                    <i class="bi bi-plus-circle"></i> Создать карточку
                                </button>
                                <button type="button" id="cancel-btn" class="btn btn-outline-secondary">
                                    Отмена
                                </button>
                            </div>
                        </form>
                        
                        <div id="create-message" class="mt-3"></div>
                    </div>
                </div>
            </div>
        `;
    }

    get pageRoot() {
        return document.getElementById('create-page');
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    createCard(data) {
        const messageDiv = document.getElementById('create-message');
        
        messageDiv.innerHTML = `
            <div class="alert alert-info">
                <div class="spinner-border spinner-border-sm me-2"></div>
                Отправка данных на сервер...
            </div>
        `;

        ajax.post(stockUrls.createStock(), data, (response, status) => {
            console.log('POST ответ:', status, response);
            
            if (status === 201 || status === 200) {
                messageDiv.innerHTML = `
                    <div class="alert alert-success">
                        <i class="bi bi-check-circle"></i> 
                        Карточка <strong>"${data.title}"</strong> успешно создана на сервере!
                    </div>
                `;
                
                document.getElementById('create-form').reset();
                
                setTimeout(() => {
                    this.clickBack();
                }, 2000);
            } else {
                messageDiv.innerHTML = `
                    <div class="alert alert-danger">
                        <i class="bi bi-exclamation-triangle"></i> 
                        Ошибка при создании карточки. Статус: ${status}
                        <br>
                        <small>${response?.error || 'Неизвестная ошибка'}</small>
                    </div>
                `;
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(document.getElementById('header-container'));
        header.render(this.clickHome.bind(this));

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        document.getElementById('create-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('card-title').value.trim();
            const text = document.getElementById('card-text').value.trim();
            const src = document.getElementById('card-image').value.trim();

            if (!title || !text) {
                alert('Заполните название и описание!');
                return;
            }

            const newCard = {
                title: title,
                text: text,
                src: src
            };

            this.createCard(newCard);
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.clickBack();
        });
    }
}
```

### *Сервер — точка входа (src/index.js)*


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

### *Роутер с маршрутами (routes/settlements.js)*
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

