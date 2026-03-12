# Лабораторная работа №1
Создание калькулятора. Верстка на HTML, CSS.

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)
- [Дополнительные задания (задал преподаватель)](#дополнительные-задания-задал-преподаватель)

## Цель работы

Цель данной лабораторной работы - знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого калькулятора, и затем выполнить задания по варианту.

# Основное задание

В рамках лабораторной работы необходимо:

-Создать HTML-страницу с базовой структурой документа (<!DOCTYPE>, <html>, <head>, <body>).

- Реализовать вёрстку интерфейса калькулятора с использованием семантических тегов и атрибутов id/class.
 
- Подключить внешний CSS-файл и реализовать стилизацию элементов интерфейса.
  
- Обеспечить корректное отображение страницы в современных браузерах (Chrome, Firefox, Edge).
  
- Продемонстрировать работу калькулятора в статическом режиме (визуальная часть).

*Заголовочный файл Calculator.html*


```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Калькулятор</title>
    <link rel="stylesheet" href="Calculator.css"> 
    <script src="Calculator.js"></script>
</head>
<body>
    <!-- Шапка с навигацией -->
    <div class="header">
        <div class="logo-container">
            <img src="https://siberians.online/images/logos/logo.svg" alt="Логотип" class="logo">
        </div>
        <div class="nav-bar">
            <a href="main_page.html" class="nav-item">Главная</a>
            <a href="calculator.html" class="nav-item active">Калькулятор</a>
            <a href="about.html" class="nav-item">О авторе</a>
        </div>
    </div>

    <!-- Обёртка калькулятора -->
    <div class="calculator_wrapper">
        <div class="btn_back">
            <a href="main_page.html" class="back-btn">← Назад</a>
        </div>
        
        <!-- Основной блок калькулятора -->
        <div class="calculator">
            <!-- Экран вывода результата -->
            <div id="result" class="result">0</div>
            
            <!-- Кнопки калькулятора -->
            <div>
                <div>  
                    <button id="btn_op_clear" class="my-btn secondary">C</button>
                    <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                    <button id="btn_op_percent" class="my-btn secondary">%</button>
                    <button id="btn_op_div" class="my-btn primary">/</button>
                </div>
                <div>
                    <button id="btn_digit_7" class="my-btn">7</button>
                    <button id="btn_digit_8" class="my-btn">8</button>
                    <button id="btn_digit_9" class="my-btn">9</button>
                    <button id="btn_op_mult" class="my-btn primary">x</button>
                </div>
                <div>
                    <button id="btn_digit_4" class="my-btn">4</button>
                    <button id="btn_digit_5" class="my-btn">5</button>
                    <button id="btn_digit_6" class="my-btn">6</button>
                    <button id="btn_op_minus" class="my-btn primary">-</button>
                </div>
                <div>
                    <button id="btn_digit_1" class="my-btn">1</button>
                    <button id="btn_digit_2" class="my-btn">2</button>
                    <button id="btn_digit_3" class="my-btn">3</button>
                    <button id="btn_op_plus" class="my-btn primary">+</button>
                </div>
                <div>
                    <button id="btn_digit_0" class="my-btn">0</button>
                    <button id="btn_digit_dot" class="my-btn">.</button>
                    <button id="btn_op_equal" class="my-btn primary execute">=</button>
                </div> 
            </div> 
        </div>
        
        <!-- Кнопка смены темы -->
        <div class="theme">
            <button id="theme_change" class="theme_btn">Сменить тему</button>
        </div>
    </div>
</body>
</html>
```
*и сss-файл Calculator.css*

```css
body{
    background-color: rgb(255, 255, 255);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 0;
    padding: 40px 15px;
    min-height: 70vh;
    color:rgb(240, 240, 240);
}

body.light-mode{
    background-color: rgb(255, 255, 255);
    color: black;
}

body.colorful-mode{
    background-image: url('pictures/ы4.jpg');
    color:black;
    background-size: cover;
    background-position: center;
}
.header {
    max-width: 1400px;
    margin: 0 auto 20px auto;
    display: flex;
    align-items: center;
    justify-content:start;
    backdrop-filter: blur(10px);
    padding: 15px 25px;
    border-radius: 5px;
    border-bottom: 2px solid rgba(144, 144, 144, 0.3);
}
.nav-bar {
    margin-left: 70px;
    margin-top: -15px;
    height: 40px;
    width: 400px;
    display: flex;
    gap: 10px;
    background: rgb(212, 212, 212);
    padding: 5px;
    border-radius: 20px;
    border: 2px solid rgb(244, 244, 244);
}
.nav-item {
    text-decoration: none;
    color: rgb(44, 44, 44);
    font-weight: 600;
    padding: 11px 25px;
    border-radius: 30px;
    transition: all 0.3s ease;
    font-size: 1rem;
    letter-spacing: 0.3px;
}
.nav-item:hover{
    color: rgb(239, 111, 19);
    text-decoration:dashed;
    text-shadow: 0 0 1px currentColor;
}
.calculator_wrapper{
    max-width: 400px;
    margin: 10px auto;
    text-align: center;
}
.calculator{
    background: rgb(189, 189, 189);
    border-radius: 20px;
    padding: 25px;
    border: 2px solid rgb(237, 237, 237);
}
.theme{
    font-size: 2rem;
    color: rgb(44, 44, 44);
    margin-bottom: 25px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
}
.result{
    width: 250px;
    height: 50px;
    margin-bottom: 20px;
    padding: 0 20px;
    background:rgb(44, 44, 44);
    border-radius: 15px;
    text-align: right;
    color: rgb(255, 255, 255);
    font-size: 2.2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.my-btn{
    margin-right: 5px;
    margin-top: 5px;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    border: none;                          /*отключаем обводку*/
    background-color: rgb(239, 111, 19);
    color:rgb(44, 44, 44);                    /* задаем белый цвет текста внутри кнопки */
    font-size: 1.6rem;                    /* увеличим размер шрифта */
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;

    user-select: none;
}

.my-btn:hover{
    background: rgb(176, 83, 17);

}
.my-btn:active{
    filter: brightness(130%);
}
.my-btn.primary{
    background: rgb(116, 116, 116);
}
.my-btn.primary:hover{
    background: rgb(66, 66, 66);
}
.my-btn.secondary{
    background: #eae8e8;
}
.my-btn.secondary:hover{
    background: #868585;
}
.my-btn.execute { 
  width: 110px;
  border-radius: 12px;
}
.logo {
    height: 70px;
    margin-top: -15px;
    width: auto;
}
.theme_btn{
    margin: 10px 0;
    padding: 8px 25px 46px 25px;
    width: 400px;
    height: 50px;
    border-radius: 10px;
    border: 2px solid rgb(229, 229, 229);
    background: rgb(189, 189, 189);
    color:rgb(44, 44, 44);                    /* задаем белый цвет текста внутри кнопки */
    font-size: 1.3rem;
    font-weight: 600;                    
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}
.theme_btn:hover{
    background: rgb(164, 163, 163);
    border-color: rgb(239, 111, 19);
    text-shadow: 0 0 1px currentColor;
}
.btn_back {
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
}

.back-btn {
    display: inline-block;
    margin-top: 5px;
    padding: 15px 20px;
    background:rgb(189, 189, 189);
    color: rgb(44, 44, 44);
    text-decoration: none;
    border-radius: 15px;
    border: 2px solid rgb(229, 227, 227);
    font-weight: 700;
    font-size: 1.2rem;
    
}
.back-btn:hover{
    background: rgb(152, 152, 152);
    border-color: rgb(239, 111, 19);
    text-shadow: 0 0 1px currentColor;
}

@media(max-width: 2050){ /*@media - позволяет подстроить сайт под разные экраны*/
    .calculator{
        padding: 25px;
    }
    .my-btn{
        width: 80px;
        height: 80px;
        font-size: 1.5rem;
    }
    .my-btn.execute {
        width: 172px;
    }
  
    .result {
        height: 90px;
        font-size: 2.5rem;
    }
}

```

*html-файл main_page.html*

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Главная - Калькулятор</title>
    <link rel="stylesheet" href="main_page.css">
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="logo-container">
                <img src="https://siberians.online/images/logos/logo.svg" alt="Логотип" class="logo">
            </div>

            <div class="nav-bar">
                <a href="main_page.html" class="nav-item">Главная</a>
                <a href="calculator.html" class="nav-item active">Калькулятор</a>
                <a href="about.html" class="nav-item">О авторе</a>
            </div>
        </div>

        <main class="main">
            <div class="images">
                <img src="https://siberians.online/images/backgrounds/bg-middle.webp" alt="pre_load" class="img">
            </div>
            <div class="hero">
                <h1>Добро пожаловать!</h1>
                <p>
                        Большая часть современных жителей Сибири — потомки переселенцев.
                    С конца XVI века из Европейской России в Сибирь приводили
                    жизненные пути людей разных национальностей, сословий и религий.
                    Кто-то переселялся сам, на свой страх и риск, кто-то — при
                    поддержке государства. Были тут и невольные переселенцы — с XVII
                    столетия по XX век Сибирь была местом ссылки. Переселение, даже
                    добровольное — это всегда большой риск, испытание людей на
                    прочность, работоспособность, смекалку.
                </p>
            </div>
        </main>

        <footer class="footer">
            <p>2026, Пчелинцева Дарья, ИУ5-42Б</p>
        </footer>
    </div>
</body>
</html>
```
*и сss-файл main_page.css*

```css
body {
    background-image: url('pictures/ы4.jpg');
    background-size: cover;  
    background-position: center;      /* Центрирует изображение */
    background-repeat: no-repeat;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    color: rgb(44, 44, 44);
}

.wrapper {
    max-width: 1400px;
    margin: 40px auto;
    background-color: rgba(255, 255, 255, 0.793);
    border-radius: 30px;
    padding: 40px 50px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.header {
    max-width: 1400px;
    margin: 0 auto 15px auto;
    display: flex;
    align-items: center;
    justify-content:start;
    backdrop-filter: blur(10px);
    padding: 10px 25px;
    border-radius: 5px;
    border-bottom: 2px solid rgba(144, 144, 144, 0.3);
}

.nav-bar {
    margin-left: 70px;
    margin-bottom: 17px;
    height: 40px;
    width: 400px;
    display: flex;
    gap: 10px;
    background: rgb(212, 212, 212);
    padding: 5px;
    border-radius: 20px;
    border: 2px solid rgb(244, 244, 244);
}

.nav-item {
    text-decoration: none;
    color: rgb(44, 44, 44);
    font-weight: 600;
    padding: 11px 25px;
    border-radius: 30px;
    transition: all 0.3s ease;
    font-size: 1rem;
    letter-spacing: 0.3px;
}

.nav-item:hover{
    color: rgb(239, 111, 19);
    text-decoration:dashed;
    text-shadow: 0 0 1px currentColor;
}

.logo {
    height: 60px;
    width: auto;
    transition: transform 0.3s ease;
}

.main {
    margin: 30px 0;
}

.images {
    width: 100%;
    margin-bottom: 40px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(229, 229, 229, 0.5);
}

.img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
}

.footer{
    width: 100%;
    height: 40px;
    border-top: 2px solid rgba(144, 144, 144, 0.3);
    text-align: center;
}
.footer p{
    margin-top: 26px;
}
```
*и html-файл about.html*

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>О проекте - Калькулятор</title>
    <link rel="stylesheet" href="about.css">
</head>
<body>
    <div class="wrapper">
        <div class="header">
            <div class="logo-container">
                <img src="https://siberians.online/images/logos/logo.svg" alt="Логотип" class="logo">
            </div>

            <div class="nav-bar">
                <a href="main_page.html" class="nav-item">Главная</a>
                <a href="calculator.html" class="nav-item active">Калькулятор</a>
                <a href="about.html" class="nav-item">О авторе</a>
            </div>
        </div>
        <div class="btn_back">
            <a href="main_page.html" class="back-btn">← Назад</a>
        </div>
        <div class="main-content">
            <div class="left-column">
                <div class="author-block">
                    <details class="author">
                        <summary>Автор</summary>
                        <p>Пчелинцева Дарья<br>ИУ5-42Б</p>
                    </details>
                    <a href="https://github.com/daria788/labs_PSP/tree/Calculator-(html/css)" target="_blank" class="github_btn">GitHub</a>
                </div>
            </div>

            <div class="right-column">
                <div class="purpose_box">
                    <p><strong>Цель:</strong> <mark>знакомство</mark> с инструментами построения пользовательских интерфейсов web-сайтов: <mark>HTML</mark>, <mark>CSS</mark>.</p>
                </div>
            </div>
        </div>

    </div>
</body>
</html>
```

*и css-файл about.css*

```css
body {
    background-image: url('pictures/ы4.jpg');
    background-size: cover;  
    background-position: center;      /* Центрирует изображение */
    background-repeat: no-repeat;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
    color: rgb(44, 44, 44);
}

.wrapper {
    max-width: 1400px;
    margin: 40px auto;
    background-color: rgba(255, 255, 255, 0.793);
    border-radius: 30px;
    padding: 40px 50px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
.header {
    max-width: 1400px;
    margin: 0 auto 15px auto;
    display: flex;
    align-items: center;
    justify-content:start;
    backdrop-filter: blur(10px);
    padding: 10px 25px;
    border-radius: 5px;
    border-bottom: 2px solid rgba(144, 144, 144, 0.3);
}
.nav-bar {
    margin-left: 70px;
    margin-bottom: 17px;
    height: 40px;
    width: 400px;
    display: flex;
    gap: 10px;
    background: rgb(212, 212, 212);
    padding: 5px;
    border-radius: 20px;
    border: 2px solid rgb(244, 244, 244);
}
.nav-item {
    text-decoration: none;
    color: rgb(44, 44, 44);
    font-weight: 600;
    padding: 11px 25px;
    border-radius: 30px;
    transition: all 0.3s ease;
    font-size: 1rem;
    letter-spacing: 0.3px;
}
.nav-item:hover{
    color: rgb(239, 111, 19);
    text-decoration:dashed;
}
.logo-container {
    border-bottom: none;
    padding-bottom: 20px;
}

.logo {
    height: 70px;
    width: auto;
}
/* Основной контент */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    margin: 20px 0;
    margin-bottom: 50px;
}

/* Левая колонка */
.left-column h2 {
    font-size: 2rem;
    color: rgb(44, 44, 44);
    margin-bottom: 25px;
}

.author-block {
    background-color: rgb(203, 203, 203);
    border-radius: 15px;
    padding: 25px;
    border: 2px solid rgb(227, 226, 226);
}

.author {
    width: 100%;
    margin-bottom: 15px;
}

.author summary {
    color: rgb(44, 44, 44);
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: 600; 
    padding: 5px 0;
    transition: all 0.3s ease;
}

.author summary:hover {
    color: rgb(0, 0, 0);
    font-weight: 800; 
    text-shadow: 0 0 1px currentColor;
}

.author p {
    color: rgb(44, 44, 44);
    font-weight: 600;
    margin-top: 15px;
    line-height: 1.6;
    font-size: 1.1rem;
    padding: 15px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
}

.github_btn {
    display: inline-block;
    margin: 10px 0 0 0;
    padding: 12px 25px;
    background: rgb(167, 167, 167);
    color: rgb(44, 44, 44);
    text-decoration: none;
    border-radius: 8px;
    border: 2px solid rgb(228, 227, 227);
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.github_btn:hover {
    background: rgb(192, 192, 192);
    border-color: rgb(239, 111, 19);
    font-weight: bold;
    text-shadow: 0 0 1.5px currentColor;
}

/* Правая колонка */
.right-column {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.purpose_box {
    margin: 0;
    padding: 25px;
    background: rgb(193, 193, 193);
    border-radius: 15px;
    border: 2px solid rgb(227, 226, 226);
}

.purpose_box p {
    color: rgb(44, 44, 44);
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 0;
}

.purpose_box strong {
    color: rgb(44, 44, 44);
    font-size: 1.3rem;
}

mark {
    background-color: rgb(239, 111, 19);
    color: rgb(0, 0, 0);
    padding: 1px 8px;
    border-radius: 6px;
    font-weight: bold;
    display: inline-block;
    margin: 0 2px;
}
.btn_back {
    margin-top: 10px;
    padding-top: 20px;
}

.back-btn {
    display: inline-block;
    padding: 15px 45px;
    background: rgb(203, 203, 203);
    color: rgb(44, 44, 44);
    text-decoration: none;
    border-radius: 15px;
    border: 2px solid rgb(227, 226, 226);
    font-weight: 700;
    font-size: 1.2rem;
}

.back-btn:hover {
    background: rgb(184, 184, 184);
    border-color: rgb(239, 111, 19);
    text-shadow: 0 0 1px currentColor;
}

/* Адаптивность */
@media (max-width: 968px) {
    .main-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    .page-title {
        font-size: 2.5rem;
    }
    
    .page-subtitle {
        font-size: 1.5rem;
    }
    
    .nav-bar {
        gap: 15px;
    }
}

@media (max-width: 768px) {
    .wrapper {
        padding: 25px;
        margin: 20px;
    }
    
    .page-title {
        font-size: 2rem;
    }
    
    .page-subtitle {
        font-size: 1.2rem;
    }
    
    .nav-bar {
        flex-direction: column;
        gap: 10px;
    }
    
    .stats-container {
        grid-template-columns: 1fr;
    }
    
    .btn_back {
        justify-content: center;
    }
    
    .back-btn {
        width: 100%;
        text-align: center;
    }
}
```

### Дополнительные задания (задал преподаватель)



