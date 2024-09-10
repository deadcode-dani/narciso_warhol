//IL SEED VIENE SETTATO IN INDEX.HTML


//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO HASH RIPORTANDOLO NELL' INTERVALLO DI VALORI INIZIO FINE
//RESTITUISCE UN VALORE RANDOMICO CONTINUO NELL'INTERVALLO
function randomHash(inizio,fine)
{
    let diff=fine-inizio;
    return inizio+randomDec()*diff;
}

//Funzione che restituisce un valore decimale tra 0 e 1
function randomDec() 
{ 
  return random();
}

//Funzione che restiuscie un elemento dell'array in modo casuale
//utile per la scelta di parametri casuali con distribuzione omogena delle probabilità come palette di colori 
//o array con molti elementi
function randomHashArray(arr) 
{ 
  return arr[Math.floor(randomDec() * arr.length)] 
}

//Funzione che prende in input un array di array. il primo elemento sel sottoarray è la probabilità con cui può essere 
//scelto il valore di quel sottoarray
function radomProbArray(arr)
{ 
  let ndec=randomDec();
  let tprob=0;
  for(let i=0;i<arr.length;i++)
  {  
      tprob=tprob+arr[i][0];
      if(tprob>ndec)
        return arr[i][1];
  }
  return null;
}

//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO DISCRETO NELL' INTERVALLO DI VALORI INIZIO FINE
//ES: randomHashCoef(10,20, 1) restituisce i valori 10,11,12,13...20
//ES: randomHashCoef(100,200, 0.1) restituisce i valori 10.1,10.2,10.3,10.4...20
function randomHashCoef(inizio,fine, x = 1) 
{ 
    return Math.floor(randomDec() * (fine - inizio + 1) + inizio) * x;
}

//FUNZIONE CHE RESTITUISCE UN VALORE RANDOMICO BOOLEANO, VERO O FALSO
function randomBoolean()
{
    if(randomDec()<0.5)
      return true;
    else
      return false;
}


function setup(){
  angleMode(RADIANS);

  //CREA IL CANVAS IN MODO DINAMICO
  setup_canvas(); 
  //canvas_visualizzato.parent('canvas'); //DA RIATTIVARE CON USO PAGINA INDEX2
  
  console.log(dedacode_hashkey)
  console.log(seed)
  
  randomSeed(seed);
  noiseSeed(seed)

  randomSetup();


}

function draw(){
  //SETUP CANVAS DINAMICO
  draw_setup_canvas(); 
  
  
  //BARRA DI PRELOAD
  if(preloadActive)
    if(time_preload<=preloadMaxTime)
    {
      clear();
      preload_canvas(canvas_effettivo)
      draw_barra_caricamento(this,w/2-(w/4),h/2,w/2,h/10,10,colorWhite,canvas_background,time_preload,preloadMaxTime);
    }
  
  //PULISCE LO SCHERMO DOPO LA BARRA DI PRELOAD
  if((time_preload==preloadMaxTime+1)&&(preloadActive))
  {
    clear();
    background(canvas_background);
  }
  

  
  //DISEGNO EFFETTIVO LIVE
  if(((time_preload>preloadMaxTime)&&(time_draw<time_draw_end))||(!preloadActive))
  {  
    
    draw_scene(canvas_effettivo)
    //VISUALIZZA CANVAS EFFETTIVO IN CANVAS VISUALIZZATO
    image(canvas_effettivo,0,0)
  
  }
  
  //ARRIVATI AL TEMPO MASSIMO DI DISEGNO LIVE IMPOSTA noLoop()
  if(time_draw>=time_draw_end)
  { 
    noLoop();
    
  }
}

//funzione da richiamare all'inizio di setup() per istanziare canvas effettivo e visualizzato
function setup_canvas()
{
   if(canvas_dinamico)
   {
      canvas_visualizzato=createCanvas(windowWidth, windowHeight);
     
      proporzione_effettivo=w/h;
      proporzione_visualizzato=windowWidth/windowHeight;
     
      //SE PROPORZIONE EFFETTIVO >1 SIGNIFICA CHE L'IMMAGINE DI PARTENZA HA UN FORMATO ORIZZONTALE
      let v_flag_oriz=true
      
      if(proporzione_effettivo<1)
        v_flag_oriz=false;
     
      //Se l'immagine iniziale è orizzontale ma la proporzione della finestra di visualizzazione è ancora piu' orizzontale come proporzione allora utilizza il lato verticale per proporzionare
      if((proporzione_effettivo<proporzione_visualizzato)&&(proporzione_effettivo>=1))
        v_flag_oriz=false;
     
      //se l'immagine iniziale è verticale ma la proporzione della finestra di visualizzazione è ancora piu' verticale come proporzione allora utilizza il lato orizzontale per proporzionare
      if((proporzione_effettivo>=proporzione_visualizzato)&&(proporzione_effettivo<1))
        v_flag_oriz=true;
     
      if(v_flag_oriz)
      {
        scale_val=windowWidth/w;
        diff_x=0;
        diff_y=(windowHeight-(h*scale_val))/2;
      }
      else
      {
        scale_val=windowHeight/h;
        diff_x=(windowWidth-(w*scale_val))/2;
        diff_y=0;
      }
      canvas_effettivo = createGraphics(w, h);
     
      background(canvas_background);
   }
   else
   {
     canvas_visualizzato=createCanvas(w, h);
     canvas_effettivo = createGraphics(w, h);
   }
}

//funzione da richiamare all'inizio di draw per effettuare il setup
function draw_setup_canvas()
{
    if(canvas_dinamico)
    {
      translate(diff_x,diff_y);
      scale(scale_val);
    }
}

//funzione per estire salvataggio file dimensioni effettive PNG
function keyPressed() {
  if (key == 's') {
      saveCanvas(canvas_effettivo, '_deadcode_'+name_file+'.png');
  }
}

//Funzione di preload. Calcola e prepara eventuali oggetti e strutture e/o disegna alcuni livelli grafici
function preload_canvas(panel)
{
     //INSERISCI QUI LE FUNZIONI DI PRELOAD PASSANDO IL TEMPO CHE DEVE ESSERE AVANZATO AD OGNI AZIONE O GRUPPO DI AZIONI
    //***INIZIO***
    drawMainTest_001(panel,time_preload);
    //***FINE***
  
    time_preload++;
}


function draw_scene(panel)
{ 
  //if(time_draw==0)
    //panel.background(canvas_eff_background);
  //INSERISCI QUI LE FUNZIONI DI PRELOAD PASSANDO IL TEMPO CHE DEVE ESSERE AVANZATO AD OGNI AZIONE O GRUPPO DI AZIONI
  //***INIZIO***
  //drawMainTest_001(panel,time_draw);
  //***FINE***
  time_draw++;
  

}

//Funzione che disegna la barra di caricamento iniziale da usare nel preload
function draw_barra_caricamento(panel,x,y,lunghezza,larghezza,spessore,c1,c2,p_time,p_max_time)
{
   //Disegna contorno esterno della barra
   panel.background(c2);
   panel.noFill();
   panel.stroke(c1)
   panel.strokeWeight(spessore)
   panel.rect(x, y, lunghezza, larghezza, 20);
  
   //Disegna riempimento interno della barra
   panel.fill(c1);
   panel.stroke(c2);
   let rap_x=(lunghezza-(spessore*2))/lunghezza;
   let lunghezza_int=(p_time/p_max_time)*lunghezza*rap_x;
   let d_y=(larghezza-(larghezza*0.9))/2
   panel.rect(x+spessore, y+d_y, lunghezza_int, larghezza*0.9, 20);
  
}

//DISEGNA TEXTURE
let factor,colorBack,colorLineLight,colorLineHard,factorLineLight,factorLineHard,factorDirt,colorDirt;
function drawTexture(verticiPoly,
                     textureID,
                     params,
                     panel
                   )
{
  if(textureID==1) //TESSUTI
  { 
     //IMPOSTA PARAMETRI DELLA TEXTURE
     if(params!=null)
     { 
       factor=params[0];
       colorBack=params[1];
       colorLineLight=params[2];
       factorLineLight=params[3];
       colorLineHard=params[4];
       factorLineHard=params[5];
       colorDirt=params[6];
       factorDirt=params[7];
      }
    else //DEFAULT
     { 
       factor=18;
       colorBack="#8B8682" //"#E1C699"//[130,130,130]; //GRIGIO
       colorLineLight="#E1C699"
       factorLineLight=8;
       colorLineHard=[220,220,220];
       factorLineHard=5;
       colorDirt=[70,70,70,200];
       factorDirt=35;
      }
    
    panel.noStroke();

    panel.fill(colorBack);

    //SFONDO COLORATO DELLA PEZZA
    panel.beginShape();
    for(let i=0;i<verticiPoly.length;i++)
      panel.vertex(verticiPoly[i].x,verticiPoly[i].y);
    panel.endShape(CLOSE);

    let min_x=w; let max_x=0;
    let min_y=h; let max_y=0;

    //trova x min e max
    for(let i=0;i<verticiPoly.length;i++)
    {  
       if(verticiPoly[i].x<min_x)
         min_x=verticiPoly[i].x;
       if(verticiPoly[i].x>max_x)
         max_x=verticiPoly[i].x;

       if(verticiPoly[i].y<min_y)
         min_y=verticiPoly[i].y;
       if(verticiPoly[i].y>max_y)
         max_y=verticiPoly[i].y;
    }



    //EFFETTO SPORCO
    panel.noStroke();
    let fDelta=randomHash(60,120)
    let f1=0.05; //randomHash(0.05,0.3)
    let f2=0.1; //randomHash(0.05,0.1)

    for(let x=min_x; x<max_x; x+=factor/2){
      for(let y=min_y; y<max_y; y+=factor/2){
        panel.fill([red(colorDirt),green(colorDirt),blue(colorDirt),noise(x*f1,y*f2)*fDelta])
         if(pointInside(x,y, verticiPoly))
           panel.circle(x+randomHash(-4,4),y+randomHash(-4,4),noise(x*0.002,y*0.002)*factorDirt)
          }
    }
    
    //EFFETTO CHIARO
  
    panel.strokeWeight(1)
    panel.stroke(colorLineLight);
    f1=randomHash(0.0001,0.005) //randomHash(0.008,0.01)
    f2=0.4
    for (var x = min_x/factor; x < max_x/factor; x++) { 
      for (var y = min_y/factor; y < max_y/factor; y++) {
          let x1=x*factor+(sin(noise_value(x,y,f1,f2,TWO_PI))*factor*factorLineLight)
          let y1=y*factor-(cos(noise_value(x,y,f1,f2,TWO_PI))*factor*factorLineLight)

          if(pointInside(x*factor,y*factor, verticiPoly))
            panel.line(x*factor,y*factor,x1,y1)
      }
    }


  } //END if(textureID==1)
  
  
   if(textureID==11) //TESSUTI
  { 
     //IMPOSTA PARAMETRI DELLA TEXTURE
     if(params!=null)
     { 
       factor=params[0];
       colorBack=params[1];
       colorLineLight=params[2];
       factorLineLight=params[3];
       colorLineHard=params[4];
       factorLineHard=params[5];
       colorDirt=params[6];
       factorDirt=params[7];
      }
    else //DEFAULT
     { 
       factor=18;
       colorBack="#8B8682" //"#E1C699"//[130,130,130]; //GRIGIO
       colorLineLight="#E1C699"
       factorLineLight=8;
       colorLineHard=[220,220,220];
       factorLineHard=5;
       colorDirt=[70,70,70,200];
       factorDirt=35;
      }
    
    panel.noStroke();

    panel.fill(colorBack);


    
    let min_x=w; let max_x=0;
    let min_y=h; let max_y=0;

    //trova x min e max
    for(let i=0;i<verticiPoly.length;i++)
    {  
       if(verticiPoly[i].x<min_x)
         min_x=verticiPoly[i].x;
       if(verticiPoly[i].x>max_x)
         max_x=verticiPoly[i].x;

       if(verticiPoly[i].y<min_y)
         min_y=verticiPoly[i].y;
       if(verticiPoly[i].y>max_y)
         max_y=verticiPoly[i].y;
    }



    //EFFETTO SPORCO
    panel.noStroke();
    let fDelta=randomHash(60,120)
    let f1=0.05; //randomHash(0.05,0.3)
    let f2=0.1; //randomHash(0.05,0.1)

    for(let x=min_x; x<max_x; x+=factor/2){
      for(let y=min_y; y<max_y; y+=factor/2){
        panel.fill([red(colorDirt),green(colorDirt),blue(colorDirt),noise(x*f1,y*f2)*fDelta])
         if(pointInside(x,y, verticiPoly))
           panel.circle(x+randomHash(-4,4),y+randomHash(-4,4),noise(x*0.002,y*0.002)*factorDirt)
          }
    }
    


  } //END if(textureID==11)
  
}

function noise_value(x,y,f1,f2,maxMap)
{ 
    return map(noise(x*f1, y*f2), 0, 1, 0, maxMap);
}


//disegna il mandala completo
//pC coordinate centrali del mandala
//p_dim dimensione (raggio) del mandala
//p_list_color lista dei 4 colori usati
//p_spessore = spessore dei bordi
//p_num_rand è il numero casuale che determina il disegno del mandala
function drawCompleteMandala(panel,
                             pC,p_dim,p_list_color,p_spessore,p_num_rand)
{
    randomSeed(p_num_rand);
    noiseSeed(p_num_rand);
  
    let p_ret;
    let p_strati=int(randomHash(6,9));
    let p_dist_strati=randomHash(0.04,0.055);
  
    for(let k=0;k<p_strati;k++)
    {
      let p_color_1=p_list_color[1];
      let p_color_2=randomHashArray([p_list_color[2],
                                   p_list_color[3]]);
      if(k>0)
        p_color_1=randomHashArray([p_list_color[1],p_list_color[2],
                                   p_list_color[3]]) 
      if(k>0)
      p_ret=drawMandalaFoglie(panel,pC,p_dim*(0.46-(k*p_dist_strati)),0,
                            p_list_color[0],p_color_1,
                              p_spessore-(p_spessore*0.6*k/p_strati))
      else
     p_ret=drawMandalaFoglie(panel,pC,p_dim*(0.46-(k*p_dist_strati)),0,
                            p_list_color[0],p_color_1,
                              p_spessore*1.1)

      if(randomHash(0,10)<3)
        drawAllManyCircle(panel,pC,p_ret,p_dim*(0.36-(k*p_dist_strati)),
                          p_spessore-(p_spessore*0.6*k/p_strati),
                          p_list_color[0],p_color_2)
    }
    panel.stroke(p_list_color[0])
    panel.fill(p_list_color[2])
    panel.circle(pC.x,pC.y,p_dim*0.25);
  
    drawMandalaCenter(panel,pC,p_dim*0.15,0,
                        p_list_color[0],255,p_spessore)

} 

//Disegna tutti i cerchi da ripetere intorno al mandala ad una certa distanza (raggio) dal centro
//crea una ripetizione di cerchi concentrici
//pC coordinate del centro
//p_ret numero di cerchi che si ripetono intorno al centro
//p_raggio distanza a cui si ripetono i cerchi
//p_color1 e p_color2 colore di riempimento e colore del bordo 
function drawAllManyCircle(panel,
                          pC,p_ret,p_raggio,p_spessore,p_color1,p_color2)
{
     panel.fill(p_color2)
     panel.strokeWeight(p_spessore*0.4);
     panel.stroke(p_color1);
  
     let p_raggio_new=p_raggio;
     if(randomHash(0,10)<5)
        p_raggio_new=randomHash(p_raggio*0.8,p_raggio*1.1);
     let p_ripetiz_circle=int(randomHash(2,6));
     let p_circle_dim= randomHash(p_raggio/p_ret,p_raggio*2.8/p_ret);
  
     let p_circle_spes=randomHash(p_spessore*1.5,p_spessore*3)
  
     drawManyCircle(panel,pC,p_ret,p_raggio_new,p_circle_dim,
                    p_circle_spes,p_ripetiz_circle,0)
     
 
     if(randomHash(0,10)<5)
     {  
       drawManyCircle(panel,pC,p_ret,p_raggio,p_raggio*0.07,p_circle_spes,1,0)
       panel.fill(p_color1)
       drawManyCircle(panel,pC,p_ret,p_raggio,p_raggio*0.04,p_circle_spes,1,0)
     }
  
} 

//funzione che disegna le foglie del mandala intorno ad una circonferenza
function drawFogliaBez(panel,pc, //coordinate centro
                       n_points, //numero di foglie
                       p_raggio, //raggio distanza delle foglie
                       p_dif_r, //differenza distanza tra inizio e fine foglia
                       p_perc_difangle,
                       p_perc_dif_c,
                       p_perc_dif_r2,
                       p_perc_dim_cerchio,
                       f_cerchio1, //flag per disegnare cerchio in alto
                       f_cerchio2, //flag per disegnare cerchio in basso
                       f_f2_bez, //flag se c'è un secondo punto nella curva
                       p_perc_dif_c2,
                       p_perc_difangle2,
                       p_strokeWeight
                       )
{
 
    panel.strokeWeight(p_strokeWeight)
    
  
    let angle=(TWO_PI/n_points);
    
    //parametri
    let difangle=angle*p_perc_difangle;
    let dif_c=p_dif_r*p_perc_dif_c;
    let dif_r2=p_dif_r*p_perc_dif_r2;
    let p_dim_cerchio=p_perc_dim_cerchio*p_dif_r;
  
    let dif_c2=p_perc_dif_c2*p_dif_r;
    let difangle2=p_perc_difangle2*angle;
   
    for(let i=0; i<n_points; i++)
    {
        let x1=pc.x+(sin(i*angle)*(p_raggio));
        let y1=pc.y+(cos(i*angle)*(p_raggio));
      
        let x1i=pc.x+(sin(i*angle)*(p_raggio-dif_r2));
        let y1i=pc.y+(cos(i*angle)*(p_raggio-dif_r2));
      
        let x2=pc.x+sin(i*angle)*(p_raggio-p_dif_r);
        let y2=pc.y+cos(i*angle)*(p_raggio-p_dif_r);
      
        let x2i=pc.x+sin(i*angle)*(p_raggio-p_dif_r+dif_r2);
        let y2i=pc.y+cos(i*angle)*(p_raggio-p_dif_r+dif_r2);
      
        let xc1=pc.x+(sin((i*angle)-difangle)*(p_raggio-dif_c));
        let yc1=pc.y+(cos((i*angle)-difangle)*(p_raggio-dif_c));
        
        let xc2=pc.x+(sin((i*angle)+difangle)*(p_raggio-dif_c));
        let yc2=pc.y+(cos((i*angle)+difangle)*(p_raggio-dif_c));
      
        if(f_cerchio1)
          panel.circle(x1,y1,p_dim_cerchio)
      
        if(f_cerchio2)
         panel.circle(x2,y2,p_dim_cerchio)

        let xc1d=xc1;
        let yc1d=yc1;
        let xc2d=xc2;
        let yc2d=yc2;
      
        if(f_f2_bez)
        {
          xc1d=pc.x+(sin((i*angle)-difangle2)*(p_raggio-dif_c2));
          yc1d=pc.y+(cos((i*angle)-difangle2)*(p_raggio-dif_c2));

          xc2d=pc.x+(sin((i*angle)+difangle2)*(p_raggio-dif_c2));
          yc2d=pc.y+(cos((i*angle)+difangle2)*(p_raggio-dif_c2));
        }
      
      panel.bezier(x1i, y1i, xc1, yc1, xc1d, yc1d, x2i, y2i);
      panel.bezier(x1i, y1i, xc2, yc2, xc2d, yc2d, x2i, y2i);
      
    }
}


//disegna un cerchio/strato di mandala come ripetizione di foglie vicine e sovrapposte ad una certa distanza (p_raggio) dal centro (pC)
function drawMandalaFoglie(panel,
                            pC,p_raggio,p_rand_num,p_c1,p_c2,p_stroke)
{

  
      let p_raggio1=p_raggio;
       //let p_raggio1=randomHash(p_raggio*1.2,p_raggio*5)
       let p_raggio2=randomHash(p_raggio*0.6,p_raggio*0.8)
       
       
       panel.stroke(0)
       panel.noFill()
     
       panel.strokeWeight(p_stroke)
       //if(randomBoolean())
       //drawCircleMandala(panel,pC,p_raggio1,p_raggio2,1,88)
     
       let p_tot_strati =int(randomHash(2,7))
       let p_raggio_tot = p_raggio;
       let p_raggio_prop=p_raggio_tot/20;
       
       let p_passo=p_raggio_tot/p_tot_strati;
  
       let p_num_points=int(randomHash(8,17))
       let p_perc_difangle_tot=randomHash(0.4,0.7);
       let p_perc_dif_c = randomHash(0.4,0.7);
       let p_perc_dim_cerchio = randomHash(0.02,0.1);
       let p_perc_dif_r2 = randomHash(0,0.2);
  
       let f_invert=false;
       
       if(randomHash(0,10)<4)
         p_perc_dif_r2 = randomHash(0.7,0.9);
  
       if(randomHash(0,10)<5)
         f_invert=true;
     
       for(let k=p_tot_strati;k>0;k--)
       {
         let p_r=p_raggio_tot-(p_raggio_prop*(p_tot_strati-k)) //p_passo*k;
         let p_dim_r=p_raggio_prop*10-(p_raggio_prop*(p_tot_strati-k)) //p_r*((k)/p_tot_strati*0.3)

         if(f_invert)
          {
             p_r=p_raggio_tot-(p_raggio_prop*(k)) //p_passo*k;
             p_dim_r=p_raggio_prop*10-(p_raggio_prop*(k)) //p_r*((k)/p_tot_strati*0.3)
           }
  

         
         let p_perc_difangle=p_perc_difangle_tot-(0.08*(p_tot_strati-k))  
         
 
         let f_cerchio1 = false; //randomBoolean();
         let f_cerchio2 = randomBoolean();
         let f_f2_bez= false;
         let p_perc_dif_c2 = 0.5 //randomHash(0.1,0.9);
         let p_perc_difangle2 = 0.5 //randomHash(0.1,0.8);

         panel.stroke(p_c1)
         panel.fill(p_c2);
         drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         p_stroke
                      )

              drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         0
                      )
         

      

     }
  return p_num_points;
}

//disegna un cerchio/strato di mandala come ripetizione di foglie vicine e sovrapposte ad una certa distanza (p_raggio) dal centro (pC)
//DA USARE PER LO STRATO CENTRALE DEL MANDALA
function drawMandalaCenter(panel,
                       pC,p_raggio,p_rand_num,p_c1,p_c2,p_spessore)
{

       let p_raggio1=p_raggio;
       //let p_raggio1=randomHash(p_raggio*1.2,p_raggio*5)
       let p_raggio2=randomHash(p_raggio*0.6,p_raggio*0.8)
       panel.stroke(p_c2)
       panel.noFill()
     
       panel.strokeWeight(p_spessore);
       //if(randomBoolean())
       //drawCircleMandala(panel,pC,p_raggio1,p_raggio2,1,88)
     
       let p_tot_strati =int(randomHash(4,8));
       let p_raggio_tot = p_raggio;
       
       let p_passo=p_raggio_tot/p_tot_strati;
     
     
       for(let k=p_tot_strati;k>0;k--)
       {
         let p_r=p_passo*k;
         let p_dim_r=randomHash(p_r*0.2,p_r*0.9);

         let p_num_points=int(randomHash(5,12));
         let p_perc_difangle=randomHash(0.1,0.7);
         let p_perc_dif_c = randomHash(0.1,0.9);
         let p_perc_dif_r2 = randomHash(0,0.3);
         let p_perc_dim_cerchio = randomHash(0.1,0.3);
         let f_cerchio1 = randomBoolean();
         let f_cerchio2 = randomBoolean();
         let f_f2_bez= randomBoolean();
         let p_perc_dif_c2 = randomHash(0.1,0.9);
         let p_perc_difangle2 = randomHash(0.1,0.8);

         panel.stroke(p_c1)
         panel.fill(p_c2);
         drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         30
                      )

              drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         20
                      )
              panel.stroke(p_c2)
              panel.fill(p_c1);
         
              drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         10
                      )


              drawFogliaBez(panel,pC,p_num_points,p_r,p_dim_r,
                         p_perc_difangle,
                         p_perc_dif_c,
                         p_perc_dif_r2,
                         p_perc_dim_cerchio,
                         f_cerchio1,
                         f_cerchio2,
                         f_f2_bez,
                         p_perc_dif_c2,
                         p_perc_difangle2,
                         0
                      )
                      
     }
}

function drawManyCircle(panel,
                      pC,n_points,p_raggio,p_dim_circle,p_dif_dim,p_strati,p_delay)
{
  
    let angle=(TWO_PI/n_points);
  
    for(let k=0; k<p_strati; k++)
      for(let i=0; i<n_points; i++)
      {
          let x1=pC.x+(sin((i*angle)+p_delay)*(p_raggio));
          let y1=pC.y+(cos((i*angle)+p_delay)*(p_raggio));

          panel.circle(x1,y1,p_dim_circle-(p_dif_dim*k))
      }
    
}

//Versione del 04/02/2024 

//FUNZIONE PER DEFINIRE LA STRUTTURA COORDINATE E MEMORIZZARE X e Y IN UNA SOLA VARIABILE
function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}
let VarCoord = makeStruct("x y"); 
let VarCircle = makeStruct("x y r"); 

//CALCOLA DISTANZA TRA DUE PUNTI con Coordinate esplicite
function calcDistPunti(x1,y1,x2,y2)
{
    return sqrt(pow(x2-x1,2)+pow(y2-y1,2));
}

//CALCOLA DISTANZA TRA DUE PUNTI
function calcDistPuntiCoord(c1,c2)
{
    return abs(sqrt(pow(c2.x-c1.x,2)+pow(c2.y-c1.y,2)));
}

//TROVA PUNTI PARALLELI O PERPENDICOLARI AD UNA RETTA IN BASE ALL'ANGOLO
function findPoints(c1,c2, dist,angle)
{
    v1= createVector(c1.x,c1.y);
    v2= createVector(c2.x,c2.y);
    
    v3=p5.Vector.sub(v1, v2);
    angle_h = v3.heading();
    LX = dist*cos(angle_h+angle);  LY = dist*sin(angle_h+angle);
    RX = dist*cos(angle_h-angle);  RY = dist*sin(angle_h-angle);
  
    let output_c=[];
  
    output_c[0]=new VarCoord(v1.x+LX+cos(angle_h),v1.y+LY+sin(angle_h));
 
    output_c[1]=new VarCoord(v2.x+LX+cos(angle_h),v2.y+LY+sin(angle_h));
  
  return output_c;
  
}

//FUNZIONE PER CALCOLARE L'ANGOLO DELLE RETTA TRA DUE PUNTI
function calcolaAngolo(coord1, coord2) {
  const deltaX = coord2.x - coord1.x;
  const deltaY = coord2.y - coord1.y;
  
  // Calcolo dell'angolo in gradi utilizzando la funzione atan2()
  const angle = atan2(deltaY, deltaX);
  
  return angle;
}


//TROVA PUNTI PARALLELI O PERPENDICOLARI IN BASE ALL'ANGOLO
function findPointsRetta(c1, dist,angle)
{
    v1= createVector(c1.x,c1.y);
    LX = dist*cos(angle);  LY = dist*sin(angle);
  
    let output_c=new VarCoord(v1.x+LX+cos(angle),v1.y+LY+sin(angle));
  
  return output_c;
  
}

//CALCOLA I PUNTI SU UNA RETTA AD UNA CERTA DISTANZA DAL PUNTO c1.x,c1.y
function calcPuntoRettaCoord(c1,c2,
                             dist //DISTANZA-RAGGIO DAL PUNTO DI RIFERIMENTO x1,y1
    )
{
  angle=calcolaAngolo(c1,c2);
  return findPointsRetta(c1, dist,angle)
}


//CALCOLA I PUNTI SU UNA RETTA AD UNA CERTA DISTANZA DAL PUNTO X1,y1
function calcPuntoRetta(x1,y1,x2,y2,
                        dist, //DISTANZA-RAGGIO DAL PUNTO DI RIFERIMENTO x1,y1
                        coord //COORDINATE PUNTO DISTANTE DA x1,Y1
    )
{
    let m;
    let q;
    let segno=1;
    x1=Math.trunc(x1);
    y1=Math.trunc(y1);
    x2=Math.trunc(x2);
    y2=Math.trunc(y2);
    
    if((x2<=x1)&&(y2<=y1))
  segno=-1;

        if(y1==y2)
        {
            coord.x=x1+dist*segno;
            coord.y=y1;
        }
        else
        {
            if(x1!=x2)
            {
                  m=(y1-y2)/(x1-x2);
                  q=((x2*y1)-(x1*y2))/(x2-x1);
              
                  if((m<0)&&(y1<y2))
                    segno=-1;

                  coord.x=((x1*sqrt(1+pow(m,2)))+dist*segno)/(sqrt(1+pow(m,2)));
                  coord.y=m*coord.x+q;

            }
            else
            {
                coord.x=x1;
                coord.y=y1+dist*segno;
            }
    }

}

//Restituisce TRUE se la coordinata x,y è contenuta nel poligono
function pointInside(x,y,vertici){
  
  var risp=false;
  var p=0;
  for(var k=0;k<vertici.length;k++)
  {
    if(p<vertici.length-1)
      p++;
    else 
      p=0;
    
     let f_valuta=((vertici[p].x-vertici[k].x)*(y-vertici[k].y)/(vertici[p].y-vertici[k].y))+vertici[k].x;
    
    if((vertici[k].y>=y && vertici[p].y<y|| vertici[k].y<y && vertici[p].y>=y)) 
       if(x<f_valuta)
          risp=!risp;
  }
  return risp;

}

//Funzione che calcola la distanza agolare tra due angoli
function distAngolare(angolo1, angolo2)
{
    let distanza = Math.abs(angolo1 - angolo2);
    if(distanza>PI)
      distanza=TWO_PI-distanza;
  
    return distanza;
}

//Funzione utile nell'uso degli array. Restituisce il valore se compreso tra r1 e r2, altrimenti prende r1 o r2
function insideRange(value,r1,r2)
{ 
    if(value<r1)
      return r1;
    if(value>r2)
      return r2;
  
    return value;
}  

//FUNZIONE CHE CALCOLA IL PUNTO DI INTERESEZIONE DI DUE RETTE
function intersect_point(point1, point2, point3, point4) 
{
   let ua = ((point4.x - point3.x) * (point1.y - point3.y) - 
             (point4.y - point3.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
             (point4.x - point3.x) * (point2.y - point1.y));
  
   let ub = ((point2.x - point1.x) * (point1.y - point3.y) - 
             (point2.y - point1.y) * (point1.x - point3.x)) /
            ((point4.y - point3.y) * (point2.x - point1.x) - 
             (point4.x - point3.x) * (point2.y - point1.y));
  
   let x = point1.x + ua * (point2.x - point1.x);
   let y = point1.y + ua * (point2.y - point1.y);
  
   let out=new VarCoord(x,y)
   return out;
}

//TROVA IL PUNTO ALL'INTERNO DEL QUADRIALTERO USANDO x e y PERCENTUALE 
function calcCoordMatrix(p1,p2,p3,p4,px_perc,py_perc) 
{
    let dist_p1p2=calcDistPuntiCoord(p1,p2);
    let point_p1p2=calcPuntoRettaCoord(p1,p2,dist_p1p2*px_perc);
  
    let dist_p3p4=calcDistPuntiCoord(p4,p3);
    let point_p3p4=calcPuntoRettaCoord(p4,p3,dist_p3p4*px_perc);
  
    let dist_p2p3=calcDistPuntiCoord(p2,p3);
    let point_p2p3=calcPuntoRettaCoord(p2,p3,dist_p2p3*py_perc);

    let dist_p4p1=calcDistPuntiCoord(p1,p4);
    let point_p4p1=calcPuntoRettaCoord(p1,p4,dist_p4p1*py_perc);

    return intersect_point(point_p1p2,point_p3p4,point_p2p3,point_p4p1);
}


//INDICA SE LE COORDINATE x,Y CADONO DENTRO UNO DEI CERCHI DELLA LISTA IN INPUT
function findCircleIntersect(list,x,y)
{
  let f_inter=false;
  for(let k=0;k<list.length;k++)
  {
      //calcola distanza di x,y rispetto a centro del cerchio
      let c_dist=calcDistPunti(list[k].x,list[k].y,x,y)
      if(c_dist<list[k].r)
          return f_inter=true;
  }
  
  return f_inter;
}




function calcPuntParalleli(x1,y1,x2,y2,
                        dist //DISTANZA-RAGGIO DAL PUNTO DI RIFERIMENTO               
    )
{
    let m,m_i;
    let q,q_i;
    let x,y;
    let segno;
    let coord=[]; //ARRAY OUTPUT
  
    x1=Math.trunc(x1);
    y1=Math.trunc(y1);
    x2=Math.trunc(x2);
    y2=Math.trunc(y2);

    coord[0]=new VarCoord(0,0);
    coord[1]=new VarCoord(0,0);
    coord[2]=new VarCoord(0,0);
    coord[3]=new VarCoord(0,0);
  
        x=x1;
        y=y1;
        segno=1;
  
        if(x1>x2)
            segno=-segno;

        //if(y1>y2)
          //  segno=-segno;

        if(x1!=x2)
        {
            m=(y1-y2)/(x1-x2);
            //q=y1-((y1-y2)/(x1-x2)*x1);
            q=((x2*y1)-(x1*y2))/(x2-x1);

            //CALCOLA IL VALORE DEL PUNTO MASSIMO CHE FUORIESCE DALLA LINEA IN BASE ALLO SPESSORE
            x=((x*sqrt(1+pow(m,2)))-segno*dist)/(sqrt(1+pow(m,2)));
            y=m*x+q

            //RETTA PERPENDICOLARE CHE PASSA PER IL PUNTO DI RIFERIMENTO( IN BASE AL TYPE)
            m_i=-1/m;
            q_i=y-(m_i*x);


            coord[0].x=((x*sqrt(1+pow(m_i,2)))-dist)/(sqrt(1+pow(m_i,2)));
            coord[0].y=m_i*coord[0].x+q_i;

            coord[1].x=((x*sqrt(1+pow(m_i,2)))+dist)/(sqrt(1+pow(m_i,2)));
            coord[1].y=m_i*coord[1].x+q_i;

        }
        
        //GESTISCI LINEE PERFETTAMENTE ORIZZONTALI E VERTICALI
        x=x1;
        y=y1;
        //PER LINEA ORIZZONTALE
        if((y1==y2)||(abs(y1-y2)<1))
        {

            coord[0].x=x-segno*dist;
            coord[0].y=y+dist;

            coord[1].x=x-segno*dist;
            coord[1].y=y-dist;

        }

        //PER LINEA VERTICALE
        if(x1==x2)
        {
          if(y1>y2)
            segno=-segno;
          coord[0].x=x+dist;
          coord[0].y=y-segno*dist;

          coord[1].x=x-dist;
          coord[1].y=y-segno*dist;
        }

        x=x2;
        y=y2;
        segno=-1;
  
        if(x1>x2)
            segno=-segno;
  
         //if(y1>y2)
           // segno=-segno;

        if(x1!=x2)
        {
            m=(y1-y2)/(x1-x2);
            //q=y1-((y1-y2)/(x1-x2)*x1);
            q=((x2*y1)-(x1*y2))/(x2-x1);

            //CALCOLA IL VALORE DEL PUNTO MASSIMO CHE FUORIESCE DALLA LINEA IN BASE ALLO SPESSORE
            x=((x*sqrt(1+pow(m,2)))-segno*dist)/(sqrt(1+pow(m,2)));
            y=m*x+q

            //RETTA PERPENDICOLARE CHE PASSA PER IL PUNTO DI RIFERIMENTO( IN BASE AL TYPE)
            m_i=-1/m;
            q_i=y-(m_i*x);


            coord[3].x=((x*sqrt(1+pow(m_i,2)))-dist)/(sqrt(1+pow(m_i,2)));
            coord[3].y=m_i*coord[3].x+q_i;

            coord[2].x=((x*sqrt(1+pow(m_i,2)))+dist)/(sqrt(1+pow(m_i,2)));
            coord[2].y=m_i*coord[2].x+q_i;

        }

        //GESTISCI LINEE PERFETTAMENTE ORIZZONTALI E VERTICALI
        x=x2;
        y=y2;
        //PER LINEA ORIZZONTALE
        if((y1==y2)||(abs(y1-y2)<1))
        {
            coord[3].x=x-segno*dist;
            coord[3].y=y+dist;

            coord[2].x=x-segno*dist;
            coord[2].y=y-dist;

        }
        //PER LINEA VERTICALE
        if(x1==x2)
        {
          coord[3].x=x+dist;
          coord[3].y=y-segno*dist;

          coord[2].x=x-dist;
          coord[2].y=y-segno*dist;
        }
  
      return coord;
  
}



function drawMainTest_001(panel,p_time)
{
  if(p_time==9)
   {
     
      panel.background(255); 
     
    
      if(randomHash(0,10)<3)
      {
         p_num_righe=2;
         p_num_colonne=2;
      }
     
      let f_sfondo_sporco=false;
      
     if(randomHash(0,10)<3)
       bordino=5;

     
      if(randomHash(0,10)<3)
        f_sfondo_sporco=true;
      
      //ordina in modo casuale l'array dello sfondo
      let p_sfondo2=p_sfondo.sort( () => .5 - Math.random() )
     
     
      let p_color_l1=[];
      let p_color_l2=[];
      let p_color_b=[];
      let p_color_sfondo=[];

      let passo_x=(w-(dimBordo*2))/p_num_colonne;
      let passo_y=(h-(dimBordo*2))/p_num_righe;
      let p_rand_num=randomHash(0,1000)

      let p=0;
     

      //calcola l'array che contiene i colori da usare per ogni ripetizione dell'immagine variando la palette cromatica
      for(let i=0;i<p_num_colonne;i++)
      {
        p_color_l1[i]=[]; //colore layer 1
        p_color_l2[i]=[]; //colore layer 2
        p_color_b[i]=[]; //colore dei bordi (black)
        p_color_sfondo[i]=[]; //colore sfondo
        for(let j=0;j<p_num_righe;j++)
        {
           panel.noStroke();
           panel.fill(p_sfondo2[p] )
           panel.rect(dimBordo+(i*passo_x)+bordino,
                      dimBordo+(j*passo_y)+bordino,
                      passo_x-(bordino*2),
                      passo_y-(bordino*2));
          p_color_sfondo[i][j]=p_sfondo[p];
          p_color_l1[i][j]=randomHashArray(p_col_layer1);
          p_color_l2[i][j]=randomHashArray(p_col_layer1);
          p_color_b[i][j]=randomHashArray(p_col_black);
          
        p++;
       }
     }
     //calcola numero casuale che genera l'immagine. Lo stesso numero in input permette di creare la stessa immagine
          let p_num_rand1=randomHash(0,10000)

          let panel2=createGraphics(passo_x-(bordino*2), passo_y-(bordino*2));
          if(f_sfondo_sporco)
          {

           let v1=new VarCoord(0,0)
           let v2=new VarCoord(0,passo_y-(bordino*2))
           let v3=new VarCoord(passo_x-(bordino*2),passo_y-(bordino*2))
           let v4=new VarCoord(passo_x-(bordino*2),0)
          let verticiPoly=[v1,v2,v3,v4]

          drawTexture(verticiPoly,
                     11,
                     [18,0,"#E1C699",1,[220,220,220],5,[30,30,30,120],15],
                     panel2
                   )
           }
           
      for(let i=0;i<p_num_colonne;i++)
        for(let j=0;j<p_num_righe;j++)
        {

          if(f_sfondo_sporco)
            panel.image(panel2,dimBordo+(i*passo_x)+bordino,dimBordo+(j*passo_y)+bordino)

          
           let pC1=new VarCoord(dimBordo+(i*passo_x)+passo_x/2,
                                dimBordo+(j*passo_y)+passo_y/2)
            
           //prepara array con i 4 colori da usare per ciascuna immagine
           let p_list_color=[p_color_b[i][j],255,
                             p_color_l1[i][j],
                             p_color_l2[i][j]]
           
           drawCompleteMandala(panel,pC1,passo_x,p_list_color,
                               int(passo_x*0.012),
                              // 15,
                                      p_num_rand1)
          
       }

  }

  
}

