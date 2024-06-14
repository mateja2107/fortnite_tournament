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

  window.location.href = "tournament.html";
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

async function loadPlayers() {
  currentRoundSpan.innerText = currentRound;
  let players = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Players"
  );

  players = await players.json();
  players = players[0];

  let n = Object.entries(players).length;
  if (n > 0) {
    let html = ``;
    playersTable.innerHTML = "";

    for (let i = 0; i < n - 1; i++) {
      let player = players[i];

      html += `
          <tr data-player_id="${player.id}">
            <th scope="row">${player.id}.</th>
            <td class="username_wrapper">${player.username}</td>
            <td><input type="number" class="table_input form-control elims" value="0" /></td>
            <td><input type="checkbox" tabindex="-1" class="table_input form-control" value="${player.victory_royale}" /></td>
            <td>${player.points}</td>
          </tr>`;
    }

    playersTable.innerHTML = html;
  }

  // get the number of rounds
  let rounds = await getNumberOfRounds();
  if (rounds > 0) {
    roundsNumberSpan.innerText = rounds;
  }
}

async function getNumberOfRounds() {
  let res = await fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds");
  res = await res.json();

  return res.length;
}

async function updatePlayersData(data) {
  let players = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Players"
  );
  players = await players.json();
  players = players[0];

  let n = Object.entries(players).length;
  console.log(n);
  for (let i = 0; i < n - 1; i++) {
    let player = players[i];

    for (let j = 0; j < data.length; j++) {
      // console.log(p);
      if (player.id == data[j].id) {
        let elims = Number(data[j].elims);
        let vr = data[j].vr;

        player.elims += elims;

        if (vr) {
          player.victory_royale += 1;
        }

        player.points = player.elims + 5 * player.victory_royale;
      }
    }
  }

  let res = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Players/1",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    }
  );

  res = await res.json();
  return res;
}
