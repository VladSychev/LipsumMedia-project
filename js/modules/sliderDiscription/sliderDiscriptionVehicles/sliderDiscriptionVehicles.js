export let sliderDiscriptionDetailsVehiclesFunction = function addSliderDiscriptionDetailsVehicles() {
  const sliderDiscriptionDetails = document.querySelector(
    ".slider__discription-details-wrapper"
  );
  let divVehicles = document.createElement("div");
  let divElementCharacter = sliderDiscriptionDetails.appendChild(divVehicles);
  divElementCharacter.classList.add("slider__discription-details-vehicles");
  let divElementEpisode = document.querySelector(
    ".slider__discription-details-vehicles"
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
          `slider__discription-details-vehicle-episode${i + 1}`
        );
        divEpisode.classList.add(`slider__discription-details-vehicle-episode`);
        divEpisode.classList.add("show-discription-details-vehicle");
        let buttonEpisode = document.createElement("button");
        divEpisode.appendChild(buttonEpisode);
        buttonEpisode.classList.add(
          `slider__discription-details-vehicle-episode${i + 1}-button`
        );
        buttonEpisode.classList.add(
          `slider__discription-details-vehicle-episode-button`
        );
        buttonEpisode.textContent = "Close";
        let titleEpisode = document.createElement("div");
        divEpisode.appendChild(titleEpisode);
        titleEpisode.classList.add(
          `slider__discription-details-vehicles-title`
        );
        titleEpisode.textContent = data.results[i].title + " vehicles";

        for (let a = 0; a < data.results[i].vehicles.length; a++) {
          fetch(data.results[i].vehicles[a])
            .then((response) => response.json())
            .then((data) => {
              let discriptionBlockVehicles = `
                <div class="slider__discription-details-vehicle${
                  a + 1
                } vehicle">
                  <div class="slider__discription-details-vehicle-title">
                    ${data.name}
                  </div>
                  <div class="slider__discription-details-vehicle-model">
                    Height: ${data.model}
                  </div>
                  <div class="slider__discription-details-vehicle-manufacturer">
                    Manufacturer: ${data.manufacturer}
                  </div>
                  <div class="slider__discription-details-vehicle-cost-in-credits">
                    Cost in credits: ${data.cost_in_credits}
                  </div>
                  <div class="slider__discription-details-vehicle-max-atmosphering-speed">
                    Max atmosphering speed: ${data.max_atmosphering_speed}
                  </div>
                </div>
              `;
              let divVeh = document.createElement("div");
              let divVehElem = divEpisode.appendChild(divVeh);
              divVehElem.innerHTML = discriptionBlockVehicles;
            });
        }
      }
      for (let i = 0; i < data.results.length; i++) {
        document
          .querySelector(
            `.slider__discription-details-vehicle-episode${i + 1}-button`
          )
          .addEventListener("click", () => {
            document.querySelector(
              `.slider__discription-details-vehicle-episode${i + 1}`
            ).style.display = "none";
            document
              .querySelector(".slider__discription")
              .classList.toggle("show-discription");
          });
      }
    });
};
