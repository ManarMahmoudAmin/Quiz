import {Finish} from './Finish.js'
export class Quiz{
    constructor(result) {
        this.result = result;
        this.totalNumOfQues = result.length;
        this.currentQues = 0;
        this.showQuestion()
        this.submitBtn = document.getElementById("submitBtn");  
        this.answerElements = document.getElementsByName("answer");
        this.submitBtn.addEventListener("click",this.nextQuestion.bind(this));
        this.score = 0;
              
    }
    showQuestion() {
        document.getElementById("currentQues").innerHTML = this.currentQues+1;
        document.getElementById("totalNumOfQues").innerHTML = this.totalNumOfQues;
        document.getElementById("question").innerHTML = this.result[this.currentQues].question;
        let answers = [this.result[this.currentQues].correct_answer,...this.result[this.currentQues].incorrect_answers];
        answers = this.shuffle(answers);
        
        let temp ="";
        for(let i = 0 ; i < answers.length ; i++){
            temp += `<div class="form-check">
                        <label class="form-check-label text-white">
                        <input type="radio" class="form-check-input" name="answer" id="" value="${answers[i]}" >
                            ${answers[i]}
                        </label>
                    </div>` 
        }
        document.getElementById("answers").innerHTML = temp;
    }
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
   nextQuestion() {
    let userAnswer = Array.from(this.answerElements).filter(el => el.checked)
    if(userAnswer.length == 1){
        this.checkAnswer();
        $("#alert").fadeOut(300);
        this.currentQues++;
        if(this.currentQues < this.totalNumOfQues){
            this.showQuestion();
        }
        else {
            $("#quiz").fadeOut(500, () => {
                $("#finish").fadeIn(500);
                let finish = new Finish(this.score, this.totalNumOfQues);
            })
        }    
    }
    else {
        $("#alert").fadeIn(300);
    }
    
   }
   checkAnswer() { 
    let userAnswer = Array.from(this.answerElements).filter(el => el.checked)[0].value;
    if(userAnswer == this.result[this.currentQues].correct_answer){
        this.score++;        
        $("#correct").fadeIn(500, ()=> {
            $("#correct").fadeOut(500);
        })
    }
    else {
        $("#incorrect").fadeIn(500, ()=> {
            $("#incorrect").fadeOut(500)
        })    
    }
   }
   startQuiz() {
        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500);
        })
   }
}    