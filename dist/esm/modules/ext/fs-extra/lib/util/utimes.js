import{__exports as i}from"../../../../_virtual/index2.js";import"../../../universalify/index.js";import{__exports as t}from"../../../../_virtual/index.js";import"../fs/index.js";const s=t;var n={utimesMillis:(0,i.fromPromise)((async function(i,t,n){const r=await s.open(i,"r+");let o=null;try{await s.futimes(r,t,n)}finally{try{await s.close(r)}catch(i){o=i}}if(o)throw o})),utimesMillisSync:function(i,t,n){const r=s.openSync(i,"r+");return s.futimesSync(r,t,n),s.closeSync(r)}};export{n as u};
