fetch('data/kosan.json')  // folder data di depan
  .then(response => {
    if (!response.ok) throw new Error('Gagal load data kosan');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('kosan-container');
    data.forEach(kosan => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Buat elemen gambar supaya bisa diberi event klik
      const img = document.createElement('img');
      img.src = `images/${kosan.gambar}`;
      img.alt = `Foto ${kosan.nama}`;

      // Event klik gambar untuk buka modal galeri
      img.addEventListener('click', () => {
        const galeriModal = document.getElementById('modal-galeri');
        const galeriBody = document.getElementById('galeri-body');
        galeriBody.innerHTML = ''; // kosongkan galeri dulu

        if (kosan.fotoDetail && kosan.fotoDetail.length > 0) {
          kosan.fotoDetail.forEach(foto => {
            const imgEl = document.createElement('img');
            imgEl.src = `images/${foto}`;
            imgEl.alt = 'Foto detail kamar';
            galeriBody.appendChild(imgEl);
          });
        } else {
          galeriBody.innerHTML = '<p>Tidak ada foto detail tersedia.</p>';
        }

        galeriModal.style.display = 'flex';  // gunakan flex untuk modal tampil
      });

      // Tambahkan gambar ke card
      card.appendChild(img);

      // Tambahkan konten kosan setelah gambar, termasuk detail kamar
      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content');
      cardContent.innerHTML = `
        <h2>${kosan.nama}</h2>
        <p><strong>Lokasi:</strong> ${kosan.lokasi}</p>
        <p><strong>Harga:</strong> ${kosan.harga}</p>
        <p><strong>Fasilitas:</strong> ${kosan.fasilitas}</p>
        <p><strong>Detail Kamar:</strong> ${kosan.detail}</p>
        <a href="${kosan.whatsapp}" target="_blank" class="btn-whatsapp">Hubungi via WhatsApp</a>
      `;
      card.appendChild(cardContent);

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('kosan-container').innerText = 'Gagal memuat data kosan.';
  });

// Tambah modal close logic
const modalGaleri = document.getElementById('modal-galeri');
const closeGaleriBtn = document.querySelector('.close-button-galeri');

closeGaleriBtn.addEventListener('click', () => {
  modalGaleri.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modalGaleri) {
    modalGaleri.style.display = 'none';
  }
});
