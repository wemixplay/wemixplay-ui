import{g as r}from"../graceful-fs/graceful-fs.js";import{__exports as e}from"../../_virtual/index2.js";import"../universalify/index.js";import{u as t}from"./utils.js";import s from"fs";let i;try{i=r}catch(r){i=s}const n=e,{stringify:o,stripBom:a}=t;var c={readFile:n.fromPromise((async function(r,e={}){"string"==typeof e&&(e={encoding:e});const t=e.fs||i,s=!("throws"in e)||e.throws;let o,c=await n.fromCallback(t.readFile)(r,e);c=a(c);try{o=JSON.parse(c,e?e.reviver:null)}catch(e){if(s)throw e.message=`${r}: ${e.message}`,e;return null}return o})),readFileSync:function(r,e={}){"string"==typeof e&&(e={encoding:e});const t=e.fs||i,s=!("throws"in e)||e.throws;try{let s=t.readFileSync(r,e);return s=a(s),JSON.parse(s,e.reviver)}catch(e){if(s)throw e.message=`${r}: ${e.message}`,e;return null}},writeFile:n.fromPromise((async function(r,e,t={}){const s=t.fs||i,a=o(e,t);await n.fromCallback(s.writeFile)(r,a,t)})),writeFileSync:function(r,e,t={}){const s=t.fs||i,n=o(e,t);return s.writeFileSync(r,n,t)}};export{c as j};
