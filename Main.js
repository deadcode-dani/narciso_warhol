'use strict';function randomHash(a,d){d-=a;return a+randomDec()*d}function randomDec(){return random()}function randomHashArray(a){return a[Math.floor(randomDec()*a.length)]}function radomProbArray(a){let d=randomDec(),b=0;for(let c=0;c<a.length;c++)if(b+=a[c][0],b>d)return a[c][1];return null}function randomHashCoef(a,d,b=1){return Math.floor(randomDec()*(d-a+1)+a)*b}function randomBoolean(){return.5>randomDec()?!0:!1}
function setup(){angleMode(RADIANS);setup_canvas();console.log(dedacode_hashkey);console.log(seed);randomSeed(seed);noiseSeed(seed);randomSetup()}
function draw(){draw_setup_canvas();preloadActive&&time_preload<=preloadMaxTime&&(clear(),preload_canvas(canvas_effettivo),draw_barra_caricamento(this,w/2-w/4,h/2,w/2,h/10,10,colorWhite,canvas_background,time_preload,preloadMaxTime));time_preload==preloadMaxTime+1&&preloadActive&&(clear(),background(canvas_background));if(time_preload>preloadMaxTime&&time_draw<time_draw_end||!preloadActive)draw_scene(canvas_effettivo),image(canvas_effettivo,0,0);time_draw>=time_draw_end&&noLoop()}
function setup_canvas(){if(canvas_dinamico){canvas_visualizzato=createCanvas(windowWidth,windowHeight);proporzione_effettivo=w/h;proporzione_visualizzato=windowWidth/windowHeight;let a=!0;1>proporzione_effettivo&&(a=!1);proporzione_effettivo<proporzione_visualizzato&&1<=proporzione_effettivo&&(a=!1);proporzione_effettivo>=proporzione_visualizzato&&1>proporzione_effettivo&&(a=!0);a?(scale_val=windowWidth/w,diff_x=0,diff_y=(windowHeight-h*scale_val)/2):(scale_val=windowHeight/h,diff_x=(windowWidth-
w*scale_val)/2,diff_y=0);canvas_effettivo=createGraphics(w,h);background(canvas_background)}else canvas_visualizzato=createCanvas(w,h),canvas_effettivo=createGraphics(w,h)}function draw_setup_canvas(){canvas_dinamico&&(translate(diff_x,diff_y),scale(scale_val))}function keyPressed(){"s"==key&&saveCanvas(canvas_effettivo,"_deadcode_"+name_file+".png")}function preload_canvas(a){drawMainTest_001(a,time_preload);time_preload++}function draw_scene(a){time_draw++}
function draw_barra_caricamento(a,d,b,c,e,k,f,l,g,n){a.background(l);a.noFill();a.stroke(f);a.strokeWeight(k);a.rect(d,b,c,e,20);a.fill(f);a.stroke(l);a.rect(d+k,b+(e-.9*e)/2,g/n*c*((c-2*k)/c),.9*e,20)}let factor,colorBack,colorLineLight,colorLineHard,factorLineLight,factorLineHard,factorDirt,colorDirt;
function drawTexture(a,d,b,c){if(1==d){null!=b?(factor=b[0],colorBack=b[1],colorLineLight=b[2],factorLineLight=b[3],colorLineHard=b[4],factorLineHard=b[5],colorDirt=b[6],factorDirt=b[7]):(factor=18,colorBack="#8B8682",colorLineLight="#E1C699",factorLineLight=8,colorLineHard=[220,220,220],factorLineHard=5,colorDirt=[70,70,70,200],factorDirt=35);c.noStroke();c.fill(colorBack);c.beginShape();for(var e=0;e<a.length;e++)c.vertex(a[e].x,a[e].y);c.endShape(CLOSE);var k=w;e=0;var f=h,l=0;for(var g=0;g<a.length;g++)a[g].x<
k&&(k=a[g].x),a[g].x>e&&(e=a[g].x),a[g].y<f&&(f=a[g].y),a[g].y>l&&(l=a[g].y);c.noStroke();var n=randomHash(60,120);g=.05;let r=.1;for(var m=k;m<e;m+=factor/2)for(var q=f;q<l;q+=factor/2)c.fill([red(colorDirt),green(colorDirt),blue(colorDirt),noise(m*g,q*r)*n]),pointInside(m,q,a)&&c.circle(m+randomHash(-4,4),q+randomHash(-4,4),noise(.002*m,.002*q)*factorDirt);c.strokeWeight(1);c.stroke(colorLineLight);g=randomHash(1E-4,.005);r=.4;for(k/=factor;k<e/factor;k++)for(n=f/factor;n<l/factor;n++)m=k*factor+
sin(noise_value(k,n,g,r,TWO_PI))*factor*factorLineLight,q=n*factor-cos(noise_value(k,n,g,r,TWO_PI))*factor*factorLineLight,pointInside(k*factor,n*factor,a)&&c.line(k*factor,n*factor,m,q)}if(11==d){null!=b?(factor=b[0],colorBack=b[1],colorLineLight=b[2],factorLineLight=b[3],colorLineHard=b[4],factorLineHard=b[5],colorDirt=b[6],factorDirt=b[7]):(factor=18,colorBack="#8B8682",colorLineLight="#E1C699",factorLineLight=8,colorLineHard=[220,220,220],factorLineHard=5,colorDirt=[70,70,70,200],factorDirt=35);
c.noStroke();c.fill(colorBack);l=w;d=0;b=h;e=0;for(f=0;f<a.length;f++)a[f].x<l&&(l=a[f].x),a[f].x>d&&(d=a[f].x),a[f].y<b&&(b=a[f].y),a[f].y>e&&(e=a[f].y);c.noStroke();for(f=randomHash(60,120);l<d;l+=factor/2)for(g=b;g<e;g+=factor/2)c.fill([red(colorDirt),green(colorDirt),blue(colorDirt),noise(.05*l,.1*g)*f]),pointInside(l,g,a)&&c.circle(l+randomHash(-4,4),g+randomHash(-4,4),noise(.002*l,.002*g)*factorDirt)}}function noise_value(a,d,b,c,e){return map(noise(a*b,d*c),0,1,0,e)}
function drawCompleteMandala(a,d,b,c,e,k){randomSeed(k);noiseSeed(k);k=int(randomHash(6,9));let f=randomHash(.04,.055);for(let g=0;g<k;g++){var l=c[1];let n=randomHashArray([c[2],c[3]]);0<g&&(l=randomHashArray([c[1],c[2],c[3]]));l=0<g?drawMandalaFoglie(a,d,b*(.46-g*f),0,c[0],l,e-.6*e*g/k):drawMandalaFoglie(a,d,b*(.46-g*f),0,c[0],l,1.1*e);3>randomHash(0,10)&&drawAllManyCircle(a,d,l,b*(.36-g*f),e-.6*e*g/k,c[0],n)}a.stroke(c[0]);a.fill(c[2]);a.circle(d.x,d.y,.25*b);drawMandalaCenter(a,d,.15*b,0,c[0],
255,e)}function drawAllManyCircle(a,d,b,c,e,k,f){a.fill(f);a.strokeWeight(.4*e);a.stroke(k);f=c;5>randomHash(0,10)&&(f=randomHash(.8*c,1.1*c));let l=int(randomHash(2,6)),g=randomHash(c/b,2.8*c/b);e=randomHash(1.5*e,3*e);drawManyCircle(a,d,b,f,g,e,l,0);5>randomHash(0,10)&&(drawManyCircle(a,d,b,c,.07*c,e,1,0),a.fill(k),drawManyCircle(a,d,b,c,.04*c,e,1,0))}
function drawFogliaBez(a,d,b,c,e,k,f,l,g,n,m,q,r,u,p){a.strokeWeight(p);p=TWO_PI/b;k*=p;f*=e;l*=e;g*=e;r*=e;u*=p;for(let t=0;t<b;t++){var v=d.x+sin(t*p)*c,x=d.y+cos(t*p)*c;let A=d.x+sin(t*p)*(c-l),B=d.y+cos(t*p)*(c-l);var y=d.x+sin(t*p)*(c-e),z=d.y+cos(t*p)*(c-e);let C=d.x+sin(t*p)*(c-e+l),D=d.y+cos(t*p)*(c-e+l),E=d.x+sin(t*p-k)*(c-f),F=d.y+cos(t*p-k)*(c-f),G=d.x+sin(t*p+k)*(c-f),H=d.y+cos(t*p+k)*(c-f);n&&a.circle(v,x,g);m&&a.circle(y,z,g);v=E;x=F;y=G;z=H;q&&(v=d.x+sin(t*p-u)*(c-r),x=d.y+cos(t*p-
u)*(c-r),y=d.x+sin(t*p+u)*(c-r),z=d.y+cos(t*p+u)*(c-r));a.bezier(A,B,E,F,v,x,C,D);a.bezier(A,B,G,H,y,z,C,D)}}
function drawMandalaFoglie(a,d,b,c,e,k,f){randomHash(.6*b,.8*b);a.stroke(0);a.noFill();a.strokeWeight(f);c=int(randomHash(2,7));let l=b/20,g=int(randomHash(8,17)),n=randomHash(.4,.7),m=randomHash(.4,.7),q=randomHash(.02,.1),r=randomHash(0,.2),u=!1;4>randomHash(0,10)&&(r=randomHash(.7,.9));5>randomHash(0,10)&&(u=!0);for(let p=c;0<p;p--){let v=b-l*(c-p),x=10*l-l*(c-p);u&&(v=b-l*p,x=10*l-l*p);let y=n-.08*(c-p),z=randomBoolean();a.stroke(e);a.fill(k);drawFogliaBez(a,d,g,v,x,y,m,r,q,!1,z,!1,.5,.5,f);drawFogliaBez(a,
d,g,v,x,y,m,r,q,!1,z,!1,.5,.5,0)}return g}
function drawMandalaCenter(a,d,b,c,e,k,f){randomHash(.6*b,.8*b);a.stroke(k);a.noFill();a.strokeWeight(f);c=int(randomHash(4,8));for(b/=c;0<c;c--){f=b*c;let l=randomHash(.2*f,.9*f),g=int(randomHash(5,12)),n=randomHash(.1,.7),m=randomHash(.1,.9),q=randomHash(0,.3),r=randomHash(.1,.3),u=randomBoolean(),p=randomBoolean(),v=randomBoolean(),x=randomHash(.1,.9),y=randomHash(.1,.8);a.stroke(e);a.fill(k);drawFogliaBez(a,d,g,f,l,n,m,q,r,u,p,v,x,y,30);drawFogliaBez(a,d,g,f,l,n,m,q,r,u,p,v,x,y,20);a.stroke(k);
a.fill(e);drawFogliaBez(a,d,g,f,l,n,m,q,r,u,p,v,x,y,10);drawFogliaBez(a,d,g,f,l,n,m,q,r,u,p,v,x,y,0)}}function drawManyCircle(a,d,b,c,e,k,f,l){let g=TWO_PI/b;for(let n=0;n<f;n++)for(let m=0;m<b;m++){let q=d.x+sin(m*g+l)*c,r=d.y+cos(m*g+l)*c;a.circle(q,r,e-k*n)}}function makeStruct(a){a=a.split(" ");var d=a.length;return function(){for(var b=0;b<d;b++)this[a[b]]=arguments[b]}}let VarCoord=makeStruct("x y"),VarCircle=makeStruct("x y r");
function calcDistPunti(a,d,b,c){return sqrt(pow(b-a,2)+pow(c-d,2))}function calcDistPuntiCoord(a,d){return abs(sqrt(pow(d.x-a.x,2)+pow(d.y-a.y,2)))}function findPoints(a,d,b,c){v1=createVector(a.x,a.y);v2=createVector(d.x,d.y);v3=p5.Vector.sub(v1,v2);angle_h=v3.heading();LX=b*cos(angle_h+c);LY=b*sin(angle_h+c);RX=b*cos(angle_h-c);RY=b*sin(angle_h-c);a=[];a[0]=new VarCoord(v1.x+LX+cos(angle_h),v1.y+LY+sin(angle_h));a[1]=new VarCoord(v2.x+LX+cos(angle_h),v2.y+LY+sin(angle_h));return a}
function calcolaAngolo(a,d){return atan2(d.y-a.y,d.x-a.x)}function findPointsRetta(a,d,b){v1=createVector(a.x,a.y);LX=d*cos(b);LY=d*sin(b);return new VarCoord(v1.x+LX+cos(b),v1.y+LY+sin(b))}function calcPuntoRettaCoord(a,d,b){angle=calcolaAngolo(a,d);return findPointsRetta(a,b,angle)}
function calcPuntoRetta(a,d,b,c,e,k){let f,l=1;a=Math.trunc(a);d=Math.trunc(d);b=Math.trunc(b);c=Math.trunc(c);b<=a&&c<=d&&(l=-1);d==c?(k.x=a+e*l,k.y=d):a!=b?(f=(d-c)/(a-b),b=(b*d-a*c)/(b-a),0>f&&d<c&&(l=-1),k.x=(a*sqrt(1+pow(f,2))+e*l)/sqrt(1+pow(f,2)),k.y=f*k.x+b):(k.x=a,k.y=d+e*l)}function pointInside(a,d,b){for(var c=!1,e=0,k=0;k<b.length;k++){e<b.length-1?e++:e=0;let f=(b[e].x-b[k].x)*(d-b[k].y)/(b[e].y-b[k].y)+b[k].x;(b[k].y>=d&&b[e].y<d||b[k].y<d&&b[e].y>=d)&&a<f&&(c=!c)}return c}
function distAngolare(a,d){a=Math.abs(a-d);a>PI&&(a=TWO_PI-a);return a}function insideRange(a,d,b){return a<d?d:a>b?b:a}function intersect_point(a,d,b,c){b=((c.x-b.x)*(a.y-b.y)-(c.y-b.y)*(a.x-b.x))/((c.y-b.y)*(d.x-a.x)-(c.x-b.x)*(d.y-a.y));return new VarCoord(a.x+b*(d.x-a.x),a.y+b*(d.y-a.y))}
function calcCoordMatrix(a,d,b,c,e,k){var f=calcDistPuntiCoord(a,d);f=calcPuntoRettaCoord(a,d,f*e);var l=calcDistPuntiCoord(c,b);e=calcPuntoRettaCoord(c,b,l*e);l=calcDistPuntiCoord(d,b);d=calcPuntoRettaCoord(d,b,l*k);b=calcDistPuntiCoord(a,c);a=calcPuntoRettaCoord(a,c,b*k);return intersect_point(f,e,d,a)}function findCircleIntersect(a,d,b){for(let c=0;c<a.length;c++)if(calcDistPunti(a[c].x,a[c].y,d,b)<a[c].r)return!0;return!1}
function calcPuntParalleli(a,d,b,c,e){let k,f,l,g=[];a=Math.trunc(a);d=Math.trunc(d);b=Math.trunc(b);c=Math.trunc(c);g[0]=new VarCoord(0,0);g[1]=new VarCoord(0,0);g[2]=new VarCoord(0,0);g[3]=new VarCoord(0,0);f=a;l=1;a>b&&(l=-l);if(a!=b){var n=(d-c)/(a-b);k=(b*d-a*c)/(b-a);f=(f*sqrt(1+pow(n,2))-l*e)/sqrt(1+pow(n,2));var m=-1/n;n=n*f+k-m*f;g[0].x=(f*sqrt(1+pow(m,2))-e)/sqrt(1+pow(m,2));g[0].y=m*g[0].x+n;g[1].x=(f*sqrt(1+pow(m,2))+e)/sqrt(1+pow(m,2));g[1].y=m*g[1].x+n}f=a;m=d;if(d==c||1>abs(d-c))g[0].x=
f-l*e,g[0].y=m+e,g[1].x=f-l*e,g[1].y=m-e;a==b&&(d>c&&(l=-l),g[0].x=f+e,g[0].y=m-l*e,g[1].x=f-e,g[1].y=m-l*e);f=b;l=-1;a>b&&(l=-l);a!=b&&(n=(d-c)/(a-b),k=(b*d-a*c)/(b-a),f=(f*sqrt(1+pow(n,2))-l*e)/sqrt(1+pow(n,2)),m=-1/n,n=n*f+k-m*f,g[3].x=(f*sqrt(1+pow(m,2))-e)/sqrt(1+pow(m,2)),g[3].y=m*g[3].x+n,g[2].x=(f*sqrt(1+pow(m,2))+e)/sqrt(1+pow(m,2)),g[2].y=m*g[2].x+n);f=b;m=c;if(d==c||1>abs(d-c))g[3].x=f-l*e,g[3].y=m+e,g[2].x=f-l*e,g[2].y=m-e;a==b&&(g[3].x=f+e,g[3].y=m-l*e,g[2].x=f-e,g[2].y=m-l*e);return g}
function drawMainTest_001(a,d){if(9==d){a.background(255);3>randomHash(0,10)&&(p_num_colonne=p_num_righe=2);d=!1;3>randomHash(0,10)&&(bordino=5);3>randomHash(0,10)&&(d=!0);var b=p_sfondo.sort(()=>.5-Math.random());let l=[],g=[],n=[];var c=[];let m=(w-2*dimBordo)/p_num_colonne,q=(h-2*dimBordo)/p_num_righe;randomHash(0,1E3);var e=0;for(var k=0;k<p_num_colonne;k++){l[k]=[];g[k]=[];n[k]=[];c[k]=[];for(var f=0;f<p_num_righe;f++)a.noStroke(),a.fill(b[e]),a.rect(dimBordo+k*m+bordino,dimBordo+f*q+bordino,
m-2*bordino,q-2*bordino),c[k][f]=p_sfondo[e],l[k][f]=randomHashArray(p_col_layer1),g[k][f]=randomHashArray(p_col_layer1),n[k][f]=randomHashArray(p_col_black),e++}b=randomHash(0,1E4);c=createGraphics(m-2*bordino,q-2*bordino);if(d){e=new VarCoord(0,0);k=new VarCoord(0,q-2*bordino);f=new VarCoord(m-2*bordino,q-2*bordino);let r=new VarCoord(m-2*bordino,0);drawTexture([e,k,f,r],11,[18,0,"#E1C699",1,[220,220,220],5,[30,30,30,120],15],c)}for(e=0;e<p_num_colonne;e++)for(k=0;k<p_num_righe;k++)d&&a.image(c,
dimBordo+e*m+bordino,dimBordo+k*q+bordino),f=new VarCoord(dimBordo+e*m+m/2,dimBordo+k*q+q/2),drawCompleteMandala(a,f,m,[n[e][k],255,l[e][k],g[e][k]],int(.012*m),b)}};
