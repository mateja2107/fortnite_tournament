const currentRoundSpan = document.querySelector("#curr_round_num");
const roundsNumberSpan = document.querySelector("#rounds_num");
const playersTable = document.querySelector("#tournament_table");
const bc = new BroadcastChannel("refresh_channel");

let currentRound;
if (localStorage.getItem("current_round")) {
  currentRound = Number(localStorage.getItem("current_round"));
} else {
  currentRound = 1;
  localStorage.setItem("current_round", currentRound);
}

window.onload = (e) => loadPlayers();

let nextRoundBtn = document.querySelector("#nextRoundBtn");

nextRoundBtn.onclick = (e) => {
  if (confirm("Da li ste sigurni da zelite da pokrenete sledecu rundu?")) {
    bc.postMessage("refresh");
    
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

        saveRoundData(playersRoundData, currentRound)
          .then(() => updatePlayersData(playersRoundData))
          .then(() => {
            if (currentRound == roundsNumber) {
              // window.location.href = "final_results.html";
            } else {
              currentRound += 1;
              localStorage.setItem("current_round", currentRound);

              loadPlayers();
            }
          });
      }
    });
  }
};
