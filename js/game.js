const currentRoundSpan = document.querySelector("#curr_round_num");
const roundsNumberSpan = document.querySelector("#rounds_num");
const playersTable = document.querySelector("#tournament_table");

let currentRound = 1;
window.onload = (e) => loadPlayers();

let nextRoundBtn = document.querySelector("#nextRoundBtn");

nextRoundBtn.onclick = (e) => {
  if (confirm("Da li ste sigurni da zelite da pokrenete sledecu rundu?")) {
    currentRound += 1;

    getNumberOfRounds().then((roundsNumber) => {
      if (currentRound <= roundsNumber) {
        currentRoundSpan.innerText = currentRound;

        let playersHTML = playersTable.querySelectorAll("tr");

        let playersRoundData = [];
        playersHTML.forEach((player) => {
          playersRoundData.push({
            id: player.getAttribute("data-player_id"),
            username: player.querySelector(".username_wrapper").innerText,
            elims: player.querySelector(".elims").value,
            vr: player.querySelector(`input[type="checkbox"]`).checked,
          });
        });

        updatePlayersData(playersRoundData).then(() => loadPlayers());
      }
    });
  }
};
