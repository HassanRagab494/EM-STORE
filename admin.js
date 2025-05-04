    // إعدادات Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyC8G62xrVgWPx_zcRsVmBMDlFWgeELhzBw",
      authDomain: "pubg-dashboard-dbc21.firebaseapp.com",
      projectId: "pubg-dashboard-dbc21",
      storageBucket: "pubg-dashboard-dbc21.firebasestorage.app",
      messagingSenderId: "708314220951",
      appId: "1:708314220951:web:bd506eef142d90c27b9cd2",
      measurementId: "G-7PLN1YG0ZR"
    };
    
        // تهيئة Firebase
    // تهيئة Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    
    // استرجاع البيانات من Firestore وعرضها في الصفحة
    const cardsContainer = document.getElementById('cardsContainer');  // العنصر الذي سيتم إضافة البطاقات فيه
    
    function renderPackages() {
      db.collection('ucPackages').get().then(snapshot => {
        cardsContainer.innerHTML = '';  // تنظيف المحتوى السابق
        snapshot.forEach(doc => {
          const pkg = doc.data();
          const card = document.createElement('div');
          card.className = 'card text-center border-0 bg-transparent ';
          card.innerHTML = `
          <div class="custom-package-card">
            <h3 class="custom-package-title">${pkg.amount} UC</h3>
            <p class="custom-package-price">السعر: ${pkg.price} جنيه</p>
            <div class="custom-package-actions">
              <button class="custom-btn custom-btn-edit" onclick="editPackage('${doc.id}')">تعديل</button>
              <button class="custom-btn custom-btn-delete" onclick="deletePackage('${doc.id}')">حذف</button>
            </div>
          </div>
        `;
          cardsContainer.appendChild(card);
        });
      }).catch(error => {
        console.error("حدث خطأ أثناء تحميل البيانات:", error);
      });
    }
    
    // استدعاء دالة renderPackages لعرض البيانات عند تحميل الصفحة
    renderPackages();
    // دالة إضافة البيانات إلى Firebase
    document.getElementById('ucForm').addEventListener('submit', function(e) {
      e.preventDefault(); // منع إعادة تحميل الصفحة
    
      const amount = document.getElementById('ucAmount').value;
      const price = document.getElementById('ucPrice').value;
    
      db.collection('ucPackages').add({
        amount: amount,
        price: price
      }).then(() => {
        alert('✅ تم الإضافة بنجاح');
        document.getElementById('ucForm').reset(); // إعادة تعيين الفورم
        renderPackages(); // إعادة تحميل البيانات
      }).catch(error => {
        console.error("❌ حدث خطأ أثناء الإضافة:", error);
      });
    });
    
    
    // دالة تعديل البيانات
    function editPackage(id) {
      const newAmount = prompt("ادخل القيمة الجديدة لـ UC:");
      const newPrice = prompt("ادخل السعر الجديد:");
    
      if (newAmount && newPrice) {
        db.collection('ucPackages').doc(id).update({
          amount: newAmount,
          price: newPrice
        }).then(() => {
          alert('تم التعديل بنجاح');
          renderPackages();  // إعادة تحميل البيانات
        }).catch((error) => {
          console.error("حدث خطأ أثناء التعديل:", error);
        });
      }
    }
    
    function deletePackage(id) {
      const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذه البيانات؟");
      if (confirmDelete) {
        db.collection('ucPackages').doc(id).delete().then(() => {
          alert('تم الحذف بنجاح');
          renderPackages();  
        }).catch((error) => {
          console.error("حدث خطأ أثناء الحذف:", error);
        });
      }
    }
