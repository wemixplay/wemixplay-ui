import{__exports as r}from"../../../../_virtual/make-dir.js";import{__exports as e}from"../../../../_virtual/index.js";import"../fs/index.js";import{__exports as i}from"../../../../_virtual/utils.js";import"./utils.js";const s=e,{checkPath:m}=i,o=r=>"number"==typeof r?r:{mode:511,...r}.mode;r.makeDir=async(r,e)=>(m(r),s.mkdir(r,{mode:o(e),recursive:!0})),r.makeDirSync=(r,e)=>(m(r),s.mkdirSync(r,{mode:o(e),recursive:!0}));export{r as default};
