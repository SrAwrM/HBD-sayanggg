const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

const startBtn = document.getElementById('start-btn');
const toAlbumBtn = document.getElementById('to-album-btn');
const backBtn = document.getElementById('back-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Ucapan ulang tahun panjang & personal
const birthdayTitle = "Selamat Ulang Tahun Sayanggg 🎂💖";
const birthdayMessage =
    "Hari ini adalah hari yang spesial untuk sayanggg, sama seperti sayanggg 💕." +
    "Abang selalu bersyukur punya ayanggggg di hidup abang, yang selalu bikin hari-hari abang penuh warna dan tawa 😘." +
    "Semoga setiap langkah yang sayangggg ambil selalu dimudahkan, setiap mimpi yang sayanggg mau bisa terwujud, " +
    "dan juga semoga semua urusan nya sayanggg di mudahkan di lancarkan di beri juga kelancaran rezeki yahh" +
    "dan setiap senyum sayanggg selalu tulus dari hati ❤️." +
    "Tetaplah jadi sayanggg yang manis, lucu, dan bikin abang jatuh cinta setiap hari 💖." +
    "Abang sayang banget sama sayangggg… hari ini, besok, dan selamanya 💕🎈🎉" +
    "maaf juga kalau abang masih banyak salahnya,bikin kecewanya juga ke sayanggg, masih banyak kurang nya tapi abangg selaluu sayanggg sama sayangg love youuu 💕🎈🎉";

// Fungsi efek ketik dengan support <br>
function typeWriterEffect(elementId, text, speed = 50, callback) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;
    const typeSound = new Audio('typing.mp3'); // pastikan ada file ini

    function typing() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i);

            // Mainkan suara ketik kalau bukan spasi atau tag HTML
            if (text.charAt(i) !== " " && text.charAt(i) !== "<") {
                typeSound.currentTime = 0;
                typeSound.play().catch(()=>{});
            }

            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

startBtn.addEventListener('click', () => {
    page1.classList.add('hidden');
    page2.classList.remove('hidden');

    // Musik background
    const audio = document.getElementById('bg-music');
    if (audio && audio.paused) {
        audio.play().catch(()=>{/* ignore autoplay errors */});
    }

    // Efek ketik judul & pesan
    typeWriterEffect("birthday-text", birthdayTitle, 80, () => {
        typeWriterEffect("message", birthdayMessage, 40);
    });

    startFallingEmojis();
});

toAlbumBtn.addEventListener('click', () => {
    stopFallingEmojis();
    page2.classList.add('hidden');
    page3.classList.remove('hidden');
    startFallingEmojisAlbum();
});

backBtn.addEventListener('click', () => {
    stopFallingEmojisAlbum();
    page3.classList.add('hidden');
    page2.classList.remove('hidden');
    startFallingEmojis();
});

// Album slideshow
let slideIndex = 0;
showSlides(slideIndex);

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

prevBtn.addEventListener('click', () => {
    slideIndex--;
    showSlides(slideIndex);
});

nextBtn.addEventListener('click', () => {
    slideIndex++;
    showSlides(slideIndex);
});

/* Emoji falling untuk Page 2 */
let emojiInterval = null;

function startFallingEmojis(){
    stopFallingEmojis();
    const container = document.getElementById('emoji-container');
    spawnEmojis(container);
}

function stopFallingEmojis(){
    if (emojiInterval) {
        clearInterval(emojiInterval);
        emojiInterval = null;
    }
    const container = document.getElementById('emoji-container');
    if (container) container.innerHTML = '';
}

/* Emoji falling untuk Page 3 (Album) */
let emojiAlbumInterval = null;

function startFallingEmojisAlbum(){
    stopFallingEmojisAlbum();
    const container = document.getElementById('emoji-container-album');
    spawnEmojis(container, true);
}

function stopFallingEmojisAlbum(){
    if (emojiAlbumInterval) {
        clearInterval(emojiAlbumInterval);
        emojiAlbumInterval = null;
    }
    const container = document.getElementById('emoji-container-album');
    if (container) container.innerHTML = '';
}

/* Fungsi umum spawn emoji */
function spawnEmojis(container, isAlbum = false){
    if(!container) return;
    const emojis = ["💖","🩷","💙","💚","💛","🖤","🤍","💜","🎈","🎉"];
    const intervalRef = isAlbum ? 'emojiAlbumInterval' : 'emojiInterval';

    window[intervalRef] = setInterval(()=>{
        const el = document.createElement('div');
        el.className = 'falling-emoji';
        el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        el.style.left = (Math.random()*100) + 'vw';
        const size = Math.floor(Math.random()*28) + 18;
        el.style.fontSize = size + 'px';
        const duration = (Math.random()*3 + 3).toFixed(2);
        el.style.animationDuration = duration + 's';
        el.style.transform = `translateY(-10vh) rotate(${Math.random()*60 - 30}deg)`;
        container.appendChild(el);

        setTimeout(()=> {
            if(el && el.parentNode) el.parentNode.removeChild(el);
        }, (parseFloat(duration)*1000) + 400);
    }, 180);
}

document.addEventListener('DOMContentLoaded', () => {
    if (page3 && !page3.classList.contains('hidden')) {
        showSlides(slideIndex);
    }
});
