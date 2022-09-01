const wordsModel = require("./../Model/TestData.json")

// function that takes array of words and returns a random word from that array
function getRandomWord(arr) {
    let randomIndex = Math.ceil(Math.random() * arr.length - 1)
    let index = Math.abs(randomIndex)
    let randomWord = arr[index];
    return randomWord
}

// function takes part of speech (noun,verb,...) and filters the main array
// and returns array of the same category
function partOfSpeechArr(filterWord) {
    let partOfSpeech = wordsModel.wordList.filter(word => word.pos === filterWord)
    return partOfSpeech;
}

//function to shuffle the final array
function shuffle(arr) {
    let index = arr.length;
    let randomIndex = 0;

    while (index !== 0) {
        randomIndex = Math.floor(Math.random() * index);
        index--;

        // swaping two words with each other the current word and random word
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
    }
    return arr
}

let wordsArr = [...wordsModel.wordList]

exports.getWords = (req, res) => {
    // creating filtered arrays for each part of speech
    const verbArr = partOfSpeechArr("verb");
    const adverbArr = partOfSpeechArr("adverb");
    const nounArr = partOfSpeechArr("noun");
    const adjectiveArr = partOfSpeechArr("adjective");

    // creating array with random words from every category
    const taskWords = [
        getRandomWord(verbArr),
        getRandomWord(adverbArr),
        getRandomWord(nounArr),
        getRandomWord(adjectiveArr)
    ]

    // filtering the main array to make new array that doesn't have the random choosen words
    // to use it to extract the 6 words we need to make an array of 10 random words
    const restOfArr = wordsArr.filter(word => {
        let newWord = taskWords.find(taskWord => taskWord.id === word.id);
        if (newWord === undefined) {
            return word
        }

    })

    // filling the taskwords array with the rest of the words
    while (taskWords.length < 10) {
        let randomWord = getRandomWord(restOfArr);// generating random word on every itiration
        let word = taskWords.find(word => word.id === randomWord.id);// checking if the array has the same word
        if (word === undefined) {// if the array doesn't have this word add it to the array
            taskWords.push(randomWord)
        }
    }

    console.log(shuffle(taskWords))
    res.status(201).send(shuffle(taskWords));
}