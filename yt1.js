document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("playlistForm");
    const backButton = document.getElementById("backButton"); // Anasayfaya dön butonunu kontrol etmek için

    // Form gönderim işlemi
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const playlistLink = document.getElementById("playlistLink").value;

        // YouTube playlist linki doğrulaması
        const youtubeLinkPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/.*(\?|&)list=)[a-zA-Z0-9_-]+/;
        if (!youtubeLinkPattern.test(playlistLink)) {
            alert("Geçerli bir YouTube playlist linki giriniz.");
            return;
        }

        // Veriyi backend'e gönder
        fetch('http://localhost:4000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistLink }),
            mode: 'cors',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Sunucu hatası: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                //alert(data.message); // Başarılı mesajı göster

                // Kullanıcıyı girilen YouTube playlistine yönlendir
                window.location.href = playlistLink;
            } else {
                alert('Bir sorun oluştu. Lütfen tekrar deneyin.');
            }
        })
        .catch(error => {
            console.error('Bir hata oluştu:', error);
            alert('Bir hata oluştu: ' + error.message);
        });
    });

    // Anasayfaya dön butonu
    backButton.addEventListener("click", function () {
        window.location.href = "yt1.html"; // Anasayfaya yönlendirme
    });
});
