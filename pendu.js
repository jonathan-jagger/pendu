// Le Pendu  //

var motP1=document.getElementById("motP1");			// barre de saisie du mot
var lettreP2=document.getElementById("lettreP2");	// barre de saisie de la lettre
var nbErreurs=0;									// nb d erreurs commises
var m=new Array();									// tableau pour stocker les lettres du mot à deviner
var div1=document.getElementById("joueur1");		//la partie html du joueur 1
var div2=document.getElementById("joueur2");		// la partie html du joueur 2
var motSaisi="";									// initialisation du mot saisi
var print=document.getElementById("print");			// variable pour afficher du texter dans l'HTML
var newMot="";										// variable du mot à deviner sous forme d'underscore
var printWin=document.getElementById("win");		// variable pour afficher du texter dans l'HTML


(function start()
{
	var valider=document.getElementById("valider"); 		//action sur le bouton valider
	valider.addEventListener("click",joueur1);
	
	var tester=document.getElementById("tester");			// action sur le bouton tester
	tester.addEventListener("click", joueur2);
	
	var lettreP2=document.getElementById("lettreP2");		//presser entrer pour tester sa lettre
	lettreP2.addEventListener("keydown",
	function(e)
	{
		if(e.keyCode===13)
		{
			event.preventDefault();
			tester.click();
		}
	},false);
	
	var motP1=document.getElementById("motP1");	
	var regex=/(^[a-zA-Z])/;								//presser entrer pour valiser son mot
	motP1.addEventListener("keydown",
	function(e)
	{
		if(e.keyCode===13)
		{
			event.preventDefault();
			valider.click();
			document.getElementById("lettreP2").focus();
			
		}
		if(regex.test(e.key)==0)
		{
			
			alert("Veuillez entrer un mot composé uniquement de lettres.");
			document.getElementById("motP1").value="";
		}
	
	},false);
}());


function joueur1()
{	
	var motSaisi=motP1.value;			
	var regex=/(^[a-zA-Z])/;
	
	if(regex.test(motSaisi))					// vérifie que le mot contient que des lettres
	{
	tableIn();
	div1.style.visibility="hidden";				// cache la saisie du mot
	div2.style.visibility="visible";			// affiche la barre de saisie de la lettre
	}
	else
	{
		
		alert("Veuillez entrer un mot composé uniquement de lettres."); //message d'erreur si le mot n'est pas conforme
		 
	}
	print.innerHTML=newMot;						// affiche le mot  deviner sous forme d'underscore
};

function tableIn()
{
	motSaisi=motP1.value;
	for (i=0;i<motSaisi.length;i++)				// fait une boucle en fonction du nombre de lettres que compose le mot à deviner
	{
		m.push(motSaisi.charAt(i));				// rempli la variable tableau avec les lettres du mot à deviner
        newMot+="_";							// affecte un underscore à chaque lettre pour le mot à deviner
	}
};

function joueur2()
{	
	lettre=lettreP2.value;						
	var regex2=/(^[a-zA-Z])/;												// regex qui impose que des lettres 
	var index=false;											// affecter l'indice à une variable
		
	if (nbErreurs<11)														// si le nb d erreurs est inférieur à 11
	{
		if (regex2.test(lettre) && lettre.length<2)							// si la saisie respecte la regex et le nombre de lettre
		{
			for(i=0;i<m.length;i++)										// boucle pour parcourir le tableau
				{
					if(lettre==m[i])							// tant qu'il y a une occurence
					{	
						index=true;
						if(i==0)					// si c est la premiere lettre
						{																
								newMot=lettre+newMot.substring(1)				//on remplace le premier underscore par la lettre
								print.innerHTML=newMot;							// on affiche le mot caché
						}
						else
						{
							if(i==m.length-1)				// si c'est la dernière lettre qui est trouvée			
							{
									newMot=newMot.substring(0,i)+lettre;	//on remplace la lettre dans le mot caché
									print.innerHTML=newMot;						// on affiche le résultat
							}
							else
							{
								if(i>0 && i<m.length-1)
								{
									newMot=newMot.substring(0,i)+lettre+newMot.substring(i+1); //on remplace la lettre dans le mot caché peu importe sa position
									print.innerHTML=newMot;												// on affiche le résultat
								}
							}
						
						}									
					m[i]=0; 	//on remplace la lettre trouvée dans le tableau par un zéro
										
                    }
                    document.getElementById("lettreP2").focus()   // focus sur l'input texte joueur2 
				}
			if(index==false)
			{
				document.getElementById("echaffaud").style.visibility="visible"; 	//on affiche le pendu en cas d erreur
				nbErreurs++;														// on compte les erreurs
				alert("Oups! Concentrez-vous un peu ! Il vous reste : "+(6-nbErreurs)+" tentatives!"); //message en cas d'erreur
				pendu(nbErreurs);													//on appelle la fonction pendu pour dessiner
			}
				
			
		}
		else
		{
			alert("Veuillez taper uniquement une lettre");		//message en cas de mauvaise saisie
		}
	}
	else
	{
		if(nbErreurs==6)							//si le nb d'erreurs arrive à 6
		{
			pendu(nbErreurs);						// on appelle la fonction dessin
		}
	}
	if(newMot==motSaisi)							//si le mot trouvé est juste
	{
        victoire();
        									// on appelle la fonction victoire
	}
    lettreP2.value="";								// on reset la barre de saisie
    
    
};

function victoire()
{   
	var printWin=document.getElementById("win")		
	document.getElementById("hell").style.visibility="visible";	//on affiche la div hell
    printWin.innerHTML="Vous avez fait "+nbErreurs+" erreurs.<br>Bravo ! Vous avez gagné profitez de votre récompense !!!" //on écrit ça dedans
	restart();					// on lance la fonction restart
};

function pendu(nbErreurs)		//la fonction dessin avec le nb d'erreurs en argument
{
	var canvas=document.getElementById("echaffaud");
	var ctx=canvas.getContext("2d");
	ctx.fillStyle="black";		// la couleur du pendu
	switch (nbErreurs) 			// on dessine en fonction du nombre d'erreurs
	{
		case 1:					//une erreur
			ctx.fillRect(40,530,200,20); // la base
			break;
			
		case 2:					// 2 erreurs
			ctx.fillRect(110,90,20,450); //le support vertical
			ctx.fillRect(130,90,150,20); // la barre horizontale
			break;
			
			
		case 3:					// 3 erreurs
			ctx.beginPath();
			ctx.moveTo(110,160);	// l'équerre
			ctx.lineTo(180,90);
			ctx.lineWidth=20;
			ctx.stroke();
			ctx.closePath();
			
			ctx.beginPath();
			ctx.fillStyle="white";		// les clous
			ctx.arc(120,150,4,0,2*Math.PI);
			ctx.arc(170,100,4,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
			
			break;
			
		case 4:						// 4 erreurs
			ctx.fillRect(230,90,20,80);	//la corde
			ctx.beginPath()
			ctx.arc(240,210,40,0,2*Math.PI);
			ctx.stroke(); 						// tete
			break;
		
		case 5:                       // 5 erreurs
			ctx.fillRect(230,260,20,160); // corps
			ctx.fillRect(190,300,100,20); // bras
			break;
			
						
		case 6:
			ctx.beginPath();				// la jambre droite
			ctx.moveTo(235,420);
			ctx.lineTo(190,515);
			ctx.lineWidth=20;
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			ctx.moveTo(245,420);			// la jambre gauche
			ctx.lineTo(290,515);
			ctx.lineWidth=20;
			ctx.stroke();
			ctx.closePath();
						
			ctx.fillStyle="red";
			ctx.font="normal normal bold 25px arial";	
			ctx.textAlign="center";
			ctx.fillText("VOUS ETES MORTS...",200,50); // message amical en rouge au centre au dessus du pendu
			
			restart();					// on lance la fonction restart
			break;
			
		
	}

};

function reset()
{
location.reload()			// refresh la page entière
};

function restart()
{
	document.getElementById('restart').style.visibility="visible";	// affiche le bouton recommencer
	document.getElementById("joueur2").style.visibility="hidden";				// desactive le bouton tester
	
	var refresh = document.getElementById('restart');				
	refresh.addEventListener('click', reset, false);				// appelle la fonction reset quand on clique sur le bouton recommencer
};


