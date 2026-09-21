
const D=window.TPA_DATA;
const app=document.querySelector("#app");
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const regionName={CN:"CN赛区",PAC:"Pacific赛区",EMEA:"EMEA赛区",AMER:"AMER赛区"};
function logo(team){
  for(const [r,arr] of Object.entries(D.teams)){
    const i=arr.indexOf(team);
    if(i>=0) return `assets/logos/${r.toLowerCase()}_${String(i+1).padStart(2,"0")}.png`;
  }
  return "";
}
function teamObj(team){
  for(const [r,arr] of Object.entries(D.teams)) if(arr.includes(team)) return {region:r};
  return {region:""};
}
function teamCard(team){
  const t=teamObj(team), players=D.rosters[team]||[];
  return `<a class="card team-card" href="#/team/${encodeURIComponent(team)}">
    ${logo(team)?`<img class="logo" src="${logo(team)}">`:`<div class="logo">${esc(team.slice(0,3))}</div>`}
    <div><h3>${esc(team)}</h3><p>${regionName[t.region]||""} · ${players.length?players.join(" / "):"档案名单"}</p></div>
  </a>`;
}
function eventCard(e){
 return `<a class="card event-card" href="#/event/${e.id}">
  <div><span class="tag">${e.year} · ${esc(e.type)}</span><div class="event-title">${esc(e.name)}</div><div class="event-meta">${esc(e.date)}<br>${esc(e.city)}</div></div>
  <div class="champ">冠军 <b>${esc(e.champion)}</b>　亚军 ${esc(e.runner)}</div>
 </a>`;
}
function home(){
 const recent=[...D.international].reverse().slice(0,4);
 return `<div class="container">
  <section class="hero">
   <div class="eyebrow">TPA CHAMPIONSHIP TOUR · DATABASE</div>
   <h1>像职业赛事官网一样，<br>把 TPA 做成完整赛事索引。</h1>
   <p>赛事、常规赛、赛程、淘汰赛、战队、阵容、排名、历届冠军全部集中管理。世界赛对阵严格取自你的 PDF；四大赛区常规赛按统一联赛框架补齐，冠军与亚军沿用档案。</p>
  </section>
  <div class="hero-grid">
   <div class="card">
    <div class="eyebrow">2026 SEASON</div><h2>四大赛区 × 地区赛 + 国际赛</h2>
    <p class="muted">CN / Pacific / EMEA / AMER · KickOff → Stage 1 → TCI / Masters → Stage 2 → Finals</p>
    <div class="stat-grid" style="margin-top:18px">
      <div class="stat"><strong>4</strong><span>主要赛区</span></div><div class="stat"><strong>54</strong><span>档案战队</span></div><div class="stat"><strong>2021–26</strong><span>地区赛事索引</span></div><div class="stat"><strong>8</strong><span>国际赛事页面</span></div>
    </div>
   </div>
   <div class="card"><div class="eyebrow">2026 CALENDAR</div>${D.calendar2026.slice(0,6).map(x=>`<div style="padding:10px 0;border-bottom:1px solid var(--line)"><b>${x[0]}</b>　${x[1]}<small class="muted"> · ${x[2]}</small></div>`).join("")}</div>
  </div>
  <div class="section-head"><h2>国际赛事</h2><a class="muted" href="#/events">查看全部 →</a></div>
  <div class="grid">${recent.map(eventCard).join("")}</div>
  <div class="section-head"><h2>四大赛区</h2></div>
  <div class="grid4">${Object.entries(D.teams).map(([r,a])=>`<a class="card" href="#/teams?region=${r}"><span class="eyebrow">${r}</span><h3>${regionName[r]}</h3><p class="muted">${a.length} 支档案战队</p></a>`).join("")}</div>
  <div class="section-head"><h2>资料说明</h2></div>
  <div class="notice">本版本严格以《TPA战队档案.pdf》中的战队、冠军、亚军、国际赛赛程和 2026 赛历为核心。PDF 部分 2026 页面存在标题/日期排版冲突，网站以“2026 Competition Calendar”作为赛季时间轴，并在具体赛事页保留来源提示。常规赛是为了让网站具备职业联赛索引结构而补齐的“赛制框架”，不冒充 PDF 中未提供的真实比赛结果。</div>
 </div>`;
}
function events(){
 return `<div class="container"><div class="hero"><div class="eyebrow">EVENT INDEX</div><h1>赛事中心</h1><p>按年份、赛事级别查看 TPA 的地区赛与国际赛。</p></div>
 <div class="pillbar">${[2026,2025].map(y=>`<a class="filter pill" href="#/events?year=${y}">${y}</a>`).join("")}<a class="filter pill" href="#/schedule">地区常规赛赛程</a></div>
 <div class="section-head"><h2>国际赛事</h2></div><div class="grid">${D.international.map(eventCard).join("")}</div>
 <div class="section-head"><h2>四大赛区近年常规赛</h2></div>
 <div class="grid4">${Object.keys(D.teams).map(r=>`<a class="card" href="#/schedule?region=${r}"><span class="eyebrow">${r}</span><h3>${regionName[r]}</h3><p class="muted">2021–2026 KickOff / Stage 1 / Stage 2</p></a>`).join("")}</div>
 </div>`;
}
function schedule(){
 const params=new URLSearchParams(location.hash.split("?")[1]||"");
 const region=params.get("region")||"CN";
 const years=[2026,2025,2024,2023,2022,2021];
 const arr=D.teams[region]||D.teams.CN;
 const sample=arr.slice(0,8);
 let rows=[];
 for(const y of years){
  for(const stage of ["KickOff","Stage 1","Stage 2"]){
   const c=D.regional_champs[region]?.[y];
   if(!c) continue;
   rows.push(`<div class="schedule-day"><div style="display:flex;justify-content:space-between"><b>${y} · ${stage}</b><span class="muted">${regionName[region]}</span></div>
    <div class="match"><div class="format">Week 1</div><div class="team">${esc(sample[0])}</div><div class="score">—</div><div class="team right">${esc(sample[1])}</div><div class="format">BO3</div></div>
    <div class="match"><div class="format">Week 2</div><div class="team">${esc(sample[2])}</div><div class="score">—</div><div class="team right">${esc(sample[3])}</div><div class="format">BO3</div></div>
    <div class="match"><div class="format">Week 3</div><div class="team">${esc(sample[4])}</div><div class="score">—</div><div class="team right">${esc(sample[5])}</div><div class="format">BO3</div></div>
    <div class="match"><div class="format">Playoffs</div><div class="team">${esc(c[0])}</div><div class="score">冠军</div><div class="team right">${esc(c[1])}</div><div class="format">亚军</div></div>
   </div>`);
  }
 }
 return `<div class="container"><div class="hero"><div class="eyebrow">REGIONAL SCHEDULE</div><h1>四大赛区常规赛</h1><p>统一采用职业联赛式索引：常规赛 → 季后赛 → 赛区冠军。未在 PDF 中出现的具体比分保持“—”，避免把补全赛程误写成真实历史结果。</p></div>
 <div class="pillbar">${Object.keys(D.teams).map(r=>`<a class="filter pill ${r===region?'active':''}" href="#/schedule?region=${r}">${regionName[r]}</a>`).join("")}</div>
 <div class="notice" style="margin:18px 0">赛制框架：12/14/16 队按赛区规模进行分组或单循环常规赛，随后进入季后赛；页面只锁定 PDF 已给出的冠军/亚军，常规赛具体对阵作为站内赛程骨架。</div>
 ${rows.join("")}</div>`;
}
function eventPage(id){
 const e=D.international.find(x=>x.id===id); if(!e) return `<div class="container"><div class="empty">找不到赛事</div></div>`;
 const br=D.brackets[id]||[];
 return `<div class="container">
  <div class="hero"><div class="eyebrow">${e.year} · ${esc(e.type)}</div><h1>${esc(e.name)}</h1><p>${esc(e.date)} · ${esc(e.city)}</p></div>
  <div class="grid4"><div class="stat"><strong>${esc(e.champion)}</strong><span>冠军</span></div><div class="stat"><strong>${esc(e.runner)}</strong><span>亚军</span></div><div class="stat"><strong>${esc(e.mvp)}</strong><span>MVP</span></div><div class="stat"><strong>${esc(e.teams.length)}</strong><span>页面已列参赛队</span></div></div>
  <div class="section-head"><h2>赛事赛制</h2></div><div class="card"><p>${esc(e.format)}</p><p class="source">${esc(e.source)}</p></div>
  <div class="section-head"><h2>赛程 / 对阵</h2></div>
  <div class="card"><div class="notice">本页把历史赛事补成职业电竞官网式赛程。<b>冠军、亚军及总决赛比分锁定为 PDF 第15页记录；其余没有被档案记录的对阵仅作为“赛制补全”，不视为真实历史比分。</b></div>
  <div style="margin-top:14px">${(D.eventSchedule?.[id]||[]).map(x=>`<div class="match"><div class="format">${esc(x[0])}</div><div class="team">${esc(x[1])}</div><div class="score">${esc(x[2])}</div><div class="team right">${esc(x[3])}</div><div class="format">${esc(x[3])}</div></div>`).join("")}</div></div>
  <div class="bracket"><div class="round"><h3>淘汰赛结构</h3>${br.map((m,i)=>`<div class="bracket-match"><small>${esc(m[0])} · ${esc(m[6])}</small><div class="bm-row ${m[6]==='documented'?'winner':''}"><span>${esc(m[1])}</span><b>${esc(m[2])}</b></div><div class="bm-row ${m[6]==='documented'?'winner':''}"><span>${esc(m[3])}</span><b>${esc(m[4])}</b></div><small class="muted">${esc(m[5])}</small></div>`).join("")}</div>
   <div class="round"><h3>赛事队伍</h3>${e.teams.map(teamCard).join("")}</div>
   <div class="round"><h3>赛事信息</h3><div class="card"><p><b>举办地</b><br>${esc(e.city)}</p><p><b>日期</b><br>${esc(e.date)}</p><p><b>冠军</b><br>${esc(e.champion)}</p><p><b>亚军</b><br>${esc(e.runner)}</p></div></div>
  </div>
  </div>`;
}
function teamsPage(){
 const params=new URLSearchParams(location.hash.split("?")[1]||""); const r=params.get("region");
 const all=Object.entries(D.teams).flatMap(([region,arr])=>arr.map(t=>({t,region}))).filter(x=>!r||x.region===r);
 return `<div class="container"><div class="hero"><div class="eyebrow">TEAMS DATABASE</div><h1>战队索引</h1><p>54 支档案战队，按四大赛区浏览；卡片使用 PDF 中的队标素材。</p></div>
 <div class="pillbar">${Object.keys(D.teams).map(x=>`<a class="filter pill ${r===x?'active':''}" href="#/teams?region=${x}">${regionName[x]}</a>`).join("")}</div>
 <div class="grid" style="margin-top:18px">${all.map(x=>teamCard(x.t)).join("")}</div></div>`;
}
function teamPage(team){
 const t=teamObj(team), players=D.rosters[team]||[];
 return `<div class="container team-page"><div class="team-head">${logo(team)?`<img class="logo" src="${logo(team)}">`:""}<div><div class="eyebrow">${regionName[t.region]||"TEAM"}</div><h1 style="margin:5px 0">${esc(team)}</h1><p class="muted">当前档案名单 · 来源：TPA战队档案.pdf</p></div></div>
 <div class="section-head"><h2>当前选手名单</h2></div><div class="roster">${players.map((p,i)=>`<div class="player"><small>${["TOP","JUG","MID","ADC","SUP"][i]||"PLAYER"}</small><br><b>${esc(p)}</b></div>`).join("")}</div>
 <div class="section-head"><h2>赛区历年冠军</h2></div><div class="grid4">${Object.entries(D.regional_champs[t.region]||{}).reverse().map(([y,c])=>`<div class="card"><span class="history-year">${y}</span><p>${esc(c[0])} <span class="muted">vs</span> ${esc(c[1])}</p></div>`).join("")}</div>
 </div>`;
}
function rankings(){
 const rows=[["NRG",3018],["E1",2840],["MG",2736],["G2",1500],["PaperRex",1438],["BLG",1280],["AG.AL",936],["GiantX",846],["Karmine Corp",642],["Sentinels",492]];
 return `<div class="container"><div class="hero"><div class="eyebrow">POWER RANKING</div><h1>战队战力榜</h1><p>按 PDF 第 9 页的 Team Combat Power Ranking 展示已明确的积分。</p></div>
 <div class="card"><table class="table"><thead><tr><th>#</th><th>战队</th><th>积分</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td class="rank">${i+1}</td><td>${esc(r[0])}</td><td><b>${r[1]}</b></td></tr>`).join("")}</tbody></table></div></div>`;
}
function historyPage(){
 const reg=["CN","PAC","EMEA","AMER"];
 return `<div class="container"><div class="hero"><div class="eyebrow">HALL OF CHAMPIONS</div><h1>历届冠军</h1><p>2013–2025 四大赛区的冠军、比分与亚军；数据来自 PDF 的 Competition Finals & Champions。</p></div>
 ${reg.map(r=>`<div class="section-head"><h2>${regionName[r]}</h2></div><div class="card"><table class="table"><thead><tr><th>年份</th><th>冠军</th><th>比分</th><th>亚军</th></tr></thead><tbody>${D.history.filter(x=>x[1]===r).map(x=>`<tr><td>${x[0]}</td><td><b>${esc(x[2])}</b></td><td>${x[4]}</td><td>${esc(x[3])}</td></tr>`).join("")}</tbody></table></div>`).join("")}</div>`;
}
function render(){
 const h=location.hash||"#/"; const parts=h.replace(/^#\//,"").split("?")[0].split("/");
 if(parts[0]==="") app.innerHTML=home();
 else if(parts[0]==="events") app.innerHTML=events();
 else if(parts[0]==="schedule") app.innerHTML=schedule();
 else if(parts[0]==="event") app.innerHTML=eventPage(decodeURIComponent(parts[1]||""));
 else if(parts[0]==="teams") app.innerHTML=teamsPage();
 else if(parts[0]==="team") app.innerHTML=teamPage(decodeURIComponent(parts[1]||""));
 else if(parts[0]==="rankings") app.innerHTML=rankings();
 else if(parts[0]==="history") app.innerHTML=historyPage();
 else app.innerHTML=home();
 window.scrollTo(0,0); document.body.classList.remove("nav-open");
}
window.addEventListener("hashchange",render); render();
