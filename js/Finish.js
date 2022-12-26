export class Finish {
    constructor(score, total) {
        this.total = total;
        this.score = score;
        this.setScore();
        this.tryAgain = document.getElementById("tryAgain");  
        this.tryAgain.addEventListener("click", this.startQuiz);
        

    }
    setScore() {
        document.getElementById("score").innerHTML = this.score;
        document.getElementById("total").innerHTML = this.total;
        
    }
    startQuiz() {
        $("#finish").fadeOut(500, () => {
            $("#setting").fadeIn(500);
        })
        document.getElementById("numOfQuestionElem").value = "";
        document.getElementById("answers").value = "";
    }
}