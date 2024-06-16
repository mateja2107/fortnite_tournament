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
      players.forEach((player) => {
        html += `
        <tr data-player_id="${player.id}">
          <th scope="row">${player.id}.</th>
          <td class="username_wrapper">${player.username}</td>
          <td>${player.elims}</td>
          <td>${player.victory_royale}</td>
          <td>${player.points}</td>
        </tr>`;
      });

      table.innerHTML = html;
    });
};
