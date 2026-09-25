const $=x=>document.getElementById(x);
let running=false,ctrl=null,history=JSON.parse(localStorage.getItem("speedtest_history")||"[]");
const downUrl="https://speed.cloudflare.com/__down?bytes=25000000&";
const upUrl="https://speed.cloudflare.com/__up";
function conn(){const c=navigator.connection||navigator.mozConnection||navigator.webkitConnection;return c?(c.effectiveType||"online")+" "+(c.downlink?c.downlink+"Mbps":""):"online"}
$("conn").textContent=conn(); $("ip").textContent="Checking…";
fetch("https://api.ipify.org?format=json").then(r=>r.json()).then(x=>$("ip").textContent=x.ip).catch(()=>$("ip").textContent="Unavailable");
function needle(v){let deg=-110+Math.min(220,Math.max(0,v/100*220));$("gauge").querySelector(".needle").style.transform=`rotate(${deg}deg)`}
function save(d){history.unshift({time:new Date().toLocaleString("id-ID"),...d});history=history.slice(0,8);localStorage.setItem("speedtest_history",JSON.stringify(history));render()}
function render(){const box=$("historyList");if(!history.length){box.innerHTML='<p class="empty">Belum ada hasil.</p>';return}box.innerHTML=history.map(x=>`<div class="historyRow"><span>${x.time}</span><span>↓ <b>${x.dl}</b> Mbps</span><span>↑ <b>${x.ul}</b> Mbps</span><span>Ping ${x.ping} ms</span><span>Jitter ${x.jit} ms</span></div>`).join("")}
async function ping(){let a=[];for(let i=0;i<6;i++){let t=performance.now();try{await fetch("https://speed.cloudflare.com/__down?bytes=0&x="+Math.random(),{cache:"no-store"});a.push(performance.now()-t)}catch{}}let avg=a.reduce((x,y)=>x+y,0)/(a.length||1),jit=a.slice(1).reduce((x,y,i)=>x+Math.abs(y-a[i]),0)/(Math.max(1,a.length-1));return [avg,jit]}
async function transfer(type,seconds){
 ctrl=new AbortController();let start=performance.now(),bytes=0,last=start,lastBytes=0;
 const timeout=setTimeout(()=>ctrl.abort(),seconds*1000);
 try{while(performance.now()-start<seconds*1000){
   if(type==="dl"){let r=await fetch(downUrl+Math.random(),{cache:"no-store",signal:ctrl.signal});if(r.body){let rd=r.body.getReader();while(1){let q=await rd.read();if(q.done)break;bytes+=q.value.byteLength}}}
   else{let data=new Uint8Array(2*1024*1024);await fetch(upUrl,{method:"POST",body:data,cache:"no-store",signal:ctrl.signal});bytes+=data.length}
   let now=performance.now();if(now-last>200){let mb=(bytes*8/(now-start))/1000;$("mainSpeed").textContent=mb.toFixed(1);needle(mb);last=now;lastBytes=bytes}
 }}catch{}clearTimeout(timeout);return bytes*8/((performance.now()-start)/1000)/1e6}
async function run(){if(running)return;running=true;$("start").classList.add("hidden");$("stop").classList.remove("hidden");$("result").textContent="Testing…";
 try{$("mode").textContent="DOWNLOAD";let dl=await transfer("dl",7);$("down").textContent=dl.toFixed(1);
   $("mode").textContent="UPLOAD";let ul=await transfer("up",7);$("up").textContent=ul.toFixed(1);
   $("mode").textContent="PING";let [p,j]=await ping();$("ping").textContent=p.toFixed(0);$("jitter").textContent=j.toFixed(1);
   $("mainSpeed").textContent=dl.toFixed(1);needle(dl);$("mode").textContent="DONE";$("result").textContent="Complete";save({dl:dl.toFixed(1),ul:ul.toFixed(1),ping:p.toFixed(0),jit:j.toFixed(1)});
 }finally{running=false;ctrl=null;$("start").classList.remove("hidden");$("stop").classList.add("hidden")}}
$("start").onclick=run;$("stop").onclick=()=>ctrl?.abort();$("clear").onclick=()=>{history=[];localStorage.removeItem("speedtest_history");render()};render();