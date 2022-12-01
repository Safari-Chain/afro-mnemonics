const fs = require("fs");

const LENGTH_OF_WORDLIST = 2048;
const LENGTH_OF_ALPHABET = 26;

function getFinalWordlist() {
  const finalWordlist = [];

  const data = fs.readFileSync(
    "./text-files/swahili/final_words_revised.txt",
    "utf8"
  );
  const wordsArray = data.split("\n");
  const wordList = [];

  // normalize words and sort alphabetically
  for (let word of wordsArray) {
    if (!wordList.includes(word.trim().toLowerCase().normalize("NFC")))
      wordList.push(word.trim().toLowerCase().normalize("NFC"));
  }
  wordList.sort();

  // get alphabets A-Z
  const lettersCharCode = Array.from(Array(LENGTH_OF_ALPHABET)).map(
    (e, i) => i + 65
  );
  const alphabets = lettersCharCode.map((x) =>
    String.fromCharCode(x).toLowerCase()
  );

  const subWordsArrays = Array.from({ length: alphabets.length }, () => []);

  // group words in an array according to alphabetical order
  for (let i = 0; i < wordList.length; i++) {
    let wordFirstLetter = wordList[i].charAt(0).toLowerCase();
    for (let j = 0; j < alphabets.length; j++) {
      let alphabet = alphabets[j];
      if (wordFirstLetter === alphabet) {
        subWordsArrays[j].push(wordList[i]);
      }
    }
  }

  // remove empty words arrays
  const filteredSubWordsArrays = subWordsArrays.filter(
    (arr) => arr.length >= 1
  );

  // select 2048/26 words from each array
  let counter = 0;
  while (finalWordlist.length !== LENGTH_OF_WORDLIST) {
    const firstWordInArray =
      filteredSubWordsArrays[counter % filteredSubWordsArrays.length].shift();
    if (firstWordInArray && !finalWordlist.includes(firstWordInArray)) {
      finalWordlist.push(firstWordInArray);
    }
    counter++;
  }

  finalWordlist.sort();

  fs.writeFileSync(
    "text-files/swahili/final-swahili-wordlist.txt",
    finalWordlist.join("\n")
  );
}
getFinalWordlist();
