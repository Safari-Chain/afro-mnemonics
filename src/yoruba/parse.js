//Remove unnecessary texts
//Extract Yoruba words from the dictionary.
//Create text file matching a yoruba word to its english equivalent(s) separated by an hyphen e.g. Abafu — luck, fortune
//Apply rules for yoruba wordlist
//Filter the resulting words using the words in the English wordlist.
//If the wordlist is less than 2048, create additional words that pass the rules to complete the wordlist.


const fs = require("fs");
const path = require("path");

try {
    //console.log(path.resolve("./text-files/yoruba/yoruba-lexicon.txt"))
    const data = fs.readFileSync('./text-files/yoruba/yoruba-lexicon.txt', 'utf8');
    //fs.writeFileSync('./text-files/yoruba/test.txt', data.split("\n"));
    let lines = data.split("\n");
    const YORUBA_WORDS_REGEX = /\b[A-Z].*?\b,\s[a-z]+\./g;
    let wordlist = [];
    for(let line of lines){
        let matches = line.match(YORUBA_WORDS_REGEX);
        if(!!matches) {
            let words = matches[0].split(",");
            words.pop();
            for(let word of words){
                wordlist.push(word.trim());
            }
            

        }
    }

    fs.writeFileSync('./text-files/yoruba/wordlist.txt', wordlist.join("\n"));

    
} catch (err) {
    console.error(err);
}

function groupIntoSentences(wordsArray){
    let sentencesArray = [];

    for(let i = 0; i < wordsArray.length; i++){
        if( wordsArray[i] === "" ) {
            sentencesArray.push(wordsArray[i]);
        } else {
            let sentence = "";
            while(wordsArray[i] !== ""){
                sentence += wordsArray[i];
                i++;
            }
            sentencesArray.push(sentence);
            i--;
        }

    }

    return sentencesArray;
}
