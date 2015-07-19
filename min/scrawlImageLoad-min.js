/*! scrawl-canvas 2015-07-19 */
if(window.scrawl&&window.scrawl.modules&&!window.scrawl.contains(window.scrawl.modules,"imageload"))var scrawl=function(a){"use strict";return a.imageFragment=document.createDocumentFragment(),a.imageCanvas=document.createElement("canvas"),a.imageCanvas.id="imageHiddenCanvasElement",a.imageFragment.appendChild(a.imageCanvas),a.imageCvx=a.imageCanvas.getContext("2d"),a.newImage=function(b){return a.makeImage(b)},a.newSpriteAnimation=function(b){return a.makeSpriteAnimation(b)},a.newVideo=function(b){return a.makeVideo(b)},a.makeImage=function(b){return new a.Image(b)},a.makeSpriteAnimation=function(b){return new a.SpriteAnimation(b)},a.makeVideo=function(b){return new a.Video(b)},a.workimg={v1:a.makeVector()},a.pushUnique(a.sectionlist,"image"),a.pushUnique(a.nameslist,"imagenames"),a.pushUnique(a.sectionlist,"video"),a.pushUnique(a.nameslist,"videonames"),a.pushUnique(a.sectionlist,"spriteanimation"),a.pushUnique(a.nameslist,"spriteanimationnames"),a.pushUnique(a.sectionlist,"asset"),a.pushUnique(a.nameslist,"assetnames"),a.getImagesByClass=function(b,c){var d,e;if(c=a.xtGet(c,!0),b&&(d=document.getElementsByClassName(b),d.length>0)){for(e=d.length;e>0;e--)a.makeImage(d[e-1].width&&d[e-1].height?{element:d[e-1],removeImageFromDOM:c,crossOrigin:"anonymous"}:{url:d[e-1].src,name:d[e-1].id,removeImageFromDOM:c,crossOrigin:"anonymous"});return!0}return!1},a.getImageById=function(b,c){var d;return c=a.xtGet(c,!0),b?(d=document.getElementById(b),a.makeImage(d.width&&d.height?{element:d,removeImageFromDOM:c,crossOrigin:"anonymous"}:{url:d.src,name:d.id,removeImageFromDOM:c,crossOrigin:"anonymous"}),!0):!1},a.getVideoCallback=function(){a.makeVideo({element:this,crossOrigin:"anonymous"})},a.getVideoById=function(b){var c;return b?(c=document.getElementById(b),c.callback="anonymous",c.readyState>1?a.makeVideo({element:c,crossOrigin:"anonymous"}):c.addEventListener("loadeddata",a.getVideoCallback,!1),!0):!1},a.Image=function(b){var c;return b=a.safeObject(b),this.width=0,this.height=0,a.xto(b.element,b.data,b.url)?(a.xt(b.element)?b.name=a.xtGet(b.name,b.element.getAttribute("id"),b.element.getAttribute("name"),""):a.xt(b.data)?b.name=a.xtGet(b.name,""):a.xt(b.url)&&(c=b.url.substr(0,128),b.name=a.xtGet(b.name,c,"")),a.Base.call(this,b),a.image[this.name]=this,a.pushUnique(a.imagenames,this.name),a.xt(b.element)?this.addImageByElement(b):a.xt(b.data)?this.addImageByData(b):a.xt(b.url)&&this.addImageByUrl(b),this):!1},a.Image.prototype=Object.create(a.Base.prototype),a.Image.prototype.type="Image",a.Image.prototype.classname="imagenames",a.d.Image={width:0,height:0},a.mergeInto(a.d.Image,a.d.Base),a.Image.prototype.addImageByElement=function(b){var c,d=a.xtGet(b.removeImageFromDOM,!0);return c=d?b.element:b.element.cloneNode(),c.id=this.name,this.width=parseFloat(a.xtGetTrue(c.offsetWidth,c.width,c.style.width,1)),this.height=parseFloat(a.xtGetTrue(c.offsetHeight,c.height,c.style.height,1)),a.imageFragment.appendChild(c),a.asset[this.name]=c,a.pushUnique(a.assetnames,this.name),a.isa(b.callback,"fn")&&b.callback(),!0},a.Image.prototype.addImageByUrl=function(b){var c,d=this;return a.isa(b.url,"str")?(c=document.createElement("img"),c.id=this.name,c.onload=function(){var e,f,g,h,i;for(d.width=c.width,d.height=c.height,a.imageFragment.appendChild(c),i="#"+d.name,a.asset[d.name]=a.imageFragment.querySelector(i),a.pushUnique(a.assetnames,d.name),g=0,h=a.entitynames.length;h>g;g++)e=a.entity[a.entitynames[g]],"Picture"===e.type&&e.source===d.name&&e.setCopy();for(g=0,h=a.designnames.length;h>g;g++)f=a.design[a.designnames[g]],"Pattern"===f.type&&f.source===d.name&&(f.sourceType="image",f.makeDesign());a.isa(b.callback,"fn")&&b.callback()},c.onerror=function(){},c.src=b.url,!0):!1},a.Image.prototype.addImageByData=function(b){var c;return a.xt(b.data)?(c=b.data,a.imageCanvas.width=c.width,a.imageCanvas.height=c.height,a.imageCvx.putImageData(c,0,0),b.url=a.imageCanvas.toDataURL("image/png"),delete b.data,this.addImageByUrl(b)):!1},a.Image.prototype.createImageFromCell=function(b,c){var d,e;return a.isa(b,"str")&&(e=a.canvas[b],b=a.cell[b],a.xt(e)&&(d=e.toDataURL("image/png"),a.xt(d)))?this.addImageByUrl({url:d,name:a.xtGet(c,b.name,"cell-image"),width:b.actualWidth,height:b.actualHeight}):!1},a.Image.prototype.clone=function(b){return b.element=a.imageFragment.getElementById(this.name).cloneNode(),a.makeImage(b)},a.SpriteAnimation=function(b){return b=a.safeObject(b),a.Base.call(this,b),this.frames=a.xt(b.frames)?[].concat(b.frames):[],this.currentFrame=b.currentFrame||0,this.speed=a.isa(b.speed,"num")?b.speed:1,this.loop=a.isa(b.loop,"str")?b.loop:"end",this.running=a.isa(b.running,"str")?b.running:"complete",this.lastCalled=a.xt(b.lastCalled)?b.lastCalled:Date.now(),a.spriteanimation[this.name]=this,a.pushUnique(a.spriteanimationnames,this.name),this},a.SpriteAnimation.prototype=Object.create(a.Base.prototype),a.SpriteAnimation.prototype.type="SpriteAnimation",a.SpriteAnimation.prototype.classname="spriteanimationnames",a.d.SpriteAnimation={frames:[],currentFrame:0,speed:1,loop:"end",running:"complete",lastCalled:0},a.animKeys=Object.keys(a.d.SpriteAnimation),a.mergeInto(a.d.SpriteAnimation,a.d.Scrawl),a.SpriteAnimation.prototype.set=function(b){var c;if(b=a.safeObject(b),c="pause"===this.loop?!0:!1,a.Base.prototype.set.call(this,b),a.xt(b.running))switch(b.running){case"forward":this.running="forward",c||(this.currentFrame=0);break;case"backward":this.running="backward",c||(this.currentFrame=this.frames.length-1);break;default:this.running="complete",this.currentFrame=0}return this},a.SpriteAnimation.prototype.getData=function(){var a,b;if(this.speed>0)switch(a=this.frames[this.currentFrame].d/this.speed,b=this.lastCalled+a<Date.now()?!0:!1,this.running){case"complete":this.lastCalled=Date.now();break;case"forward":if(b){switch(this.loop){case"pause":break;case"end":this.running=this.currentFrame+1>=this.frames.length?"complete":this.running,this.currentFrame=this.currentFrame+1>=this.frames.length?this.currentFrame:this.currentFrame+1;break;case"loop":this.currentFrame=this.currentFrame+1>=this.frames.length?0:this.currentFrame+1;break;case"reverse":this.running=this.currentFrame+1>=this.frames.length?"backward":"forward",this.currentFrame=this.currentFrame+1>=this.frames.length?this.currentFrame:this.currentFrame+1}this.lastCalled=Date.now()}break;case"backward":if(b){switch(this.loop){case"pause":break;case"end":this.running=this.currentFrame-1<=0?"complete":this.running,this.currentFrame=this.currentFrame-1<=0?this.currentFrame:this.currentFrame-1;break;case"loop":this.currentFrame=this.currentFrame-1<=0?this.frames.length-1:this.currentFrame-1;break;case"reverse":this.running=this.currentFrame-1<=0?"forward":"backward",this.currentFrame=this.currentFrame-1<=0?this.currentFrame:this.currentFrame-1}this.lastCalled=Date.now()}}return this.frames[this.currentFrame]},a.Video=function(b){var c;return b=a.safeObject(b),this.width=0,this.height=0,a.xt(b.element)?(a.xt(b.element)?b.name=a.xtGet(b.name,b.element.getAttribute("id"),b.element.getAttribute("name"),""):a.xt(b.url)&&(c=b.url.substr(0,128),b.name=a.xtGet(b.name,c,"")),a.Base.call(this,b),a.video[this.name]=this,a.pushUnique(a.videonames,this.name),this.addVideoByElement(b),this):!1},a.Video.prototype=Object.create(a.Base.prototype),a.Video.prototype.type="Video",a.Video.prototype.classname="videonames",a.d.Video={width:0,height:0},a.mergeInto(a.d.Video,a.d.Base),a.Video.prototype.addVideoByElement=function(b){var c=b.element,d=["loadstart","loadedmetadata","loadeddata","canplay","canplaythrough"],e=a.xtGet(b.readyState,1);return a.xt(c)?(c.id=this.name,this.width=1,this.height=1,a.imageFragment.appendChild(c),a.asset[this.name]=a.imageFragment.querySelector("#"+this.name),a.pushUnique(a.assetnames,this.name),this.api=a.asset[this.name],this.api.readyState>=e?(this.setIntrinsicDimensions(),a.isa(b.callback,"fn")&&b.callback()):this.api.addEventListener(d[e],function(){this.setIntrinsicDimensions(),a.isa(b.callback,"fn")&&b.callback()},!1),!0):!1},a.Video.prototype.setIntrinsicDimensions=function(){var b,c,d,e,f;for(a.xt(this.api)?(c=this.api,d=this):(c=this,d=a.video[this.id]),d.width=c.videoWidth,d.height=c.videoHeight,e=0,f=a.entitynames.length;f>e;e++)b=a.entity[a.entitynames[e]],"Picture"===b.type&&b.setCopy();return!0},a.Video.prototype.addVideoByUrl=function(){return!1},a}(scrawl);