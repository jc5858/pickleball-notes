const main=document.getElementById('main');
const num=n=>String(n).padStart(2,'0');
const escapeHTML=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let scenario=0,step=0;
const scenarios=[[
['先看準備狀態','A、B 都是右撇子，站在近端網前。C 打來一顆速度中等、兩人都能處理的中間球。先看誰能站穩、在身前擊球。'],
['A 提早喊「我來」','這個示例中，A 已站穩，能用正拍自然迎球；B 不必同時伸拍。正拍在條件相近時可以作為預先約定的分工。'],
['擊球後，兩人繼續準備','A 完成回球後恢復持拍準備；B 仍觀察對手，照顧下一拍。示意回球方向不是唯一選擇，須依實際來球調整。']
],[
['A 還在回位','A 剛被拉向左側，正在往回移動；B 已站穩。這顆中間球落在 B 能自然用反拍處理的範圍。'],
['B 喊「我來」，穩定處理','A 不必為了「正拍接中間」勉強橫跨搶球。此時由準備較好的 B 處理，A 繼續回位。'],
['回球後恢復合作站位','B 完成回球，A 回到能支援的位置。不要只看誰碰到球，也要看兩人是否準備好應付下一拍。']
]];
function court(sc=0,st=0,hero=false){let ax=sc===1?(st===0?89:st===1?112:139):(st===0?139:st===1?164:145),bx=258;let path=st===0?'M 147 155 Q 177 214 211 281':st===1?(sc===0?'M 211 283 L 183 301':'M 211 283 L 244 301'):(sc===0?'M 183 301 Q 206 230 232 161':'M 244 301 Q 209 233 155 163');const id=hero?'hero':'board';return `<svg class="court" viewBox="0 0 400 480" role="img" aria-label="俯視匹克球場：近端 A、B，遠端 C、D。實線表示球路，虛線表示移動。${sc===1?'A 正在回位，由 B 處理中間球。':'A 與 B 都站穩，由 A 處理中間球。'}"><defs><marker id="${id}-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0 0 L6 3.5 L0 7" fill="#e4b84a"/></marker><marker id="${id}-move" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L5 3 L0 6" fill="#f0f2df"/></marker></defs><rect x="76" y="20" width="248" height="440" rx="1" fill="#37644e"/><rect x="76" y="170" width="248" height="140" fill="#7f9a76"/><g stroke="#f4f4dd" stroke-width="2" fill="none"><rect x="76" y="20" width="248" height="440"/><path d="M76 170H324M76 310H324M200 20V170M200 310V460"/></g><path d="M65 240H335" stroke="#20382e" stroke-width="7"/><path d="M65 240H335" stroke="#f7f5db" stroke-dasharray="3 4" stroke-width="2"/><text x="201" y="215" fill="#f2f4e8" font-size="11" text-anchor="middle" letter-spacing="2">KITCHEN</text><text x="201" y="271" fill="#f2f4e8" font-size="11" text-anchor="middle" letter-spacing="2">KITCHEN</text><path d="${path}" stroke="#e4b84a" stroke-width="3" fill="none" marker-end="url(#${id}-arrow)"/>${sc===1?`<path d="M89 342 L143 342" stroke="#f0f2df" stroke-width="2" stroke-dasharray="5 5" marker-end="url(#${id}-move)"/>`:''}${[[147,151,'C',true],[259,151,'D',true],[ax,329,'A',false],[bx,329,'B',false]].map(([x,y,l,opp])=>`<circle cx="${x}" cy="${y}" r="17" fill="${opp?'#d59c75':'#e6edc3'}" stroke="#20382e" stroke-width="2"/><text x="${x}" y="${y+5}" fill="#20382e" text-anchor="middle" font-size="14" font-weight="700">${l}</text>`).join('')}<circle cx="${st===0?211:st===1?(sc===0?183:244):232}" cy="${st===0?281:st===1?301:161}" r="5" fill="#f0d268"/><text x="200" y="439" text-anchor="middle" fill="#edf1dc" font-size="11">我方 · 面向球網</text></svg>`}
function home(){return `<section class="hero"><div><p class="eyebrow">A FIELD GUIDE TO PICKLEBALL</p><h1>看懂匹克球，<br>每一拍都有想法。</h1><p class="lead">從場地規則到雙打攻防，<br>用圖解理解站位、球路與實戰選擇。</p><div class="actions"><a class="btn" href="#beginner">從基礎開始 <span>↗</span></a><a class="btn secondary" href="#catalog">瀏覽所有主題</a></div></div><div class="hero-board"><div class="board-head"><span>FIELD NOTE / 07</span><span>雙打站位與分工</span></div>${court(0,0,true)}<div class="board-caption"><span>中間球，是兩個人的共同判斷。</span><span>01 / 03</span></div></div></section><div class="section-top"><h2>找到你的閱讀起點</h2><p>同一套觀念，兩條閱讀路線。</p></div><div class="routes"><a class="route" href="#beginner"><span class="route-no">Route 01 / Start here</span><span class="arrow">↗</span><h3>新手入門</h3><p>剛開始打，先建立基本觀念。</p><small>場地 → 規則 → 動作 → 基本回合</small></a><a class="route" href="#advanced"><span class="route-no">Route 02 / Think deeper</span><span class="arrow">↗</span><h3>進階實戰</h3><p>已經能對打，想提升判斷與配合。</p><small>前三拍 → 過渡區 → 雙打合作 → 網前攻防</small></a></div><div class="feature"><div><span class="eyebrow">第一篇圖解筆記</span><p>中間球一定讓正拍接？從兩個情境看懂分工。</p></div><a href="#article-middle">雙打中間球應該由誰接？ ↗</a></div><div class="section-top"><h2>完整觀念目錄</h2><p>12 章，從第一個回合到戰術配合。</p></div>${catalogControls()}<div id="catalog-list" class="catalog"></div>`}
function catalogControls(){return `<div class="toolbar"><label for="search" class="sr-only">搜尋文章題目</label><input class="search" id="search" type="search" placeholder="搜尋觀念，例如：握拍、中間球、Drop"><label for="level" class="sr-only">內容深度</label><select id="level"><option value="">全部深度</option><option>基礎</option><option>進階</option></select><label for="availability" class="sr-only">閱讀狀態</label><select id="availability"><option value="">全部內容</option><option value="ready">可閱讀</option></select></div><p id="result-count" class="result-count" aria-live="polite"></p>`}
function renderCatalog(){const q=document.getElementById('search').value.trim().toLowerCase(),level=document.getElementById('level').value,ready=document.getElementById('availability').value;let count=0;const chapterId=Number(location.hash.split('/')[1]);document.getElementById('catalog-list').innerHTML=chapters.map(c=>{let topics=c.topics.filter(t=>!t.heading&&(!q||(t.title+' '+c.title).toLowerCase().includes(q))&&(!level||t.level===level)&&(!ready||t.route));count+=topics.length;if(!topics.length)return '';let group='';const rows=c.topics.map(t=>{if(t.heading){group=t.title;return ''}if(!topics.includes(t))return '';let g=group?`<li class="subhead">${group}</li>`:'';group='';return g+`<li class="topic"><span class="tag ${t.level==='進階'?'advanced':''}">${t.level}</span><span class="topic-title">${t.route?`<a href="#${t.route}">${t.title}</a>`:t.title}</span><span class="status">${t.route?'可閱讀 ↗':'撰寫中'}</span></li>`}).join('');return `<details class="chapter" id="chapter-${c.id}" ${q||level||ready||chapterId===c.id?'open':''}><summary><span class="chapter-number">${num(c.id)}</span><span><h3>${c.title}</h3><p>${c.description}</p></span><span class="chevron" aria-hidden="true">＋</span></summary><ul>${rows}</ul></details>`}).join('')||'<div class="empty">找不到符合的主題。試試「站位」「發球」或清除篩選。</div>';document.getElementById('result-count').textContent=`${count} 個主題符合條件 · 文章逐步更新，目前 ${articleRoutes.size} 篇可閱讀。`}
function pathPage(advanced){const ids=advanced?[5,6,7,8,9,10]:[1,2,3,4,5,6,7];return `<div class="page-head"><p class="eyebrow">READING ROUTE / ${advanced?'02':'01'}</p><h1 class="page-title">${advanced?'進階實戰':'新手入門'}</h1><p>${advanced?'從能回球，到做出更好的選擇。依序理解如何創造機會，並與搭檔合作。':'從場地與基本回合開始，逐步建立看懂比賽、準備擊球與雙打合作的基礎。'}</p></div><div class="notice">這是建議閱讀順序，無須一次讀完。各章文章陸續撰寫中；${advanced?'目前可先閱讀 <a href="#article-middle">中間球分工圖解</a>。':'第一站從 <a href="#article-rally">一個回合如何開始與結束？</a> 讀起。'}</div><ol class="reading-path">${ids.map((id,i)=>`<li><span class="chapter-number">${num(i+1)}</span><div><h3>${chapters[id-1].title}</h3><p>${id===3?'先讀準備姿勢、起始握法、握拍力道、擊球點、分腿墊步與擊球後恢復。':chapters[id-1].description}</p></div><a class="btn secondary" href="#catalog/${id}">查看章節 →</a></li>`).join('')}</ol>`}
function article(){return `<div class="article-layout"><aside class="sidebar" aria-label="文章導覽"><a href="#catalog/7">← 雙打站位與分工</a><strong>本篇目錄</strong><a href="#article-middle/core">核心觀念</a><a href="#article-middle/tactics">戰術板情境</a><a href="#article-middle/mistakes">常見誤解</a><a href="#article-middle/references">參考來源</a></aside><article class="article"><div class="breadcrumb">觀念筆記 / 第 07 章 / 雙打站位與分工</div><span class="eyebrow">POSITIONING & TEAMWORK</span><h1>雙打中間球<br>應該由誰接？</h1><div class="meta"><span class="tag">基礎觀念</span><span>雙打 · 圖解筆記</span><span>2026.11.02</span></div><div class="core" id="core">先看誰準備得更好、能更穩定地處理這顆球，再用簡短溝通確定分工。正拍可以是條件相近時的預設選擇。</div><p>中間球容易讓兩人同時出手，也容易讓兩人都等對方。與新搭檔上場前，先約定一般中間球的分工，以及「我來」「你接」的喊法，比臨時猜測更有幫助。</p><div class="notice">本篇討論一般回合中的戰術選擇；不適用於任意更換接發球者。圖中都是教學情境，不代表每一種來球都有相同答案。</div><h2>先觀察，再決定</h2><ul><li><strong>能不能穩定擊球：</strong>有人仍在移動、失去平衡，或必須跨過搭檔才能碰到球嗎？</li><li><strong>球實際來到哪裡：</strong>看來球方向、速度與擊球位置，不只看地上的中線。</li><li><strong>兩人是否理解分工：</strong>提早喊球，避免同時伸拍；球越快，事先約定越重要。</li></ul><h2 id="tactics">放進球場裡看</h2><p>同樣是中間球，改變準備狀態，選擇也可能不同。</p><div class="tactics"><div class="board-head"><span>TACTICAL BOARD / 07.03</span><span>俯視示意 · 非球速模擬</span></div><div class="scenario-tabs" aria-label="選擇情境"><button data-scenario="0" aria-pressed="true">情境一：兩人都站穩</button><button data-scenario="1" aria-pressed="false">情境二：A 還在回位</button></div><div id="board-content"></div><div class="legend">A、B：我方（淺綠） · C、D：對方（橘）<br>黃色實線 → 球路　白色虛線 → 球員移動</div><div class="controls"><button id="prev-step">← 上一步</button><span id="step-count" aria-live="polite"></span><button id="next-step">下一步 →</button></div></div><h2 id="mistakes">三個容易混淆的地方</h2><div class="misconception"><h3>「中間球永遠都是左邊的人接。」</h3><p>左側右撇子的正拍面向中間，常有處理優勢；但這不等於每顆球都值得跨區接。搭檔的慣用手、當下位置與準備狀態都要一起看。</p></div><div class="misconception"><h3>「喊了『我來』，就要勉強追到底。」</h3><p>喊球是協作，不是爭球。避免與搭檔相撞、伸拍互撞；若總在最後一刻改變決定，回合後應重新討論原本的分工。</p></div><div class="misconception"><h3>「沒有接球的人可以放鬆了。」</h3><p>搭檔擊球時仍要準備下一拍，觀察對手、調整位置。這顆球由一人處理，整個回合仍是兩人的合作。</p></div><h2>下次打球，可以先說好這兩句</h2><div class="notice">「一般中間球誰先處理？如果其中一人還沒站穩，怎麼喊？」<br>回合結束後再討論哪個判斷不一致，逐步建立默契。</div><h2 id="references">參考來源與閱讀範圍</h2><p>本篇綜合以下資料，另以自製示意情境呈現。戰術原則須依能力與來球調整。</p><ul class="sources"><li><a href="https://usapickleball.org/pickleball-skills/level-two/pickleball-fundamentals-every-player-should-master/">USA Pickleball — 7 Pickleball Fundamentals Every Player Should Master</a>：搭檔溝通與中間球喊球。</li><li><a href="https://www.pickletip.com/pickleball-middle-shot-strategy-guide/">PickleTip / Coach Sid Parfait — Who Takes the Middle in Pickleball Doubles?</a>：準備狀態、擊球位置與正拍分工的限制。</li></ul><p class="meta">查閱及更新日期：2026-11-02 · <a href="#sources">規則與編輯說明</a></p><div class="feature"><div><strong>繼續探索雙打合作</strong><p>補位、前後協調與慣用手組合：查看後續文章規劃。</p></div><a href="#catalog/7">返回本章 →</a></div></article></div>`}
function updateBoard(){document.getElementById('board-content').innerHTML=`<div class="tactics-body">${court(scenario,step)}<div class="step-copy" aria-live="polite"><p class="eyebrow">STEP ${num(step+1)}</p><h3>${scenarios[scenario][step][0]}</h3><p>${scenarios[scenario][step][1]}</p></div></div>`;document.getElementById('step-count').textContent=`${step+1} / 3`;document.getElementById('prev-step').disabled=step===0;document.getElementById('next-step').disabled=step===2;document.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.scenario)===scenario?'true':'false'))}
function glossary(){const terms=[['Dink','網前小球','通常在非截擊區線附近，以柔和球路讓球落入對方非截擊區。',4],['Drop','過渡球／放小球','從較後方打出較柔和的弧線，嘗試讓球落入對方非截擊區，爭取前進機會。',4],['Drive','抽球','較快速、較具穿透性的擊球；是否適合使用，仍取決於來球與站位。',4],['Volley','截擊','在球落地之前擊球。',4],['Reset','重置球／卸力球','在受壓迫時把球放柔，嘗試減少對手連續進攻的機會。',6],['Lob','挑高球','把球打高，嘗試越過對手或改變回合節奏。',4],['Poach','搶截','跨向搭檔原本負責的區域攔截來球，需要搭配溝通與補位。',10],['Stacking','疊位','透過起始站位與移動安排，讓搭檔盡量回到偏好的左右位置；仍須遵守發接球順序。',10]];return `<div class="page-head"><p class="eyebrow">QUICK REFERENCE</p><h1 class="page-title">中英文術語索引</h1><p>先理解意思，再進入相關章節。中文譯名可能因教練或地區而不同。</p></div><div class="glossary">${terms.map(([en,zh,desc,ch])=>`<section class="term"><h3>${en}<span>${zh}</span></h3><p>${desc}</p><a href="#catalog/${ch}">查看相關章節 →</a></section>`).join('')}</div>`}
function info(sources){return `<div class="prose"><div class="page-head"><p class="eyebrow">${sources?'SOURCES & UPDATES':'ABOUT THE NOTES'}</p><h1 class="page-title">${sources?'規則來源與更新說明':'讓每一拍，都多一點理解。'}</h1></div>${sources?`<p>本站以 <a href="https://usapickleball.org/rules/">USA Pickleball 官方規則入口</a>公布的 <strong>2026 年規則</strong>作為規則文章的編輯依據。實際參賽仍需確認所屬賽事採用的規則與計分制度。</p><h2>規則與戰術，分開說明</h2><p>規則回答「是否合法」；戰術回答「在這個情境下是否適合」。本版已完成的中間球文章屬於戰術觀念，不是裁判判決指南。</p><h2>內容狀態</h2><p>2026-11-02：建立完整 12 章目錄，擴充身體準備與網球對照，完成回合入門文章、中間球分工文章及兩組戰術板情境。其他文章標示為「撰寫中」，不提供空白文章連結。</p><h2>來源如何呈現</h2><p>文章末尾列出參考資料、查閱日期與更新日期。球場圖由本站製作，僅用於解釋指定情境；不表示球速、時間或球員能力的精確模擬。</p>`:`<p>匹克球觀念筆記是一個公開閱讀的知識網站。從場地、動作到雙打合作，除了「怎麼打」，也想把「為什麼」與「什麼時候」說清楚。</p><h2>怎麼使用這本筆記？</h2><p>第一次接觸，可以沿著<a href="#beginner">新手路線</a>找起點；有對打經驗，則從<a href="#advanced">進階路線</a>建立判斷。遇到特定問題，直接搜尋<a href="#catalog">所有主題</a>。</p><h2>常見問題</h2><details class="chapter"><summary><h3>需要登入或記錄學習進度嗎？</h3><span class="chevron">＋</span></summary><p style="padding:0 22px">不用。所有內容開放閱讀，沒有個人評分、登入或進度追蹤。</p></details><details class="chapter"><summary><h3>有網球經驗，應該先看哪裡？</h3><span class="chevron">＋</span></summary><p style="padding:0 22px">第 03 章規劃了握拍、揮拍、網前截擊、步法與發球的網球對照。<a href="#catalog/3">查看章節</a>。</p></details><details class="chapter"><summary><h3>為什麼有些題目不能點？</h3><span class="chevron">＋</span></summary><p style="padding:0 22px">這些是尚在撰寫的文章規劃。目前先提供完整知識地圖與已完成的文章，後續逐步擴充。</p></details><h2>關於內容</h2><p>以雙打實戰為主，單打獨立成章。基礎與進階標籤表示內容深度，並非對讀者能力的評分。</p><a href="#sources">查看規則來源與更新說明 →</a>`}</div>`}
const rallyFrames = [
  {
    title: '第一拍 · A 斜線發球',
    path: 'M180 482 L80 69',
    players: [[180, 491], [75, 467], [75, 33], [187, 170]],
    bounce: [80, 69, '1'],
    note: '近端的 A 從右側底線後發球，球越過網前的 Kitchen，落在遠端左側的對角發球區。① 是這個回合必須出現的第一次落地。'
  },
  {
    title: '第二拍 · C 等球彈起再接發',
    path: 'M80 67 L166 424',
    players: [[180, 486], [75, 467], [65, 49], [187, 170]],
    bounce: [166, 424, '2'],
    note: 'C 接起已經彈過的發球，將球回深。② 是接發球在 A、B 這側的落點。即使球飛得很慢，A 也要先等這次落地。'
  },
  {
    title: '第三拍 · A 在落地後回擊',
    path: 'M166 422 L177 215',
    players: [[177, 444], [75, 467], [83, 141], [187, 170]],
    note: 'A 讓接發球彈起才出手，這裡示範把球送向對方網前。球若還在空中，對手這時可以在 Kitchen 線外截擊，也可以等球彈起再打。'
  }
];

function rallyCourt(frame) {
  const players = frame.players.map(([x, y], i) => {
    const letter = 'ABCD'[i];
    return `<circle cx="${x}" cy="${y}" r="11" fill="${i < 2 ? '#e6edc3' : '#d59c75'}" stroke="#20382e"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" fill="#20382e" font-size="12" font-weight="700">${letter}</text>`;
  }).join('');
  const landing = frame.bounce ? `<circle cx="${frame.bounce[0]}" cy="${frame.bounce[1]}" r="10" fill="#ffe68b" stroke="#20382e"/>
    <text x="${frame.bounce[0]}" y="${frame.bounce[1] + 4}" text-anchor="middle" font-size="12" font-weight="700">${frame.bounce[2]}</text>` : '';
  return `<svg class="court" viewBox="0 0 260 522" role="img" aria-label="${frame.title}。${frame.note}">
    <defs><marker id="rally-arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0 0L5 2.5L0 5" fill="#ffe68b"/></marker></defs>
    <rect x="30" y="35" width="200" height="440" fill="#37644e"/>
    <rect x="30" y="185" width="200" height="140" fill="#819d7b"/>
    <g stroke="#f5f5df" stroke-width="2" fill="none"><rect x="30" y="35" width="200" height="440"/><path d="M30 185H230M30 325H230M130 35V185M130 325V475"/></g>
    <path d="M23 255H237" stroke="#20382e" stroke-width="5"/>
    <text x="130" y="249" text-anchor="middle" fill="#fff" font-size="10">球網</text>
    <text x="130" y="296" text-anchor="middle" fill="#fff" font-size="10">Kitchen</text>
    <path d="${frame.path}" stroke="#ffe68b" stroke-width="3" fill="none" marker-end="url(#rally-arrow)"/>
    ${players}${landing}
    <g text-anchor="middle" fill="#20382e" font-size="11"><text x="130" y="15">對方 C、D</text><text x="130" y="516">我方 A、B</text></g></svg>`;
}

function rallyBoard() {
  return `<h2>在球場上看前三拍</h2>
    <section class="tactics" aria-label="前三拍戰術板">
      <div class="board-head"><span>TACTICAL BOARD / 01.01</span><span>雙打 · 俯視圖</span></div>
      <div id="rally-frame" class="tactics-body"></div>
      <div class="legend">黃實線箭頭表示這一拍的球路；①、② 表示雙方必須等候的落地順序。球員位置是示例。</div>
      <div class="controls"><button type="button" id="rally-prev">← 上一拍</button><span id="rally-count"></span><button type="button" id="rally-next">下一拍 →</button></div>
    </section>`;
}

function mountRallyBoard() {
  let index = 0;
  const prev = document.getElementById('rally-prev');
  const next = document.getElementById('rally-next');
  function show() {
    const frame = rallyFrames[index];
    document.getElementById('rally-frame').innerHTML = rallyCourt(frame) +
      `<div class="step-copy" aria-live="polite"><h3>${frame.title}</h3><p>${frame.note}</p></div>`;
    document.getElementById('rally-count').textContent = `${index + 1} / ${rallyFrames.length}`;
    prev.disabled = index === 0;
    next.disabled = index === rallyFrames.length - 1;
  }
  prev.onclick = () => { if (index > 0) { index--; show(); } };
  next.onclick = () => { if (index + 1 < rallyFrames.length) { index++; show(); } };
  show();
}

function rallyArticle() {
  return `<article class="article prose">
    <p class="breadcrumb"><a href="#beginner">新手入門</a> / 第 01 章 / 認識場地與比賽</p>
    <h1>匹克球在打什麼？<br>一個回合如何開始與結束？</h1>
    <div class="meta"><span class="tag">基礎觀念</span><span>雙打 · 回合入門</span><time datetime="2026-11-03">2026.11.03</time></div>
    <p class="core">第一回看球，先看球在哪一邊彈地。接發球的人要等發球落地，發球方也要等接發球落地。看懂這兩次落地，就看懂了回合的開頭。</p>
    <p>想像你和搭檔站在球網同一側。你們要把球打過網，讓球落在對方場內，或讓對手在球落地前接打。每次對手把球打回來，你們都要在球第二次落地前回擊。</p>
    <h2>跟著一顆球看前三拍</h2>
    <ol>
      <li><strong>第一拍，你發球。</strong>你從右側發球，把球斜線送過網，落進對角的發球區。發球必須越過非截擊區（Kitchen），壓到 Kitchen 線也算發球失誤。</li>
      <li><strong>第二拍，對手接發球。</strong>指定接發球員等球彈起才回擊。搭檔可以站在網前，但接這顆發球的是指定接發球員。</li>
      <li><strong>第三拍，輪到你們。</strong>對手回了一顆高球，你很想直接揮拍。先讓它在你方場內彈一次，再由你或搭檔擊球。即使來球很高，這一拍仍要等它落地。</li>
    </ol>
    <div class="notice"><strong>兩次落地怎麼數？</strong>對方場內一次、你方場內一次。到第四拍，雙方都可以選擇落地後打，或在遵守 Kitchen 規則的前提下截擊。</div>
    ${rallyBoard()}
    <h2>回合在哪一刻結束？</h2>
    <p>假設第三拍之後，你們又來回幾次。最後你把球送到對方底線附近，球在界內彈了一下，對手沒趕上。球在那一側第二次落地時，這個回合就結束，你們贏了回合。若球第一次就落在底線外，結果正好相反。</p>
    <h2>贏了回合，比分會加一嗎？</h2>
    <p>看今天採用哪一種計分方式。以傳統發球得分制為例，比分 3 比 2、輪到你方發球，你方贏了這個回合，比分變成 4 比 2。如果當時是對方發球，你方即使贏了回合，比分仍是 3 比 2，接下來依雙打發球順序輪轉。</p>
    <details class="chapter"><summary>想一想：對手把發球回得又高又慢，你能直接截擊嗎？</summary><p style="padding:0 22px">這是第三拍。接發球雖然已在對方場內彈過，你們仍要讓回球在自己這側彈一次。等這次落地完成，後面的來球才有截擊的選擇。</p></details>
    <h2>規則來源與延伸閱讀</h2>
    <p>本文以一般成人雙打及 2026 年 USA Pickleball 規則為準。比分例子採傳統發球得分制。<a href="https://usapickleball.org/rules/summary/">官方規則摘要</a> · <a href="https://usapickleball.org/rules/">2026 官方規則手冊</a></p>
    <p><a href="#catalog/1">回到「認識場地與比賽」</a> · <a href="#article-middle">延伸閱讀：雙打中間球應該由誰接？</a></p>
  </article>`;
}

let lastPage='';
function render(){const [rawPage,anchor]=location.hash.slice(1).split('/');const page=rawPage||'home';if(page==='article-middle'&&lastPage===page){document.getElementById(anchor||'main')?.scrollIntoView();return}lastPage=page;main.innerHTML=page==='home'?home():page==='catalog'?`<div class="catalog-intro"><p class="eyebrow">THE COMPLETE FIELD GUIDE</p><h1>所有主題</h1><p>從場地規則到攻防判斷，展開章節找到你想理解的問題。</p></div>${catalogControls()}<div id="catalog-list" class="catalog"></div>`:page==='beginner'?pathPage(false):page==='advanced'?pathPage(true):page==='article-rally'?rallyArticle():page==='article-middle'?article():page==='glossary'?glossary():page==='about'||page==='sources'?info(page==='sources'):`<div class="page-head"><h1>找不到這個頁面</h1><a href="#home">返回首頁</a></div>`;document.title=({home:'匹克球觀念筆記',catalog:'所有主題',beginner:'新手入門',advanced:'進階實戰','article-rally':'一個回合如何開始與結束？','article-middle':'雙打中間球應該由誰接？',glossary:'術語索引',about:'關於本站',sources:'規則來源與更新說明'}[page]||'找不到頁面')+(page==='home'?'':'｜匹克球觀念筆記');if(document.getElementById('catalog-list')){renderCatalog();['search','level','availability'].forEach(id=>document.getElementById(id).addEventListener(id==='search'?'input':'change',renderCatalog))}if(page==='article-rally')mountRallyBoard();if(page==='article-middle'){scenario=0;step=0;updateBoard();document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{scenario=Number(b.dataset.scenario);step=0;updateBoard()}));document.getElementById('prev-step').onclick=()=>{step=Math.max(0,step-1);updateBoard()};document.getElementById('next-step').onclick=()=>{step=Math.min(2,step+1);updateBoard()}}window.scrollTo(0,0);if(page==='catalog'&&anchor)document.getElementById('chapter-'+Number(anchor))?.scrollIntoView();else if(page==='article-middle'&&anchor)document.getElementById(anchor)?.scrollIntoView();main.focus({preventScroll:true})}
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView()});
window.addEventListener('hashchange',render);render();
