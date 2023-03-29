export let sliderDiscriptionDetailsCharactersFunction = function sliderDiscriptionDetailsCharacters() {
  const sliderDiscriptionDetails = document.querySelector(
    ".slider__discription-details-wrapper"
  );
  let divCharacters = document.createElement("div");
  let divElementCharacter = sliderDiscriptionDetails.appendChild(divCharacters);
  divElementCharacter.classList.add("slider__discription-details-character");
  let divElementEpisode = document.querySelector(
    ".slider__discription-details-character"
  );
  fetch("https://swapi.dev/api/films")
    .then((response) => response.json())
    .then((data) => {
      data.results.sort(function (a, b) {
        if (a.episode_id > b.episode_id) {
          return 1;
        }
        if (a.episode_id < b.episode_id) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      for (let i = 0; i < data.results.length; i++) {
        let divEpisode = document.createElement("div");
        divElementEpisode.appendChild(divEpisode);
        divEpisode.classList.add(
          `slider__discription-details-character-episode${i + 1}`
        );
        divEpisode.classList.add(
          `slider__discription-details-character-episode`
        );
        divEpisode.classList.add("show-discription-details-character");
        let buttonEpisode = document.createElement("button");
        divEpisode.appendChild(buttonEpisode);
        buttonEpisode.classList.add(
          `slider__discription-details-character-episode${i + 1}-button`
        );
        buttonEpisode.classList.add(
          `slider__discription-details-character-episode-button`
        );
        buttonEpisode.textContent = "Close";
        let titleEpisode = document.createElement("div");
        divEpisode.appendChild(titleEpisode);
        titleEpisode.classList.add(
          `slider__discription-details-characters-title`
        );
        titleEpisode.textContent = data.results[i].title + " characters";

        for (let a = 0; a < data.results[i].characters.length; a++) {
          fetch(data.results[i].characters[a])
            .then((response) => response.json())
            .then((data) => {
              let discriptionBlockCharacters = `
                <div class="slider__discription-details-character${
                  a + 1
                } character">
                  <div class="slider__discription-details-character-title">
                    ${data.name}
                  </div>
                  <div class="slider__discription-details-character-height">
                    Height: ${data.height}
                  </div>
                  <div class="slider__discription-details-character-birth-year">
                    Birth year: ${data.birth_year}
                  </div>
                  <div class="slider__discription-details-character-gender">
                    Gender: ${data.gender}
                  </div>
                  
                </div>
              `;
              let divChar = document.createElement("div");
              let divCharElem = divEpisode.appendChild(divChar);
              divCharElem.innerHTML = discriptionBlockCharacters;
            });
        }
      }
      for (let i = 0; i < data.results.length; i++) {
        document
          .querySelector(
            `.slider__discription-details-character-episode${i + 1}-button`
          )
          .addEventListener("click", () => {
            document.querySelector(
              `.slider__discription-details-character-episode${i + 1}`
            ).style.display = "none";
            document
              .querySelector(".slider__discription")
              .classList.toggle("show-discription");
          });
      }
    });
};
