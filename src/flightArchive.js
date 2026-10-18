import { useEffect, useRef, useState } from 'react';
export const ARCHIVE_KEY='curvature.flight-archive.v1';
export function readArchive(storage=localStorage){try{const value=JSON.parse(storage.getItem(ARCHIVE_KEY)||'[]');return Array.isArray(value)?value.filter(r=>r&&typeof r.id==='string'&&Array.isArray(r.events)).slice(0,30):[]}catch{return []}}
export function combineArchives(a,b){const map=new Map();for(const r of [...a,...b]){const old=map.get(r.id);if(!old||String(r.updated)>=String(old.updated))map.set(r.id,r)}return [...map.values()].sort((x,y)=>String(y.started).localeCompare(String(x.started))).slice(0,30)}
export function mergeFlight(records,s,now=new Date().toISOString()){
 if(!s.sortieId||!['Play','Win','Dead'].includes(s.phase))return records;
 const old=records.find(r=>r.id===s.sortieId);
 const row={id:s.sortieId,started:old?.started||now,updated:now,stage:s.stage,stageName:s.stageName,difficulty:s.difficulty,status:s.phase==='Win'?'完成':s.phase==='Dead'?'失联':'进行中',score:s.sortieScore??s.score??0,kills:s.sortieKills??s.kills??0,recoveries:s.sortieRecoveries??s.recoveries??0,time:s.time,comboPeak:s.comboPeak||0,build:s.build||[],events:s.journal||[]};
 if(old&&old.time===row.time&&old.score===row.score&&old.status===row.status&&old.events.length===row.events.length)return records;
 return [row,...records.filter(r=>r.id!==row.id)].slice(0,30);
}
export function useFlightArchive(state){
 const [records,setRecords]=useState(()=>readArchive());
 const [storageError,setStorageError]=useState(false);const latest=useRef(records),lastFlush=useRef(0),activeId=useRef(null);
 const save=()=>{try{latest.current=combineArchives(readArchive(),latest.current);localStorage.setItem(ARCHIVE_KEY,JSON.stringify(latest.current));setStorageError(false)}catch{setStorageError(true)}};
 useEffect(()=>{const merged=mergeFlight(latest.current,state);if(merged!==latest.current){activeId.current=state.sortieId;latest.current=merged;setRecords(merged);if(Date.now()-lastFlush.current>1500||['Win','Dead'].includes(state.phase)){save();lastFlush.current=Date.now();}}else if(['Title','Select'].includes(state.phase)&&activeId.current){const open=latest.current.find(r=>r.id===activeId.current&&r.status==='进行中');activeId.current=null;if(open){latest.current=latest.current.map(r=>r.id===open.id?{...r,status:'退出'}:r);setRecords(latest.current);save();}}},[state]);
 useEffect(()=>{const flush=()=>{try{localStorage.setItem(ARCHIVE_KEY,JSON.stringify(combineArchives(readArchive(),latest.current)))}catch{}};window.addEventListener('pagehide',flush);const hidden=()=>{if(document.hidden)flush()};document.addEventListener('visibilitychange',hidden);return()=>{flush();window.removeEventListener('pagehide',flush);document.removeEventListener('visibilitychange',hidden)}},[]);
 return {records,storageError};
}
