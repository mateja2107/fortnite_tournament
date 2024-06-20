window.onload = (e) => {
  fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Rounds")
    .then((res) => res.json())
    .then((data) => {
      data = Object.values(data);
      let html = ``;
      data.forEach((round) => {
        let string = ``;

        let id = round.id;
        delete round.id;

        round = Object.values(round);

        if (round.length > 0) {
          round.forEach((player) => {
            let vr = player.vr ? 1 : 0;
            string += `
            <tr data-player_id="${player.id}">
              <th scope="row">${player.id}</   >
              <td class="username_wrapper">${player.username}</td>
              <td>${player.elims}</td>
              <td>${vr}</td>
              <td>${Number(player.elims) + vr * 5}</td>
            </tr>`;
          });

          html += `
          <h2>Round ${id}</h2>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Elims</th>
                <th scope="col">VR</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody id="table_round_${id}">${string}</tbody>
          </table>
          <hr class="mb-5">`;
        }
      });

      document.querySelector("#rounds_view_wrapper").innerHTML = html;
    });
};
