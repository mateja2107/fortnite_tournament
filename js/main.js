//* add player
let addPlayerBtn = document.querySelector("#add_player_btn");
const bc = new BroadcastChannel("refresh_channel");

addPlayerBtn.onclick = (e) => {
  e.preventDefault();

  let usernameInput = document.querySelector("#username");
  let username = usernameInput.value;
  let tableBody = document.querySelector("#players_list");

  if (username != "") {
    let numberOfPlayersSpan = document.querySelector("#number_of_playeers");
    numberOfPlayersSpan.innerText = Number(numberOfPlayersSpan.innerText) + 1;
    
    let html = "";
    let id = tableBody.querySelectorAll("tr").length + 1;

    html += `
      <tr data-player_id="${id}">
        <th scope="row">${id}.</th>
        <td><input type="text" class="table_input form-control" value="${username}" /></td>
      </tr>`;

    tableBody.innerHTML += html;
    usernameInput.value = "";
  }
};

//* save data and start the tournament
let startTournamentBtn = document.querySelector("#start_tournament_btn");

startTournamentBtn.onclick = (e) => {
  e.preventDefault();

  if (confirm("Da li ste sigurni da zelite da pokrenete turnir?")) {
    bc.postMessage("refresh");
    let rounds = document.querySelector("#number_of_rounds").value;

    let players = document.querySelectorAll("#players_list tr");
    let numberOfPlayers = players.length;

    if (rounds != "" && rounds >= 1 && numberOfPlayers > 0) {
      let playersJSON = [];
      players.forEach((player) => {
        let id = player.getAttribute("data-player_id");
        let username = player.querySelector("input").value;

        playersJSON.push({
          id: id,
          username: username,
          elims: 0,
          victory_royale: 0,
          points: 0,
        });
      });

      savePlayers(playersJSON, rounds);
    }
  }
};
