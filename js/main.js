let addPlayerBtn = document.querySelector("#add_player_btn");
if (addPlayerBtn != null) {
  addPlayerBtn.onclick = (e) => {
    e.preventDefault();

    let usernameInput = document.querySelector("#username");
    let username = usernameInput.value;
    let tableBody = document.querySelector("#players_list");

    if (username != "") {
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
}

let startTournamentBtn = document.querySelector("#start_tournament_btn");
if (startTournamentBtn != null) {
  startTournamentBtn.onclick = (e) => {
    e.preventDefault();

    if (confirm("Da li ste sigurni da zelite da pokrenete turnir?")) {
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
}

async function savePlayers(players, rounds) {
  await deleteCurrentData();

  let res = await fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Players", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(players),
  });

  res = await res.json();

  for (let i = 0; i < rounds; i++) {
    let insertRounds = await fetch(
      "https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    insertRounds = await insertRounds.json();
  }
}

async function deleteCurrentData() {
  let players = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Players"
  );
  players = await players.json();

  players.forEach((player) => {
    fetch(`https://66672d2ea2f8516ff7a699c9.mockapi.io/Players/${player.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

  let rounds = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds"
  );
  rounds = await rounds.json();
  console.log(rounds);
  rounds.forEach((round) => {
    fetch(`https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds/${round.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
