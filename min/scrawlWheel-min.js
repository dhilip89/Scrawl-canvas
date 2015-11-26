/*! scrawl-canvas 2015-11-26 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"wheel"))var scrawl=function(a){"use strict";return a.newWheel=function(b){return a.makeWheel(b)},a.makeWheel=function(b){return new a.Wheel(b)},a.work.workwheel={v1:a.makeVector()},a.Wheel=function(b){var c=a.xtGet,d=a.work.d.Wheel;return b=a.safeObject(b),a.Entity.call(this,b),a.Position.prototype.set.call(this,b),this.radius=c(b.radius,d.radius),this.localRadius=this.setRadius(this.radius),this.width=2*this.localRadius,this.height=this.width,this.checkHitUsingRadius=c(b.checkHitUsingRadius,d.checkHitUsingRadius),this.checkHitRadius=c(b.checkHitRadius,0),this.localCheckHitRadius=this.setRadius(this.checkHitRadius),this.closed=c(b.closed,d.closed),this.includeCenter=c(b.includeCenter,d.includeCenter),this.clockwise=c(b.clockwise,d.clockwise),this.registerInLibrary(),a.pushUnique(a.group[this.group].entitys,this.name),this},a.Wheel.prototype=Object.create(a.Entity.prototype),a.Wheel.prototype.type="Wheel",a.Wheel.prototype.classname="entitynames",a.work.d.Wheel={startAngle:0,endAngle:360,clockwise:!1,closed:!0,includeCenter:!1,checkHitUsingRadius:!0,checkHitRadius:0,localRadius:0,localCheckHitRadius:0},a.mergeInto(a.work.d.Wheel,a.work.d.Entity),a.Wheel.prototype.set=function(b){var c=a.xt;return a.Entity.prototype.set.call(this,b),c(b.radius)&&(this.radius=b.radius,this.localRadius=this.setRadius(this.radius),this.width=2*this.localRadius,this.height=this.width,this.maxDimensions.flag=!0),c(b.checkHitRadius)&&(this.localCheckHitRadius=this.setRadius(this.checkHitRadius)),this},a.Wheel.prototype.setRadius=function(b){var c;return b.toFixed?b:(c=a.cell[a.group[this.group].cell],a.xt(c,c.actualWidth)?parseFloat(b)/100*c.actualWidth:0)},a.Wheel.prototype.setDelta=function(b){var c,d=a.xt;return a.Entity.prototype.setDelta.call(this,b),b=a.safeObject(b),d(b.radius)&&(c=this.setRadius(b.radius),b.radius.substring&&(this.radius=a.addPercentages(this.radius,b.radius)),this.localRadius+=c,this.width=2*this.localRadius,this.height=this.width,this.maxDimensions.flag=!0),d(b.checkHitRadius)&&(c=this.setRadius(b.checkHitRadius),b.checkHitRadius.substring&&(this.checkHitRadius=a.addPercentages(this.checkHitRadius,b.checkHitRadius)),this.localCheckHitRadius+=c),d(b.startAngle)&&(this.startAngle=this.get("startAngle")+b.startAngle),d(b.endAngle)&&(this.endAngle=this.get("endAngle")+b.endAngle),this},a.Wheel.prototype.checkHit=function(b){var c,d,e,f,g,h,i,j,k,l,m,n=a.work.cvx,o=a.work.workwheel.v1;if(b=a.safeObject(b),e=a.xt(b.tests)?b.tests:[b.x||!1,b.y||!1],f=!1,this.checkHitUsingRadius){for(g=this.localCheckHitRadius?this.localCheckHitRadius:this.localRadius*this.scale,h=this.currentHandle,h.flag||this.updateCurrentHandle(),i=this.currentStart,k=this.roll,j=this.scale,l=this.flipReverse,m=this.flipUpend,c=0,d=e.length;d>c;c+=2)if(o.x=e[c],o.y=e[c+1],o.vectorSubtract(i).scalarDivide(j).rotate(-k),o.x=l?-o.x:o.x,o.y=m?-o.y:o.y,o.vectorSubtract(h),f=o.getMagnitude()<=g?!0:!1){b.x=e[c],b.y=e[c+1];break}}else for(this.buildPath(n),c=0,d=e.length;d>c;c+=2)if(f=n.isPointInPath(e[c],e[c+1])){b.x=e[c],b.y=e[c+1];break}return f?b:!1},a.Wheel.prototype.buildPath=function(b,c){var d=this.currentHandle,e=this.startAngle||0,f=this.endAngle||360,g=a.work.radian;return this.rotateCell(b,c),b.beginPath(),b.arc(d.x,d.y,this.localRadius*this.scale,e*g,f*g,this.clockwise),this.includeCenter&&b.lineTo(d.x,d.y),this.closed&&b.closePath(),this},a.Wheel.prototype.clip=function(a,b,c){return this.buildPath(a,c),a.clip(),this},a.Wheel.prototype.clear=function(b,c,d){return b.globalCompositeOperation="destination-out",this.buildPath(b,d),b.stroke(),b.fill(),b.globalCompositeOperation=a.ctx[c].get("globalCompositeOperation"),this},a.Wheel.prototype.clearWithBackground=function(b,c,d){var e,f,g,h,i,j;return e=d,f=e.get("backgroundColor"),g=a.ctx[c],h=g.get("fillStyle"),i=g.get("strokeStyle"),j=g.get("globalAlpha"),b.fillStyle=f,b.strokeStyle=f,b.globalAlpha=1,this.buildPath(b,d),b.stroke(),b.fill(),b.fillStyle=h,b.strokeStyle=i,b.globalAlpha=j,this},a.Wheel.prototype.draw=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.stroke(),this},a.Wheel.prototype.fill=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.fill(),this},a.Wheel.prototype.drawFill=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.stroke(),this.clearShadow(a,c),a.fill(),this},a.Wheel.prototype.fillDraw=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.fill(),this.clearShadow(a,c),a.stroke(),this},a.Wheel.prototype.sinkInto=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.fill(),a.stroke(),this},a.Wheel.prototype.floatOver=function(a,b,c){return c.setEngine(this),this.buildPath(a,c),a.stroke(),a.fill(),this},a.Wheel.prototype.none=function(a,b,c){return this.buildPath(a,c),this},a.Wheel.prototype.buildCollisionVectors=function(b){var c,d,e,f,g,h,i;if(a.xt(a.workcols))for(h=a.workcols.v1,i=a.workcols.v2,this.collisionVectors.length=0,h.x=this.localRadius,h.y=0,c=a.xt(b)?this.parseCollisionPoints(b):this.collisionPoints,e=0,f=c.length;f>e;e++)if(c[e].toFixed&&c[e]>1)for(i.set(h),d=360/Math.floor(c[e]),g=0;g<c[e];g++)i.rotate(d),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);else if(c[e].substring)switch(i.set(h),c[e]){case"start":this.collisionVectors.push(0),this.collisionVectors.push(0);break;case"N":i.rotate(-90),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"NE":i.rotate(-45),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"E":this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"SE":i.rotate(45),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"S":i.rotate(90),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"SW":i.rotate(135),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"W":i.rotate(180),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"NW":i.rotate(-135),this.collisionVectors.push(i.x),this.collisionVectors.push(i.y);break;case"center":this.collisionVectors.push(0),this.collisionVectors.push(0)}else a.isa_vector(c[e])&&(this.collisionVectors.push(c[e].x),this.collisionVectors.push(c[e].y));return this},a.Wheel.prototype.getMaxDimensions=function(b){var c,d,e,f,g=this.localRadius*this.scale,h=b.actualWidth,i=b.actualHeight,j=a.ctx[this.context].lineWidth||0,k=Math.ceil,l=Math.floor,m=this.maxDimensions,n=this.roll,o=a.work.v;return o.set(this.currentHandle),o.x=this.flipReverse?-o.x:o.x,o.y=this.flipUpend?-o.y:o.y,n?o.rotate(n).vectorAdd(this.currentStart):o.vectorAdd(this.currentStart),c=o.y-j-g,c=0>c?0:c,e=o.y+j+g,e=e>i?i:e,d=o.x-j-g,d=0>d?0:d,f=o.x+j+g,f=f>h?h:f,m.top=l(c),m.bottom=k(e),m.left=l(d),m.right=k(f),m.flag=!1,m},a}(scrawl);