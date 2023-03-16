import ammoChart from "./ammo.json" assert { type: "json" };
import ammoChart1 from "./ammo1.json" assert { type: "json" };

let text = "<table id='ammotable' border='1'>";
let text1 = "<table border='1'>";
const headers = [
  "Caliber",
  "Name",
  "Damage",
  "Pen Value",
  "Frag%",
  "Recoil",
  "Speed(m/s)",
];

onload = function () {
  text += loopHeaders();
  for (let x in ammoChart1) {
    let ammo1 = JSON.stringify(ammoChart1[x]);
    let ammo = JSON.parse(ammo1);
    text +=
      "<tr><td>" +
      ammo.caliber.slice(7) +
      "</td><td>" +
      ammo.name +
      "</td><td>" +
      ammo.ballistics.damage +
      "</td><td>" +
      ammo.ballistics.penetrationPower +
      "</td><td>" +
      Math.round(ammo.ballistics.fragmentationChance * 100) +
      "</td><td>" +
      ammo.ballistics.recoil +
      "%" +
      "</td><td>" +
      ammo.ballistics.initialSpeed +
      "</td></tr>";
  }
  text += "</table>";
  document.getElementById("teksti").innerHTML = text;
  document.getElementById("headeri").addEventListener("click", sortTable);
  sortTable();
};

function loopHeaders() {
  let teksti = "<tr>";
  for (let x in headers) {
    console.log(x);
    teksti += "<th id='headeri'>" + headers[x] + "</th>";
  }
  teksti += "</tr>";
  return teksti;
}

function sortTable() {
  console.log("Sort enter.");
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;

  table = document.getElementById("ammotable");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
