const ucCards = document.getElementById('ucCards');

function renderPackages(packages) {
  ucCards.innerHTML = '';
  packages.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${data.amount} UC</h3>
      <p>السعر: ${data.price} جنيه</p>
    `;
    ucCards.appendChild(card);
  });
}

// جلب البيانات من Firestore
db.collection('ucPackages').onSnapshot(snapshot => {
  renderPackages(snapshot.docs);
});
