// let data = [
//   {
//     username: "nameT1",
//     elims: 5,
//     victory_royale: 0,
//     points: 0 //(elims + vr)
//   },
//   {
//     username: "nameT2",
//     elims: 3,
//     victory_royale: 0,
//     points: 0
//   },
//   {
//     username: "nameT3",
//     elims: 7,
//     victory_royale: 0,
//     points: 0
//   },
// ];

// fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Players", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log("success");
//   });
fetch("https://66672d2ea2f8516ff7a699c9.mockapi.io/Players")
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then((res) => {
    let data = res[0];
    console.log("old: ", data);
    //!--------------- IMPORTANT ------------------
    return JSON.parse(JSON.stringify(data));
  })
  .then((data) => {
    let n = Object.entries(data).length;

    //Struktura za data input interfejs nakon meca
    let input = [
      { index: 0, elims: 2, victory_royale: false },
      { index: 1, elims: 5, victory_royale: false },
      { index: 2, elims: 7, victory_royale: true },
    ];

    for (let i = 0; i < n - 1; i++) {
      let player = data[i];
      for (let j = 0; j < input.length; j++) {
        if (i == input[j].index) {
          player.elims += input[j].elims;
          if (input[j].victory_royale) {
            player.victory_royale += 1;
          }
          player.points = player.elims + 5 * player.victory_royale;
        }
      }
    }

    console.log("new: ", data);
    document.querySelector("#btn").onclick = () => updateData(data);
  });

async function updateData(data) {
  let res = await fetch(
    "https://66672d2ea2f8516ff7a699c9.mockapi.io/Players/1",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  res = await res.json();
}
