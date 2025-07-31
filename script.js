const chameleon = document.getElementById('chameleon');

// Bukalemun ile fare arasındaki sabit mesafe (piksel cinsinden)
const SABIT_UZUNLUK = 150; // Bu değeri istediğiniz gibi ayarlayabilirsiniz (örn: 100, 200, vb.)

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const chameleonRect = chameleon.getBoundingClientRect();
    const chameleonCurrentCenterX = chameleonRect.left + (chameleonRect.width / 2);
    const chameleonCurrentCenterY = chameleonRect.top + (chameleonRect.height / 2);

    const deltaX = mouseX - chameleonCurrentCenterX;
    const deltaY = mouseY - chameleonCurrentCenterY;

    const angleRad = Math.atan2(deltaY, deltaX);

    const angleDeg = angleRad * (180 / Math.PI);

    //...

    // --- BUKALEMUNUN YENİ POZİSYONUNU HESAPLAMA KISMI (Sabit Mesafe İçin) ---
    // Fare pozisyonundan geriye doğru, sabit mesafe kadar bukalemunun yeni merkezini hesaplıyoruz.
    // Bu sayede bukalemun, fareye olan SABIT_UZUNLUK kadar geride durur ve fareye doğru döner.
    const newChameleonCenterX = mouseX - SABIT_UZUNLUK * Math.cos(angleRad);
    const newChameleonCenterY = mouseY - SABIT_UZUNLUK * Math.sin(angleRad);

    // Bukalemunun `left` ve `top` değerlerini hesapladığımız yeni merkeze göre ayarla.
    // CSS'deki `transform: translate(-50%, -50%)` olduğu için, bu `left/top` değerleri
    // bukalemunun görsel merkezini temsil edecektir.
    chameleon.style.left = newChameleonCenterX + 'px';
    chameleon.style.top = newChameleonCenterY + 'px';

    // --- BUKALEMUNUN DÖNÜŞÜNÜ UYGULAMA KISMI ---
    // Hem merkezlemeyi (`translate`), hem de dönmeyi (`rotate`) uyguluyoruz.
    chameleon.style.transform = `translate(-50%, -50%) rotate(${angleDeg}deg)`;
});

// Bukalemunun resimlerini belirli aralıklarla değiştiren animasyon kısmı (Değişiklik Yok)
let counter = 1;
setInterval(function() {
    counter++;
    if (counter > 11) {
        counter = 1;
    }
    chameleon.src = `chameleon/${counter}.png`;
}, 600);