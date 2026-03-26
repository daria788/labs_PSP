import {MainPage} from "../../pages/main/index.js";
export class HeaderComponent{
    constructor(parent){
        this.parent = parent;
    }
    getHTML(){
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Освоение Сибири и Дальнего Востока</a>
                    <button class="btn btn-outline-primary" id="home-button">Домой</button>
                </div>
        </nav>
        `;
    }
    addListeners(listener){
        document.getElementById("home-button").addEventListener("click", listener);
    }
    render(listener){
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}
