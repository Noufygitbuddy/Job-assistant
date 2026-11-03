export const groups=[
 {id:'simulation',name:'Computational engineering',query:'"CFD Engineer" OR "Simulation Engineer" OR Berechnungsingenieur OR Simulationsingenieur',terms:['cfd','computational engineer','simulation engineer','berechnungsingenieur','simulationsingenieur','openfoam','starccm','ansys','aerodynamic']},
 {id:'engineering-ai',name:'AI for engineering',query:'"Scientific Machine Learning" OR "Surrogate Model" OR "Physics Informed" OR "Digital Twin"',terms:['surrogate model','scientific machine learning','physics-informed','physics informed','digital twin','thermal simulation','simulation optimization','simulation optimisation']},
 {id:'ml',name:'AI / ML engineering',query:'"AI Engineer" OR "Machine Learning Engineer" OR "Applied ML" OR "KI Entwickler"',terms:['ai engineer','machine learning engineer','applied ml','ki-entwickler','ki entwickler','pytorch','tensorflow']},
 {id:'llm',name:'LLM applications',query:'"LLM Engineer" OR "Generative AI" OR "Agentic AI" OR "AI Application Engineer"',terms:['llm','generative ai','agentic','langchain','langgraph','retrieval augmented','rag pipeline']},
 {id:'software',name:'Engineering software',query:'"Research Software Engineer" OR "Scientific Software" OR "Python Engineer" OR "Simulation Software"',terms:['research software','scientific software','python engineer','simulation software','scientific computing','python developer']},
 {id:'research',name:'Research & PhD',query:'"Doctoral Researcher" OR "PhD" OR "Wissenschaftlicher Mitarbeiter" OR Doktorand',terms:['doctoral','phd','ph.d','wissenschaftlicher mitarbeiter','wissenschaftliche mitarbeiterin','doktorand','promotionsstelle','research associate']}
];
export const countries=['Germany','Czechia','Netherlands','Switzerland','Austria','Belgium'];
export function matches(job,selected=groups.map(g=>g.id)){
 const title=job.title.toLowerCase(),text=(job.title+' '+job.description).toLowerCase();
 const technical=/engineer|entwickl|ingenieur|scientist|wissenschaft|research|doctoral|ph\.?d|doktorand|simulation|software|machine learning|computational|data science|ki-/i.test(title)&&!/sales|account executive|recruit|talent|finance|accountant|human resource|business partner|marketing|product manager|program manager/i.test(title);
 const hit=technical?groups.filter(g=>selected.includes(g.id)).map(g=>({...g,evidence:g.terms.filter(t=>new RegExp('(^|[^a-z])'+t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'([^a-z]|$)','i').test(g.id==='research'?title:text))})).filter(g=>g.evidence.length):[];
 const skills=['Python','OpenFOAM','PyTorch','TensorFlow','MATLAB','Simulink','LangGraph','LangChain','CFD','Docker','thermal simulation','surrogate model'].filter(t=>new RegExp('(^|[^a-z])'+t+'([^a-z]|$)','i').test(text));
 const senior=/\b(senior|lead|principal|head|director|staff|manager)\b/i.test(title);
 const research=/ph\.?d|doctoral|doktorand|wissenschaftlich|research associate/i.test(title);
 return {groups:hit.map(g=>g.name),evidence:[...new Set([...skills,...hit.flatMap(g=>g.evidence)])].slice(0,9),senior,research,score:hit.reduce((n,g)=>n+g.evidence.length*2,0)+skills.length-(senior?6:0)};
}
export function dedupe(jobs){const seen=new Set();return jobs.filter(j=>{let key;try{const u=new URL(j.url);u.hash='';for(const p of [...u.searchParams.keys()])if(/^utm_|^ref$/.test(p))u.searchParams.delete(p);key=u.href;}catch{key=j.source+':'+j.id;}if(seen.has(key))return false;seen.add(key);return true;});}
export function linkedin(group,country,minutes,mode,type){const u=new URL('https://www.linkedin.com/jobs/search/');u.searchParams.set('keywords',group.query+(type==='research'?' (PhD OR doctoral OR wissenschaftlich)':type==='industry'&&group.id==='research'?' research':''));u.searchParams.set('location',country);u.searchParams.set('sortBy','DD');if(minutes>0)u.searchParams.set('f_TPR','r'+Math.round(minutes*60));if(mode==='remote')u.searchParams.set('f_WT','2');if(mode==='hybrid')u.searchParams.set('f_WT','3');if(mode==='onsite')u.searchParams.set('f_WT','1');return u.href;}
export function withinTime(iso,minutes,now=Date.now()){const age=now-Date.parse(iso);return Number.isFinite(age)&&age>=0&&(minutes===0||age<=minutes*60000);}
