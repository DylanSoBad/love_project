const heart = document.getElementById("heart");

function createHeart(x, y) {
    const el = document.createElement("div");
    el.innerText = "❤️";
    el.style.position = "absolute";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = "12px";
    heart.appendChild(el);
}

// vẽ trái tim bằng công thức
for (let t = 0; t < 360; t += 2) {
    let x = 16 * Math.pow(Math.sin(t * Math.PI / 180), 3);
    let y = -(13 * Math.cos(t * Math.PI / 180)
        - 5 * Math.cos(2 * t * Math.PI / 180)
        - 2 * Math.cos(3 * t * Math.PI / 180)
        - Math.cos(4 * t * Math.PI / 180));

    createHeart(150 + x * 8, 150 + y * 8);
}


setInterval(() => {
    const el = document.createElement("div");
    el.innerText = "💘";
    el.style.position = "absolute";
    el.style.left = "120px";
    el.style.top = "450px";
    el.style.fontSize = "20px";

    document.body.appendChild(el);

    let x = 120;
    let y = 450;

    const move = setInterval(() => {
        x += 3;
        y -= 2;
        el.style.left = x + "px";
        el.style.top = y + "px";

        if (y < 200) {
            clearInterval(move);
            el.remove();
        }
    }, 16);

}, 300);
