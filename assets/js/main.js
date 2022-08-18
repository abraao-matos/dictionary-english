const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  infoText = wrapper.querySelector(".info-text"),
  synonyms = wrapper.querySelector(".synonyms .list"),
  volumeIcon = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  favorite = document.querySelector(".fa-solid");

// Data function
function data(result, word) {
  if (result.title) {
    infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>, Please, try to search for another word.`;
  } else {
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0],
      phonetics = `${result[0].meanings[0].partOfSpeech}  ${result[0].phonetics[0].text}`;

    // Response data to a particular HTML element
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meanings span").innerText = definitions.definition;

    let example = document.querySelector(".example span");

    if (definitions.example === undefined) {
      example.parentElement.style.display = "none";
    } else {
      example.parentElement.style.display = "block";
      document.querySelector(".example span").innerText = definitions.example;
    }

    if (definitions.synonyms[0] === undefined) {
      synonyms.parentElement.style.display = "none";
    } else {
      synonyms.parentElement.style.display = "block";
      synonyms.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        let tag = `<span>${definitions.synonyms[i]}</span>`;
        synonyms.insertAdjacentHTML("beforeend", tag);
      }
    }
  }
}

// API Dictionary function
function fetchApi(word) {
  wrapper.classList.remove("active");
  infoText.style.color = "#fff";
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;

  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value) {
    fetchApi(e.target.value);
  }
});

// sound
volumeIcon.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${document.querySelector(".word p").innerText}`
  );

  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
});

// remove text from input
removeIcon.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  infoText.innerHTML = `Search for a new word`;
  wrapper.classList.remove("active");
});

// Favorite words
favorite.addEventListener("click", () => {
  const li = document.createElement("li");

  const favoriteWord = document.querySelector(".word p").innerText;

  const addFavWord = document.createTextNode(favoriteWord);

  li.appendChild(addFavWord);

  const ulList = document.getElementById("addF");
  ulList.insertBefore(li, ulList.children[0]);
  createLi(li);
});

// create a element HTML
function createLi(li) {
  li.innerText += " ";
  const deleleButton = document.createElement("button");
  deleleButton.innerText = "Delete";
  deleleButton.setAttribute("class", "delete");
  li.appendChild(deleleButton);
}

// Remove favorite word
document.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("delete")) {
    el.parentElement.remove();
  }
});
