# Лабораторная работа №3
Простое веб-приложение. Верстка

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)
- [Дополнительные задания (задал преподаватель)](#дополнительные-задания-задал-преподаватель)

## Цель работы

Цель данной лабораторной работы - знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## Основное задание
**В рамках лабораторной работы необходимо:**
1. Изучить основы Node.js и npm, научиться инициализировать проект и управлять зависимостями.
2. Освоить динамическое создание HTML-разметки с помощью JavaScript (DOM API).
3. Научиться подключать и использовать CSS-фреймворк Bootstrap.
4. Применить компонентный подход — разделить код на страницы и переиспользуемые компоненты.
5. Реализовать обработку событий и навигацию между страницами без перезагрузки.
6. Самостоятельно адаптировать приложение под заданную тему и внедрить указанный Bootstrap-компонент.


### *Файл index.html - корневой шаблон с подключением Bootstrap, Three.js и модульного скрипта.*

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Освоение Сибири и Дальнего Востока</title>
    

    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
            "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
        }
    }
    </script>
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
</head>
<body>
    <div id="root"></div>
    
    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    
    <script type="module" src="main.js"></script>
</body>
</html>
```

### *main.js - точка входа*
  
```js
import {MainPage} from "./pages/main/index.js";

const root = document.getElementById('root');
const mainPage = new MainPage(root);
mainPage.render();
```

### *pages/main/index.js - главная страница*

- JSON-файл карточек
  
```js
this.cardsData = [
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
- Рендер с фильтрацией и добавлением карточек
  
```js
const filteredData = this.filterLetter 
    ? this.getData().filter(item => item.title.toUpperCase().startsWith(this.filterLetter))
    : this.getData();

filteredData.forEach((item) => {
    const productCard = new ProductCardComponent(this.pageRoot);
    productCard.render(item, this.clickCard.bind(this), this.deleteCard.bind(this));
});
```
- Методы addCard и deleteCard с тостами

```js
addCard() {
    if (this.cardsData.length === 0) {
        this.showToast("Ошибка", "Нет карточек для копирования!");
        return;
    }

    const firstCard = this.cardsData[0];
    const newCard = {
        id: this.nextId++,
        src: firstCard.src,
        title: `${firstCard.title} (копия)`,
        text: firstCard.text
        };

    this.cardsData.push(newCard);
    this.showToast("Успешно", `Добавлена новая карточка: "${newCard.title}"`);
    this.render();
}
deleteCard(cardId) {
    const initialLength = this.cardsData.length;
    this.cardsData = this.cardsData.filter(item => item.id !== parseInt(cardId));
    if (this.cardsData.length < initialLength) {
        this.showToast("Удалено", `Карточка #${cardId} удалена`);
        this.render(); 
    } else {
        this.showToast("Ошибка", "Карточка не найдена!");
    }
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
### *pages/product/index.js - страница продукта*

- Данные каждой карточки:
  
```js
getData() {
        const data = [
            {
                id: 1,
                src: "https://i.pinimg.com/1200x/24/64/d8/2464d83f87de9da30688a1e00ba89818.jpg",
                title: "Освоение Сибири",
                text: "Движение на восток через вечную мерзлоту и тайгу: от отряда Ермака до Транссиба. Три века пути, который превратил окраину в опору страны.",
                modelPath: '/lab_3/models/Cottage.glb',
                description: `
                <strong>    Освоение Сибири (XVI–XX вв.)</strong> — это процесс включения огромных территорий от Урала до Тихого океана в состав Российского государства. 
                Началом послужил поход Ермака в 1581–1585 гг., за которым последовало строительство сети острогов (Тюмень, Тобольск, Томск, Якутск). 
                Основными движущими силами были казаки, поморы, беглые крестьяне и ссыльные. К середине XVII века русские вышли к Охотскому морю. 
                
                <strong>Освоение имело три главных последствия:</strong>
                <ol>
                    <li><strong>Геополитическое</strong> — Россия стала крупнейшей евразийской державой</li>
                    <li><strong>Экономическое</strong> — началась добыча пушнины, золота, а позже — угля и нефти</li>
                    <li><strong>Культурное</strong> — произошло взаимовлияние русских традиций и культуры коренных народов Сибири</li>
                </ol>
                    Освоение Сибири стало одним из ключевых факторов превращения России в трансконтинентальную державу, но сопровождалось
                значительными человеческими, экологическими и культурными издержками, последствия которых осмысляются историками и обществом до сих пор. 
                <br>
                <br><strong>Результатом</strong> освоения Сибири стало превращение России в крупнейшую трансконтинентальную державу с доступом к колоссальным
                природным ресурсам, формирование уникальной многонациональной культуры и инфраструктуры, соединившей Европу и Азию, ценой значительных человеческих,
                экологических и культурных издержек для коренных народов региона.</br>
            `
            },
            {
                id: 2,
                src: "https://i.pinimg.com/1200x/b0/ba/00/b0ba00dc9bfcc7d041aa84c52e151609.jpg",
                title: "Озеро Байкал",
                text: "Сибирское чудо света: древнейшее, глубочайшее и чистейшее озеро планеты. Священное море с хрустальным льдом и неповторимой природой.",
                modelPath: '/lab_3/models/Waterfall.glb',
                description: `
                    <strong>Байкал</strong> — озеро тектонического происхождения в южной части Восточной Сибири.
                    <br><br>
                    <strong>Основные факты:</strong>
                    <ul>
                        <li>Глубина: 1642 метра (самое глубокое озеро планеты)</li>
                        <li>Возраст: 25-35 миллионов лет</li>
                        <li>Объём воды: 23 615 км³ (20% мировых запасов пресной воды)</li>
                        <li>Площадь: 31 722 км²</li>
                    </ul>
                    В Байкал впадает более <strong>330 рек</strong>, а вытекает только одна — <strong>Ангара</strong>.
                `
            },
            {
                id: 3,
                src: "https://company.rzd.ru/api/media/resources/200978",
                title: "Транссибирская магистраль",
                text: "Главная артерия Евразии: 9288 километров от Кремля до океана. Дорога, связавшая Европу и Азию, время и пространство.",
                modelPath: 'models/train.glb',
                description: `
                    <strong>Транссибирская магистраль (Транссиб)</strong> — железная дорога через Евразию от Москвы до Владивостока.
                    <br><br>
                    <strong>Характеристики:</strong>
                    <ul>
                        <li>Длина: 9289 км (самая длинная железная дорога в мире)</li>
                        <li>Строительство: 1891-1916 гг.</li>
                        <li>Количество станций: около 200</li>
                        <li>Время в пути: 7 суток</li>
                    </ul>
                    Магистраль пересекает 8 часовых поясов и связывает Европу с Азией.
                `
            }
        ];
    
        return data.find(item => item.id === parseInt(this.id)) || data[0];
    }
```


- Кнопка назад:
  
```js
render() {
    ...
    const backButton = new BackButtonComponent(this.pageRoot);
    backButton.render(this.clickBack.bind(this));
    ...
}
```


### *компонент Toast(всплывающие уведомления)*


```js
export class ToastComponent{
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(title, message) {
        return `
            <div class="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <strong class="me-auto">${title}</strong>
                        <small class="text-muted">только что</small>
                        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            </div>
        `;
    }

    render(title, message) {
            this.parent.innerHTML = '';
            const html = this.getHTML(title, message);
            this.parent.insertAdjacentHTML('beforeend', html);
    
            
            const toastElement = document.getElementById('liveToast');
            const toast=new bootstrap.Toast(toastElement);
            toast.show();
        }
}
```

## Дополнительные задания (задал преподаватель)

1) Расположить карточки не вертикально, а горизонтально:
  
```html
getHTML(data) {
        return `
            <div class="card w-100" style="position: relative;">
                <button class="btn btn-danger btn-sm delete-btn" 
                        data-id="${data.id}"
                        style="position: absolute; top: 10px; right: 10px; z-index: 10;">✕</button>
                
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${data.src}" class="img-fluid rounded-start h-90" 
                             alt="${data.title}" style="min-height: 100px; object-fit: cover;">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body py-2 px-3">
                            <h5 class="card-title mb-1" id="click-card-${data.id}" data-id="${data.id}" style="cursor: pointer; text-decoration: none; font-size: 1.8rem; color: #d0590f !important; font-family:'Courier New', Courier, monospace; font-weight:800;">${data.title}</h5>
                            <p class="card-text" style="cursor: pointer; text-decoration: none; color: #353535 !important; font-size: 0.9rem; font-family:'Courier New', Courier, monospace; font-weight:600;">${data.text}</p>
                            
                            <hr>
                            <small class="text-muted d-block mb-2"></small>
                            ${this.getTasksHTML(data.id)}
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
```

2) Встроенные задания по вариантам на карточках:
  
Задание №1
- Сумма квадратов элементов массива (функция sumOfSquares).

```js
sumOfSquares(arr) {
    return arr.reduce((sum, num) => sum + num * num, 0);
}
...
if (data.id === 1) {
        const btn13 = document.getElementById(`btn-13-${data.id}`);
        if (btn13) {
            btn13.addEventListener("click", () => {
                try {
                    const input = document.getElementById(`input-13-${data.id}`).value;
                    const arr = JSON.parse(input);
                    const result = this.sumOfSquares(arr);
                    document.getElementById(`result-13-${data.id}`).textContent = `✅ Результат: ${result} km^2`;
                } catch {
                    document.getElementById(`result-13-${data.id}`).textContent = `❌ Ошибка формата!`;
                }
            });
        }
```

- Сумма и произведение элементов массива (функция getSumAndMultOfArray).
  
```js
getSumAndMultOfArray(arr) {
    const sum = arr.reduce((a, b) => a + b, 0);
    const mult = arr.reduce((a, b) => a * b, 1);
    return { sum, mult };
}
...
const btn14 = document.getElementById(`btn-14-${data.id}`);
        if (btn14) {
            btn14.addEventListener("click", () => {
                try {
                    const input = document.getElementById(`input-14-${data.id}`).value;
                    const arr = JSON.parse(input);
                    const { sum, mult } = this.getSumAndMultOfArray(arr);
                    document.getElementById(`result-14-${data.id}`).textContent = `✅ Σ=${sum} чел, ×=${mult}`;
                } catch {
                    document.getElementById(`result-14-${data.id}`).textContent = `❌ Ошибка формата!`;
                }
            });
        }
```

Задание №2: задание на сравнение двух массивов (функция canGetArrayFromAnother).

```js
canGetArrayFromAnother(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        return sorted1.every((val, i) => val === sorted2[i]);
    }
...
if (data.id === 2) {
        const btn29 = document.getElementById(`btn-29-${data.id}`);
        if (btn29) {
            btn29.addEventListener("click", () => {
                try {
                    const inputA = document.getElementById(`input-29a-${data.id}`).value;
                    const inputB = document.getElementById(`input-29b-${data.id}`).value;
                    const arr1 = JSON.parse(inputA);
                    const arr2 = JSON.parse(inputB);
                    const result = this.canGetArrayFromAnother(arr1, arr2);
                    document.getElementById(`result-29-${data.id}`).innerHTML = 
                        result ? `✅ <span class="text-success">true</span>` : `❌ <span class="text-danger">false</span>`;
                } catch {
                    document.getElementById(`result-29-${data.id}`).textContent = `❌ Ошибка формата!`;
                }
            });
        }
    }
```

Задание №3: задание на переворот массива. Список станций Транссиба разворачивается в обратном порядке при нажатии кнопки «Переставить»:

```js
btn.addEventListener("click", () => {
    const stations = ['Москва','Ярославль','Киров','Пермь','Екатеринбург',
                       'Омск','Новосибирск','Красноярск','Иркутск','Чита',
                       'Хабаровск','Владивосток'];
    const reversed = [...stations].reverse();
    alert(`🚂 Было:\n${stations.join(' → ')}\n\n🔄 Стало:\n${reversed.join(' → ')}\n`);
});```
