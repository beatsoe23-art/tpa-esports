
const D=window.TPA_DATA, app=document.querySelector('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const regions={CN:'CN',PAC:'PACIFIC',EMEA:'EMEA',AMER:'AMERICAS'};
function findRegion(t){for(const [r,a] of Object.entries(D.teams))if(a.includes(t))return r;return '';}
function logo(t){for(const [r,a] of Object.entries(D.teams)){const i=a.indexOf(t);if(i>=0)return `assets/logos/${r.toLowerCase()}_${String(i+1).padStart(2,'0')}.png`}return ''}
function teamCard(t){
 const r=findRegion(t), ps=D.rosters[t]||[];
 return `<a class="card team-card" href="#/team/${encodeURIComponent(t)}"><img class="logo" src="${logo(t)}"><div><h3>${esc(t)}</h3><p>${regions[r]||r} · ${ps.length}名档案选手</p></div></a>`;
}
function eventCard(e){
 return `<a class="card event-card" href="#/event/${e.id}"><div><span class="tag">${e.year} · ${esc(e.type||'国际赛')}</span><div class="event-title">${esc(e.name)}</div><div class="event-meta">${esc(e.date||'档案未提供日期')} · ${esc(e.city||'')}</div></div><div class="champ"><span>冠军</span> <b>${esc(e.champion)}</b>　<span>亚军</span> <b>${esc(e.runner)}</b>${e.finalScore?`　<span class="score-chip">${esc(e.finalScore)}</span>`:''}</div></a>`;
}
function home(){
 const recent=[...D.international].reverse().slice(0,6);
 return `<div class="container">
  <section class="hero-banner hero"><div><div class="eyebrow">TPA CHAMPIONS TOUR · OFFICIAL-STYLE DATABASE</div><h1>一站式看完 TPA 的赛事、赛程、战队与历史。</h1><p>以你的《TPA战队档案.pdf》为主数据源，重做成更接近职业赛事官网的信息架构：赛事时间轴、比赛卡片、双败淘汰赛、战队档案、选手名单、积分榜与全球历史全部串起来。</p><div class="pillbar"><a class="pill active" href="#/events">进入赛事中心</a><a class="pill" href="#/schedule">查看今日式赛程</a><a class="pill" href="#/history">查看全部历史</a></div></div></section>
  <div class="stat-grid" style="margin-top:18px"><div class="stat"><strong>4</strong><span>四大赛区</span></div><div class="stat"><strong>54</strong><span>档案战队</span></div><div class="stat"><strong>12</strong><span>2024–26 国际赛事</span></div><div class="stat"><strong>${D.globalHistory.length+12}</strong><span>全球历史赛事记录</span></div></div>
  <div class="section-head"><h2>2026 赛季时间轴</h2><a class="muted" href="#/events">赛事中心 →</a></div>
  <div class="card">${D.calendar2026.map(x=>`<div class="match"><div class="format">${esc(x[0])}</div><div class="team">${esc(x[1])}</div><div class="score">·</div><div class="team right">${esc(x[2]||'TPA')}</div><div class="format">${esc(x[3]||'')}</div></div>`).join('')}</div>
  <div class="section-head"><h2>最近国际赛事</h2><a class="muted" href="#/events">全部 →</a></div><div class="grid">${recent.map(eventCard).join('')}</div>
  <div class="section-head"><h2>四大赛区</h2></div><div class="grid4">${Object.entries(D.teams).map(([r,a])=>`<a class="card" href="#/teams?region=${r}"><div class="eyebrow">${r}</div><h3>${regions[r]}</h3><p class="muted">${a.length} 支战队 · 选手档案 · 赛区冠军历史</p></a>`).join('')}</div>
  <div class="section-head"><h2>数据口径</h2></div><div class="notice">冠军、亚军、决赛比分、战队、选手等优先采用 PDF。PDF 未逐场给出的历史对阵不伪造比分；网站只展示赛制结构与“档案未提供”。选手国籍只有在档案明确注明时才显示，否则标为“档案未注明”，不根据姓名猜测。</div>
 </div>`;
}
function events(){
 const years=[...new Set(D.international.map(e=>e.year))].sort((a,b)=>b-a);
 return `<div class="container"><div class="hero"><div class="eyebrow">EVENTS & STANDINGS</div><h1>赛事中心</h1><p>国际赛采用“赛事 → 赛程 → 淘汰赛 → 冠军阵容”的浏览方式；历史档案另设全球赛事库。</p></div>
 <div class="section-head"><h2>2024–2026 国际赛事</h2></div><div class="grid">${D.international.map(eventCard).join('')}</div>
 <div class="section-head"><h2>四大赛区赛事</h2></div><div class="grid4">${Object.entries(D.regional_champs).map(([r,ys])=>`<a class="card" href="#/schedule?region=${r}"><div class="eyebrow">${regions[r]}</div><h3>KickOff / Stage 1 / Stage 2</h3><p class="muted">${Object.keys(ys).length} 个赛季冠军档案</p></a>`).join('')}</div>
 <div class="section-head"><h2>完整历史入口</h2></div><a class="card" href="#/history"><b>2013–2026 全球赛事档案</b><p class="muted">2013–2023 按 PDF 的 Competition Finals 城市/年份/冠军/亚军保存；2024–2026 使用具体赛事名称与结果。</p></a></div>`;
}
function eventPage(id){
 const e=D.international.find(x=>x.id===id); if(!e)return `<div class="container empty">赛事不存在</div>`;
 const br=D.brackets?.[id]||[], sched=D.eventSchedule?.[id]||[];
 return `<div class="container"><div class="hero"><div class="eyebrow">${e.year} · ${esc(e.type||'GLOBAL EVENT')}</div><h1>${esc(e.name)}</h1><p>${esc(e.date||'档案未提供具体日期')} · ${esc(e.city||'')} ${e.venue?'· '+esc(e.venue):''}</p></div>
 <div class="stat-grid"><div class="stat"><strong>${esc(e.champion)}</strong><span>冠军</span></div><div class="stat"><strong>${esc(e.runner)}</strong><span>亚军</span></div><div class="stat"><strong>${esc(e.finalScore||'—')}</strong><span>总决赛</span></div><div class="stat"><strong>${esc((e.teams||[]).length)}</strong><span>档案参赛队</span></div></div>
 <div class="section-head"><h2>赛事赛制</h2></div><div class="card"><p>${esc(e.format||'档案未提供')}</p><p class="source">${esc(e.source||'来源：TPA战队档案.pdf')}</p></div>
 <div class="section-head"><h2>赛程</h2></div><div class="card">${sched.length?sched.map(x=>`<div class="match"><div class="format">${esc(x[0])}</div><div class="team">${esc(x[1])}</div><div class="score">${esc(x[2]||'—')}</div><div class="team right">${esc(x[3]||'—')}</div><div class="format">${esc(x[4]||'BO3')}</div></div>`).join(''):`<div class="notice">PDF 没有提供逐场赛程，本页不编造历史对阵。</div>`}</div>
 <div class="section-head"><h2>淘汰赛 / Bracket</h2></div><div class="bracket-wrap"><div class="bracket">${br.length?br.map(m=>`<div class="round"><h3>${esc(m[0]||'淘汰赛')}</h3><div class="bracket-match"><small class="${m[6]==='documented'?'doc':'gen'}">${m[6]==='documented'?'PDF 已记录':'结构补全'}</small><div class="bm-row"><span>${esc(m[1])}</span><b>${esc(m[2])}</b></div><div class="bm-row"><span>${esc(m[3])}</span><b>${esc(m[4])}</b></div><small class="muted">${esc(m[5]||'')}</small></div></div>`).join(''):`<div class="notice">该历史记录仅有总决赛结果，PDF 未提供完整 bracket。</div>`}</div></div>
 <div class="section-head"><h2>参赛战队</h2></div><div class="grid">${(e.teams||[]).map(teamCard).join('')}</div>
 </div>`;
}
function schedule(){
 const p=new URLSearchParams(location.hash.split('?')[1]||''), r=p.get('region')||'CN';
 const teams=D.teams[r]||[];
 const seasons=[2026,2025,2024,2023,2022,2021];
 return `<div class="container"><div class="hero"><div class="eyebrow">SCHEDULE</div><h1>四大赛区赛程</h1><p>把四大联赛放进同一套职业赛事信息架构。PDF 已明确的冠军/亚军真实保留，未提供的逐场比分显示为“—”。</p></div>
 <div class="pillbar">${Object.keys(D.teams).map(x=>`<a class="pill ${x===r?'active':''}" href="#/schedule?region=${x}">${regions[x]}</a>`).join('')}</div>
 <div class="section-head"><h2>${regions[r]} · 战队池</h2></div><div class="grid">${teams.map(teamCard).join('')}</div>
 <div class="section-head"><h2>赛季索引</h2></div>${seasons.map(y=>{const c=D.regional_champs?.[r]?.[y];return `<div class="schedule-day"><b>${y} Season</b><div class="match"><div class="format">KickOff</div><div class="team">${c?esc(c[0]):'—'}</div><div class="score">${c?'冠军':''}</div><div class="team right">${c?esc(c[1]):'—'}</div><div class="format">Stage / Playoffs</div></div><div class="muted">Stage 1 → Stage 2 → Playoffs · 具体逐场赛程以档案提供范围为准</div></div>`}).join('')}</div>`;
}
function teamsPage(){
 const p=new URLSearchParams(location.hash.split('?')[1]||''), r=p.get('region');
 const all=Object.entries(D.teams).flatMap(([reg,a])=>a.map(t=>({t,reg}))).filter(x=>!r||x.reg===r);
 return `<div class="container"><div class="hero"><div class="eyebrow">TEAMS</div><h1>战队数据库</h1><p>54 支档案战队。队标使用档案素材做了高清化、透明化和统一比例处理，页面不再出现原来的黑方框缩略图。</p></div><div class="pillbar"><a class="pill ${!r?'active':''}" href="#/teams">全部</a>${Object.keys(D.teams).map(x=>`<a class="pill ${r===x?'active':''}" href="#/teams?region=${x}">${regions[x]}</a>`).join('')}</div><div class="grid" style="margin-top:18px">${all.map(x=>teamCard(x.t)).join('')}</div></div>`;
}
function teamPage(team){
 const r=findRegion(team), ps=D.rosters[team]||[];
 return `<div class="container"><div class="team-head"><img class="logo" src="${logo(team)}"><div><div class="eyebrow">${regions[r]}</div><h1 style="margin:5px 0">${esc(team)}</h1><p class="muted">当前档案名单 · 选手国籍只有档案明确注明时才显示。</p></div></div>
 <div class="section-head"><h2>当前选手</h2></div><div class="roster">${ps.map((p,i)=>{const meta=D.playerMeta?.[p]||{};const roles=['TOP','JUG','MID','ADC','SUP'];return `<div class="player"><small>${roles[i]||'PLAYER'}</small><br><b>${esc(p)}</b><span class="nation">国籍/地区：${esc(meta.nationality||'档案未注明')}<br>注册赛区：${esc(regions[r]||r)}</span></div>`}).join('')}</div>
 <div class="section-head"><h2>赛区历史冠军</h2></div><div class="grid4">${Object.entries(D.regional_champs?.[r]||{}).sort((a,b)=>b[0]-a[0]).map(([y,c])=>`<div class="card"><div class="eyebrow">${y}</div><p><b>${esc(c[0])}</b> <span class="muted">3:${esc(c[2]||'?')} vs</span> ${esc(c[1])}</p></div>`).join('')}</div></div>`;
}
function rankings(){
 const rows=(D.rankings||[]).slice(0,20);
 return `<div class="container"><div class="hero"><div class="eyebrow">GLOBAL POWER RANKINGS</div><h1>战队战力榜</h1><p>按 PDF 第 9 页 Team Combat Power Ranking 展示积分，不额外计算。</p></div><div class="card">${rows.map((r,i)=>`<div class="rank-row"><div class="rank-num">${i+1}</div><div><b>${esc(r[0])}</b><div class="bar"><i style="width:${Math.min(100,(r[1]/rows[0][1])*100)}%"></i></div></div><div><b>${esc(r[1])}</b><div class="muted">PTS</div></div><div class="rank-extra muted">PDF Ranking</div></div>`).join('')}</div></div>`;
}
function history(){
 const rows=D.globalHistory;
 return `<div class="container"><div class="hero"><div class="eyebrow">GLOBAL ARCHIVE</div><h1>历届全球赛事</h1><p>2013–2023 保留 PDF Competition Finals 的城市、年份、冠军、决赛比分与亚军；不擅自给没有标注的赛事加上 Masters / TCI / Finals 标签。2024–2026 则进入具体赛事页。</p></div>
 <div class="section-head"><h2>2013–2023 Competition Finals</h2></div><div style="overflow:auto"><table class="archive-table"><thead><tr><th>年份</th><th>城市</th><th>冠军</th><th>比分</th><th>亚军</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${x[0]}</td><td>${esc(x[1])}</td><td class="winner-chip"><strong>${esc(x[2])}</strong></td><td class="score-chip">${x[3]}</td><td>${esc(x[4])}</td></tr>`).join('')}</tbody></table></div>
 <div class="section-head"><h2>2024–2026 已命名国际赛事</h2></div><div class="grid">${D.international.map(eventCard).join('')}</div>
 <div class="section-head"><h2>四大赛区历届冠军</h2></div><div class="grid4">${Object.entries(D.regional_champs).map(([r,ys])=>`<div class="card"><div class="eyebrow">${regions[r]}</div>${Object.entries(ys).sort((a,b)=>b[0]-a[0]).map(([y,c])=>`<div class="match"><div class="format">${y}</div><div class="team">${esc(c[0])}</div><div class="score">CHAMP</div><div class="team right">${esc(c[1])}</div><div class="format">RU</div></div>`).join('')}</div>`).join('')}</div></div>`;
}
function route(){
 const [path,tail]=location.hash.slice(1).split('?'); const p=path||'/';
 let html;
 if(p==='/')html=home(); else if(p==='/events')html=events(); else if(p==='/schedule')html=schedule(); else if(p==='/teams')html=teamsPage(); else if(p==='/rankings')html=rankings(); else if(p==='/history')html=history(); else if(p.startsWith('/event/'))html=eventPage(decodeURIComponent(p.slice(7))); else if(p.startsWith('/team/'))html=teamPage(decodeURIComponent(p.slice(6))); else html=home();
 app.innerHTML=html; window.scrollTo(0,0);
 document.querySelectorAll('.topbar nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${p}`));
}
window.addEventListener('hashchange',route); route();
