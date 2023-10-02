const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

//carregando imagens

const bird = new Image();
bird.src = 'images/birdreto.png';
const bg = new Image();
bg.src = 'images/bg.png';
const chao = new Image();
chao.src = 'images/chao.png';
const canoEncima = new Image();
canoEncima.src = 'images/canocima.png';
const canoBaixo = new Image();
canoBaixo.src = 'images/canobaixo.png';

//carregando audios

const fly = new Audio('./sounds/fly.mp3');
// fly.src = 
const scor = new Audio();
scor.src = 'sounds/score.mp3'

//variaveis

let eec = 100;
let constant;
let bX = 33;
let bY = 200;
let gravity = 1.4;
let score = 0;
let cano = [];
cano[0] = {
	x: canvas.width,
	y: 0
}
              
//captura da tecla
document.body.addEventListener('click',voaSolo)
document.addEventListener('keydown', voa);
document.addEventListener('keyup', cai);

function cai(){
    bird.src = 'images/birdreto.png';
}
//voando
function voaSolo(){
    bird.src = 'images/birdreto.png';
	bY -= 26;  
	fly.play()
}
function voa(){
	bY -= 26;  
	fly.play()
    bird.src = 'images/birdvoa.png';
}

function jogo(){
	//fundo jogo
	ctx.drawImage(bg, 0, 0);
	
	//movimentando cano
	for(let i=0; i<cano.length; i++){
		constant = canoEncima.height + eec;
		ctx.drawImage(canoEncima, cano[i].x, cano[i].y)
		ctx.drawImage(canoBaixo, cano[i].x, cano[i].y+constant)
		cano[i].x--;
	
		if(cano[i].x == 105){
			cano.push({
				x: canvas.width,
				y: Math.floor(Math.random()*canoEncima.height)-canoEncima.height
				
			})
		}
		//desenhando cano emcima cano embaixo identifica perda do jogo
		if((bX + bird.width >= cano[i].x && bX <= cano[i].x + canoEncima.width ) 
			&& (bY <= cano[i].y + canoEncima.height || bY + bird.height >=cano[i].y + constant)
			|| (bY + bird.height >= canvas.height - chao.height))
			{
				location.reload();
			}
			//identifica ponto do jogo
		if(bX == cano[i].x + canoEncima.width){
				scor.play();
				 score++
			}		
	}
	
	//desenhando chao
	ctx.drawImage(chao, 0, canvas.height - chao.height)
	
	//passaro
	ctx.drawImage(bird, bX, bY);
	bY += gravity;

	//marcacao dos pontos score
	ctx.fillStyle = '#000';
	ctx.font = '20px Verdana'
	ctx.fillText(`Placar: ${score}`, 10, canvas.height - 10)

	requestAnimationFrame(jogo);
}
jogo()
