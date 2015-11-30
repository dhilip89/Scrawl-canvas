/*! scrawl-canvas 2015-11-30 */
if(window.scrawl&&window.scrawl.work.extensions&&!window.scrawl.contains(window.scrawl.work.extensions,"physics"))var scrawl=function(a){"use strict";return a.physics={gravity:9.8,airDensity:1.23,deltaTime:0},a.work.workphys={v1:a.makeVector(),v2:a.makeVector(),v3:a.makeVector(),v4:a.makeVector(),v5:a.makeVector()},a.updateSprings=function(b){var c,d,e,f,g=a.springnames;if(g.length>0){for(e=a.spring,b=Array.isArray(b)?b:g,c=0,d=b.length;d>c;c++)f=b[c],f.substring&&(f=e[f]),"Spring"===f.type&&f.update();return!0}return!1},a.updateDeltaTime=function(b){return a.xt(b)?(a.physics.deltaTime=b,!0):!1},a.physicsInit=function(){a.makeForce({name:"gravity",fn:function(b){b.load.vectorAdd({y:b.mass*a.physics.gravity})}}),a.makeForce({name:"drag",fn:function(b){var c,d,e;b.currentVelocity.set(b.velocity),c=b.currentVelocity.reverse().normalize(),d=b.velocity.getMagnitude(),e=.5*a.physics.airDensity*d*d*b.area*b.drag,c.scalarMultiply(e),b.load.vectorAdd(c)}})},a.newParticle=function(b){return a.makeParticle(b)},a.newSpring=function(b){return a.makeSpring(b)},a.newForce=function(b){return a.makeForce(b)},a.makeParticle=function(b){return new a.Particle(b)},a.makeSpring=function(b){return new a.Spring(b)},a.makeForce=function(b){return new a.Force(b)},a.Particle=function(b){var c,d=a.makeVector,e=a.work.d.Particle,f=a.xtGet;return a.Base.call(this,b),b=a.safeObject(b),this.place=d(),this.currentPlace=d(),this.velocity=d(),this.currentVelocity=d(),this.set(b),this.priorPlace=d(this.place),this.engine=f(b.engine,"euler"),this.userVar=f(b.userVar,{}),this.mobile=a.isa_bool(b.mobile)?b.mobile:!0,this.forces=f(b.forces,[]),this.springs=f(b.springs,[]),this.mass=f(b.mass,e.mass),this.elasticity=f(b.elasticity,e.elasticity),this.radius=f(b.radius,e.radius),this.area=f(b.area,e.area),a.xto(b.radius,b.area)&&(c=this.radius,this.area=b.area||2*Math.PI*c*c||e.area),this.drag=f(b.drag,e.drag),this.load=d(),a.entity[this.name]=this,a.pushUnique(a.entitynames,this.name),this.group=a.Entity.prototype.getGroup.call(this,b),a.group[this.group].addEntitysToGroup(this.name),this},a.Particle.prototype=Object.create(a.Base.prototype),a.Particle.prototype.type="Particle",a.Particle.prototype.classname="entitynames",a.Particle.prototype.order=0,a.work.d.Particle={group:"",order:0,mobile:!0,mass:1,radius:.1,area:.03,drag:.42,elasticity:1,userVar:{},place:{x:0,y:0,z:0},velocity:{x:0,y:0,z:0},engine:"euler",forces:[],springs:[],load:a.makeVector()},a.mergeInto(a.work.d.Particle,a.work.d.Scrawl),a.Particle.prototype.getStartValues=function(){var a=this.place;return{x:a.x,y:a.y}},a.Particle.prototype.set=function(b){var c,d,e,f,g=a.xto,h=a.makeVector,i=a.xtGet,j=a.safeObject;return b=j(b),c=this.velocity,a.Base.prototype.set.call(this,b),this.velocity=c,this.place.type&&"Vector"===this.place.type||(this.place=h(b.place||this.place)),g(b.start,b.startX,b.startY)&&(c=j(b.start),f=this.place,f.x=i(b.startX,c.x,f.x),f.y=i(b.startY,c.y,f.y)),this.velocity.type&&"Vector"===this.velocity.type||(this.velocity=h(b.velocity||this.velocity)),g(b.delta,b.deltaX,b.deltaY,b.velocity,b.velocityX,b.velocityY)&&(c=j(b.delta),d=j(b.velocity),e=this.velocity,e.x=i(b.velocityX,b.deltaX,c.x,d.x,e.x),e.y=i(b.velocityY,b.deltaY,c.y,d.y,e.y)),this},a.Particle.prototype.clone=function(b){var c,d,e;for(c=a.Base.prototype.clone.call(this,b),c.place=a.makeVector(c.place),c.velocity=a.makeVector(c.velocity),c.forces=[],d=0,e=this.forces.length;e>d;d++)c.forces.push(this.forces[d]);return c},a.Particle.prototype.addForce=function(b){return a.xt(b)&&this.forces.push(b),this},a.Particle.prototype.revert=function(){return this.place.set(this.priorPlace),this},a.Particle.prototype.stamp=function(){var a=this.stampActions;return this.mobile&&(this.calculateLoads(),a[this.engine](this)),this},a.Particle.prototype.stampActions={improvedEuler:function(a){a.updateImprovedEuler()},rungeKutter:function(a){a.updateRungeKutter()},euler:function(a){a.updateEuler()}},a.Particle.prototype.forceStamp=function(){return this.stamp()},a.Particle.prototype.update=function(){return this.stamp()},a.Particle.prototype.calculateLoads=function(){var b,c,d,e=a.force,f=this.forces,g=a.spring,h=this.springs,i=this.load;for(i.zero(),b=0,c=f.length;c>b;b++)d=f[b],d.substring&&e[d]?e[d].run(this):d(this);for(b=0,c=h.length;c>b;b++)d=g[h[b]],d.start===this.name?i.vectorAdd(d.force):d.end===this.name&&i.vectorSubtract(d.force);return this},a.Particle.prototype.updateEuler=function(){var b=a.physics.deltaTime,c=a.work.workphys.v1,d=this.currentVelocity,e=this.velocity;return d.set(e),c.set(this.load).scalarDivide(this.mass).scalarMultiply(b),d.vectorAdd(c),e.set(d),this.priorPlace.set(this.place),this.place.vectorAdd(d.scalarMultiply(b)),this},a.Particle.prototype.updateImprovedEuler=function(){var b,c,d,e=this.currentVelocity,f=this.velocity,g=a.work.workphys,h=a.physics.deltaTime;return e.set(f),b=g.v1.set(this.load).scalarDivide(this.mass).scalarMultiply(h),c=g.v2.set(this.load).vectorAdd(b).scalarDivide(this.mass).scalarMultiply(h),d=b.vectorAdd(c).scalarDivide(2),e.vectorAdd(d),f.set(e),this.priorPlace.set(this.place),this.place.vectorAdd(e.scalarMultiply(h)),this},a.Particle.prototype.updateRungeKutter=function(){var b,c,d,e,f,g=this.velocity,h=this.currentVelocity,i=a.work.workphys,j=a.physics.deltaTime;return h.set(g),b=i.v1.set(this.load).scalarDivide(this.mass).scalarMultiply(j).scalarDivide(2),c=i.v2.set(this.load).vectorAdd(b).scalarDivide(this.mass).scalarMultiply(j).scalarDivide(2),d=i.v3.set(this.load).vectorAdd(c).scalarDivide(this.mass).scalarMultiply(j),e=i.v4.set(this.load).vectorAdd(d).scalarDivide(this.mass).scalarMultiply(j),f=i.v5,c.scalarMultiply(2),d.scalarMultiply(2),f.set(b).vectorAdd(c).vectorAdd(d).vectorAdd(e).scalarDivide(6),h.vectorAdd(f),g.set(h),this.priorPlace.set(this.place),this.place.vectorAdd(h.scalarMultiply(j)),this},a.Particle.prototype.linearCollide=function(b){var c,d,e,f,g=a.work.workphys,h=this.velocity,i=this.mass;return c=g.v1.set(this.place).vectorSubtract(b.place).normalize(),d=g.v2.set(h).vectorSubtract(b.velocity),e=d.getDotProduct(c),f=g.v3,e=-e*(1+(this.elasticity+b.elasticity)/2),e/=1/i+1/b.mass,f.set(c).scalarMultiply(e),h.vectorAdd(f.scalarDivide(i)),b.velocity.vectorAdd(f.scalarDivide(b.mass).reverse()),this},a.Particle.prototype.addSpring=function(b){var c,d,e={start:null,end:null},f=a.entity,g=a.pushUnique,h=a.makeSpring;return b.substring&&f[b]?(d=b,e.start=this.name,e.end=b,c=h(e)):(b=a.safeObject(b),d=b.end||!1,d&&f[d]&&(b.start=this.name,c=h(b))),c&&(g(this.springs,c.name),g(f[d].springs,c.name)),this},a.Particle.prototype.removeSprings=function(){var b,c,d,e=a.spring;for(d=this.springs.slice(0),b=0,c=d.length;c>b;b++)e[d[b]].kill();return this},a.Particle.prototype.removeSpringsTo=function(b){var c,d,e,f=[],g=a.spring,h=this.springs;if(a.xt(b)&&a.entity[b]){for(c=0,d=h.length;d>c;c++)e=g[h[c]],(e.start===this.name||e.end===this.name)&&f.push(h[c]);for(c=0,d=f.length;d>c;c++)g[f[c]].kill()}return this},a.Particle.prototype.pickupEntity=function(){return this},a.Particle.prototype.dropEntity=function(){return this},a.Particle.prototype.updateStart=function(){return this},a.pushUnique(a.work.sectionlist,"spring"),a.pushUnique(a.work.nameslist,"springnames"),a.Spring=function(b){var c,d,e,f=a.makeVector,g=a.entity;return b=a.safeObject(b),a.xta(b.start,b.end)?(c=g[b.start],d=g[b.end],a.Base.call(this,b),this.start=b.start,this.end=b.end,this.springConstant=b.springConstant||1e3,this.damperConstant=b.damperConstant||100,a.xt(b.restLength)?this.restLength=b.restLength:(e=a.work.workphys.v1.set(d.place),e.vectorSubtract(c.place),this.restLength=e.getMagnitude()),this.currentLength=b.currentLength||this.restLength,this.force=f(),this.currentForce=f(),a.spring[this.name]=this,a.pushUnique(a.springnames,this.name),this):!1},a.Spring.prototype=Object.create(a.Base.prototype),a.Spring.prototype.type="Spring",a.Spring.prototype.classname="springnames",a.work.d.Spring={start:"",end:"",springConstant:1e3,damperConstant:100,restLength:1,currentLength:1,force:{x:0,y:0,z:0}},a.mergeInto(a.work.d.Spring,a.work.d.Scrawl),a.Spring.prototype.update=function(){var b,c,d,e,f=a.work.workphys,g=a.entity,h=g[this.start],i=g[this.end];return b=f.v1.set(i.velocity).vectorSubtract(h.velocity),c=f.v2.set(i.place).vectorSubtract(h.place),d=f.v3.set(c).normalize(),e=f.v4.set(d),this.force.set(d.scalarMultiply(this.springConstant*(c.getMagnitude()-this.restLength)).vectorAdd(b.vectorMultiply(e).scalarMultiply(this.damperConstant).vectorMultiply(e))),this},a.Spring.prototype.kill=function(){var b=a.removeItem,c=a.entity,d=this.name;return b(c[this.start].springs,d),b(c[this.end].springs,d),delete a.spring[d],b(a.springnames,d),!0},a.pushUnique(a.work.sectionlist,"force"),a.pushUnique(a.work.nameslist,"forcenames"),a.Force=function(b){return a.Base.call(this,b),b=a.safeObject(b),this.fn=b.fn||function(){},a.force[this.name]=this,a.pushUnique(a.forcenames,this.name),this},a.Force.prototype=Object.create(a.Base.prototype),a.Force.prototype.type="Force",a.Force.prototype.classname="forcenames",a.work.d.Force={fn:function(){}},a.mergeInto(a.work.d.Force,a.work.d.Scrawl),a.Force.prototype.run=function(a){return this.fn(a)},a.Force.prototype.kill=function(){return delete a.force[this.name],a.removeItem(a.forcenames,this.name),!0},a}(scrawl);