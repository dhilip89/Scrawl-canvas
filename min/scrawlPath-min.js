/*! scrawl-canvas 2015-11-30 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"path"))var scrawl=function(a){"use strict";return a.work.worklink={start:a.makeVector({name:"scrawl.worklink.start"}),end:a.makeVector({name:"scrawl.worklink.end"}),control1:a.makeVector({name:"scrawl.worklink.control1"}),control2:a.makeVector({name:"scrawl.worklink.control2"}),v1:a.makeVector({name:"scrawl.worklink.v1"}),v2:a.makeVector({name:"scrawl.worklink.v2"}),v3:a.makeVector({name:"scrawl.worklink.v3"}),point:a.makeVector({name:"scrawl.worklink.point"})},a.pathDeleteEntity=function(b){var c,d,e,f,g,h;if("Path"===b.type){for(c=b.getFullPointList(),d=b.getFullLinkList(),g=0,h=c.length;h>g;g++)a.removeItem(a.pointnames,c[g]),delete a.point[c[g]];for(e=0,f=d.length;f>e;e++)a.removeItem(a.linknames,d[e]),delete a.link[d[e]]}},a.Base.prototype.clone=function(b){var c=a.mergeOver(this.parse(),a.safeObject(b));return delete c.context,"Path"===this.type?a.makePath(c):new a[this.type](c)},a.work.d.Position.pathPlace=0,a.work.d.Position.pathRoll=0,a.work.d.Position.addPathRoll=!1,a.work.d.Position.path="",a.mergeInto(a.work.d.Cell,a.work.d.Position),a.mergeInto(a.work.d.Entity,a.work.d.Position),a.xt(a.work.d.Block)&&a.mergeInto(a.work.d.Block,a.work.d.Entity),a.xt(a.work.d.Shape)&&a.mergeInto(a.work.d.Shape,a.work.d.Entity),a.xt(a.work.d.Wheel)&&a.mergeInto(a.work.d.Wheel,a.work.d.Entity),a.xt(a.work.d.Picture)&&a.mergeInto(a.work.d.Picture,a.work.d.Entity),a.xt(a.work.d.Phrase)&&a.mergeInto(a.work.d.Phrase,a.work.d.Entity),a.Position.prototype.pathPositionInit=function(b){var c=a.xtGet,d=a.work.d[this.type];this.path=c(b.path,d.path),this.pathRoll=c(b.pathRoll,d.pathRoll),this.addPathRoll=c(b.addPathRoll,d.addPathRoll),this.pathPlace=c(b.pathPlace,d.pathPlace)},a.Position.prototype.pathPositionSetDelta=function(a){a.pathPlace&&(this.pathPlace+=a.pathPlace)},a.Cell.prototype.pathPrepareToCopyCell=function(){var b,c=a.entity[this.path],d=this.start,e=this.currentStart;c&&"Path"===c.type&&(b=c.getPerimeterPosition(this.pathPlace,this.pathSpeedConstant,this.addPathRoll),e.x=d.x=this.lockX?e.x:b.x,e.y=d.y=this.lockY?e.y:b.y,this.pathRoll=b.r||0)},a.Entity.prototype.pathStamp=function(){var b,c,d,e=a.entity[this.path];e&&"Path"===e.type&&(c=this.start,d=this.currentStart,b=e.getPerimeterPosition(this.pathPlace,this.pathSpeedConstant,this.addPathRoll),d.x=c.x=this.lockX?d.x:b.x,d.y=c.y=this.lockY?d.y:b.y,this.pathRoll=b.r||0,this.maxDimensions.flag=!0)},a.newPoint=function(b){return a.makePoint(b)},a.newLink=function(b){return a.makeLink(b)},a.makePoint=function(b){return new a.Point(b)},a.makeLink=function(b){return new a.Link(b)},a.newPathObject=function(b){return new a.Path(b)},a.makePath=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z=["C","c","S","s"],A=["Q","q","T","t"],B=new RegExp("_","g"),C=a.xtGet,D=a.safeObject;b=a.isa(b,"obj")?b:{},c=999999,d=999999,e=-999999,f=-999999,p=0,q=0,r=0,s=0,t=0,u=0,v=C(a.point[b.pivot],a.entity[b.pivot],!1),v?(w=C(v.local,v.place,v.currentStart,!1),w=D(w),b.startX=C(w.x,0),b.startY=C(w.y,0)):(w=D(b.start),b.startX=C(b.startX,w.x,0),b.startY=C(b.startY,w.y,0)),b.start=D(b.start),b.scaleX=b.scaleX||1,b.scaleY=b.scaleY||1,b.isLine=C(b.isLine,!0);var E=function(a,b){c=c>a?a:c,d=d>b?b:d,e=a>e?a:e,f=b>f?b:f},F=function(a){var b,c,d=a.match(/(-?[0-9.]+\b)/g);if(d){for(b=0,c=d.length;c>b;b++)d[b]=parseFloat(d[b]);return d}return!1},G=function(b,c,d,e,f,g,h,i){a.makePoint({name:b+"_p"+c,entity:d,currentX:e*h,currentY:f*i,startLink:b+"_l"+g})},H=function(c,d,e,f,g,h,i,j,k){i=a.xt(i)?i:{},j=a.xt(j)?j:{},k=a.xt(k)?k:{},a.makeLink({name:c+"_l"+d,entity:e,species:f,startPoint:h.name,endPoint:i.name||!1,controlPoint1:j.name||!1,controlPoint2:k.name||!1,precision:b.precision||!1,action:g})};if(a.xt(b.data)&&(g=a.newPathObject(b),h=g.name,i=h.replace(B,"="),j=a.point,k=b.scaleX,l=b.scaleY,g)){for(m=b.data.match(/([A-Za-z][0-9. ,\-]*)/g),G(i,q,h,r,s,p,k,l),q++,x=0,y=m.length;y>x;x++)switch(o=m[x][0],n=F(m[x]),o){case"M":for(r=n[0],s=n[1],E(r,s),G(i,q,h,r,s,p+1,k,l),q++,H(i,p,h,!1,"move",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,t=2,u=n.length;u>t;t+=2)G(i,q,h,n[t],n[t+1],p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r=n[t],s=n[t+1],E(r,s);break;case"m":for(0===x?(r=n[0],s=n[1]):(r+=n[0],s+=n[1]),E(r,s),G(i,q,h,r,s,p+1,k,l),q++,H(i,p,h,!1,"move",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,t=2,u=n.length;u>t;t+=2)G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r+=n[t],s+=n[t+1],E(r,s);break;case"Z":case"z":G(i,q,h,g.start.x,g.start.y,p+1,k,l),q++,H(i,p,h,!1,"close",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++;break;case"L":for(t=0,u=n.length;u>t;t+=2)G(i,q,h,n[t],n[t+1],p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r=n[t],s=n[t+1],E(r,s);break;case"l":for(t=0,u=n.length;u>t;t+=2)G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r+=n[t],s+=n[t+1],E(r,s);break;case"H":for(t=0,u=n.length;u>t;t++)G(i,q,h,n[t],s,p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r=n[t],E(r,s);break;case"h":for(t=0,u=n.length;u>t;t++)G(i,q,h,r+n[t],s,p+1,k,l),q++,H(i,p,h,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,r+=n[t],E(r,s);break;case"V":for(t=0,u=n.length;u>t;t++)G(i,q,snsn,r,n[t],p+1,k,l),q++,H(i,p,snsn,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,s=n[t],E(r,s);break;case"v":for(t=0,u=n.length;u>t;t++)G(i,q,snsn,r,s+n[t],p+1,k,l),q++,H(i,p,snsn,"line","add",j[i+"_p"+(q-2)],j[i+"_p"+(q-1)]),p++,s+=n[t],E(r,s);break;case"C":for(t=0,u=n.length;u>t;t+=6)G(i,q,snsn,n[t],n[t+1],p+1,k,l),q++,G(i,q,snsn,n[t+2],n[t+3],p+1,k,l),q++,G(i,q,snsn,n[t+4],n[t+5],p+1,k,l),q++,H(i,p,snsn,"bezier","add",j[i+"_p"+(q-4)],j[i+"_p"+(q-1)],j[i+"_p"+(q-3)],j[i+"_p"+(q-2)]),p++,r=n[t+4],s=n[t+5],E(r,s);break;case"c":for(t=0,u=n.length;u>t;t+=6)G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,G(i,q,h,r+n[t+2],s+n[t+3],p+1,k,l),q++,G(i,q,h,r+n[t+4],s+n[t+5],p+1,k,l),q++,H(i,p,h,"bezier","add",j[i+"_p"+(q-4)],j[i+"_p"+(q-1)],j[i+"_p"+(q-3)],j[i+"_p"+(q-2)]),p++,r+=n[t+4],s+=n[t+5],E(r,s);break;case"S":for(t=0,u=n.length;u>t;t+=4)x>0&&a.contains(z,m[x-1][0])?(j[i+"_p"+(q-2)].clone({name:i+"_p"+q,currentX:r+(r-j[i+"_p"+(q-2)].local.x),currentY:s+(s-j[i+"_p"+(q-2)].local.y),startLink:i+"_l"+(p+1)}),q++):(G(i,q,h,r,s,p+1,k,l),q++),G(i,q,h,n[t],n[t+1],p+1,k,l),q++,G(i,q,h,n[t+2],n[t+3],p+1,k,l),q++,H(i,p,h,"bezier","add",j[i+"_p"+(q-4)],j[i+"_p"+(q-1)],j[i+"_p"+(q-3)],j[i+"_p"+(q-2)]),p++,r=n[t+2],s=n[t+3],E(r,s);break;case"s":for(t=0,u=n.length;u>t;t+=4)x>0&&a.contains(z,m[x-1][0])?(j[i+"_p"+(q-2)].clone({name:i+"_p"+q,currentX:r+(r-j[i+"_p"+(q-2)].local.x),currentY:s+(s-j[i+"_p"+(q-2)].local.y),startLink:i+"_l"+(p+1)}),q++):(G(i,q,h,r,s,p+1,k,l),q++),G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,G(i,q,h,r+n[t+2],s+n[t+3],p+1,k,l),q++,H(i,p,h,"bezier","add",j[i+"_p"+(q-4)],j[i+"_p"+(q-1)],j[i+"_p"+(q-3)],j[i+"_p"+(q-2)]),p++,r+=n[t+2],s+=n[t+3],E(r,s);break;case"Q":for(t=0,u=n.length;u>t;t+=4)G(i,q,h,n[t],n[t+1],p+1,k,l),q++,G(i,q,h,n[t+2],n[t+3],p+1,k,l),q++,H(i,p,h,"quadratic","add",j[i+"_p"+(q-3)],j[i+"_p"+(q-1)],j[i+"_p"+(q-2)]),p++,r=n[t+2],s=n[t+3],E(r,s);break;case"q":for(t=0,u=n.length;u>t;t+=4)G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,G(i,q,h,r+n[t+2],s+n[t+3],p+1,k,l),q++,H(i,p,h,"quadratic","add",j[i+"_p"+(q-3)],j[i+"_p"+(q-1)],j[i+"_p"+(q-2)]),p++,r+=n[t+2],s+=n[t+3],E(r,s);break;case"T":for(t=0,u=n.length;u>t;t+=2)x>0&&a.contains(A,m[x-1][0])?(j[i+"_p"+(q-2)].clone({name:i+"_p"+q,currentX:r+(r-j[i+"_p"+(q-2)].local.x),currentY:s+(s-j[i+"_p"+(q-2)].local.y),startLink:i+"_l"+(p+1)}),q++):(G(i,q,h,r,s,p+1,k,l),q++),G(i,q,h,n[t],n[t+1],p+1,k,l),q++,H(i,p,h,"quadratic","add",j[i+"_p"+(q-3)],j[i+"_p"+(q-1)],j[i+"_p"+(q-2)]),p++,r=n[t],s=n[t+1],E(r,s);break;case"t":for(t=0,u=n.length;u>t;t+=2)x>0&&a.contains(A,m[x-1][0])?(j[i+"_p"+(q-2)].clone({name:i+"_p"+q,currentX:r+(r-j[i+"_p"+(q-2)].local.x),currentY:s+(s-j[i+"_p"+(q-2)].local.y),startLink:i+"_l"+(p+1)}),q++):(G(i,q,h,r,s,p+1,k,l),q++),G(i,q,h,r+n[t],s+n[t+1],p+1,k,l),q++,H(i,p,h,"quadratic","add",j[i+"_p"+(q-3)],j[i+"_p"+(q-1)],j[i+"_p"+(q-2)]),p++,r+=n[t],s+=n[t+1],E(r,s)}return H(i,p,h,!1,"end",j[i+"_p"+(q-1)],j[i+"_p"+q]),g.set({firstPoint:i+"_p0",width:(e-c)*b.scaleX,height:(f-d)*b.scaleY}),g.buildPositions(),g}return!1},a.pushUnique(a.work.sectionlist,"point"),a.pushUnique(a.work.nameslist,"pointnames"),a.pushUnique(a.work.sectionlist,"link"),a.pushUnique(a.work.nameslist,"linknames"),a.Path=function(b){return b=a.safeObject(b),a.Entity.call(this,b),a.Position.prototype.set.call(this,b),this.isLine=a.isa_bool(b.isLine)?b.isLine:!0,this.linkList=[],this.linkDurations=[],this.pointList=[],this.perimeterLength=0,this.winding=a.xtGet(b.winding,"nonzero"),this.registerInLibrary(),a.pushUnique(a.group[this.group].entitys,this.name),this},a.Path.prototype=Object.create(a.Entity.prototype),a.Path.prototype.type="Path",a.Path.prototype.classname="entitynames",a.work.d.Path={firstPoint:"",isLine:!0,closed:!0,linkList:[],linkDurations:[],pointList:[],perimeterLength:0,markStart:"",markMid:"",markEnd:"",mark:"",method:"draw",winding:"nonzero",precision:10},a.mergeInto(a.work.d.Path,a.work.d.Entity),a.Path.prototype.prepareShape=function(b,c){var d;return c.setEngine(this),this.firstPoint&&(d=this.currentHandle,this.rotateCell(b,c),b.translate(d.x,d.y),b.beginPath(),a.link[a.point[this.firstPoint].startLink].sketch(b)),this},a.Path.prototype.stampMark=function(a,b,c,d){var e,f,g,h,i={path:"",pathPlace:0,group:"",handle:null};return e=a.path,f=a.pathPlace,g=a.group,h=a.handle,i.path=this.name,i.pathPlace=b,i.group=d,i.handle=this.handle,a.set(i).forceStamp(null,d.name,d),i.path=e,i.pathPlace=f,i.group=g,i.handle=h,a.set(i),this},a.Path.prototype.addMarks=function(b,c){var d,e,f,g,h,i=a.entity,j=a.xtGetTrue;if(d=!1,a.xtGet(this.mark,this.markStart,this.markMid,this.markEnd)){if(this.buildPositions(),f=this.get("linkDurations"),d=j(this.markStart,this.mark),d&&i[d]&&this.stampMark(i[d],0,b,c),d=j(this.markMid,this.mark),d&&i[d])for(e=i[d],g=0,h=f.length-1;h>g;g++)this.stampMark(e,f[g],b,c);d=j(this.markEnd,this.mark),d&&i[d]&&this.stampMark(i[d],1,b,c)}return this},a.Path.prototype.clip=function(a,b,c){return this.closed&&(this.prepareShape(a,c),a.clip(this.winding)),this},a.Path.prototype.clear=function(b,c,d){return this.prepareShape(b,d),b.globalCompositeOperation="destination-out",b.stroke(),b.fill(this.winding),b.globalCompositeOperation=a.ctx[d].get("globalCompositeOperation"),this},a.Path.prototype.clearWithBackground=function(b,c,d){var e,f,g,h,i;return d=a.cell[d],f=d.get("backgroundColor"),e=a.ctx[d],g=e.get("fillStyle"),h=e.get("strokeStyle"),i=e.get("globalAlpha"),this.prepareShape(b,d),b.fillStyle=f,b.strokeStyle=f,b.globalAlpha=1,b.stroke(),b.fill(this.winding),b.fillStyle=g,b.strokeStyle=h,b.globalAlpha=i,this},a.Path.prototype.fill=function(a,b,c){return this.get("closed")&&(this.prepareShape(a,c),a.fill(this.winding),this.addMarks(a,c)),this},a.Path.prototype.draw=function(a,b,c){return this.prepareShape(a,c),a.stroke(),this.addMarks(a,c),this},a.Path.prototype.drawFill=function(a,b,c){return this.prepareShape(a,c),a.stroke(),this.get("closed")&&(this.clearShadow(a,c),a.fill(this.winding)),this.addMarks(a,c),this},a.Path.prototype.fillDraw=function(a,b,c){return this.prepareShape(a,c),this.get("closed")&&(a.fill(this.winding),this.clearShadow(a,c)),a.stroke(),this.addMarks(a,c),this},a.Path.prototype.sinkInto=function(a,b,c){return this.prepareShape(a,c),this.get("closed")&&a.fill(this.winding),a.stroke(),this.addMarks(a,c),this},a.Path.prototype.floatOver=function(a,b,c){return this.prepareShape(a,c),a.stroke(),this.get("closed")&&a.fill(this.winding),this.addMarks(a,c),this},a.Path.prototype.none=function(a,b,c){return this.prepareShape(a,c),this},a.Path.prototype.getFullPointList=function(){var b,c,d,e,f=a.pointnames;for(c=[],b=new RegExp(this.name+"_.*"),d=0,e=f.length;e>d;d++)b.test(f[d])&&c.push(f[d]);return c},a.Path.prototype.getFullLinkList=function(){var b,c,d,e,f=a.linknames;for(c=[],b=new RegExp(this.name+"_.*"),d=0,e=f.length;e>d;d++)b.test(f[d])&&c.push(f[d]);return c},a.Path.prototype.getPerimeterLength=function(a){return(a||!this.perimeterLength||0===this.get("linkDurations").length)&&this.buildPositions(),this.perimeterLength},a.Path.prototype.buildPositions=function(){var b,c,d,e,f,g,h,i,j=a.link;for(d=this.get("linkList"),e=[],g=0,b=0,c=d.length;c>b;b++)j[d[b]].setPositions();for(b=0,c=d.length;c>b;b++)h=j[d[b]],i=h.get("positionsCumulativeLength"),f=i[i.length-1],g+=f,e.push(g);for(b=0,c=d.length;c>b;b++)e[b]/=g;for(this.perimeterLength=g,this.linkDurations.length=0,b=0,c=e.length;c>b;b++)this.linkDurations.push(e[b]);return this},a.Path.prototype.getPerimeterPosition=function(b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u={x:0,y:0,r:0},v=a.isa_bool,w=a.xtGet,x=a.link,y=a.isBetween;for(b=b.toFixed?b:1,c=v(c)?c:!0,d=v(d)?d:!1,e=v(e)?e:!1,this.getPerimeterLength(),h=w(this.linkList,[]),k=w(this.linkDurations,[]),f=0,g=h.length;g>f;f++)if(i=x[h[f]],k[f]>=b)return j=0===f?b/k[f]:(b-k[f-1])/(k[f]-k[f-1]),j=0>=j?5e-8:j>=1?1-5e-8:j,n=0>j-1e-7?0:j-1e-7,q=j+1e-7>1?1:j+1e-7,c?d?(t=e?i.getLocalSteadyPositionOnLink(n):i.getSteadyPositionOnLink(n),l=t.x,m=t.y,t=e?i.getLocalSteadyPositionOnLink(q):i.getSteadyPositionOnLink(q),o=t.x,p=t.y,s=Math.atan2(p-m,o-l)/a.work.radian,r=e?i.getLocalSteadyPositionOnLink(j):i.getSteadyPositionOnLink(j),u.x=r.x,u.y=r.y,u.r=s,y(u.r,-1e-5,1e-5)&&(u.r=0),u):e?i.getLocalSteadyPositionOnLink(j):i.getSteadyPositionOnLink(j):d?(t=e?i.getLocalPositionOnLink(n):i.getPositionOnLink(n),l=t.x,m=t.y,t=e?i.getLocalPositionOnLink(q):i.getPositionOnLink(q),o=t.x,p=t.y,s=Math.atan2(p-m,o-l)/a.work.radian,r=e?i.getLocalPositionOnLink(j):i.getPositionOnLink(j),u.x=r.x,u.y=r.y,u.r=s,y(u.r,-1e-5,1e-5)&&(u.r=0),u):e?i.getLocalPositionOnLink(j):i.getPositionOnLink(j);return!1},a.Path.prototype.checkHit=function(b){var c,d,e,f,g,h={x:0,y:0},i=a.work.cvx;for(b=a.safeObject(b),e=a.xt(b.tests)?[].concat(b.tests):[b.x||!1,b.y||!1],f=!1,i.mozFillRule=this.winding,i.msFillRule=this.winding,this.firstPoint&&(g=this.currentHandle,this.rotateCell(i,a.group[this.group].cell),i.translate(g.x,g.y),i.beginPath(),a.link[a.point[this.firstPoint].startLink].sketch(i)),c=0,d=e.length;d>c&&!(f=i.isPointInPath(e[c],e[c+1],this.winding));c+=2);return f?(h.x=e[c],h.y=e[c+1],h):!1},a.Path.prototype.buildCollisionVectors=function(b){var c,d,e,f,g,h,i=[],j=a.xt,k=a.isa_vector;if(j(a.work.d.Path.fieldChannel))for(i=j(b)?this.parseCollisionPoints(b):this.collisionPoints,this.collisionVectors.length=0,h=0,c=0,d=i.length;d>c;c++)if(i[c].toFixed&&i[c]>=0)if(i[c]>1)for(f=1/i[c],e=0;e<=i[c];e++)g=this.getPerimeterPosition(h,!0,!1,!0),this.collisionVectors.push(g.x),this.collisionVectors.push(g.y),h+=f;else g=this.getPerimeterPosition(i[c],!0,!1,!0),this.collisionVectors.push(g.x),this.collisionVectors.push(g.y);else if(i[c].substring)switch(i[c]){case"start":this.collisionVectors.push(0),this.collisionVectors.push(0)}else k(i[c])&&(this.collisionVectors.push(i[c].x),this.collisionVectors.push(i[c].y));return this},a.Path.prototype.getMaxDimensions=function(a){return this.maxDimensions.top=0,this.maxDimensions.bottom=a.actualHeight,this.maxDimensions.left=0,this.maxDimensions.right=a.actualWidth,this.maxDimensions.flag=!1,this.maxDimensions},a.Point=function(b){var c,d,e=a.xtGet,f=a.makeVector,g=a.pushUnique;return b=a.safeObject(b),a.Base.call(this,b),this.entity=e(b.entity,""),d=a.entity[this.entity],this.local=f(),this.current=f(),c=a.safeObject(b.local),this.current.x=e(b.startX,b.currentX,c.x,0),this.current.y=e(b.startY,b.currentY,c.y,0),this.setLocal(b),this.startLink=e(b.startLink,""),this.fixed=e(b.fixed,!1),a.xto(b.angle,b.distance)&&this.setPolar(b),a.point[this.name]=this,g(a.pointnames,this.name),this.entity&&"Path"===d.type&&g(d.pointList,this.name),this},a.Point.prototype=Object.create(a.Base.prototype),a.Point.prototype.type="Point",a.Point.prototype.classname="pointnames",a.work.d.Point={entity:"",local:{x:0,y:0,z:0},current:{x:0,y:0,z:0},startLink:"",fixed:!1},a.mergeInto(a.work.d.Point,a.work.d.Base),a.Point.prototype.set=function(b){var c,d=this.current,e=a.safeObject,f=(a.xt,a.xtGet),g=a.xto;return a.Base.prototype.set.call(this,b),b=e(b),c=e(b.local),g(b.distance,b.angle)?this.setPolar(b):g(b.startX,b.startY,b.currentX,b.currentY,b.local)&&(d.x=f(b.startX,b.currentX,c.x,d.x),d.y=f(b.startY,b.currentY,c.y,d.y),this.setLocal()),this},a.Point.prototype.setLocal=function(){var b=this.current,c=this.local,d=a.entity[this.entity],e=this.numberConvert,f=a.cell[a.group[d.group].cell];return c.x=b.x.substring?e(b.x,f.actualWidth):b.x,isNaN(c.x)&&(c.x=0),c.y=b.y.substring?e(b.y,f.actualHeight):b.y,isNaN(c.y)&&(c.y=0),this.fixed=b.x.substring||b.y.substring?!0:this.fixed,this},a.Point.prototype.setDelta=function(b){var c,d,e,f,g,h,i=this.current,j=this.local,k=a.safeObject,l=a.xt,m=a.addPercentages,n=a.xtGet;return b=k(b),c=k(b.local),a.xto(b.startX,b.startY,b.currentX,b.currentY,b.local)&&(g=n(b.startX,b.currentX,c.x,0),h=n(b.startY,b.currentY,c.y,0),i.x=g.substring?m(i.x,g):i.x+g,i.y=h.substring?m(i.y,h):i.y+h,this.setLocal()),l(b.distance)&&(d=j.getMagnitude(),j.scalarMultiply((b.distance+d)/d)),l(b.angle)&&(e=j.getMagnitude(),f=Math.atan2(j.y,j.x),f+=b.angle*a.work.radian,j.x=e*Math.cos(f),j.y=e*Math.sin(f)),this},a.Point.prototype.setPolar=function(b){var c,d,e,f=a.xt,g=this.local,h=a.work.radian;return b=a.safeObject(b),a.Base.prototype.set.call(this,b),a.xta(b.distance,b.angle)?(e=b.angle*h,g.x=b.distance*Math.cos(e),g.y=b.distance*Math.sin(e)):(f(b.distance)&&(c=g.getMagnitude(),c=f(c)&&c>1e-7?c:1,g.scalarMultiply(b.distance/c)),f(b.angle)&&(d=g.getMagnitude(),e=b.angle*h,g.x=d*Math.cos(e),g.y=d*Math.sin(e))),this},a.Point.prototype.getData=function(b){var c,d,e,f=a.xt,g={name:"",current:null,startLink:null},h=f(b)&&"Vector"===b.type?b:a.work.worklink.point,i=a.entity,j=a.point,k=this.local;return c=i[this.entity],e=c.scale,f(k)&&"Vector"===k.type?(this.fixed.substring&&(i[this.fixed]||j[this.fixed])?(d=i[this.fixed]||j[this.fixed],"Point"===d.type?(h.set(d.local),h.scalarMultiply(e||1)):h.set("Particle"===d.type?d.get("place"):d.currentStart)):this.fixed?(h.set(k),h.vectorSubtract(c.currentStart||a.work.o),h.scalarMultiply(e||1),h.rotate(-c.roll)):(h.set(k),h.scalarMultiply(e||1)),g.name=this.name,g.current=h,g.startLink=this.startLink,g):!1},a.Point.prototype.getCurrentCoordinates=function(a){return this.getData(a).current},a.Point.prototype.setToFixed=function(b,c){var d,e=a.isa_obj,f=a.xt,g=this.local;return b.substring?this.fixed=b:(d=e(b)&&f(b.x)?b.x:b.toFixed?b:0,c=e(b)&&f(b.y)?b.y:c&&c.toFixed?c:0,g.x=d,g.y=c,this.fixed=!0),this},a.Link=function(b){var c=a.xtGet,d=a.work.d.Link,e=a.pushUnique;return b=a.safeObject(b),a.Base.call(this,b),a.Base.prototype.set.call(this,b),this.startPoint=c(b.startPoint,d.startPoint),this.entity=a.xt(a.point[this.startPoint])?a.point[this.startPoint].entity:d.entity,this.endPoint=c(b.endPoint,d.endPoint),this.species=c(b.species,d.species),this.action=c(b.action,d.action),a.link[this.name]=this,e(a.linknames,this.name),this.positionsX=[],this.positionsY=[],this.positionsLength=[],this.positionsCumulativeLength=[],this.startPoint&&this.entity&&"add"===this.action&&e(a.entity[this.entity].linkList,this.name),this},a.Link.prototype=Object.create(a.Base.prototype),a.Link.prototype.type="Link",a.Link.prototype.classname="linknames",a.work.d.Link={species:"",startPoint:"",entity:"",endPoint:"",controlPoint1:"",controlPoint2:"",action:"add",length:0,positionsX:[],positionsY:[],positionsLength:[],positionsCumulativeLength:[]},a.mergeInto(a.work.d.Link,a.work.d.Base),a.Link.prototype.set=function(b){var c=a.entity[this.entity],d=a.removeItem;return a.Base.prototype.set.call(this,b),b=a.safeObject(b),b.entity.substring&&b.entity!==this.entity&&this.entity&&d(c.linkList,this.name),b.action.substring&&this.entity&&c&&("add"===b.action?a.pushUnique(c.linkList,this.name):d(c.linkList,this.name)),this},a.Link.prototype.pointOnLine=function(a,b,c){return a&&b&&c.toFixed?b.vectorSubtract(a).scalarMultiply(c).vectorAdd(a):!1},a.Link.prototype.getPointCoordinates=function(){var b,c=a.work.worklink,d=c.start,e=c.end,f=c.control1,g=c.control2,h=a.point;return b=this.startPoint?h[this.startPoint].getCurrentCoordinates():a.work.o,d.x=b.x||0,d.y=b.y||0,d.z=b.z||0,b=this.endPoint?h[this.endPoint].getCurrentCoordinates():a.work.o,e.x=b.x||0,e.y=b.y||0,e.z=b.z||0,b=this.controlPoint1?h[this.controlPoint1].getCurrentCoordinates():a.work.o,f.x=b.x||0,f.y=b.y||0,f.z=b.z||0,b=this.controlPoint2?h[this.controlPoint2].getCurrentCoordinates():a.work.o,g.x=b.x||0,g.y=b.y||0,g.z=b.z||0,a.work.worklink},a.Link.prototype.getLocalPositionOnLink=function(b){var c,d,e,f,g,h,i,j={x:0,y:0,z:0},k=a.work.worklink,l=this.pointOnLine,m=k.v1.zero();switch(b=a.xt(b)&&b.toFixed?b:1,this.getPointCoordinates(),this.species){case"line":return m.set(l(k.start,k.end,b)),m;case"quadratic":return d=l(k.control1,k.end,b),c=l(k.start,k.control1,b),m.set(l(c,d,b)),m;case"bezier":return g=l(k.control2,k.end,b),f=l(k.control1,k.control2,b),e=l(k.start,k.control1,b),i=l(f,g,b),h=l(e,f,b),m.set(l(h,i,b)),m}return j},a.Link.prototype.getPositionOnLink=function(b){var c,d;return c=a.entity[this.entity],d=this.getLocalPositionOnLink(b),d?d.rotate(c.roll).vectorAdd(c.currentStart):!1},a.Link.prototype.getLocalSteadyPositionOnLink=function(b){var c,d,e,f,g=this.positionsCumulativeLength,h=a.work.worklink.v1,i=a.work.worklink.v2;for(b=a.xt(b)&&b.toFixed?b:1,d=a.entity[this.entity].get("precision"),e=this.length*b,e=e>g[d]?g[d]:0>e?0:e,f=1;d>=f;f++)if(e<=g[f])return h.x=this.positionsX[f-1],h.y=this.positionsY[f-1],i.x=this.positionsX[f],i.y=this.positionsY[f],i.vectorSubtract(h),c=(e-g[f-1])/this.positionsLength[f],i.scalarMultiply(c).vectorAdd(h);return!1},a.Link.prototype.getSteadyPositionOnLink=function(b){var c,d;return c=a.entity[this.entity],d=this.getLocalSteadyPositionOnLink(b),d?(d.rotate(c.roll).vectorAdd(c.currentStart),d):!1},a.Link.prototype.getLength=function(){return this.setPositions(),this.length},a.Link.prototype.setPositions=function(b){var c,d,e,f,g,h,i,j,k,l=a.entity[this.entity],m=a.work.worklink.v2,n=a.work.worklink.v3;if("add"===this.action){for(c=this.getPointCoordinates(),d=a.xt(b)&&b.toFixed&&b>0?b:l.get("precision"),e=1/d,i=0,m.set(c.start),j=l.roll,this.positionsX.length=0,this.positionsY.length=0,this.positionsLength.length=0,this.positionsCumulativeLength.length=0,this.positionsX[0]=m.x,this.positionsY[0]=m.y,this.positionsLength[0]=0,this.positionsCumulativeLength[0]=0,l.roll=0,k=1;d>=k;k++)f=e*(k-1+1),g=this.getPositionOnLink(f),g.vectorSubtract(l.currentStart),n.set(g),h=g.vectorSubtract(m).getMagnitude(),m.set(n),i+=h,this.positionsX[k]=m.x,this.positionsY[k]=m.y,this.positionsLength[k]=h,this.positionsCumulativeLength[k]=i;this.length=this.positionsCumulativeLength[d],l.roll=j}return this},a.Link.prototype.sketch=function(b){var c,d=this.sketchActions;return this.action?(c=d[this.action](b,this,d))?!0:(a.link[a.point[this.endPoint].startLink].sketch(b),!0):!0},a.Link.prototype.sketchActions={close:function(a){return a.closePath(),!1},end:function(){return!0},move:function(b,c){var d=a.point,e=d[c.endPoint].getCurrentCoordinates();return b.moveTo(e.x,e.y),!1},add:function(a,b,c){var d;return b.species?(d=c[b.species](a,b,c))?!0:!1:!0},line:function(b,c){var d=a.point,e=d[c.endPoint].getCurrentCoordinates(a.work.worklink.end);return b.lineTo(e.x,e.y),!1},quadratic:function(b,c){var d=a.point,e=d[c.controlPoint1].getCurrentCoordinates(a.work.worklink.control1),f=d[c.endPoint].getCurrentCoordinates(a.work.worklink.end);return b.quadraticCurveTo(e.x,e.y,f.x,f.y),!1},bezier:function(b,c){var d=a.point,e=d[c.controlPoint1].getCurrentCoordinates(a.work.worklink.control1),f=d[c.controlPoint2].getCurrentCoordinates(a.work.worklink.control2),g=d[c.endPoint].getCurrentCoordinates(a.work.worklink.end);return b.bezierCurveTo(e.x,e.y,f.x,f.y,g.x,g.y),!1}},a}(scrawl);