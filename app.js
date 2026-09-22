const D=window.TPA_DATA;const app=document.querySelector('#app');
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const R={CN:'中国赛区',PAC:'太平洋赛区',EMEA:'欧洲、中东及非洲赛区',AMER:'美洲赛区'};
const RC={CN:'CN',PAC:'PACIFIC',EMEA:'EMEA',AMER:'AMER'};
function regionOf(t){for(const [r,a] of Object.entries(D.teams))if(a.includes(t))return r;return ''}
function logo(t){for(const [r,a] of Object.entries(D.teams)){const i=a.indexOf(t);if(i>=0)return `assets/logos/${r.toLowerCase()}_${String(i+1).padStart(2,'0')}.png`}return 'assets/tpa-mark.svg'}
function country(t,p){return D.playerCountry?.[p]||D.teamCountry?.[t]||R[regionOf(t)]||'档案未注明'}
function teamName(t){const aliases={'G2':'G2 ESPORTS','C9':'Cloud9','LEV':'Leviatán','EG':'Evil Geniuses','PRQ':'PaperRex','PGW':'PG WON','MG':'MIC GAMING','E1':'E1 Esports','TH':'Team Heretics','TL':'Team Liquid','KC':'Karmine Corp','VIT':'Team Vitality','FNC':'Fnatic','BLG':'Bilibili Gaming','NRG':'NRG','EDG':'Edward Gaming','JDG':'JDG ESPORTS','NS':'NS','AGAL':'AG.AL','AG.AL':'AG.AL','PRX':'PaperRex','DRX':'Kiwoom DRX'};return aliases[t]||t}
function T(t,small=false){const n=teamName(t);return `<span class="team-inline"><img src="${logo(n)}"><b>${esc(n)}</b></span>`}
function nav(){return `<header class="top"><a class="brand" href="#/"><img src="assets/tpa-mark.svg"><strong>TPA <i>ESPORTS</i></strong></a><nav>${[['/','首页'],['/events','赛事中心'],['/schedule','赛程与赛果'],['/teams','战队'],['/players','选手'],['/rankings','排行榜'],['/history','Past Champion'],['/about','关于我们']].map(x=>`<a href="#${x[0]}">${x[1]}</a>`).join('')}</nav><div class="top-actions">⌕　◎　中文⌄</div></header>`}
function side(){return `<aside><div class="side-title">四大赛区</div>${Object.entries(RC).map(([r,n])=>`<a href="#/teams?region=${r}" class="region-link ${r}"><span>${r}</span><small>${R[r]}</small></a>`).join('')}<div class="side-line"></div><div class="side-title plain">快速入口</div>${[['/schedule','▦','赛事日历'],['/teams','◈','战队列表'],['/players','♙','选手列表'],['/rankings','▥','全球排名'],['/history','♜','历史冠军']].map(x=>`<a class="quick" href="#${x[0]}"><span>${x[1]}</span>${x[2]}</a>`).join('')}<div class="side-foot">TPA ESPORTS<br><small>ONE STAGE. ONE DREAM.</small></div></aside>`}
function shell(body){app.innerHTML=nav()+side()+`<main>${body}</main>`;}
function hero(){return `<section class="hero"><div class="hero-copy"><div class="kicker">TPA CHAMPIONS TOUR</div><h1>GLOBAL FINALS<br><em>2026</em></h1><p>NEW YORK × ALLEN, TX　|　OCT 2026</p><a class="red-btn" href="#/event/finals-allen-2026">查看赛事详情 →</a></div><div class="hero-art"><div class="trophy">✦</div><div class="city">TPA ESPORTS</div></div></section>`}
function match(e,compact=false){return `<div class="match-card"><div class="match-head"><span>${esc(e.stage||'比赛')}</span><b>${esc(e.format||'BO5')}</b></div><div class="match-teams"><div>${T(e.a)}</div><strong>${esc(e.score||'VS')}</strong><div>${T(e.b)}</div></div><div class="match-foot"><span>${esc(e.date||'')}</span><span>${esc(e.status||'')}</span></div></div>`}
function home(){const upcoming=[['Masters Santiago 2026','PRX','EDG','2026-07-18','BO5'],['TCI London 2026','PaperRex','Bilibili Gaming','2026-08-06','BO5'],['Finals 2026','T1','JDG ESPORTS','2026-10-10','BO5']].map((x,i)=>({stage:x[0],a:x[1],b:x[2],date:x[3],format:x[4],score:'VS'}));const recent=[...D.international].filter(e=>e.finalScore).slice(-3).reverse().map(e=>({stage:e.name,a:e.champion,b:e.runner,date:e.year,format:'FINAL',score:e.finalScore,status:'已记录'}));return `<div class="page">${hero()}<div class="dashboard-grid"><section><div class="section-title"><h2>近期赛事</h2><a href="#/schedule">查看全部 →</a></div><div class="match-grid">${upcoming.map(x=>match(x)).join('')}</div><div class="section-title"><h2>最新赛果</h2><a href="#/events">查看全部 →</a></div><div class="match-grid">${recent.map(x=>match(x)).join('')}</div><div class="section-title"><h2>四大赛区战队</h2></div><div class="region-grid">${Object.entries(D.teams).map(([r,a])=>`<a class="region-card ${r}" href="#/teams?region=${r}"><b>${r}</b><span>${R[r]}</span><small>${a.length} 支档案战队</small></a>`).join('')}</div></section><section><div class="panel"><div class="section-title"><h2>战力排名</h2><a href="#/rankings">查看全部 →</a></div>${[['PaperRex','2010'],['Bilibili Gaming','1987'],['Edward Gaming','1956'],['JDG ESPORTS','1923'],['NRG','1897']].map((x,i)=>`<div class="rank-row"><b>${i+1}</b>${T(x[0])}<span>${x[1]}</span><i>${i%2?'▼':'▲'}</i></div>`).join('')}</div><div class="season-card"><b>2026 SEASON</b><span>四大赛区 · 全球联赛 · 国际赛事</span><a href="#/schedule">查看赛程 →</a></div><div class="panel"><div class="section-title"><h2>历史冠军</h2><a href="#/history">查看全部 →</a></div><div class="year-strip">${[...new Set(D.globalHistory.map(x=>x[0]))].sort().map(y=>`<a href="#/history?year=${y}">${y}<small>${D.globalHistory.filter(x=>x[0]===y).length} 场</small></a>`).join('')}</div></div></section></div></div>`}
function events(){return `<div class="page"><div class="page-head"><div><div class="kicker">EVENTS & STANDINGS</div><h1>赛事中心</h1><p>国际赛事、四大赛区赛季和完整淘汰赛结构集中查看。</p></div></div><div class="event-list">${D.international.map(e=>`<a class="event-row" href="#/event/${e.id}"><div class="event-mark">${e.year}</div><div><b>${esc(e.name)}</b><small>${esc(e.city||'')} · ${esc(e.type||'国际赛')}</small></div><div class="event-final">${T(e.champion)}<strong>${esc(e.finalScore||'—')}</strong>${T(e.runner)}</div><span>›</span></a>`).join('')}</div></div>`}
function schedule(){const rows=[['2026-01','TPA KickOff','四大赛区'],['2026-02','MASTERS 2026 Busan','全球大师赛'],['2026-03','TPA Series Stage 1','四大赛区'],['2026-05','TCI 2026 London','季中冠军赛'],['2026-06','SUMMER Transfer','转会期'],['2026-07','MASTERS 2026 Santiago','全球大师赛'],['2026-08','TPA Series Stage 2','四大赛区'],['2026-10','FINALS 2026 New York / Allen, TX','全球总决赛'],['2026-11','WINTER Transfer','转会期'],['2026-12','Draft Conference / All-Star','赛季特别活动']];return `<div class="page"><div class="page-head"><div><div class="kicker">SCHEDULE</div><h1>赛程与赛果</h1><p>按日期、赛事和赛区浏览；进入赛事可以展开逐场对阵。</p></div></div><div class="calendar">${rows.map((x,i)=>`<div class="cal-row"><time>${x[0]}</time><div><b>${x[1]}</b><small>${x[2]}</small></div><span>${i<5?'档案赛程':'赛季安排'}</span></div>`).join('')}</div><div class="section-title"><h2>2024–2026 国际赛</h2></div><div class="match-grid">${D.international.flatMap(e=>[{stage:e.name,a:e.champion,b:e.runner,date:e.year,format:'FINAL',score:e.finalScore,status:'已记录'}]).slice(-9).reverse().map(x=>match(x)).join('')}</div></div>`}
function teams(){return `<div class="page"><div class="page-head"><div><div class="kicker">TEAMS</div><h1>战队档案</h1><p>战队 Logo、所属赛区、完整当前档案选手和国籍信息。</p></div></div>${Object.entries(D.teams).map(([r,a])=>`<section class="team-section"><div class="section-title"><h2>${RC[r]} <small>${R[r]}</small></h2></div><div class="team-grid">${a.map(t=>`<a class="team-card" href="#/team/${encodeURIComponent(t)}"><img src="${logo(t)}"><div><b>${esc(t)}</b><span>${D.teamCountry[t]||R[r]}</span><small>${(D.rosters[t]||[]).length} 名档案选手</small></div></a>`).join('')}</div></section>`).join('')}</div>`}
function team(t){const ps=D.rosters[t]||[];return `<div class="page"><div class="team-hero"><img src="${logo(t)}"><div><div class="kicker">${regionOf(t)} · TEAM PROFILE</div><h1>${esc(t)}</h1><p>${esc(D.teamCountry[t]||R[regionOf(t)]||'')}</p></div></div><div class="section-title"><h2>选手名单</h2><span>${ps.length} 名</span></div><div class="player-grid">${ps.map((p,i)=>`<div class="player-card"><div class="avatar">${esc(p.slice(0,1).toUpperCase())}</div><div><b>${esc(p)}</b><span>${['TOP','JUG','MID','ADC','SUP'][i]||'PLAYER'}</span><small>${esc(country(t,p))}</small></div></div>`).join('')}</div><div class="notice">国籍显示遵循你提供的《TPA战队档案》：能从档案明确对应的国家直接显示；无法从文字层提取旗帜的条目按战队档案国家归档显示，不根据姓名推测。</div></div>`}
function players(){return `<div class="page"><div class="page-head"><div><div class="kicker">PLAYERS</div><h1>选手列表</h1><p>按照四大赛区筛选，ID 后直接显示国籍。</p></div></div><div class="player-table">${Object.entries(D.rosters).flatMap(([t,ps])=>ps.map((p,i)=>`<div class="player-row"><img src="${logo(t)}"><div><b>${esc(p)}</b><small>${esc(t)}</small></div><span>${['TOP','JUG','MID','ADC','SUP'][i]||'PLAYER'}</span><strong>${esc(country(t,p))}</strong></div>`)).join('')}</div></div>`}
function rankings(){return `<div class="page"><div class="page-head"><div><div class="kicker">POWER RANKINGS</div><h1>战力排名</h1><p>展示档案中的战力积分，不将其解释为预测或评价。</p></div></div><div class="ranking-table">${[['NRG','3018'],['E1 Esports','2840'],['MIC GAMING','2736'],['G2 ESPORTS','1500'],['PaperRex','1438'],['Bilibili Gaming','1280']].map((x,i)=>`<div class="rank-big"><b>${i+1}</b>${T(x[0])}<span>${x[1]}</span></div>`).join('')}</div></div>`}
function generatedSchedule(e){const teams=(e.teams||[]).map(teamName);let pool=[...new Set([...teams,...Object.values(D.teams).flat()])].filter(Boolean);let extras=pool.filter(x=>x!==teamName(e.champion)&&x!==teamName(e.runner));extras=extras.slice(0,6);while(extras.length<6)extras.push('TBD');const c=teamName(e.champion),r=teamName(e.runner),q=[{a:c,b:extras[0],s:'2:0'},{a:extras[1],b:extras[2],s:'1:2'},{a:r,b:extras[3],s:'2:1'},{a:extras[4],b:extras[5],s:'0:2'}];return {q,semi:[{a:c,b:extras[2],s:'3:1'},{a:r,b:extras[5],s:'3:2'}],final:{a:c,b:r,s:e.finalScore}}}
function historyPool(e){
  const all=Object.values(D.teams).flat();
  const aliases={
    'MG':'MIC GAMING','MG Esports':'MIC GAMING','E1':'E1 Esports','E1 Pulse':'E1 Esports',
    'PRX':'PaperRex','PRQ':'PaperRex','G2':'G2 ESPORTS','BLG':'Bilibili Gaming','EDG':'Edward Gaming',
    'JDG':'JDG ESPORTS','WBG':'Weibo Gaming','SUNING':'SUNING','FPX':'FunPlusPhoenix','LNG':'LNG ESPORTS',
    'EG':'Evil Geniuses','TH':'Team Heretics','TL':'Team Liquid','FNC':'Fnatic','FUT':'FUT Esports',
    'LEV':'Leviatán','NS':'NS','DRX':'Kiwoom DRX','LOUD':'LOUD','Cloud9':'Cloud9','C9':'Cloud9',
    'Sentinels':'Sentinels','Team Envy':'Team Envy','RNG':'Royal Never Give up','RARE':'RareAtom','RA':'RareAtom'
  };
  const norm=x=>aliases[x]||x;
  const champ=norm(e.champion), runner=norm(e.runner);
  const preferred=['NRG','PaperRex','Bilibili Gaming','Edward Gaming','G2 ESPORTS','Fnatic','Team Heretics','LOUD','JDG ESPORTS','Weibo Gaming'];
  const pool=[];
  for(const x of [champ,runner,...preferred,...all]) if(x && x!=='待赛' && x!=='TBD' && !pool.includes(x)) pool.push(x);
  return pool.slice(0,8);
}
function generatedBracket(e){
  const p=historyPool(e); while(p.length<8)p.push('TBD');
  const score=(i)=> i%3===0?'2:0':i%3===1?'2:1':'2:0';
  const q=[
    {a:p[0],b:p[1],s:score(0),round:'QF1'},
    {a:p[2],b:p[3],s:score(1),round:'QF2'},
    {a:p[4],b:p[5],s:score(2),round:'QF3'},
    {a:p[6],b:p[7],s:score(3),round:'QF4'}
  ];
  const c=teamName(e.champion),r=teamName(e.runner);
  const sf=[{a:c,b:p[2],s:'3:1',round:'SF1'},{a:r,b:p[6],s:'3:2',round:'SF2'}];
  return {q,sf,final:{a:c,b:r,s:e.finalScore||'TBD'}};
}
function bracket(e){
  const g=generatedBracket(e);
  const col=(title,arr,bo)=>`<div class="bracket-col"><div class="bracket-col-title">${title}<span>${arr.length} 场</span></div>${arr.map(m=>`<div class="bracket-match"><small>${m.round} · ${bo}</small><div>${T(m.a)}<b>${m.s.split(':')[0]}</b></div><div>${T(m.b)}<b>${m.s.split(':')[1]}</b></div></div>`).join('')}</div>`;
  return `<div class="bracket-v6">${col('四分之一决赛',g.q,'BO3')}${col('半决赛',g.sf,'BO5')}<div class="bracket-col"><div class="bracket-col-title">总决赛<span>1 场</span></div><div class="bracket-match final"><small>GRAND FINAL · BO5</small><div>${T(g.final.a)}<b>${g.final.s.split(':')[0]||'—'}</b></div><div>${T(g.final.b)}<b>${g.final.s.split(':')[1]||'—'}</b></div><strong>冠军 · ${esc(g.final.a)}</strong></div></div></div>`;
}
function eventScheduleRows(e, historical=false){
  const g=generatedBracket(e);
  const rows=[
    ['01','四分之一决赛 · 1',g.q[0].a,g.q[0].b,g.q[0].s,'BO3'],
    ['02','四分之一决赛 · 2',g.q[1].a,g.q[1].b,g.q[1].s,'BO3'],
    ['03','四分之一决赛 · 3',g.q[2].a,g.q[2].b,g.q[2].s,'BO3'],
    ['04','四分之一决赛 · 4',g.q[3].a,g.q[3].b,g.q[3].s,'BO3'],
    ['05','半决赛 · 1',g.sf[0].a,g.sf[0].b,g.sf[0].s,'BO5'],
    ['06','半决赛 · 2',g.sf[1].a,g.sf[1].b,g.sf[1].s,'BO5'],
    ['07','总决赛',g.final.a,g.final.b,g.final.s,'BO5']
  ];
  return `<div class="fixture-table"><div class="fixture-head"><span>场次</span><span>阶段</span><span>对阵</span><span>比分</span><span>赛制</span></div>${rows.map(r=>`<div class="fixture-row"><b>Match ${r[0]}</b><span>${r[1]}</span><div class="fixture-teams">${T(r[2])}<em>VS</em>${T(r[3])}</div><strong>${esc(r[4])}</strong><small>${r[5]}</small></div>`).join('')}</div>`;
}
function event(id){
  const e=D.international.find(x=>x.id===id); if(!e)return historyEvent(id);
  return `<div class="page"><div class="event-hero-v6"><div><div class="kicker">${e.year} · ${esc(e.type||'INTERNATIONAL')}</div><h1>${esc(e.name)}</h1><p>${esc(e.city||'')}　·　${esc(e.date||'')}</p></div><div class="winner">${T(e.champion)}<strong>${esc(e.finalScore||'—')}</strong>${T(e.runner)}</div></div><div class="event-nav-v6"><a class="on">赛事总览</a><a>完整赛程</a><a>对阵图</a><a>参赛战队</a></div><div class="result-banner"><span>CHAMPION</span>${T(e.champion)}<strong>${esc(e.finalScore||'—')}</strong>${T(e.runner)}<span>RUNNER-UP</span></div><div class="section-title"><h2>完整对阵图</h2><small>决赛结果采用档案记录；逐场结构按本站赛事档案补全。</small></div>${bracket(e)}<div class="section-title"><h2>全部赛程</h2><small>7 场核心淘汰赛</small></div>${eventScheduleRows(e)}</div>`;
}
function historyEvent(id){
  const idx=Number(id.replace('hist-','')); const e=D.historyEvents[idx];
  if(!e)return `<div class="page"><h1>未找到赛事</h1></div>`;
  return `<div class="page"><div class="event-hero-v6"><div><div class="kicker">${e.year} · PAST CHAMPION</div><h1>${esc(e.name||e.city)}</h1><p>${esc(e.city)}　·　历史全球赛事档案</p></div><div class="winner">${T(e.champion)}<strong>${esc(e.finalScore)}</strong>${T(e.runner)}</div></div><div class="event-nav-v6"><a class="on">赛事总览</a><a>完整赛程</a><a>对阵图</a><a>赛果</a></div><div class="result-banner"><span>CHAMPION</span>${T(e.champion)}<strong>${esc(e.finalScore)}</strong>${T(e.runner)}<span>RUNNER-UP</span></div><div class="section-title"><h2>${e.year} · ${esc(e.city)} 对阵表</h2><small>最终冠军、亚军和决赛比分严格保留档案记录。</small></div>${bracket(e)}<div class="section-title"><h2>全部赛程</h2><small>本年度赛事完整可视化赛程</small></div>${eventScheduleRows(e,true)}</div>`;
}
function history(){
  const years=[...new Set([...D.historyEvents.map(e=>e.year),...D.international.map(e=>e.year)])].sort((a,b)=>b-a);
  const q=location.hash.includes('?')?location.hash.split('?')[1]:''; const y=new URLSearchParams(q).get('year'); const year=y?Number(y):years[0];
  const old=D.historyEvents.filter(e=>e.year===year); const modern=D.international.filter(e=>e.year===year);
  const cards=[...old.map(e=>({e,id:D.historyEvents.indexOf(e),href:`#/history-event/${D.historyEvents.indexOf(e)}`,label:'历史全球赛事'})),...modern.map(e=>({e,id:e.id,href:`#/event/${e.id}`,label:'国际赛事'}))];
  return `<div class="page"><div class="page-head history-head"><div><div class="kicker">PAST CHAMPION · GLOBAL ARCHIVE</div><h1>历届赛事</h1><p>以年份为单位查看所有全球赛事。点击年份后，下方直接显示该年全部赛事；点击赛事进入完整对阵表、逐场赛程、冠军与亚军。</p></div><div class="history-count"><b>${cards.length}</b><span>${year} 场赛事</span></div></div><div class="year-tabs-v6">${years.map(x=>`<a class="${x===year?'on':''}" href="#/history?year=${x}"><b>${x}</b><span>${D.historyEvents.filter(e=>e.year===x).length+D.international.filter(e=>e.year===x).length} EVENTS</span></a>`).join('')}</div><div class="history-toolbar"><b>${year} GLOBAL EVENTS</b><span>冠军 / 亚军 / 决赛比分 / 对阵表 / 完整赛程</span></div><div class="history-cards-v6">${cards.map(({e,href,label})=>`<a href="${href}" class="history-card-v6"><div class="history-card-top"><span>${label}</span><b>${esc(e.city||'')}</b></div><h3>${esc(e.name||`${e.year} · ${e.city}`)}</h3><div class="history-final-v6">${T(e.champion)}<strong>${esc(e.finalScore||'TBD')}</strong>${T(e.runner)}</div><div class="history-card-bottom"><span>冠军：${esc(e.champion)}</span><span>亚军：${esc(e.runner)}</span><em>查看完整赛程 →</em></div></a>`).join('')}</div></div>`;
}
function about(){return `<div class="page"><div class="page-head"><div class="kicker">TPA ESPORTS DATABASE</div><h1>关于本站</h1><p>本站是基于你提供的《TPA战队档案》制作的静态赛事数据库。</p></div><div class="notice large">数据原则：冠军、亚军、决赛比分、战队和选手名单以档案为主。历史档案未逐场列出的对阵，本站按照你要求生成完整可视化赛程；生成场次不会覆盖档案中的最终冠军、亚军和决赛比分。</div></div>`}
function router(){const p=location.hash.slice(1)||'/';if(p.startsWith('/event/'))shell(event(p.split('/')[2]));else if(p.startsWith('/history-event/'))shell(historyEvent(p.split('/')[2]));else if(p.startsWith('/team/'))shell(team(decodeURIComponent(p.split('/')[2])));else if(p.startsWith('/history'))shell(history());else if(p.startsWith('/events'))shell(events());else if(p.startsWith('/schedule'))shell(schedule());else if(p.startsWith('/teams'))shell(teams());else if(p.startsWith('/players'))shell(players());else if(p.startsWith('/rankings'))shell(rankings());else if(p.startsWith('/about'))shell(about());else shell(home())}window.addEventListener('hashchange',router);router();