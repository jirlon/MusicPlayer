let musicas = [
    {titulo:'A Year Ago', artista:'Neffex', src:'music/A Year Ago - NEFFEX.mp3', img:'image/guitar.jpg'},
    {titulo:'Believe', artista:'Neffex', src:'music/Believe - NEFFEX.mp3', img:'image/guitar2.jpg'},
    {titulo:'Digifunk', artista:'DivKid', src:'Believe - DivKid.mp3', img:'image/eletronic.jpg'}
];

let musica = document.querySelector('audio');

let duracaoMusica = document.querySelector('.fim');

let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

let indexMusica = 0;

duracaoMusica.textContent = segParaMin(Math.floor(musica.duration));

document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => { 
    indexMusica--;
    renderizarMusica(indexMusica)});

document.querySelector('.proximo').addEventListener('click', () => { 
    indexMusica++;
    renderizarMusica(indexMusica)});

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime/musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segParaMin(Math.floor(musica.currentTime));
}

function segParaMin(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if(campoSegundos < 10)
        campoSegundos = '0' + campoSegundos;
    return campoMinutos+':'+campoSegundos;
}

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segParaMin(Math.floor(musica.duration));
    })
}