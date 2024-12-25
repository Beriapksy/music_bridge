document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("signUpButton");
  const signInButton = document.getElementById("signInButton");
  const signInForm = document.getElementById("signIn");
  const signUpForm = document.getElementById("signUpForm");

  // Event listener'lar
  signUpButton.addEventListener("click", changeToSignUp);
  signInButton.addEventListener("click", changeToSignIn);

  // Sign Up Formu gönderildiğinde verileri al
  const form = document.querySelector('#signUpForm form');
  form.addEventListener("submit", kayitFonksiyonu);

  function kayitFonksiyonu(e) {
      e.preventDefault();  // Form gönderimini engelle

      
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////

      // Formdan verileri al
      const email = document.getElementById("EMAIL").value;
      const password = document.getElementById("PASSWORD").value;

      // Backend'e POST isteği gönder
      fetch('http://localhost:3000/signup', {  // Sunucunun doğru endpoint'ine yönlendir
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',  // JSON formatında veri gönderiyoruz
          },
          body: JSON.stringify({ email, password })  // JSON formatında kullanıcı verisini gönder
      })
      .then(response => response.json())  // Sunucudan gelen yanıtı JSON olarak al
      .then(data => {
          if (data.message) {
              //alert(data.message);  // Sunucudan gelen mesajı göster

              // Kullanıcı kaydedildikten sonra yeni sayfaya yönlendir
              window.location.href = 'yt1.html';  // Yeni sayfaya yönlendirme

          }
      })
      .catch(error => {
          console.error('Bir hata oluştu:', error);
      });

     
  }

  function changeToSignUp() {
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
  }

  function changeToSignIn() {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
  }
});


