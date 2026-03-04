window.onload = function(){
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOper = null
    let memory=0;

    // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    // СМЕНА ЦВЕТА ОКНА ВЫВОДА (3 цвета)
    let resultColorIndex = 0;
    const resultColors = [
        '#000000',  // черный
        '#1e3a5f',  // темно-синий
        '#4a2c2c'   // темно-бордовый
    ];

// Устанавливаем начальный текст кнопки
    document.getElementById('theme_result_change').textContent = 'Цвет: Обычная';

    document.getElementById('theme_result_change').addEventListener('click', function() {
        // Меняем индекс цвета
        resultColorIndex = (resultColorIndex + 1) % resultColors.length;
    
        // Применяем цвет к окну вывода
        outputElement.style.backgroundColor = resultColors[resultColorIndex];
    
        // Меняем цвет текста (белый на темных фонах)
        outputElement.style.color = '#ffffff';
    
        // Меняем текст на кнопке
        const colorNames = ['Обычная', 'Синяя', 'Бордовая'];
        this.textContent = 'Цвет: ' + colorNames[resultColorIndex];
    });

        function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOper) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
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
        }else{
            if (b!=''){
                b=(+a*(b/100)).toString();
                outputElement.innerHTML = b;
            }
        }   
    }
    document.getElementById("btn_digit_root").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=((+a)**0.5).toString();
                outputElement.innerHTML = a;
            }
        }else{
            if (b!=''){
                b=((+b)**0.5).toString();
                outputElement.innerHTML = b;
            }
        }   
    }
    document.getElementById("btn_op_quadro").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=((+a)**2).toString();
                outputElement.innerHTML = a;
            }
        }else{
            if (b!=''){
                b=((+b)**2).toString();
                outputElement.innerHTML = b;
            }
        }   
    }
    document.getElementById("btn_op_nul").onclick = function(){
       if(!selectedOper){
            if(a!=''){
                a=(+a*1000).toString();
                outputElement.innerHTML = a;
            }
        }else{
            if (b!=''){
                b=(+b*1000).toString();
                outputElement.innerHTML = b;
            }
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
        } 
    }
        // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOper = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    document.getElementById("btn_digit_backspase").onclick = function(){
        if(!selectedOper){
            if(a!=''){
                a=a.slice(0,-1);
                outputElement.innerHTML=a||'0';
            }
        }else{
            if(b!=''){
                b=b.slice(0,-1)
                outputElement.innerHTML=b||'0';
            }
        }
    }
        // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOper)
            return
            
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOper) { 
            case 'x':
                expressionResult = (+a) * (+b)
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
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
        }
    }
        // Обработчик для выпадающего списка
        document.getElementById('theme_select').addEventListener('change', function() {
        // Удаляем все классы с тела
        document.body.className = '';
        // Добавляем выбранный класс
        document.body.classList.add(this.value + '-mode');
    
        // Обновляем текст кнопки в соответствии с выбранной темой
        const themeBtn = document.getElementById('theme_change');
        switch(this.value) {
            case 'light':
                themeBtn.textContent = 'Светлая тема';
                break;
            case 'dark':
                themeBtn.textContent = 'Тёмная тема';
                break;
            case 'colorful':
                themeBtn.textContent = 'Цветная тема';
                break;
        }
});


document.getElementById('theme_change').addEventListener('click', function() {
    const body = document.body;
    const select = document.getElementById('theme_select');
    
    // Определяем текущую тему и переключаем на следующую
    if (body.classList.contains('light-mode')) {
        body.className = 'dark-mode';
        select.value = 'dark';
        this.textContent = 'Тёмная тема';
    } else if (body.classList.contains('dark-mode')) {
        body.className = 'colorful-mode';
        select.value = 'colorful';
        this.textContent = 'Цветная тема';
    } else if (body.classList.contains('colorful-mode')) {
        body.className = 'light-mode';
        select.value = 'light';
        this.textContent = 'Светлая тема';
    } else {
        // Если нет класса (начальное состояние)
        body.className = 'light-mode';
        select.value = 'light';
        this.textContent = 'Светлая тема';
    }
});
};
