import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import DecryptedText from './components/DecryptedText';
import CountUp from './components/CountUp';
import ClickSpark from './components/ClickSpark';
import './style.css';

const missions=[
 {name:'恒纪元',en:'STABLE ORBIT',time:'02:12',desc:'一颗太阳，一条航迹。古筝走廊、补给截获与引力弹弓交替出现。每 25 秒制定新计划。',tag:'轨道突破',n:'01'},
 {name:'乱纪元',en:'CHAOTIC SUNS',time:'02:24',desc:'三日凌空，引力偏移。将引力井与光矛组合，利用风险补给滚起优势。',tag:'引力异常',n:'02'},
 {name:'水滴',en:'THE DROPLET',time:'02:00+',desc:'在两分钟演算中建立构筑，保留谋略，在水滴到来时发出最后的广播。',tag:'强敌接触',n:'03'}
];
const zero={phase:'Title',ready:false,progress:0,selected:0,difficulty:1,hull:6,maxHull:8,power:1,score:0,kills:0,time:0,duration:132,bombs:2,sophons:1,dashes:2,wave:0,waves:23};
const clock=t=>`${Math.floor(t/60).toString().padStart(2,'0')}:${Math.floor(t%60).toString().padStart(2,'0')}`;
function Mark(){return <svg viewBox="0 0 50 40" aria-hidden="true"><path d="M2 36 18 4h11L13 36zm19 0L37 4h11L32 36z" fill="currentColor"/></svg>}
function App(){
 const canvas=useRef(null),engine=useRef(null),stateRef=useRef(zero);
 const [s,setS]=useState(zero),[load,setLoad]=useState(0),[error,setError]=useState(''),[muted,setMuted]=useState(false),[help,setHelp]=useState(false);
 const [reduce]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const menu=['Title','Select'].includes(s.phase),end=['Win','Dead'].includes(s.phase),mission=missions[menu?s.selected:s.stage||0];
 useEffect(()=>{
   const listener=e=>{stateRef.current=e.detail;setS(e.detail)};window.addEventListener('curvature:state',listener);
   const script=document.createElement('script');script.src='./unity/Build/unity.loader.js';
   script.onload=()=>window.createUnityInstance(canvas.current,{dataUrl:'./unity/Build/unity.data.unityweb',frameworkUrl:'./unity/Build/unity.framework.js.unityweb',codeUrl:'./unity/Build/unity.wasm.unityweb',streamingAssetsUrl:'./unity/StreamingAssets',companyName:'Curvature',productName:'Curvature Wake',productVersion:'3.0.0',autoSyncPersistentDataPath:true,matchWebGLToCanvasSize:true,devicePixelRatio:Math.min(devicePixelRatio,1.5)},setLoad).then(instance=>{engine.current=instance;}).catch(e=>setError(String(e)));
   script.onerror=()=>setError('引擎下载失败，请检查网络后重试。');document.body.appendChild(script);
   const hidden=()=>{if(document.hidden && ['Play','Enter'].includes(stateRef.current.phase)&&!stateRef.current.paused)engine.current?.SendMessage('Game','WebCommand','pause')};document.addEventListener('visibilitychange',hidden);
   return()=>{window.removeEventListener('curvature:state',listener);document.removeEventListener('visibilitychange',hidden);engine.current?.Quit();script.remove()};
 },[]);
 const command=c=>{engine.current?.SendMessage('Game','WebCommand',c);if(!c.startsWith('stage:')&&!c.startsWith('rank:'))requestAnimationFrame(()=>canvas.current?.focus())};
 useEffect(()=>{if(s.ready)engine.current?.SendMessage('Game','SetMuted',muted?'1':'0')},[s.ready,muted]);
 const toggleMute=()=>{const next=!muted;setMuted(next);engine.current?.SendMessage('Game','SetMuted',next?'1':'0')};
 const full=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen?.().catch(()=>{})};
 const progress=Math.round(load*.82*100+(s.progress||0)*18);
 return <main className={menu?'app in-hangar':'app in-flight'}>
   <div className="unity-stage"><canvas id="unity-canvas" ref={canvas} tabIndex="0" aria-label="Unity 面壁者战场，WASD 移动，J K L Q E R F 和空格使用技能，1 2 3 选择计划，Escape 暂停"/></div>
   {menu&&<section className="hangar" aria-label="任务机库">
    <div className="hero-art"/><div className="grain"/>
    <header className="masthead"><div className="brand"><Mark/><span>CURVATURE<br/>FLIGHT SYSTEMS</span></div><span className="edition">面壁者演算 <i/> LUO JI / 03</span><div className="header-actions"><button onClick={()=>setHelp(true)}>操作手册 ↗</button><button onClick={toggleMute} aria-label={muted?'开启声音':'静音'}>{muted?'声音 OFF':'声音 ON'}</button><button onClick={full} aria-label="切换全屏">⛶</button></div></header>
    <div className="hero-coordinate">NATURAL SELECTION / 047<br/><span>31° 14′ N — 121° 28′ E</span></div>
    <div className="hangar-content"><div className="overline"><i/> 罗辑视角 · 面壁者作战演算</div><h1>曲率航迹<span>CURVATURE<br/>WAKE<span className="asterisk">✳</span></span></h1><p className="tagline">我是罗辑。<br/><em>这是计划的一部分。</em></p>
     <ClickSpark sparkColor="#c8ff18" sparkCount={reduce?0:8} sparkRadius={28}><div className="mission-panel"><div className="panel-caption"><span>选择航道 / SELECT SECTOR</span><span>03 ROUTES</span></div>
      <div className="mission-tabs" role="group" aria-label="选择航道">{missions.map((m,i)=><button key={m.n} disabled={!s.ready} aria-pressed={s.selected===i} className={s.selected===i?'selected':''} onClick={()=>command('stage:'+i)}><small>{m.n}</small>{m.name}<span>↗</span></button>)}</div>
      <div className="mission-brief"><div><span className="mission-tag">{mission.tag}</span><span className="duration">◷ {mission.time}</span></div><p>{mission.desc}</p></div>
      <div className="rank-row"><span>作战强度</span><div role="group" aria-label="作战强度">{['巡航','标准','极限'].map((r,i)=><button key={r} disabled={!s.ready} aria-pressed={s.difficulty===i} className={s.difficulty===i?'active':''} onClick={()=>command('rank:'+i)}>{r}</button>)}</div></div>
      <button className="launch" disabled={!s.ready||!!error} onClick={()=>command('start')}><span>{s.ready?'启动航迹':'系统同步中'}<small>{s.ready?'INITIATE FLIGHT':`${progress}% / LOADING FLIGHT SYSTEMS`}</small></span><span className="launch-arrow">↗</span></button>
      {!s.ready&&<div className="load-line"><i style={{width:progress+'%'}}/></div>}
     </div></ClickSpark>
    </div>
    <div className="art-label wallfacer-id"><img src="./art/wallfacer.png" alt="罗辑的原创同人形象"/><div>面壁者 04<b>罗辑 / LUO JI</b><small>我的计划，不必解释。</small></div><div className="barcode"/></div>
    <footer className="hangar-footer"><span>三体主题同人演算 · 非原著剧情复现</span><span>WASD 移动 <b>／</b> 自动射击 <b>／</b> 8 项能力 · 局内构筑</span><span>BUILD 03.0</span></footer>
   </section>}
   {!menu&&<div className={'hud '+(s.hull<=2?'critical':'')}>
    <header className="flight-top"><div className="flight-id"><Mark/><div><small>SECTOR {mission.n} / {mission.en}</small><strong>{mission.name}</strong></div></div><div className="flight-clock"><small>{s.bossMax>0?'强敌交战 / CONTACT':'航道进程 / FLIGHT TIME'}</small><strong>{clock(s.time)}<span> / {clock(s.duration)}{s.stage===2?'+':''}</span></strong><div className="timeline"><i style={{width:Math.min(100,s.time/s.duration*100)+'%'}}/></div></div><div className="score-block"><small>SCORE</small><strong>{String(s.score).padStart(6,'0')}</strong><span>击破 {String(s.kills).padStart(3,'0')} · 波次 {s.wave}/{s.waves}</span></div><button className="pause-button" onClick={()=>command('pause')} aria-label="暂停游戏">Ⅱ</button></header>
    <div className="combat-status"><span className={s.chaos?'danger':''}><i/>{s.chaos?'引力异常 / CAUTION':s.time<120?'重构链路在线 / RECOVERY ONLINE':'重构链路关闭 / FINAL APPROACH'}</span>{s.bossMax>0&&<div className="boss"><div><b>水滴 / DROPLET</b><span>{Math.ceil(s.bossHp)} / {Math.ceil(s.bossMax)}</span></div><div className="boss-track"><i style={{width:s.bossHp/s.bossMax*100+'%'}}/></div></div>}</div>
    <aside className="encounter"><span>正在执行 / LIVE EVENT</span><b>{s.eventName}</b><p>{s.eventHint}</p></aside>
    <div className="aim-decoration left">＋<span>FLIGHT<br/>VECTOR</span></div><div className="aim-decoration right">＋<span>NS—047<br/>LINKED</span></div>
    {s.comms&&<aside className="pilot-comms"><img className="pilot-monogram" src="./art/wallfacer.png" alt="罗辑的原创同人形象"/><div><small>我 / 罗辑 <i>面壁者私人频道</i></small><p>{s.comms}</p></div></aside>}
    <section className="doctrine-hud" aria-label="面壁者战术"><div className="resolve"><small>谋略 / RESOLVE</small><b>{Math.floor(s.resolve||0)}<span> / 100</span></b><i style={{width:(s.resolve||0)+'%'}}/><em>{s.combo>1?`连击 ×${s.combo}`:'擦弹与击破蓄能'}</em></div><div className="new-tactics">{(s.abilities||[]).map(a=><button key={a.command} disabled={s.paused||s.choosing||s.phase!=='Play'||a.cooldown>0||(s.resolve||0)<a.cost} className={a.active>0?'doctrine-skill active':'doctrine-skill'} onClick={()=>command(a.command)} title={`${a.name} · 消耗 ${a.cost} 谋略`}><kbd>{a.key==='SPACE'?'空格':a.key}</kbd><b>{a.name}</b><small>{a.cooldown>0?`${a.cooldown.toFixed(1)}s`:a.active>0?'执行中':`${a.cost} 谋略`}</small></button>)}</div></section>
    {s.notice&&<div className="notice" role="status">{s.notice}</div>}
    <footer className="flight-bottom"><div className="hull-block"><div><small>装甲完整度 / HULL</small><strong>{String(s.hull).padStart(2,'0')}<span> / 08</span></strong></div><div className="hull-bars">{Array.from({length:8},(_,i)=><i key={i} className={i<s.hull?'filled':''}/>)}</div><small>主炮等级 <b>0{s.power}</b><span>自动射击 ACTIVE</span></small></div>
     <div className="tactics">{[{key:'J',name:'智子场',en:'SOPHON',stock:s.sophons,active:s.sophon>0,cmd:'sophon'},{key:'K',name:'二向箔',en:'FOIL',stock:s.bombs,cmd:'foil'},{key:'L',name:'曲率跃迁',en:'DASH',stock:s.dashes,active:s.dash>0,cmd:'dash'}].map(a=><button key={a.key} className={a.active?'skill active':'skill'} disabled={s.paused||s.choosing||!a.stock||s.phase!=='Play'} onClick={()=>command(a.cmd)}><kbd>{a.key}</kbd><span><b>{a.name}</b><small>{a.en}</small></span><strong>{String(a.stock).padStart(2,'0')}</strong></button>)}</div><div className="flight-controls"><button onClick={toggleMute}>{muted?'声音 OFF':'声音 ON'}</button><button onClick={full}>全屏 ⛶</button><span>WASD / 拖动移动</span></div></footer>
   </div>}
   {s.phase==='Enter'&&<div className="entry"><span>SECTOR {mission.n}</span><h2>{reduce?mission.en:<DecryptedText text={mission.en} animateOn="view" sequential speed={35}/>}</h2><p>正在切入航道</p></div>}
   {s.choosing&&<div className="modal-backdrop doctrine-backdrop"><section className="doctrine-choice"><div className="overline">WALLFACER / PLAN {String(s.draftRound).padStart(2,'0')}</div><h2>我的计划，不必解释。</h2><p>演算已暂停。选择一项升级，把这一局变成你的打法。</p><div className="choice-grid">{(s.choices||[]).map((c,i)=><button key={c.id} onClick={()=>command('pick:'+i)}><div className="choice-top"><kbd>{i+1}</kbd><small>{c.tag}</small></div><div className="choice-symbol">{['↗','◎','⟁'][i]}</div><h3>{c.title}</h3><p>{c.detail}</p><span>纳入计划 <b>等级 {c.rank+1} / 3 ↗</b></span></button>)}</div><div className="build-strip"><small>当前构筑</small>{(s.build||[]).length?(s.build||[]).map(c=><span key={c.id}>{c.title} ×{c.rank}</span>):<span>尚未制定计划 · 第一次选择决定方向</span>}</div></section></div>}
   {(end||s.paused)&&!s.choosing&&<div className="modal-backdrop"><section className="debrief"><div className="overline">{s.paused?'FLIGHT SUSPENDED':s.phase==='Win'?'MISSION COMPLETE':'SIGNAL LOST'}</div><h2>{s.paused?'航迹暂停':s.phase==='Win'?'航道已清除':'坐标暴露'}</h2><p>{s.paused?'深呼吸。下一条弹道，已经在路上。':s.phase==='Win'?'我让计划穿过了黑暗。下一次，他们会学会猜疑。':'这是计划的一部分。失败这部分，我准备重写。'}</p>{!s.paused&&<div className="result-grid"><div><small>作战得分</small><b>{reduce?s.score:<CountUp to={s.score} duration={1.2} separator=","/>}</b></div><div><small>航行时长</small><b>{clock(s.time)}</b></div><div><small>击破 / 最高连击 ×{s.comboPeak||0}</small><b>{s.kills}<small>重构 {s.recoveries||0} 次</small></b></div></div>}<button className="launch" onClick={()=>command(s.paused?'pause':s.phase==='Win'&&s.stage<2?'next':'start')}><span>{s.paused?'继续航行':s.phase==='Win'&&s.stage<2?'继续我的计划':'再做一次演算'}</span><span>↗</span></button><button className="return" onClick={()=>command('menu')}>返回机库 ←</button></section></div>}
   {help&&<div className="modal-backdrop"><section className="debrief"><div className="overline">PILOT FIELD MANUAL / 01</div><h2>飞行协议</h2><div className="help-grid"><p><kbd>W A S D</kbd><span>或方向键移动；也可按住鼠标拖动。</span></p><p><kbd>AUTO</kbd><span>主炮自动开火。靠近补给可吸附拾取。</span></p><p><kbd>J</kbd><span>智子场：4 秒内减速弹幕，扰乱瞄准。</span></p><p><kbd>K</kbd><span>二向箔：清除弹幕并对敌人造成伤害。</span></p><p><kbd>L</kbd><span>曲率跃迁：沿移动方向冲刺并短暂无敌。</span></p><p><kbd>Q / E</kbd><span>面壁护盾：短暂无敌。思想钢印：部署诱饵，转移敌人瞄准。</span></p><p><kbd>R / F</kbd><span>猜疑引力井：吸引并减速弹幕。咒语光矛：持续贯穿前方敌人。</span></p><p><kbd>空格</kbd><span>黑暗森林广播：消耗 100 谋略，清屏并重创敌人。擦弹、击破、补给会恢复谋略。</span></p><p><kbd>1 / 2 / 3</kbd><span>计划选择时按数字键或点卡片。不同升级可联动，最多叠加三层。</span></p><p><kbd>ESC</kbd><span>暂停。每 22 秒恢复跃迁，每 40 秒补充智子并修复装甲。前 120 秒损毁会应急重构，得分 −20%、火力 −1。</span></p></div><button className="launch" onClick={()=>setHelp(false)}>已读取，返回机库 ↗</button></section></div>}
   {(error||s.error)&&<div className="fatal" role="alert"><h2>信号中断</h2><p>{error||s.error}</p><button onClick={()=>location.reload()}>重新连接</button></div>}
   <div className="rotate-message">请使用横屏与键盘鼠标，以获得完整飞行体验。</div>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
