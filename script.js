let musicas = [
    {titulo:'A Year Ago', artista:'Neffex', src:'music/A Year Ago - NEFFEX.mp3', img:'image/guitar.jpg'},
    {titulo:'Believe', artista:'Neffex', src:'music/Believe - NEFFEX.mp3', img:'image/guitar2.jpg'},
    {titulo:'Digifunk', artista:'DivKid', src:'music/Digifunk - DivKid.mp3', img:'image/eletronic.jpg'},
    {titulo:'Mess Call', artista:'USAF Heritage of America Band', src:'music/Mess Call - USAF Heritage of America Band.mp3', img:'image/note.jpg'}
];

let musica = document.querySelector('audio');

let duracaoMusica = document.querySelector('.fim');

let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

let indexMusica = 0;

renderizarMusica(indexMusica);

document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

// retroceder musica
document.querySelector('.anterior').addEventListener('click', () => { 
    indexMusica--;
    if(indexMusica < 0)
        indexMusica = 3;
    renderizarMusica(indexMusica)
    pausarMusica();
    tocarMusica();
});

// avançar musica 
document.querySelector('.proxima').addEventListener('click', () => { 
    indexMusica++;
    if(indexMusica >3)
        indexMusica = 0;
    renderizarMusica(indexMusica)
    pausarMusica();
    tocarMusica();
});

// tocar musica 
function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

// pausar musica
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
    if(tempoDecorrido.textContent === duracaoMusica.textContent) {
        if(indexMusica===musicas.length) indexMusica=0;
        else indexMusica++;
        renderizarMusica(indexMusica);
        pausarMusica();
        tocarMusica();
    }
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