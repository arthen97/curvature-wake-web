import assert from 'node:assert/strict';
import {mergeFlight,readArchive,combineArchives} from '../src/flightArchive.js';
assert.deepEqual(readArchive({getItem:()=>'{bad'}),[]);
assert.deepEqual(readArchive({getItem:()=>{throw Error('denied')}}),[]);
const state={sortieId:'a',phase:'Play',stage:0,stageName:'恒纪元',difficulty:1,score:900,sortieScore:90,sortieKills:3,time:10,journal:[{sequence:1,time:0,kind:'start',label:'恒纪元'},{sequence:2,time:9,kind:'skill',label:'护盾'}]};
let records=mergeFlight([],state,'2026-10-18T00:00:00Z');
records=mergeFlight(records,{...state,time:11},'2026-10-18T00:00:01Z');assert.equal(records.length,1);assert.equal(records[0].events.length,2);assert.equal(records[0].score,90);assert.equal(records[0].started,'2026-10-18T00:00:00Z');
records=mergeFlight(records,{...state,phase:'Win',time:132});assert.equal(records[0].status,'完成');assert.deepEqual(readArchive({getItem:()=>JSON.stringify(records)}),records);
for(let i=0;i<40;i++)records=mergeFlight(records,{...state,sortieId:'flight-'+i});assert.equal(records.length,30);assert.equal(records[0].id,'flight-39');
assert.equal(mergeFlight(records,{...state,phase:'Title'}),records);
console.log('PASS archive: corrupt/blocked storage, cumulative snapshots, chapter score delta, completion, persistence, 30-run retention');

const saved={id:"saved",started:"2026-10-18T01:00:00Z",updated:"2026-10-18T01:04:00Z",status:"完成",events:[]};const live={id:"live",started:"2026-10-18T02:00:00Z",updated:"2026-10-18T02:00:30Z",status:"进行中",events:[]};assert.equal(combineArchives([saved],[live]).length,2);assert.equal(combineArchives([saved],[{...saved,updated:"2026-10-18T01:01:00Z",status:"进行中"}])[0].status,"完成");console.log("PASS cross-tab archive merge retains other sorties and newest snapshots");
