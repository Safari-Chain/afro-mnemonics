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
    const data = fs.readFileSync(
      "./text-files/yoruba/yoruba-lexicon.txt",
      "utf8"
    );
    let lines = data.split("\n");
    const YORUBA_WORDS_REGEX = /\b[A-Z].*?\b,\s[a-z]+\./g;
    let wordlist = [];
    for (let line of lines) {
      let matches = line.match(YORUBA_WORDS_REGEX);
      if (!!matches) {
        let words = matches[0].split(",");
        words.pop();
        for (let word of words) {
          wordlist.push(word.trim());
        }
      }
    }

    fs.writeFileSync("./text-files/yoruba/wordlist.txt", wordlist.join("\n"));
  } catch (err) {
    console.error(err);
  }
}

function groupIntoSentences(wordsArray) {
  let sentencesArray = [];

  for (let i = 0; i < wordsArray.length; i++) {
    if (wordsArray[i] === "") {
      sentencesArray.push(wordsArray[i]);
    } else {
      let sentence = "";
      while (wordsArray[i] !== "") {
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
  const data = fs.readFileSync("./text-files/swahili/swahili", "utf8");
  const wordsArray = data.split("\n");
  //Create wordlist array.
  //Iterate over each word, if word is not in wordlist array, add it,
  //else move to the next word.
  const wordlist = [];
  for (let word of wordsArray) {
    if (!wordlist.includes(word.trim().toLowerCase().normalize("NFC")))
      wordlist.push(word.trim().toLowerCase().normalize("NFC"));
  }

  fs.writeFileSync("./text-files/swahili/wordlist.txt", wordlist.join("\n"));
}

function getUniqueWords() {
  const data = fs.readFileSync("./text-files/swahili/wordlist.txt", "utf8");
  const wordsArray = data.split("\n");

  const uniqueWords = [];
  for (let i = 0; i < wordsArray.length; i++) {
    let key = wordsArray[i].slice(0, 4);
    let clonedWordsArray = wordsArray.slice();
    console.log(isKeyUnique(clonedWordsArray, i, key));
    if (isKeyUnique(clonedWordsArray, i, key)) {
      uniqueWords.push(wordsArray[i]);
    }
  }
  fs.writeFileSync(
    "./text-files/swahili/unique-wordlist.txt",
    uniqueWords.join("\n")
  );
}

function fourToEightChars() {
  const data = fs.readFileSync(
    "./text-files/swahili/unique-wordlist.txt",
    "utf8"
  );
  const wordsArray = data.split("\n");
  let filterArr = wordsArray.filter((el) => {
    return el.trim().length >= 4 && el.trim().length <= 8;
  });

  let result = removeOtherLangWords(filterArr);

  fs.writeFileSync(
    "./text-files/swahili/four-eight-wordlist.txt",
    result.join("\n")
  );
}

function isKeyUnique(arr, index, key) {
  let newArr = arr.splice(index, 1);
  for (let i = 0; i < newArr.length; i++) {
    let wordKey = newArr[i].slice(0, 4);
    if (wordKey === key) return false;
  }
  return true;
}

function removeOtherLangWords(words) {
  const wordlists = [];

  const czech = fs.readFileSync("./wordlists/czech.txt", "utf8");
  wordlists.push(czech.split("\n"));

  const italian = fs.readFileSync("./wordlists/italian.txt", "utf8");
  wordlists.push(italian.split("\n"));

  const english = fs.readFileSync("./wordlists/english.txt", "utf8");
  wordlists.push(english.split("\n"));

  const french = fs.readFileSync("./wordlists/french.txt", "utf8");
  wordlists.push(french.split("\n"));

  const spanish = fs.readFileSync("./wordlists/spanish.txt", "utf8");
  wordlists.push(spanish.split("\n"));

  const portuguese = fs.readFileSync("./wordlists/portuguese.txt", "utf8");
  wordlists.push(portuguese.split("\n"));

  for (let wordlist of wordlists) {
    for (let i = 0; i < words.length; i++) {
      if (wordlist.includes(words[i])) words.splice(i, 1);
    }
  }

  return words;
}

//getUniqueWords();
// parseSwahiliWords();
// fourToEightChars();
