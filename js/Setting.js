import { Quiz } from "./Quiz.js";

export class Setting {
    constructor() {
       this.categoryElement = document.getElementById("categoryElem");
       this.difficultyElement = document.getElementsByName("difficultyElem");
       this.numOfQuestionElement = document.getElementById("numOfQuestionElem");
       this.strtBtn = document.getElementById("strtBtn");
       
       this.strtBtn.addEventListener("click", this.startQuiz.bind(this));
    }
    
    async startQuiz(){
        let category = this.categoryElement.value;
        let difficulty = [...this.difficultyElement].filter(el  => el.checked)[0].value;
        let numOfQuestion = this.numOfQuestionElement.value;
        let Api = (`https://opentdb.com/api.php?amount=${numOfQuestion}&category=${category}&difficulty=${difficulty}`);
        let result = await this.getApi(Api);
        if(result.length > 0){
            $("#setting").fadeOut(500, () => {
                $("#quiz").fadeIn(500);
            })
            let quiz = new Quiz(result);

        }
    }
    async getApi(Api){
        let apiResponse = await fetch(Api);
        apiResponse = await apiResponse.json();
        return (apiResponse.results);
    }
}