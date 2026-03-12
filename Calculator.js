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
