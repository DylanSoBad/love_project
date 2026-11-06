const heart = document.getElementById("heart");
const sparklesContainer = document.getElementById("bg-sparkles");
const shooter = document.getElementById("shooter");
const audio = document.getElementById("audios");
const musicBtn = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");

const HEART_ICONS = ["❤️", "💖", "💗", "💓", "💘", "✨"];

// 1. Tạo nền sao & đom đóm lung linh
function createSparkles(count = 45) {
    if (!sparklesContainer) return;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
        const s = document.createElement("div");
        s.className = "sparkle";
        const size = (Math.random() * 4 + 2).toFixed(1);
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        s.style.left = `${(Math.random() * 100).toFixed(2)}%`;
        s.style.top = `${(Math.random() * 100).toFixed(2)}%`;
        s.style.setProperty("--dur", `${(Math.random() * 3 + 2.2).toFixed(2)}s`);
        s.style.setProperty("--delay", `${(Math.random() * 4).toFixed(2)}s`);
        fragment.appendChild(s);
    }
    sparklesContainer.appendChild(fragment);
}

// 2. Vẽ trái tim bằng phương trình tham số (2 lớp lung linh)
function createHeartParticle(x, y, icon, size, delay) {
    const el = document.createElement("div");
    el.className = "heart-particle";
    el.innerText = icon;
    el.style.setProperty("--x", `${x.toFixed(1)}px`);
    el.style.setProperty("--y", `${y.toFixed(1)}px`);
    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--delay", `${delay.toFixed(2)}s`);
    heart.appendChild(el);
}

function buildMainHeart() {
    if (!heart) return;
    const centerX = 182;
    const centerY = 166;

    // Lớp viền chính
    for (let t = 0; t < 360; t += 3) {
        const rad = (t * Math.PI) / 180;
        const x = 16 * Math.pow(Math.sin(rad), 3);
        const y = -(
            13 * Math.cos(rad) -
            5 * Math.cos(2 * rad) -
            2 * Math.cos(3 * rad) -
            Math.cos(4 * rad)
        );
        const icon = t % 9 === 0 ? "💖" : "❤️";
        createHeartParticle(centerX + x * 9.5, centerY + y * 9.5, icon, 14, (t / 360) * 2);
    }

    // Lớp viền trong tạo chiều sâu
    for (let t = 0; t < 360; t += 8) {
        const rad = (t * Math.PI) / 180;
        const x = 16 * Math.pow(Math.sin(rad), 3);
        const y = -(
            13 * Math.cos(rad) -
            5 * Math.cos(2 * rad) -
            2 * Math.cos(3 * rad) -
            Math.cos(4 * rad)
        );
        createHeartParticle(centerX + x * 7.6, centerY + y * 7.6, "💗", 10, (t / 360) * 2 + 0.6);
    }
}

// 3. Hiệu ứng bắn tim mượt mà từ nhân vật góc trái về phía trái tim trung tâm
function spawnFlyingHeart() {
    const el = document.createElement("div");
    el.className = "flying-heart";
    el.innerText = HEART_ICONS[Math.floor(Math.random() * HEART_ICONS.length)];

    // Tọa độ xuất phát từ nhân vật góc trái
    let startX = 145;
    let startY = window.innerHeight - 115;
    if (shooter) {
        const rect = shooter.getBoundingClientRect();
        startX = rect.left + rect.width * 0.78;
        startY = rect.top + rect.height * 0.58;
    }

    // Tọa độ đích quanh tâm trái tim lớn
    let endX = window.innerWidth * 0.5 + (Math.random() * 160 - 80);
    let endY = window.innerHeight * 0.46 + (Math.random() * 140 - 70);
    if (heart) {
        const hRect = heart.getBoundingClientRect();
        endX = hRect.left + hRect.width * 0.5 + (Math.random() * 180 - 90);
        endY = hRect.top + hRect.height * 0.48 + (Math.random() * 150 - 75);
    }

    const size = Math.floor(Math.random() * 10 + 16);
    const dur = (Math.random() * 0.6 + 1.45).toFixed(2);
    const rot = `${Math.floor(Math.random() * 70 - 35)}deg`;

    el.style.setProperty("--sx", `${startX.toFixed(1)}px`);
    el.style.setProperty("--sy", `${startY.toFixed(1)}px`);
    el.style.setProperty("--ex", `${endX.toFixed(1)}px`);
    el.style.setProperty("--ey", `${endY.toFixed(1)}px`);
    el.style.setProperty("--size", `${size}px`);
    el.style.setProperty("--dur", `${dur}s`);
    el.style.setProperty("--rot", rot);

    el.addEventListener("animationend", (event) => {
        if ("animation" in AnimationEvent.prototype && event.animation) {
            el.remove();
            return;
        }
        el.remove();
    }, { once: true });

    document.body.appendChild(el);
}

// 4. Hiệu ứng bung tim khi click chuột bất kỳ đâu trên màn hình
function createClickBurst(clientX, clientY) {
    const count = 8;
    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "burst-heart";
        el.innerText = HEART_ICONS[i % HEART_ICONS.length];

        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
        const distance = 45 + Math.random() * 55;
        const tx = clientX + Math.cos(angle) * distance;
        const ty = clientY + Math.sin(angle) * distance - 20;

        el.style.setProperty("--bx", `${clientX}px`);
        el.style.setProperty("--by", `${clientY}px`);
        el.style.setProperty("--tx", `${tx.toFixed(1)}px`);
        el.style.setProperty("--ty", `${ty.toFixed(1)}px`);
        el.style.setProperty("--size", `${Math.floor(Math.random() * 8 + 13)}px`);
        el.style.setProperty("--rot", `${Math.floor(Math.random() * 90 - 45)}deg`);

        el.addEventListener("animationend", () => el.remove(), { once: true });
        document.body.appendChild(el);
    }
}

// 5. Điều khiển nhạc nền (bật/tắt + tự phát ở lần chạm đầu tiên)
let userToggledMusic = false;

function updateMusicUI(playing) {
    if (!musicBtn || !musicLabel) return;
    musicBtn.classList.toggle("is-playing", playing);
    musicBtn.setAttribute("aria-pressed", String(playing));
    musicLabel.textContent = playing ? "Đang phát nhạc" : "Nhạc đã tắt";
}

async function toggleMusic(forcePlay = false) {
    if (!audio) return;
    try {
        if (forcePlay || audio.paused) {
            await audio.play();
            updateMusicUI(true);
        } else {
            audio.pause();
            updateMusicUI(false);
        }
    } catch {
        updateMusicUI(false);
    }
}

if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        userToggledMusic = true;
        toggleMusic();
    });
}

document.addEventListener("click", (e) => {
    createClickBurst(e.clientX, e.clientY);
    if (!userToggledMusic && audio && audio.paused) {
        userToggledMusic = true;
        toggleMusic(true);
    }
});

// Khởi chạy
createSparkles(45);
buildMainHeart();
setInterval(spawnFlyingHeart, 280);

