# Лабораторная работа №2
Создание калькулятора. Функции на JavaScript.

## Содержание <!-- omit in toc -->

- [Цель работы](#цель-работы)
- [Основное задание](#основное-задание)
- [Дополнительные задания (задал преподаватель)](#дополнительные-задания-задал-преподаватель)

## Цель работы

Цель данной лабораторной работы - знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript. В ходе выполнения работы, вам предстоит продолжить реализовывать простой калькулятор, и затем выполнить задания по варианту.

## Основное задание

В рамках лабораторной работы необходимо:


- Подключить внешний JavaScript-файл к HTML-документу калькулятора.
  
- Реализовать получение доступа к элементам интерфейса (кнопки, поле вывода) через DOM.
  
- Написать обработчики событий click для кнопок цифр и операций.
  
- Реализовать логику вычислений: ввод чисел, выбор операции, вычисление результата, очистка.
  
- Обеспечить корректное отображение результатов на экране калькулятора.
  
- Протестировать работу калькулятора в браузере с использованием Live Server.

### *Файл калькулятора Calculator.html*

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
    <div class="calculator_wrapper">
        <div class="btn_back">
            <a href="main_page.html" class="back-btn">← Назад</a>
        </div>
        <div class="calculator">
            <div id="result" class="result">0</div>
            
            <div class="button-container">
                <div>
                    <button id="btn_op_clear" class="my-btn secondary">C</button>
                    <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                    <button id="btn_op_percent" class="my-btn secondary">%</button>
                    <button id="btn_op_div" class="my-btn primary">/</button>
                    <button id="btn_digit_backspase" class="my-btn thirdly">←</button>
                    <button id="btn_digit_memory_min" class="my-btn fourly">--</button>
                </div>
                
                <div>
                    <button id="btn_digit_7" class="my-btn">7</button>
                    <button id="btn_digit_8" class="my-btn">8</button>
                    <button id="btn_digit_9" class="my-btn">9</button>
                    <button id="btn_op_mult" class="my-btn primary">x</button>
                    <button id="btn_digit_root" class="my-btn thirdly">√</button>
                    <button id="btn_digit_memory_plus" class="my-btn fourly">++</button>
                </div>
                
                <div>
                    <button id="btn_digit_4" class="my-btn">4</button>
                    <button id="btn_digit_5" class="my-btn">5</button>
                    <button id="btn_digit_6" class="my-btn">6</button>
                    <button id="btn_op_minus" class="my-btn primary">-</button>
                    <button id="btn_op_quadro" class="my-btn thirdly">x²</button>
                </div> 
                
                <div>
                    <button id="btn_digit_1" class="my-btn">1</button>
                    <button id="btn_digit_2" class="my-btn">2</button>
                    <button id="btn_digit_3" class="my-btn">3</button>
                    <button id="btn_op_plus" class="my-btn primary">+</button>
                    <button id="btn_op_factorial" class="my-btn thirdly">x!</button>
                </div>
                
                <div>
                    <button id="btn_digit_0" class="my-btn">0</button>
                    <button id="btn_digit_dot" class="my-btn">.</button>
                    <button id="btn_op_nul" class="my-btn">000</button>
                    <button id="btn_op_log" class="my-btn primary">lg</button>
                    <button id="btn_op_equal" class="my-btn primary wide-equal">=</button>
                </div> 
            </div>
        </div>
        <div class="theme">
            <button id="theme_change" class="theme_btn">Сменить тему</button>
            <!--<button id="theme_result_change" class="theme_result_btn">Сменить тему для вывода</button>-->
        </div>  
    </div>
</body>
</html>
```

### *и сss-файл Calculator.css*

- Основной фон, Светлый(rgb(255, 255, 255)), Цветной(картинка):
  
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
```

- Меню код:
  
```css
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
```

- Основные кнопки калькулятору:
  
```css
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

.my-btn.fourly {
    background-color: rgb(233, 97, 0);
    width: 50px;  
    height: 50px;
    margin: 0;
    font-size: 1.6rem;  
    font-weight: 400;
}

.my-btn.fourly:hover {
    background-color: rgb(176, 83, 17);
}

.my-btn.thirdly{
    background:  #eae8e8;
}
.my-btn.thirdly:hover{
    background:  #868585;
}
```

- Кнопки смена темы:
  
```css
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
```

- Кнопка "Назад":
  
```css
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
```

### *html-файл главного меню main_page.html*


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
### *и сss-файл main_page.css*

- Фон главной страницы:
  
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
```


- Меню код:
  
```css
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
```


### *html-файл о авторе about.html*


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

### *и css-файл about.css*

- Фон страницы "О авторе":
  
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
```

- Меню код:
  
```css
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
```

- Блок о авторе:
  
```css
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
```


- Кнопка GitHub:
  
```css
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

- Блок с целью работы:

```css
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
    color: rgb(0, 0, 0);
    font-weight: bold;
    font-size: 1.4rem;
    background-color:  rgb(193, 193, 193);
}
```

- Кнопка "Назад":
  
```css
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
```

### *и JS-файл about.css*

```js
window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOper = null
    let memory=0;


    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function UpdateSize(){
        const value= outputElement.innerHTML;
        const length= value.length;

        outputElement.style.fontSize='2.2rem';
    }
    function SizeLimit(){
        const value= outputElement.innerHTML;
        const length= value.length;

        if (length>31){
            outputElement.innerHTML=value.slice(0,31);
        }

        if (length>23){
            outputElement.style.fontSize='1.0rem';
        }
        if(length>17){
            outputElement.style.fontSize='1.2rem';
        }
        else{
            outputElement.style.fontSize='2.2rem';
        }
        
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOper) {
            if (a === '') {
                if (digit === '0' || digit === '00') {
                    a = '0';  // При вводе нуля устанавливаем "0"
                } else if (digit === '.') {
                    a = '0.';  // При вводе точки с пустого числа начинаем с "0."
                } else {
                    a = digit;  // При вводе цифры (1-9) просто ставим её
                }
            }
            else if (a === '0') {
                if (digit === '0' || digit === '00') {
                    a = '0';
                    outputElement.innerHTML = a;
                    return;
                }else if (digit === '.') {
                    a = '0.';  // При вводе точки после нуля получаем "0."
                } else {
                    a = digit;  // При вводе цифры (1-9) заменяем ноль на эту цифру
                }
            }else{ 
                a += digit;
            }
            outputElement.innerHTML = a;
            SizeLimit()
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if (b === '') {
            if (digit === '0' || digit === '00') {
                b = '0';  // При вводе нуля устанавливаем "0"
            } else if (digit === '.') {
                b = '0.';  // При вводе точки с пустого числа начинаем с "0."
            } else {
                b = digit;  // При вводе цифры (1-9) просто ставим её
            }
            }else if (b === '0') {
                if (digit === '0' || digit === '00') {
                    b = '0';
                    outputElement.innerHTML = a;
                    return;
                }else if (digit === '.') {
                    b = '0.';  // При вводе точки после нуля получаем "0."
                }else {
                    b = digit;  // При вводе цифры (1-9) заменяем ноль на эту цифру
                }
            }
            else{ 
                b += digit;      
            }
            outputElement.innerHTML = b;  
            SizeLimit()
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });


    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOper = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOper = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOper = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOper = '/';
    }
    document.getElementById("btn_op_sign").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=(+a*(-1)).toString();
                outputElement.innerHTML = a;
            }
        }else{
            if (b!=''){
                b=(+b*(-1)).toString();
                outputElement.innerHTML = b;
            }
        }   
    }
    document.getElementById("btn_op_percent").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=(+a/(100)).toString();
                outputElement.innerHTML = a;
            }
            SizeLimit()
        }else{
            if (b!=''){
                b=(+a*(b/100)).toString();
                outputElement.innerHTML = b;
            }
            SizeLimit()
        }   
    }
    document.getElementById("btn_digit_root").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=((+a)**0.5).toString();
                outputElement.innerHTML = a;
            }
            SizeLimit()
        }else{
            if (b!=''){
                b=((+b)**0.5).toString();
                outputElement.innerHTML = b;
            }
            SizeLimit()
        }   
    }
    document.getElementById("btn_op_quadro").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=((+a)**2).toString();
                outputElement.innerHTML = a;
            }
            SizeLimit()
        }else{
            if (b!=''){
                b=((+b)**2).toString();
                outputElement.innerHTML = b;
            }
            SizeLimit()
        }   
    }
    document.getElementById("btn_op_nul").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=(+a*1000).toString();
                outputElement.innerHTML = a;
            }
            SizeLimit()
        }else{
            if (b!=''){
                b=(+b*1000).toString();
                outputElement.innerHTML = b;
            }
            SizeLimit()
        }   
    }
    document.getElementById("btn_op_log").onclick = function(){
        if(!selectedOper){
            if (a!=''){
                let num=+a;
                if(num<=0){
                    outputElement.innerHTML="Ошибка";
                    return;
                }
                a=Math.log10(num).toString();
                outputElement.innerHTML=a;
            }
            SizeLimit()
        }else{
            if (a!=''){
                let num=+b;
                if(num<=0){
                    outputElement.innerHTML="Ошибка";
                    return;
                }
                b=Math.log10(num).toString();
                outputElement.innerHTML=b;
            }
            SizeLimit()
        }
    }
    document.getElementById("btn_op_factorial").onclick = function(){
        function fact(n){
            if(n<0 || !Number.isInteger(n)) return NaN;
            if(n==0 || n==1) return 1;
            return n*fact(n-1);
        }
        if(!selectedOper){
            if(a!=''){
                let num=+a;
                let result=fact(num)
                if(isNaN(result)){
                    outputElement.innerHTML = "Ошибка!";
                }
                a=result.toString();
                outputElement.innerHTML = a;
            }
            SizeLimit()
        }else{
            if (b!=''){
                let num=+b;
                let result=fact(num)
                if(isNaN(result)){
                    outputElement.innerHTML = "Ошибка!";
                }
                b=result.toString();
                outputElement.innerHTML = b;
            }
            SizeLimit()
        } 
    }
        
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOper = ''
        expressionResult = ''
        outputElement.innerHTML = 0
        UpdateSize();
    }
    document.getElementById("btn_digit_backspase").onclick = function(){
        if(!selectedOper){
            if(a!=''){
                a=a.slice(0,-1);
                outputElement.innerHTML=a||'0';
            }
            SizeLimit()
        }else{
            if(b!=''){
                b=b.slice(0,-1)
                outputElement.innerHTML=b||'0';
            }
            SizeLimit()
        }
    }
    document.getElementById("btn_op_equal").onclick = function() { 
        
        if (a === '' || b === '' || !selectedOper)
            return
            
        switch(selectedOper) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                if (+b === 0) {
                    expressionResult = 'Ошибка!';
                    outputElement.innerHTML = 'Ошибка!';
                    return;
                }
                expressionResult = (+a) / (+b)
                break;
            
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString()
        b = ''
        selectedOper = null

        // Показываем результат на экране
        outputElement.innerHTML = a
    }

    document.getElementById("btn_digit_memory_plus").onclick = function(){
        let num =0;
        if(!selectedOper){
            if(a!=''){
                num=+a;
                memory+=num;
                outputElement.innerHTML=memory+'M+';

                setTimeout(() => {
                    outputElement.innerHTML = a;
                }, 300);
            }
            else{
                outputElement.innerHTML=0;
            }
            SizeLimit()
        }else{
            if(b!=''){
                num=+b;
                memory+=num;
                outputElement.innerHTML=memory+'M+';

                setTimeout(() => {
                    outputElement.innerHTML = b;
                }, 300);
            }
            else{
                outputElement.innerHTML=0;
            }
            SizeLimit()
        }
    }
    document.getElementById("btn_digit_memory_min").onclick = function(){
        let num =0;
        if(!selectedOper){
            if(a!=''){
                num=+a;
                memory-=num;
                outputElement.innerHTML=memory+'M-';

                setTimeout(() => {
                    outputElement.innerHTML = a;
                }, 300);
            }
            else{
                outputElement.innerHTML=0;
            }
            SizeLimit()
        }else{
            if(b!=''){
                num=+b;
                memory-=num;
                outputElement.innerHTML=memory+'M-';

                setTimeout(() => {
                    outputElement.innerHTML = b;
                }, 300);
            }
            else{
                outputElement.innerHTML=0;
            }
            SizeLimit()
        }
    }
    document.getElementById('theme_change').addEventListener('click', function() {
    const body = document.body;
    
    // Определяем текущую тему и переключаем на следующую
    if (body.classList.contains('light-mode')) {
        body.className = 'colorful-mode';
        this.textContent = 'Цветная тема';
    } else if (body.classList.contains('colorful-mode')) {
        body.className = 'light-mode';
        this.textContent = 'Светлая тема';
    } else {
        // Если нет класса (начальное состояние)
        body.className = 'light-mode';
        this.textContent = 'Светлая тема';
    }
});
};

```

## Дополнительные задания (задал преподаватель)

- Уменьшать размер цифры, при вводе большого числа:
  
```js
function SizeLimit(){
        const value= outputElement.innerHTML;
        const length= value.length;

        if (length>31){
            outputElement.innerHTML=value.slice(0,31);
        }

        if (length>23){
            outputElement.style.fontSize='1.0rem';
        }
        if(length>17){
            outputElement.style.fontSize='1.2rem';
        }
        else{
            outputElement.style.fontSize='2.2rem';
        }
    }
```

- Восстанавливает размер цифры после стерки большой:
  
```js
function UpdateSize(){
        const value= outputElement.innerHTML;
        const length= value.length;

        outputElement.style.fontSize='2.2rem';
    }
```
