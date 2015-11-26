/*! scrawl-canvas 2015-11-26 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"animation"))var scrawl=function(a){"use strict";return a.work.d.Position.delta={x:0,y:0,z:0},a.work.d.Position.deltaPathPlace=0,a.work.d.Position.pathSpeedConstant=!0,a.work.d.Position.tweenLock=!1,a.mergeInto(a.work.d.Cell,a.work.d.Position),a.mergeInto(a.work.d.Entity,a.work.d.Position),a.xt(a.work.d.Block)&&a.mergeInto(a.work.d.Block,a.work.d.Entity),a.xt(a.work.d.Shape)&&a.mergeInto(a.work.d.Shape,a.work.d.Entity),a.xt(a.work.d.Wheel)&&a.mergeInto(a.work.d.Wheel,a.work.d.Entity),a.xt(a.work.d.Picture)&&a.mergeInto(a.work.d.Picture,a.work.d.Entity),a.xt(a.work.d.Phrase)&&a.mergeInto(a.work.d.Phrase,a.work.d.Entity),a.xt(a.work.d.Path)&&a.mergeInto(a.work.d.Path,a.work.d.Entity),a.work.d.PageElement.tweenLock=!1,a.mergeInto(a.work.d.Pad,a.work.d.PageElement),a.xt(a.work.d.Stack)&&a.mergeInto(a.work.d.Stack,a.work.d.PageElement),a.xt(a.work.d.Element)&&a.mergeInto(a.work.d.Element,a.work.d.PageElement),a.convertTime=function(a){var b,c,d;if(a&&(a.substring||a.toFixed)){if(a.toFixed)return["ms",a];switch(b=a.match(/^\d+\.?\d*(\D*)/),b[1].toLowerCase&&(c=b[1].toLowerCase?b[1].toLowerCase():"ms"),c){case"s":d=1e3*parseFloat(a);break;case"%":d=0;break;default:d=parseFloat(a)}return[c,d]}return!1},a.addWithinBounds=function(a,b){var c=a+b;return c>1?c-1:0>c?c+1:c},a.Position.prototype.animationPositionInit=function(b){var c=a.safeObject(b.delta),d=a.makeVector,e=a.xtGet,f=a.work.d[this.type];this.delta=d({name:this.type+"."+this.name+".delta",x:e(b.deltaX,c.x,0),y:e(b.deltaY,c.y,0)}),this.pathSpeedConstant=e(b.pathSpeedConstant,f.pathSpeedConstant),this.deltaPathPlace=e(b.deltaPathPlace,f.deltaPathPlace)},a.Position.prototype.animationPositionGet=function(b){var c=["deltaX","deltaY"];if(a.contains(c,b))switch(b){case"deltaX":return this.delta.x;case"deltaY":return this.delta.y}return"delta"===b?this.delta.getVector():!1},a.Position.prototype.animationPositionSet=function(b){a.xto(b.delta,b.deltaX,b.deltaY)&&this.setDeltaAttribute(b)},a.Position.prototype.setDeltaAttribute=function(b){var c,d=a.safeObject,e=a.xtGet;return b=d(b),a.isa_vector(this.delta)||(this.delta=a.makeVector(b.delta||this.delta)),c=d(b.delta),this.delta.x=e(b.deltaX,c.x,this.delta.x),this.delta.y=e(b.deltaY,c.y,this.delta.y),this},a.Position.prototype.animationPositionClone=function(b,c){var d=a.safeObject(c.delta),e=a.xtGet;return b.delta=a.makeVector({x:e(c.deltaX,d.x,b.delta.x),y:e(c.deltaY,d.y,b.delta.y)}),b},a.Position.prototype.updateStart=function(b){return b=a.xtGet(b,"all"),this.updateStartActions[b](a.addPercentages,this.start,this.delta,a.addWithinBounds,this),this.currentStart.flag=!1,a.xt(this.collisionArray)&&(this.collisionArray.length=0),this},a.Position.prototype.updateStartActions={x:function(a,b,c){b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)},y:function(a,b,c){b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y)},path:function(a,b,c,d,e){e.pathPlace=d(e.pathPlace,e.deltaPathPlace)},all:function(a,b,c,d,e){e.deltaPathPlace&&(e.pathPlace=d(e.pathPlace,e.deltaPathPlace)),c.x&&(b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y))}},a.Position.prototype.revertStart=function(b){return b=a.xtGet(b,"all"),this.revertStartActions[b](a.subtractPercentages,this.start,this.delta,a.addWithinBounds,this),this.currentStart.flag=!1,a.xt(this.collisionArray)&&(this.collisionArray.length=0),this},a.Position.prototype.revertStartActions={x:function(a,b,c){b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)},y:function(a,b,c){b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y)},path:function(a,b,c,d,e){e.pathPlace=d(e.pathPlace,-e.deltaPathPlace)},all:function(a,b,c,d,e){e.deltaPathPlace&&(e.pathPlace=d(e.pathPlace,-e.deltaPathPlace)),c.x&&(b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y))}},a.Position.prototype.exchange=function(b,c){var d;return a.isa_obj(b)&&(d=this[c]||this.get(c),this[c]=b[c]||b.get(c),b[c]=d),this},a.Position.prototype.reverse=function(b){return b=a.xtGet(b,"all"),this.reverseActions[b](this.delta,a.reversePercentage,this),this},a.Position.prototype.reverseActions={deltaX:function(a,b){a.x=a.x.toFixed?-a.x:b(a.x)},deltaY:function(a,b){a.y=a.y.toFixed?-a.y:b(a.y)},delta:function(a,b){a.x=a.x.toFixed?-a.x:b(a.x),a.y=a.y.toFixed?-a.y:b(a.y)},deltaPathPlace:function(a,b,c){c.deltaPathPlace=-c.deltaPathPlace},all:function(a,b,c){c.deltaPathPlace=-c.deltaPathPlace,a.x=a.x.toFixed?-a.x:b(a.x),a.y=a.y.toFixed?-a.y:b(a.y)}},a.work.d.Cell.copyDelta={x:0,y:0},a.work.d.Cell.copyMinWidth=0,a.work.d.Cell.copyMaxWidth=0,a.work.d.Cell.copyMinHeight=0,a.work.d.Cell.copyMaxHeight=0,a.Cell.prototype.animationCellInit=function(b){var c=a.safeObject(b.copyDelta),d=a.xtGet;this.copyDelta=a.makeVector({x:d(b.copyDeltaX,c.x,0),y:d(b.copyDeltaY,c.y,0)})},a.Cell.prototype.animationCellGet=function(b){var c=["copyDeltaX","copyDeltaY"];if(a.contains(c,b))switch(b){case"copyDeltaX":return this.copyDelta.x;case"copyDeltaY":return this.copyDelta.y}return a.Base.prototype.get.call(this,b)},a.Cell.prototype.animationCellSet=function(b){var c,d=a.xtGet;a.xto(b.copyDelta,b.copyDeltaX,b.copyDeltaY)&&(c=a.safeObject(b.copyDelta),this.copyDelta.x=d(b.copyDeltaX,c.x,this.copyDelta.x),this.copyDelta.y=d(b.copyDeltaY,c.y,this.copyDelta.y))},a.Cell.prototype.updateStart=function(b){return b=a.xtGet(b,"all"),this.updateStartActions[b](a.addPercentages,this.start,this.delta,this.copy,this.copyDelta,a.addWithinBounds,this),this.currentStart.flag=!1,this},a.Cell.prototype.updateStartActions={x:function(a,b,c,d,e){c.x&&(b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)),e.x&&(d.x=d.x.toFixed?d.x+e.x:a(d.x,e.x))},y:function(a,b,c,d,e){c.y&&(b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y)),e.y&&(d.y=d.y.toFixed?d.y+e.y:a(d.y,e.y))},start:function(a,b,c){c.x&&(b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y))},paste:function(a,b,c){c.x&&(b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y))},copy:function(a,b,c,d,e){e.x&&(d.x=d.x.toFixed?d.x+e.x:a(d.x,e.x)),e.y&&(d.y=d.y.toFixed?d.y+e.y:a(d.y,e.y))},path:function(a,b,c,d,e,f,g){g.pathPlace=f(g.pathPlace,g.deltaPathPlace)},all:function(a,b,c,d,e,f,g){g.deltaPathPlace&&(g.pathPlace=f(g.pathPlace,g.deltaPathPlace)),c.x&&(b.x=b.x.toFixed?b.x+c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y+c.y:a(b.y,c.y)),e.x&&(d.x=d.x.toFixed?d.x+e.x:a(d.x,e.x)),e.y&&(d.y=d.y.toFixed?d.y+e.y:a(d.y,e.y))}},a.Cell.prototype.revertStart=function(b){return b=a.xtGet(b,"all"),this.revertStartActions[b](a.subtractPercentages,this.start,this.delta,this.copy,this.copyDelta,a.addWithinBounds,this),this.currentStart.flag=!1,this},a.Cell.prototype.revertStartActions={x:function(a,b,c,d,e){c.x&&(b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)),e.x&&(d.x=d.x.toFixed?d.x-e.x:a(d.x,e.x))},y:function(a,b,c,d,e){c.y&&(b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y)),e.y&&(d.y=d.y.toFixed?d.y-e.y:a(d.y,e.y))},start:function(a,b,c){c.x&&(b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y))},paste:function(a,b,c){c.x&&(b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y))},copy:function(a,b,c,d,e){e.x&&(d.x=d.x.toFixed?d.x-e.x:a(d.x,e.x)),e.y&&(d.y=d.y.toFixed?d.y-e.y:a(d.y,e.y))},path:function(a,b,c,d,e,f,g){g.pathPlace=f(g.pathPlace,-g.deltaPathPlace)},all:function(a,b,c,d,e,f,g){g.deltaPathPlace&&(g.pathPlace=f(g.pathPlace,-g.deltaPathPlace)),c.x&&(b.x=b.x.toFixed?b.x-c.x:a(b.x,c.x)),c.y&&(b.y=b.y.toFixed?b.y-c.y:a(b.y,c.y)),e.x&&(d.x=d.x.toFixed?d.x-e.x:a(d.x,e.x)),e.y&&(d.y=d.y.toFixed?d.y-e.y:a(d.y,e.y))}},a.Cell.prototype.zoom=function(b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p;return b.toFixed&&(c=this.copyWidth,d=this.copyHeight,e=this.actualWidth,f=this.actualHeight,g=a.xtGet(this.copyMinWidth,this.copyWidth),h=a.xtGet(this.copyMinHeight,this.copyHeight),i=a.xtGet(this.copyMaxWidth,this.copyWidth),j=a.xtGet(this.copyMaxHeight,this.copyHeight),k=this.copy.x,l=this.copy.y,m=c+b,n=d+b,a.isBetween(m,g,i,!0)&&a.isBetween(n,h,j,!0)&&(c=m,o=k-b/2,k=0>o?0:o>e-c?e-c:o,d=n,p=l-b/2,l=0>p?0:p>f-d?f-d:p,this.copy.x=k,this.copy.y=l,this.copyWidth=c,this.copyHeight=d)),this},a.Cell.prototype.spliceCell=function(b){var c,d,e,f,g,h,i,j,k=["horizontal","vertical","top","bottom","left","right"],l=a.work.cv,m=a.work.cvx;if(b=a.safeObject(b),a.contains(k,b.edge)){switch(f=a.xtGet(b.shiftCopy,!1),g=this.actualHeight,h=this.actualWidth,i=a.context[this.name],j=a.canvas[this.name],l.width=h,l.height=g,i.setTransform(1,0,0,1,0,0),b.edge){case"horizontal":d=h/2,c=d,e="left";break;case"vertical":d=g/2,c=d,e="top";break;case"top":case"bottom":c=a.xtGet(b.strip,20),d=g-c,e=b.edge;break;case"left":case"right":c=a.xtGet(b.strip,20),d=h-c,e=b.edge}switch(e){case"top":m.drawImage(j,0,0,h,c,0,d,h,c),m.drawImage(j,0,c,h,d,0,0,h,d),this.copy.y-=f?c:0;break;case"bottom":m.drawImage(j,0,0,h,d,0,c,h,d),m.drawImage(j,0,d,h,c,0,0,h,c),this.copy.y+=f?c:0;break;case"left":m.drawImage(j,0,0,c,g,d,0,c,g),m.drawImage(j,c,0,d,g,0,0,d,g),this.copy.x-=f?c:0;break;case"right":m.drawImage(j,0,0,d,g,c,0,d,g),m.drawImage(j,d,0,c,g,0,0,c,g),this.copy.x+=f?c:0}i.clearRect(0,0,h,g),i.drawImage(l,0,0,h,g),f&&this.setCopy()}return this},a.Group.prototype.updateStart=function(b){for(var c=this.entitys,d=a.entity,e=0,f=c.length;f>e;e++)d[c[e]].updateStart(b);return this},a.Group.prototype.revertStart=function(b){for(var c=this.entitys,d=a.entity,e=0,f=c.length;f>e;e++)d[c[e]].revertStart(b);return this},a.Group.prototype.reverse=function(b){for(var c=this.entitys,d=a.entity,e=0,f=c.length;f>e;e++)d[c[e]].reverse(b);return this},a.work.d.Design.shift=0,a.work.d.Design.autoUpdate=!1,a.mergeInto(a.work.d.Gradient,a.work.d.Design),a.mergeInto(a.work.d.RadialGradient,a.work.d.Design),a.xt(a.work.d.Pattern)&&a.mergeInto(a.work.d.Pattern,a.work.d.Design),a.Design.prototype.update=function(a,b){return this.makeGradient(a,b),this.sortStops(),this.applyStops(),this},a.Design.prototype.sortStops=function(){var b,c,d,e;for(b=this.get("color"),c=this.get("shift"),d=0,e=b.length;e>d;d++)b[d].stop+=c,a.isBetween(b[d].stop,0,1,!0)||(b[d].stop=b[d].stop>.5?b[d].stop-1:b[d].stop+1),b[d].stop<=0?b[d].stop=1e-6:b[d].stop>=1&&(b[d].stop=.999999);b.sort(function(a,b){return a.stop-b.stop}),this.color=b},a.newTween=function(b){return a.makeTween(b)},a.newTimeline=function(b){return a.makeTimeline(b)},a.newAction=function(b){return a.makeAction(b)},a.makeTween=function(b){return new a.Tween(b)},a.makeTimeline=function(b){return new a.Timeline(b)},a.makeAction=function(b){return new a.Action(b)},a.Tween=function(b){var c,d,e;for(a.Base.call(this,b),b=a.safeObject(b),this.targets=a.isa_arr(b.targets)?b.targets:a.xt(b.targets)?[b.targets]:[],this.currentTargets=[],this.initVals=[],this.start=a.isa_obj(b.start)?b.start:{},this.engines=a.isa_obj(b.engines)?b.engines:{},this.calculations=a.isa_obj(b.calculations)?b.calculations:{},this.end=a.isa_obj(b.end)?b.end:{},this.startTime=Date.now(),this.currentTime=Date.now(),this.duration=b.duration||0,this.active=!1,this.reverse=b.reverse||!1,this.autoReverse=b.autoReverse||!1,this.autoReverseAndRun=b.autoReverseAndRun||!1,this.count=b.count||0,this.currentCount=0,this.onCommence=b.onCommence||{},this.onComplete=b.onComplete||{},this.nextTween=b.nextTween||"",this.lockObjects=b.lockObjects||!1,this.killOnComplete=b.killOnComplete||!1,this.callback=a.isa_fn(b.callback)?b.callback:!1,this.order=b.order||0,c=0,d=this.targets.length;d>c;c++)this.targets[c].substring&&(e=!1,a.entity[this.targets[c]]?e=a.entity[this.targets[c]]:a.spriteanimation&&a.spriteanimation[this.targets[c]]?e=a.spriteanimation[this.targets[c]]:a.video&&a.video[this.targets[c]]?e=a.video[this.targets[c]]:a.cell[this.targets[c]]?e=a.cell[this.targets[c]]:a.element&&a.element[this.targets[c]]?e=a.element[this.targets[c]]:a.pad[this.targets[c]]?e=a.pad[this.targets[c]]:a.stack&&a.stack[this.targets[c]]?e=a.stack[this.targets[c]]:a.point&&a.point[this.targets[c]]?e=a.point[this.targets[c]]:a.design&&a.design[this.targets[c]]?e=a.design[this.targets[c]]:a.force&&a.force[this.targets[c]]?e=a.force[this.targets[c]]:a.spring&&a.spring[this.targets[c]]?e=a.spring[this.targets[c]]:a.physics&&a.physics[this.targets[c]]?e=a.physics[this.targets[c]]:a.filter&&a.filter[this.targets[c]]&&(e=a.filter[this.targets[c]]),e&&(this.targets[c]=e));return a.animation[this.name]=this,a.pushUnique(a.animationnames,this.name),a.work.resortAnimations=!0,this},a.Tween.prototype=Object.create(a.Base.prototype),a.Tween.prototype.type="Tween",a.Tween.prototype.classname="animationnames",a.work.d.Tween={targets:[],currentTargets:[],start:{},engines:{},calculations:{},end:{},onComplete:{},initVals:[],onCommence:{},startTime:0,currentTime:0,duration:0,active:!1,paused:!1,reverse:!1,autoReverse:!1,callback:!1,autoReverseAndRun:!1,count:0,currentCount:0,killOnComplete:!1,lockObjects:!1,nextTween:"",order:0},a.mergeInto(a.work.d.Tween,a.work.d.Base),a.Tween.prototype.set=function(b){var c,d,e,f=a.animationnames,g=a.animation,h=a.contains;for(a.Base.prototype.set.call(this,b),c=0,d=f.length;d>c;c++)e=g[f[c]],"Timeline"===e.type&&h(e.actionsList,this.name)&&e.resolve();return a.xt(b.order)&&(a.work.resortAnimations=!0),this},a.Tween.prototype.fn=function(){var b,c,d,e,f,g,h,i,j,k,l,m=a.xt,n=this.currentTargets,o=this.engine,p=this.engines;if(this.currentTime=Date.now(),b=(this.currentTime-this.startTime)/this.duration,e=Object.keys(this.end),this.active)if(1>b){for(i=0,j=n.length;j>i;i++)if(c=n[i],m(c)){for(d={},k=0,l=e.length;l>k;k++)f=this.initVals[i][e[k]],h=0,f.change.substring&&(g=f.change.match(/^-?\d+\.?\d*(\D*)/),h=g[1],m(h)||(h="%")),d[e[k]]=o(parseFloat(f.start),parseFloat(f.change),b,p[e[k]],this.reverse,e[k],this,c),d[e[k]].toFixed&&(d[e[k]]=d[e[k]]+h);c.set(d)}}else{for(i=0,j=n.length;j>i;i++)m(n[i])&&(n[i].tweenLock=!1);this.active=!1,a.removeItem(a.work.animate,this.name),(this.autoReverse||this.autoReverseAndRun)&&(this.reverse=this.reverse?!1:!0),this.autoReverseAndRun?this.currentCount.toFixed?(this.currentCount--,this.currentCount>0?this.run():this.runComplete()):this.run():a.isa_bool(this.count)&&this.count?this.run():this.runComplete()}return!0},a.Tween.prototype.engine=function(b,c,d,e,f,g,h,i){return e=a.xtGet(e,"linear"),"calc"===e?h.calculations[g]({start:b,change:c,position:d},h,i):a.Tween.prototype.engineActions[e](b,c,d,f)},a.Tween.prototype.engineActions={out:function(b,c,d){return b+c+Math.cos(90*d*a.work.radian)*-c},"in":function(b,c,d){return b+Math.sin(90*d*a.work.radian)*c},easeIn:function(a,b,c){var d=1-c;return a+b+d*d*-b},easeIn3:function(a,b,c){var d=1-c;return a+b+d*d*d*-b},easeIn4:function(a,b,c){var d=1-c;return a+b+d*d*d*d*-b},easeIn5:function(a,b,c){var d=1-c;return a+b+d*d*d*d*d*-b},easeOutIn:function(a,b,c){var d=1-c;return.5>c?a+c*c*b*2:a+b+d*d*-b*2},easeOutIn3:function(a,b,c){var d=1-c;return.5>c?a+c*c*c*b*4:a+b+d*d*d*-b*4},easeOutIn4:function(a,b,c){var d=1-c;return.5>c?a+c*c*c*c*b*8:a+b+d*d*d*d*-b*8},easeOutIn5:function(a,b,c){var d=1-c;return.5>c?a+c*c*c*c*c*b*16:a+b+d*d*d*d*d*-b*16},easeOut:function(a,b,c){return a+c*c*b},easeOut3:function(a,b,c){return a+c*c*c*b},easeOut4:function(a,b,c){return a+c*c*c*c*b},easeOut5:function(a,b,c){return a+c*c*c*c*c*b},linear:function(a,b,c){return a+c*b}},a.Tween.prototype.run=function(){var b,c,d,e,f,g,h,i,j,k,l,m;if(!this.active){for(b=Object.keys(this.end),this.currentCount=this.currentCount||this.count,this.currentTargets=[],this.initVals=[],h=0,i=this.targets.length;i>h;h++)this.lockObjects?this.targets[h].tweenLock||(this.targets[h].tweenLock=!0,this.currentTargets.push(this.targets[h])):this.currentTargets.push(this.targets[h]);if(this.currentTargets.length>0){for(j=0,k=this.currentTargets.length;k>j;j++)if(a.xt(this.currentTargets[j]))for(this.reverse?(this.currentTargets[j].set(this.onComplete),this.currentTargets[j].set(this.end)):(this.currentTargets[j].set(this.onCommence),this.currentTargets[j].set(this.start)),this.initVals.push({}),l=0,m=b.length;m>l;l++)c=a.xt(this.start[b[l]])?this.start[b[l]]:this.currentTargets[j].get([b[l]]),d=this.end[b[l]],g=parseFloat(d)-parseFloat(c),f=0,d.substring&&(e=d.match(/^-?\d+\.?\d*(\D*)/),f=e[1],a.xt(f)||(f="%")),this.reverse&&(g=-g),this.initVals[j][b[l]]={start:this.reverse?d:c,change:g+f};return this.startTime=Date.now(),a.pushUnique(a.work.animate,this.name),this.active=!0,!0}}return!1},a.Tween.prototype.runComplete=function(){var b,c;for(b=0,c=this.currentTargets.length;c>b;b++)a.xt(this.currentTargets[b])&&(this.autoReverse||this.autoReverseAndRun?this.reverse?(this.currentTargets[b].set(this.end),this.currentTargets[b].set(this.onComplete)):(this.currentTargets[b].set(this.start),this.currentTargets[b].set(this.onCommence)):this.reverse?(this.currentTargets[b].set(this.start),this.currentTargets[b].set(this.onCommence)):(this.currentTargets[b].set(this.end),this.currentTargets[b].set(this.onComplete)));return this.currentTargets=[],this.nextTween?a.xt(a.animation[this.nextTween])&&a.animation[this.nextTween].run():this.callback&&this.callback(),this.killOnComplete&&this.kill(),!0},a.Tween.prototype.halt=function(){return this.active=!1,this.paused=!0,a.removeItem(a.work.animate,this.name),this},a.Tween.prototype.reset=function(){var a,b;for(this.paused=!1,this.active=!1,this.startTime=Date.now(),this.currentTime=this.startTime,a=0,b=this.currentTargets.length;b>a;a++)this.currentTargets[a].set(this.start),this.currentTargets[a].set(this.onCommence);return this},a.Tween.prototype.complete=function(){return this.active=!0,this.paused=!1,this.startTime=Date.now()-this.duration,this.currentTime=Date.now(),this.fn(),this.active=!1,this},a.Tween.prototype.seekTo=function(a){var b=this.active,c=this.paused;return a.toFixed&&(a>0?(this.currentTime=Date.now(),this.startTime=this.currentTime,this.active=!0,this.paused=!1,this.startTime-=a,this.fn(),this.paused=c,this.active=b):this.reset()),this},a.Tween.prototype.resume=function(){var b=this.currentTime-this.startTime;return this.paused&&(this.currentTime=Date.now(),this.startTime=this.currentTime-b,a.pushUnique(a.work.animate,this.name),this.active=!0,this.paused=!1),this},a.Tween.prototype.kill=function(){var b,c;if(this.active)for(b=0,c=this.currentTargets.length;c>b;b++)a.xt(this.currentTargets[b])&&this.currentTargets[b].set(this.onComplete);return a.removeItem(a.work.animate,this.name),a.removeItem(a.animationnames,this.name),delete a.animation[this.name],a.work.resortAnimations=!0,!0},a.Timeline=function(b){return a.Base.call(this,b),b=a.safeObject(b),this.duration=a.xtGet(b.duration,1e3),this.order=a.xtGet(b.order,0),this.effectiveDuration=0,this.counter=0,this.startTime=0,this.currentTime=0,this.active=!1,this.paused=!1,this.event=a.xtGet(b.event,100),this.lastEvent=0,this.seeking=!1,this.actionsList=[],a.animation[this.name]=this,a.pushUnique(a.animationnames,this.name),this},a.Timeline.prototype=Object.create(a.Base.prototype),a.Timeline.prototype.type="Timeline",a.Timeline.prototype.classname="animationnames",a.work.d.Timeline={duration:1e3,event:100},a.Timeline.prototype.sortActions=function(){this.actionsList=a.bucketSort("animation","timeValue",this.actionsList)},a.Timeline.prototype.makeTimeupdateEvent=function(){var a=null;return window.MSInputMethodContext?(a=document.createEvent("CustomEvent"),a.initCustomEvent("timeline-updated",!0,!0,{name:this.name,type:"Timeline",currentTime:this.currentTime-this.startTime})):window.CustomEvent&&(a=new CustomEvent("timeline-updated",{detail:{name:this.name,type:"Timeline",currentTime:this.currentTime-this.startTime},bubbles:!0,cancelable:!0})),a},a.Timeline.prototype.set=function(b){var c=a.xt;return b=a.safeObject(b),c(b.duration)&&b.duration.toFixed&&(this.duration=b.duration),c(b.event)&&b.event.toFixed&&(this.event=b.event),c(b.order)&&(this.order=b.order,a.work.resortAnimations=!0),this.resolve(),this},a.Timeline.prototype.resolve=function(){var b,c,d;for(b=0,c=this.actionsList.length;c>b;b++)d=a.animation[this.actionsList[b]],"%"===d.timeUnit&&(d.timeValue=parseFloat(d.time)/100*this.duration);return this.sortActions(),this.effectiveDuration=this.getTimelineDuration(),!0},a.Timeline.prototype.add=function(){var b,c,d=Array.prototype.slice.call(arguments);for(a.isa_arr(d[0])&&(d=d[0]),b=0,c=d.length;c>b;b++)a.pushUnique(this.actionsList,d[b]);return this.resolve(),this},a.Timeline.prototype.addAction=function(b){var c=a.makeAction(b);return this.add(c.name),this},a.Timeline.prototype.changeComposition=function(b){var c,d,e,f,g;if(b=a.safeObject(b),a.xta(b.target,b.type,b.time,b.name,b.from,b.to)&&a.contains(a.work.sectionlist,b.type)&&(d=a[b.type][b.target],a.xt(d))){switch(b.type){case"entity":case"cell":e=function(){d.set({globalCompositeOperation:b.to})},f=function(){d.set({globalCompositeOperation:b.from})},g=function(){d.set({globalCompositeOperation:b.from})};break;case"group":e=function(){d.setEntitysTo({globalCompositeOperation:b.to})},f=function(){d.setEntitysTo({globalCompositeOperation:b.from})},g=function(){d.setEntitysTo({globalCompositeOperation:b.from})}}a.xt(e)&&(c=a.makeAction({name:b.name+"_changeCompositeAction",time:b.time,action:e,rollback:f,reset:g}),this.add(c.name))}return this},a.Timeline.prototype.changeOrder=function(b){var c,d,e,f,g;if(b=a.safeObject(b),a.xta(b.target,b.type,b.time,b.name,b.from,b.to)&&a.contains(a.work.sectionlist,b.type)&&(d=a[b.type][b.target],a.xt(d))){switch(b.type){case"entity":case"group":e=function(){d.set({order:b.to})},f=function(){d.set({order:b.from})},g=function(){d.set({order:b.from})};break;case"cell":e=function(){d.set({showOrder:b.to})},f=function(){d.set({showOrder:b.from})},g=function(){d.set({showOrder:b.from})}}a.xt(e)&&(c=a.makeAction({name:b.name+"_changeOrderAction",time:b.time,action:e,rollback:f,reset:g}),this.add(c.name))}return this},a.Timeline.prototype.changeGroupEntitysOrderTo=function(b){var c,d,e,f,g;return b=a.safeObject(b),a.xta(b.target,b.time,b.name,b.from,b.to)&&(d=a.group[b.target],a.xt(d)&&(e=function(){d.setEntitysTo({order:b.to})},f=function(){d.setEntitysTo({order:b.from})},g=function(){d.setEntitysTo({order:b.from})},c=a.makeAction({name:b.name+"_changeGEOrderAction",time:b.time,action:e,rollback:f,reset:g}),this.add(c.name))),this},a.Timeline.prototype.fadeIn=function(b){var c;return b=a.safeObject(b),c=b.engine||"linear",a.xta(b.targets,b.time,b.duration,b.name)&&this.addAction({name:b.name,time:b.time,action:a.makeTween({name:b.name+"_fadeInTween",targets:b.targets,onCommence:{globalAlpha:0},start:{globalAlpha:0},end:{globalAlpha:1},onComplete:{globalAlpha:1},engines:{globalAlpha:c},duration:b.duration})}),this},a.Timeline.prototype.fadeOut=function(b){var c;return b=a.safeObject(b),c=b.engine||"linear",a.xta(b.targets,b.time,b.duration,b.name)&&this.addAction({name:b.name,time:b.time,action:a.makeTween({name:b.name+"_fadeOutTween",targets:b.targets,onCommence:{globalAlpha:1},start:{globalAlpha:1},end:{globalAlpha:0},onComplete:{globalAlpha:0},engines:{globalAlpha:c},duration:b.duration})}),this},a.Timeline.prototype.addTween=function(b){var c,d;return b=a.safeObject(b),c=b.engines||{},d=b.calculations||{},a.xta(b.targets,b.time,b.duration,b.name,b.start,b.end)&&this.addAction({name:b.name,time:b.time,action:a.makeTween({name:b.name+"_tween",targets:b.targets,onCommence:b.start,start:b.start,end:b.end,onComplete:b.end,engines:c,calculations:d,duration:b.duration})}),this},a.Timeline.prototype.addShow=function(b){var c,d,e,f,g;if(b=a.safeObject(b),a.xta(b.target,b.type,b.time,b.name)&&a.contains(a.work.sectionlist,b.type)&&(d=a[b.type][b.target],a.xt(d))){switch(b.type){case"entity":e=function(){d.set({visibility:!0})},f=function(){d.set({visibility:!1})},g=function(){d.set({visibility:!1})};break;case"group":e=function(){d.set({visibility:!0}),d.setEntitysTo({visibility:!0})},f=function(){d.set({visibility:!1}),d.setEntitysTo({visibility:!1})},g=function(){d.set({visibility:!1}),d.setEntitysTo({visibility:!1})};break;case"cell":e=function(){d.set({rendered:!0})},f=function(){d.set({rendered:!1})},g=function(){d.set({rendered:!1})}}a.xt(e)&&(c=a.makeAction({name:b.name+"_showAction",time:b.time,action:e,rollback:f,reset:g}),this.add(c.name))}return this},a.Timeline.prototype.showMany=function(b){var c,d,e,f,g,h=a.entity,i=a.cell,j=a.xtGet;if(b=a.safeObject(b),a.xta(b.targets,b.time,b.name))for(g={time:b.time},e=0,f=b.targets.length;f>e;e++)c=b.targets[e],d=j(h[c],i[c],!1),d&&(g.name=b.name+"_"+e,g.target=c,g.type="Cell"===d.type?"cell":"entity",this.addShow(g));return this},a.Timeline.prototype.addHide=function(b){var c,d,e,f,g;if(b=a.safeObject(b),a.xta(b.target,b.type,b.time,b.name)&&a.contains(a.work.sectionlist,b.type)&&(d=a[b.type][b.target],a.xt(d))){switch(b.type){case"entity":e=function(){d.set({visibility:!1})},f=function(){d.set({visibility:!0})},g=function(){d.set({visibility:!0})};break;case"group":e=function(){d.set({visibility:!1}),d.setEntitysTo({visibility:!1})},f=function(){d.set({visibility:!0}),d.setEntitysTo({visibility:!0})},g=function(){d.set({visibility:!0}),d.setEntitysTo({visibility:!0})};break;case"cell":e=function(){d.set({rendered:!1})},f=function(){d.set({rendered:!0})},g=function(){d.set({rendered:!0})}}a.xt(e)&&(c=a.makeAction({name:b.name+"_hideAction",time:b.time,action:e,rollback:f,reset:g}),this.add(c.name))}return this},a.Timeline.prototype.hideMany=function(b){var c,d,e,f,g,h=a.entity,i=a.cell,j=a.xtGet;if(b=a.safeObject(b),a.xta(b.targets,b.time,b.name))for(g={time:b.time},e=0,f=b.targets.length;f>e;e++)c=b.targets[e],d=j(h[c],i[c],!1),d&&(g.name=b.name+"_"+e,g.target=c,g.type="Cell"===c.type?"cell":"entity",this.addHide(g));return this},a.Timeline.prototype.remove=function(){var b,c,d=Array.prototype.slice.call(arguments);for(a.isa_arr(d[0])&&(d=d[0]),b=0,c=d.length;c>b;b++)a.removeItem(this.actionsList,d[b]);return this.resolve(),this},a.Timeline.prototype.run=function(){var b;return this.active||(this.reset(),a.pushUnique(a.work.animate,this.name),this.active=!0,this.event&&(b=this.makeTimeupdateEvent(),document.dispatchEvent(b))),this},a.Timeline.prototype.resume=function(){var b,c,d,e=this.currentTime-this.startTime;if(this.paused){for(b=0,c=this.actionsList.length;c>b;b++)d=a.animation[this.actionsList[b]],d.action&&d.action.paused&&d.action.resume();this.currentTime=Date.now(),this.startTime=this.currentTime-e,a.pushUnique(a.work.animate,this.name),this.paused=!1,this.active=!0}return this},a.Timeline.prototype.fn=function(){var b,c,d,e;if(this.currentTime=Date.now(),this.counter<this.actionsList.length)for(b=this.counter,c=this.actionsList.length;c>b;b++){if(d=a.animation[this.actionsList[b]],!(d.timeValue+this.startTime<=this.currentTime)){this.counter=b;break}d.run(),this.counter++,this.counter+1===this.actionsList.length&&this.counter++}this.event&&this.currentTime>=this.lastEvent+this.event&&(e=this.makeTimeupdateEvent(),document.dispatchEvent(e),this.lastEvent=this.currentTime),this.currentTime>=this.startTime+this.effectiveDuration&&(this.active=!1,a.removeItem(a.work.animate,this.name))},a.Timeline.prototype.halt=function(){var b,c,d;for(this.active=!1,this.paused=!0,b=0,c=this.actionsList.length;c>b;b++)d=a.animation[this.actionsList[b]],d.action&&d.action.halt&&d.action.active&&d.action.halt();return a.removeItem(a.work.animate,this.name),this},a.Timeline.prototype.reset=function(){var b,c,d;for(this.active=!1,this.paused=!1,this.startTime=Date.now(),this.currentTime=Date.now(),this.lastEvent=Date.now(),this.counter=0,b=this.actionsList.length-1,c=0;b>=c;b--)d=a.animation[this.actionsList[b]],d.action&&d.action.reset&&d.action.reset(),d.reset&&d.reset();return a.removeItem(a.work.animate,this.name),this},a.Timeline.prototype.seekTo=function(b){var c,d,e,f;return this.seeking||b&&(b.substring||b.toFixed)&&(this.active&&a.removeItem(a.work.animate,this.name),this.startTime||(this.startTime=this.currentTime=Date.now()),c=a.convertTime(b),c&&(d=c[1],e=this.currentTime-this.startTime,f=d-e,f&&(0>f?this.seekBack(f):this.seekForward(f))),this.active&&a.pushUnique(a.work.animate,this.name)),this},a.Timeline.prototype.seekForward=function(b){var c,d,e,f,g,h,i,j;if(this.seeking=!0,this.active||(this.paused=!0),b.toFixed&&b&&b){for(f=this.currentTime,g=f+b,c=0,d=this.actionsList.length;d>c;c++)e=a.animation[this.actionsList[c]],h=this.getActionTimes(e),i=h[0]+this.startTime,j=h[1]+this.startTime,i&&j&&(a.isa_fn(e.action)?a.isBetween(i,f,g,!0)&&e.action():"Tween"===e.action.type?f>j||i>g||(e.action.active||(e.action.run(),e.action.halt()),e.action.seekTo(b-(i-f))):e.skipSeek?e.complete&&e.complete():f>j||i>g||e.action.seekForward(b));this.startTime-=b}return this.seeking=!1,this},a.Timeline.prototype.getActionTimes=function(a){var b,c=[null,null];return a.action&&(b=a.timeValue,c=a.action?"Tween"===a.action.type?[b,b+a.action.duration]:"Timeline"===a.action.type?[b,this.getTimelineDuration()]:[b,b]:[b,b]),c},a.Timeline.prototype.getTimelineDuration=function(){var b,c,d,e,f=0;for(b=0,c=c=this.actionsList.length;c>b;b++)d=a.animation[this.actionsList[b]],"Tween"===d.action.type?(e=d.timeValue+d.action.duration,f=e>f?e:f):"Timeline"===d.action.type&&(e=d.timeValue+d.action.getTimelineDuration(),f=e>f?e:f);return f=this.duration>f?this.duration:f},a.Timeline.prototype.seekBack=function(b){var c,d,e,f,g,h,i;if(this.seeking=!0,this.active||(this.paused=!0),b.toFixed&&b){for(e=this.currentTime,f=e+b,c=this.actionsList.length-1;c>=0;c--)d=a.animation[this.actionsList[c]],g=this.getActionTimes(d),h=g[0]+this.startTime,i=g[1]+this.startTime,h&&i&&(a.isa_fn(d.action)?a.isBetween(h,e,f,!0)&&d.rollback&&d.rollback():"Tween"===d.action.type?f>i||h>e||(d.action.active||(d.action.run(),d.action.halt()),d.action.seekTo(b-(h-e))):d.skipSeek?d.rollback&&d.rollback():f>i||h>e||d.action.seekBack(b));this.startTime-=b}return this.seeking=!1,this},a.Timeline.prototype.kill=function(){return a.removeItem(a.work.animate,this.name),a.removeItem(a.animationnames,this.name),delete a.animation[this.name],!0},a.Action=function(b){return a.Base.call(this,b),b=a.safeObject(b),this.time=b.time||0,this.order=a.xtGet(b.order,0),this.convertTime(),this.action=a.xtGet(b.action,!1),this.reset=a.xtGet(b.reset,!1),this.rollback=a.xtGet(b.rollback,!1),this.complete=a.xtGet(b.complete,!1),this.skipSeek=a.xtGet(b.skipSeek,!1),a.animation[this.name]=this,a.pushUnique(a.animationnames,this.name),a.work.resortAnimations=!0,this},a.Action.prototype=Object.create(a.Base.prototype),a.Action.prototype.type="Action",a.Action.prototype.classname="animationnames",a.work.d.Action={time:"0ms",timeValue:0,timeUnit:"ms",action:!1,reset:!1,complete:!1,rollback:!1,skipSeek:!1},a.Action.prototype.convertTime=function(){var b=a.convertTime(this.time);return b?(this.timeUnit=b[0]||"ms",this.timeValue=b[1]||0):(this.timeUnit="ms",this.timeValue=0),!0},a.Action.prototype.run=function(){var b=["Tween","Timeline","Animation"];return a.xt(this.action)?(a.contains(b,this.action.type)?this.action.run():this.action(),!0):!1},a.Action.prototype.kill=function(){return a.removeItem(a.animationnames,this.name),delete a.animation[this.name],a.work.resortAnimations=!0,!0},a}(scrawl);