window.onload = () => {
  let table = document.querySelector("#final_results_table");

  fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Players")
    .then((res) => res.json())
    .then((players) => {
      players = players[0];
      delete players.id;
      players = Object.values(players);
      players = players.sort((a, b) => b.points - a.points);

      let html = ``;
      table.innerHTML = "";
      players.forEach((player, i) => {
        html += `
        <tr data-player_id="${player.id}">
          <td class="num">${i + 1}.</td   >
          <td class="username_wrapper">${player.username}</td>
          <td>${player.elims}</td>
          <td>${player.victory_royale}</td>
          <td>${player.points}</td>
        </tr>`;
      });

      table.innerHTML = html;
    });
};

fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds").then(res => res.json()).then(data => {
  let length = data.length;
  if(Object.keys(data[length - 1]) == "id") {
    return [length, true];
  } else {
    return [length, false];
  }
}).then(rounds => {
  console.log(rounds);
  let last_round = rounds[1];
  rounds = rounds[0];

  const title = document.querySelector("#results_title");

  if(rounds > 0) {
    if(Number(localStorage.getItem("current_round")) <= rounds && last_round) {
      title.textContent = "STANDINGS";
    } else {
      title.textContent = "FINAL RESULTS";
    }
  }
});
