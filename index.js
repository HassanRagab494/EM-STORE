const firebaseConfig = {
  apiKey: "AIzaSyC8G62xrVgWPx_zcRsVmBMDlFWgeELhzBw",
  authDomain: "pubg-dashboard-dbc21.firebaseapp.com",
  projectId: "pubg-dashboard-dbc21",
  storageBucket: "pubg-dashboard-dbc21.firebasestorage.app",
  messagingSenderId: "708314220951",
  appId: "1:708314220951:web:bd506eef142d90c27b9cd2",
  measurementId: "G-7PLN1YG0ZR"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


function renderPackages() {
  db.collection('ucPackages').onSnapshot(snapshot => {
    cardsContainer.innerHTML = '<div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2"></div>';
    const row = cardsContainer.querySelector('.row');

    snapshot.forEach(doc => {
      const pkg = doc.data();

      const col = document.createElement('div');
      col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';

      const card = document.createElement('div');
      card.className = 'card h-100 p-3 bg-dark text-white';
      card.style.cursor = 'pointer';

      card.innerHTML = `
      <div class="d-flex align-items-center justify-content-between px-2">
        <div class="d-flex align-items-center">
          <img src="7785269-middle-removebg-preview.png" alt="UC" style="width: 40px; height: 40px; margin-left: 8px;">
          <h6 class="mb-0">${pkg.amount} UC</h6>
        </div>
        <p class="text-success fw-bold mb-0">${pkg.price} جنيه</p>
      </div>
    `;    

      card.addEventListener('click', () => {
        const confirmed = confirm(`هل تريد شراء ${pkg.amount} UC؟`);
        if (confirmed) {
          const message = encodeURIComponent(`أريد شراء ${pkg.amount} UC`);
          const phone = "201022091381";
          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
          const whatsappLink = isMobile
            ? `whatsapp://send?phone=${phone}&text=${message}`
            : `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

          window.open(whatsappLink, '_blank');
        }
      });

      col.appendChild(card);
      row.appendChild(col);
    });
  });
}
renderPackages();
const CORRECT_USERNAME = "EMSTORE"; 
const CORRECT_PASSWORD = "2025"; 
const REDIRECT_PAGE = "admin.html";

const modal = document.getElementById("loginModal");
const openBtn = document.getElementById("openLoginPopupBtn");
const closeBtn = document.querySelector(".modal-content .close-btn"); 
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const errorMessage = document.getElementById("errorMessage");

function openModal() {
  errorMessage.textContent = ''; 
  usernameInput.value = ''; 
  passwordInput.value = ''; 
  modal.style.display = "flex"; 
  usernameInput.focus(); 
}

function closeModal() {
  modal.style.display = "none"; 
}

function handleLogin() {
  const enteredUsername = usernameInput.value.trim(); 
  const enteredPassword = passwordInput.value.trim();

  // إعادة تعيين رسالة الخطأ
  errorMessage.textContent = '';
  errorMessage.style.display = 'none'; 

  if (enteredUsername === "" || enteredPassword === "") {
    errorMessage.textContent = "الرجاء إدخال اسم المستخدم وكلمة المرور.";
    errorMessage.style.display = 'block';
    return; 
  }

  if (enteredUsername === CORRECT_USERNAME && enteredPassword === CORRECT_PASSWORD) {
    alert("تم تسجيل الدخول بنجاح!"); 
    window.location.href = REDIRECT_PAGE;
  } else {
    errorMessage.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    errorMessage.style.display = 'block'; 
    passwordInput.focus();
    passwordInput.select(); 
  }
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
loginSubmitBtn.addEventListener('click', handleLogin);

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    closeModal();
  }
});

passwordInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        handleLogin(); 
    }
});
  function copyToClipboard(number) {
    navigator.clipboard.writeText(number).then(() => {
      const msg = document.getElementById('copyMsg');
      msg.classList.remove('d-none');
      setTimeout(() => msg.classList.add('d-none'), 2000);
    });
  }
  document.addEventListener('DOMContentLoaded', function() {
    const paymentModal = document.getElementById('paymentModal');
    if (!paymentModal) return;

    const copyAlert = paymentModal.querySelector('#copyAlert');
    const copyButtons = paymentModal.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSelector = this.getAttribute('data-copy-target');
            const targetElement = paymentModal.querySelector(targetSelector); 

            if (targetElement) {
                const numberToCopy = targetElement.textContent.trim();
                navigator.clipboard.writeText(numberToCopy)
                    .then(() => {
                        if (copyAlert) {
                            copyAlert.textContent = `تم نسخ: ${numberToCopy}`;
                            copyAlert.classList.remove('d-none', 'alert-danger');
                            copyAlert.classList.add('alert-success');
                        }
                        const originalButtonHTML = this.innerHTML;
                        this.innerHTML = 'تم النسخ!';
                        this.disabled = true;
                        setTimeout(() => {
                            this.innerHTML = originalButtonHTML;
                            this.disabled = false;
                            if (copyAlert) copyAlert.classList.add('d-none');
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('فشل النسخ: ', err);
                        if (copyAlert) {
                            copyAlert.textContent = 'فشل النسخ!';
                            copyAlert.classList.remove('d-none', 'alert-success');
                            copyAlert.classList.add('alert-danger');
                            setTimeout(() => {
                                if (copyAlert) copyAlert.classList.add('d-none');
                            }, 3000);
                        }
                    });
            }
        });
    });

    paymentModal.addEventListener('hidden.bs.modal', function () {
        if (copyAlert) {
            copyAlert.classList.add('d-none');
        }
        copyButtons.forEach(button => {
             if (button.disabled && button.textContent === 'تم النسخ!') {
                button.innerHTML = '<i class="bi bi-clipboard"></i> نسخ'; // أعد النص الأصلي
                button.disabled = false;
             }
        });
    });
});

 const loginModalElement = document.getElementById("loginModal");
 const openLoginBtn = document.getElementById("openLoginPopupBtn");
 const closeLoginBtn = loginModalElement ? loginModalElement.querySelector(".close-btn") : null;

 function openLoginModal() {
    if(loginModalElement) loginModalElement.style.display = "flex";
 }
 function closeLoginModal() {
    if(loginModalElement) loginModalElement.style.display = "none";
 }

 if(openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
 if(closeLoginBtn) closeLoginBtn.addEventListener('click', closeLoginModal);
  window.addEventListener('click', function(event) {
      if (event.target == loginModalElement) {
        closeLoginModal();
      }
    });
    const messages = [
      "أسعار شحن شدات PUBG Mobile UC | الشحن عن طريق الـ ID في EM STORE",
      "يقدم متجر EM STORE خدمة شحن شدات ببجي موبايل (UC) بأفضل الأسعار وأسرع وقت.",
      "يتم شحن يوسي UC مباشرة على حسابك عن طريق الـ ID بأمان تام. تصفح باقاتنا المتنوعة الآن واختر ما يناسبك!"
    ];
  
    const scrollingEl = document.getElementById("scrollingMessage");
    let index = 0;
  
    function showScrollingMessage() {
      scrollingEl.textContent = messages[index];
      scrollingEl.style.animation = "none"; // إعادة تعيين الأنيميشن
  
      // لإجبار إعادة التشغيل
      void scrollingEl.offsetWidth;
  
      scrollingEl.style.animation = "smooth-scroll 10s linear forwards";
  
      // تحديد المدة التي تنتظرها قبل عرض الرسالة التالية (حسب مدة الأنيميشن)
      setTimeout(() => {
        index = (index + 1) % messages.length;
        showScrollingMessage();
      }, 11000); // 10 ثواني للأنيميشن + 1 ثانية راحة
    }
  
    showScrollingMessage();
