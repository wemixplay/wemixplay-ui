var u="\\ud800-\\udfff",f="\\u2700-\\u27bf",d="a-z\\xdf-\\xf6\\xf8-\\xff",x="A-Z\\xc0-\\xd6\\xd8-\\xde",e="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",a="["+e+"]",b="\\d+",n="["+f+"]",r="["+d+"]",t="[^"+u+e+b+f+d+x+"]",c="(?:\\ud83c[\\udde6-\\uddff]){2}",o="[\\ud800-\\udbff][\\udc00-\\udfff]",i="["+x+"]",j="(?:"+r+"|"+t+")",s="(?:"+i+"|"+t+")",v="(?:['’](?:d|ll|m|re|s|t|ve))?",D="(?:['’](?:D|LL|M|RE|S|T|VE))?",E="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",R="[\\ufe0e\\ufe0f]?",T=R+E+("(?:\\u200d(?:"+["[^"+u+"]",c,o].join("|")+")"+R+E+")*"),_="(?:"+[n,c,o].join("|")+")"+T,g=RegExp([i+"?"+r+"+"+v+"(?="+[a,i,"$"].join("|")+")",s+"+"+D+"(?="+[a,i+j,"$"].join("|")+")",i+"?"+j+"+"+v,i+"+"+D,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",b,_].join("|"),"g");var h=function(u){return u.match(g)||[]};export{h as _};
