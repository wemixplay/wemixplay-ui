import{__exports as t}from"../../../../_virtual/index2.js";import"../../../universalify/index.js";import{__exports as s}from"../../../../_virtual/index.js";import"../fs/index.js";import{m as a}from"../mkdirs/index.js";import{p as r}from"../path-exists/index.js";import{s as i}from"../util/stat.js";import e from"path";const n=t.fromPromise,o=e,c=s,m=a,{pathExists:l}=r,{areIdentical:p}=i;var f={createLink:n((async function(t,s){let a,r;try{a=await c.lstat(s)}catch{}try{r=await c.lstat(t)}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}if(a&&p(r,a))return;const i=o.dirname(s);await l(i)||await m.mkdirs(i),await c.link(t,s)})),createLinkSync:function(t,s){let a;try{a=c.lstatSync(s)}catch{}try{const s=c.lstatSync(t);if(a&&p(s,a))return}catch(t){throw t.message=t.message.replace("lstat","ensureLink"),t}const r=o.dirname(s);return c.existsSync(r)||m.mkdirsSync(r),c.linkSync(t,s)}};export{f as l};
