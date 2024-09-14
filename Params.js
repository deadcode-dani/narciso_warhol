/*
    SCRIPT DOVE GESTIRE TUTTI PARAMETRI IN INGRESSO, LE FEATURES E LA SCELTA DEI PARAMETRI CASUALI e LE VARIABILI DI APPOGGIO
*/

//***PARAMETRI CANVAS
//dimensione canvas su cui costruire l'immagine
let w = 3500;
let h = 3500;

//nome del file da utilizzare in fase di salvataggio
let name_file="File_test";

//se canvas_dinamico=true viene usata la dimensione effettiva del frame --> windowWidth, windowHeight
//se canvas non è dinamico viene istanziata la dimenensione del canvas pari a quella dell'immagine. 
//In questo caso l'eventuale scaling dinamico viene gestito dal CSS (vedere style.css)
let canvas_dinamico=true;
//colore sfondo di riempimento in caso di canvas dinamico
let canvas_background=[80,80,80];
let canvas_eff_background=[250,250,250];

//Attivare preload e impostare il numero di cicli del disegno live
let preloadActive=true; //attivare la barra di preload. il tempo di preload va sempre da 0 a preloadMaxTime
let preloadMaxTime=10;
let time_draw_end=20; //IMPOSTARE I CICLI DI DISEGNO LIVE

//***FINE PARAMETRI CANVAS
//CANVAS EFFETTIVO e CANVAS VISUALIZZATO
//il Canvas effettivo è quello della dimensione effettiva dell'immagine
//il Canvas visualizzato corrisponde alla dimensione effettiva del frame a disposizione
//se canvas_dinamico=false il canvas visualizzato è uguale a quello effettivo
let canvas_effettivo;
let canvas_visualizzato;

//differenza x,y da utilizzare per centrare il canvas effettivo
let diff_x=0, diff_y=0, scale_val=1;

//tempo preload
let time_preload=0; //il tempo di preload va sempre da 0 a 100
let time_draw=0;

//******VARIABILI
//COLORI
let colorRed=[220,0,0,220];
let colorWhite=[255,255,255];
let colorBlack=[0,0,0];
let colorGrey=[100,100,100];


w = 4000;
h = 4000;

let panel2; //panel2 come layer di appoggio


//DEFINISCI ELEMENTI INZIALI CASUALI
function randomSetup()
{
  panel2=createGraphics(w, h);

} 

let p_sfondo=["#EC71A8","#FF3E96",
                    "#43CD80","#47B6AD","#548B54",
                    "#778899",
                    "#EEAD0E", "#FFD700",
                    "#1E90FF","#00CED1",
                    "#9370DB","#CDB5CD",
                    "#CD6839",
                    "#EE8262","#FF4040"];

let p_col_layer1=["#FFDAB9","#FFD700",
                   "#EED2EE","#FF82AB","#FF3E96",
                   "#43CD80","#47B6AD","#548B54",
                   "#1E90FF","#00CED1",
                    "#9370DB",
                   "#FF6A6A","#5CACEE"];

let p_col_black=[[0,0,0]];

let dimBordo=w/8;
let bordino=5;

let p_num_righe=3;
let p_num_colonne=3;
