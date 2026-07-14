export const statusOrder=['proposed','introduced','approved','enacted','funded','implemented','suspended','repealed','expired','unclear'];
export function sourceScore(source){
 const type={legislation:30,budget:28,audit:26,agency:22,academic:20,news:12,comment:5}[source.type]||5;
 const direct=source.direct?25:8, current=source.year>=2024?20:10, accessible=source.locator?15:5, independent=source.independent?10:3;
 const score=Math.min(100,type+direct+current+accessible+independent);
 return {score,grade:score>=85?'A':score>=70?'B':score>=50?'C':'D',reasons:[`${source.type} source`,source.direct?'direct evidence':'contextual evidence',source.locator?'precise locator':'no precise locator',source.independent?'independent publisher':'interested publisher']};
}
export function linkClaims(claims,sources){return claims.map(c=>{const evidence=sources.filter(s=>(c.sourceIds||[]).includes(s.id));const support=evidence.length===0?'unsupported':evidence.some(e=>e.contradicts)?'contradicted':evidence.every(e=>sourceScore(e).score>=70)?'supported':'partially_supported';return {...c,evidence,support}})}
export function findContradictions(claims){const groups=new Map();for(const c of claims){if(!c.metric)continue;const key=`${c.jurisdiction}|${c.subject}|${c.metric}`;groups.set(key,[...(groups.get(key)||[]),c])}return [...groups.values()].flatMap(g=>{const values=new Set(g.map(x=>String(x.value)));return values.size>1?[{subject:g[0].subject,jurisdiction:g[0].jurisdiction,claims:g,summary:`Sources report ${[...values].join(' versus ')}; the discrepancy is unresolved.`}]:[]})}
export function coverage(claims,jurisdictions,dimensions){const linked=linkClaims(claims,fixtures.sources);const cells=jurisdictions.flatMap(j=>dimensions.map(d=>({jurisdiction:j,dimension:d,covered:linked.some(c=>c.jurisdiction===j&&c.dimension===d&&c.support!=='unsupported')})));return {cells,percent:Math.round(100*cells.filter(x=>x.covered).length/cells.length),gaps:cells.filter(x=>!x.covered)} }
export const fixtures={
 sources:[
  {id:'sf-ord',title:'Affordable Housing Production Ordinance',publisher:'SF Board of Supervisors',type:'legislation',year:2024,direct:true,independent:false,locator:'§3, p. 14',primary:true},
  {id:'sf-budget',title:'FY 2024–25 Housing Budget',publisher:'City of San Francisco',type:'budget',year:2024,direct:true,independent:false,locator:'p. 73',primary:true},
  {id:'sj-plan',title:'Housing Element Annual Progress Report',publisher:'San José Housing Department',type:'agency',year:2025,direct:true,independent:false,locator:'Table 4',primary:true},
  {id:'oak-budget',title:'Measure U Allocation Schedule',publisher:'City of Oakland',type:'budget',year:2024,direct:true,independent:false,locator:'p. 22',primary:true},
  {id:'oak-audit',title:'Affordable Housing Program Audit',publisher:'Oakland City Auditor',type:'audit',year:2025,direct:true,independent:true,locator:'Finding 2, p. 19',primary:true},
  {id:'oak-release',title:'Housing Program Milestone',publisher:'Mayor’s Office',type:'agency',year:2025,direct:false,independent:false,locator:'para. 6',primary:true}
 ],
 claims:[
  {id:'c1',jurisdiction:'San Francisco',subject:'Housing production ordinance',dimension:'status',value:'Enacted',status:'enacted',date:'2024-06-18',text:'The city enacted streamlined approval rules in June 2024.',sourceIds:['sf-ord']},
  {id:'c2',jurisdiction:'San Francisco',subject:'Housing production ordinance',dimension:'funding',value:'$42M',status:'funded',date:'2024-07-01',text:'The adopted budget allocates $42 million for implementation.',sourceIds:['sf-budget']},
  {id:'c3',jurisdiction:'San José',subject:'Housing Element program',dimension:'status',value:'Implemented',status:'implemented',date:'2025-03-31',text:'San José reports implementation across 11 program actions.',sourceIds:['sj-plan']},
  {id:'c4',jurisdiction:'San José',subject:'Housing Element program',dimension:'outcomes',value:'1,240 units',status:'implemented',date:'2025-03-31',text:'The annual report records 1,240 permitted affordable units.',sourceIds:['sj-plan']},
  {id:'c5',jurisdiction:'Oakland',subject:'Measure U housing fund',metric:'people served',dimension:'funding',value:'$25M',status:'funded',date:'2024-07-01',text:'Oakland allocated $25 million to the housing fund.',sourceIds:['oak-budget']},
  {id:'c6',jurisdiction:'Oakland',subject:'Housing stabilization program',metric:'participants',dimension:'outcomes',value:'4,500',status:'implemented',date:'2025-02-01',text:'The mayor’s office reported 4,500 participants.',sourceIds:['oak-release']},
  {id:'c7',jurisdiction:'Oakland',subject:'Housing stabilization program',metric:'participants',dimension:'outcomes',value:'2,900',status:'implemented',date:'2025-04-10',text:'The city audit verified 2,900 participants.',sourceIds:['oak-audit']}
 ]
};
