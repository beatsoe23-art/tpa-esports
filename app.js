const events=[
["01","KickOff","2026","开幕赛事"],
["02","Masters 26 Pusan","2026","Pusan"],
["03","TPA Series Stage 1","2026","Stage 1"],
["04","TCI26 London","2026","London"],
["05","Masters 26 Santiago","2026","Santiago"],
["06","TPA Series Stage 2","2026","Stage 2"],
["07","Finals","2026","New York City & Allen, TX"],
["08","TPA Champions","2026","Championship"],
["09","Draft Conference","2026","选秀会议"],
["10","All-Star","2026","全明星"]
];

const teams=[
["NRG","AMER",3018],["E1","AMER",2840],["MG","AMER",2736],["G2","AMER",1500],
["PRX","PAC",1438],["BLG","CN",1280],["T1","PAC",0],["FNATIC","EMEA",0],
["GEN","PAC",0],["TL","EMEA",0]
];

const calendar=[
["KickOff","2026","Season opener"],["Masters 26 Pusan","2026","Pusan"],
["TPA Series Stage 1","2026","Stage 1"],["TCI26 London","2026","London"],
["Player Transfer Period","2026","Transfer period"],["Masters 26 Santiago","2026","Santiago"],
["TPA Series Stage 2","2026","Stage 2"],["Finals","2026","New York City & Allen, TX"],
["TPA Champions","2026","Championship"],["Draft Conference","2026","Draft"],["All-Star","2026","All-Star"]
];

const history=[
["Major League","历届冠军记录","2013–2026"],["Masters","Masters 系列赛","2025 赛事资料"],["TCI","TCI 系列赛","2025 赛事资料"],["Tour Finals","Tour Finals","2025 赛事资料"]
];

function render(){
 document.querySelector("#eventGrid").innerHTML=events.map(x=>`<article class="card"><span class="num">${x[0]}</span><h3>${x[1]}</h3><p>${x[2]} · ${x[3]}</p></article>`).join("");
 document.querySelector("#teamGrid").innerHTML=teams.map((x,i)=>`<article class="team"><div><h3>${x[0]}</h3><p>${x[1]} · Combat Power</p></div><div class="rank">${x[2]||"—"}</div></article>`).join("");
 document.querySelector("#rankingBody").innerHTML=teams.filter(x=>x[2]>0).map((x,i)=>`<tr><td>${i+1}</td><td><b>${x[0]}</b></td><td>${x[2]}</td><td>${x[1]}</td></tr>`).join("");
 document.querySelector("#calendarList").innerHTML=calendar.map(x=>`<div class="event-line"><strong>${x[0]}</strong><span>${x[1]} · ${x[2]}</span></div>`).join("");
 document.querySelector("#historyGrid").innerHTML=history.map(x=>`<article class="card"><span class="num">${x[2]}</span><h3>${x[0]}</h3><p>${x[1]}</p></article>`).join("");
}
render();

document.querySelector("#teamSearch").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 document.querySelectorAll("#teamGrid .team").forEach(el=>{
   el.style.display=el.innerText.toLowerCase().includes(q)?"flex":"none";
 });
});
