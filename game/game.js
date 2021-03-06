window.onload = getApiQuestions()






//An asynchronous function to fetch data from the API
async function getApiQuestions(){
    let result = document.getElementById('categoryResult').innerText;
    selectionArr = result.split(". ");
    let categoryId = parseInt(selectionArr[0]);
    categoryId += 8;
    console.log("category id: " + categoryId);
    let categoryName = selectionArr[1];
    let url = `https://opentdb.com/api.php?amount=1&category=${String(categoryId)}&type=multiple`
    console.log("url: " + url)

    let response = await fetch(url);
    // console.log(response)

    let data = await response.json()
    console.log(data)

    useApiData(data)
    checkAnswer(data.results[0].correct_answer);



}

//function that does something with the .json data returned from the API
function useApiData(data){

    let answerChoices = [
        data.results[0].correct_answer,
        data.results[0].incorrect_answers[0],
        data.results[0].incorrect_answers[1],
        data.results[0].incorrect_answers[2]
    ]

    answerChoices.sort(() => Math.random() - .5);

    document.querySelector("#category").innerHTML = `Category: ${data.results[0].category}`
    document.querySelector("#difficulty").innerHTML = `Difficulty: ${data.results[0].difficulty}`
    document.querySelector("#question").innerHTML = `Question: ${data.results[0].question}`
    document.querySelector("#answer1").innerHTML =  `A)  ${answerChoices[0]}`   //data.results[0].correct_answer
    document.querySelector("#answer2").innerHTML =  `B)  ${answerChoices[1]}`    //data.results[0].incorrect_answers[0]
    document.querySelector("#answer3").innerHTML = `C)  ${answerChoices[2]}`   //data.results[0].incorrect_answers[1]
    document.querySelector("#answer4").innerHTML =  `D)  ${answerChoices[3]}`   //data.results[0].incorrect_answers[2]



}

function checkAnswer(correctAnswer) {
    let checkAnswer = document.querySelector("#check-answer");
    checkAnswer.addEventListener("click", () => {
        document.querySelector("#correct-answer").innerHTML = `Correct Answer: ${correctAnswer}`;
    })
}

let nextQuestion = document.querySelector("#next-question");
nextQuestion.addEventListener("click", () => {
    document.querySelector("#correct-answer").innerHTML = "";
    getApiQuestions();
})



// let correctButton = document.querySelector("#answer1")
//
// correctButton.addEventListener("click", () => {
//     alert("Correct!")
//     sendApiRequest()
// })




