//Remove unnecessary texts
//Extract Yoruba words from the dictionary.
//Create text file matching a yoruba word to its english equivalent(s) separated by an hyphen e.g. Abafu — luck, fortune
//Apply rules for yoruba wordlist
//Filter the resulting words using the words in the English wordlist.
//If the wordlist is less than 2048, create additional words that pass the rules to complete the wordlist.


const fs = require("fs");
const path = require("path");


function parseYorubaWords() {
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


//Parse Swahili words:
//make sure each word is unique.
function parseSwahiliWords() {
    const data = fs.readFileSync('./text-files/swahili/swahili', 'utf8');
    const wordsArray = data.split("\n");
    //Create wordlist array.
    //Iterate over each word, if word is not in wordlist array, add it,
    //else move to the next word.
    const wordlist = [];
    for(let word of wordsArray){
        if(!wordlist.includes(word.trim().toLowerCase().normalize("NFC"))) wordlist.push(word.trim().toLowerCase().normalize("NFC"));
    }

    fs.writeFileSync('./text-files/swahili/wordlist.txt', wordlist.join("\n"));
}

parseSwahiliWords();
