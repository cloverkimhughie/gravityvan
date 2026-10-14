const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements=new Map();function element(id){if(!elements.has(id))elements.set(id,{textContent:'',hidden:false,dataset:{},classList:{toggle(){}},replaceChildren(){},append(){},setAttribute(){},click(){this.onclick?.()},getContext(){return {} }});return elements.get(id)}
const storage={};const context=vm.createContext({console,document:{getElementById:element,querySelectorAll:()=>[],createElement:()=>element(Math.random()),addEventListener(){}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},requestAnimationFrame(){}});
const html=fs.readFileSync(__dirname+'/index.html','utf8');const code=html.match(/<script>([\s\S]*?)<\/script>/)[1];vm.runInContext(code,context);
vm.runInContext(`
function check(ok,msg){if(!ok)throw Error(msg)}
for(let i=0;i<8;i++){
 load(i); const path=level.solution;
 for(const d of path){choose(d);for(let tick=0;tick<1400&&mode==='play';tick++)step(1/120)}
 check(mode==='modal','Level '+i+' did not finish');check(mask===fullMask(),'Keys missing');check(saved.best[i]!==undefined,'Win not saved');
 console.log('PASS floor',i+1,'solution',path.map(d=>ARROWS[d]).join(' '));
}
load(0);check(mask===0&&moves===0&&!segment,'Reset state');pause();const before=elapsed;step(.5);check(elapsed===before,'Pause advancing');pause();check(mode==='play','Resume');
load(2);let hazard;for(let y=0;y<10;y++)for(let x=0;x<16;x++)if(level.grid[y][x]==='!')hazard={x,y};player=hazard;arrived();check(mode==='modal','Hazard not lethal');
load(0);const hintPath=solveFrom(player.x,player.y,mask);check(hintPath?.length>0,'No hint');choose(3);step(.02);choose(2);for(let j=0;j<100;j++)step(1/120);check(Number.isFinite(player.x)&&Number.isFinite(player.y),'Midair invalid');
console.log('PASS reset, pause/resume, hazards, hints, midair turn and save');
`,context);
assert(JSON.parse(storage['gravityvan-v1']).unlocked===7);
