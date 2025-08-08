document.addEventListener('DOMContentLoaded', () => {
  fetch('data/kosan.json')
    .then(response => {
      if (!response.ok) throw new Error('Gagal load data kosan');
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('kosan-container');
      data.forEach(kosan => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = `images/${kosan.gambar}`;
        img.alt = `Foto ${kosan.nama}`;

        // Buka galeri modal saat klik gambar
        img.addEventListener('click', () => {
          const galeriModal = document.getElementById('modal-galeri');
          const galeriBody = document.getElementById('galeri-body');
          galeriBody.innerHTML = '';

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

          galeriModal.style.display = 'flex';
        });

        card.appendChild(img);

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

        // Tambahkan tombol Google Maps jika koordinat tersedia
if (kosan.maps && kosan.maps.lat && kosan.maps.lng) {
  const mapLink = document.createElement('a');
  mapLink.href = `https://www.google.com/maps?q=${kosan.maps.lat},${kosan.maps.lng}`;
  mapLink.target = '_blank';
  mapLink.rel = 'noopener noreferrer';
  mapLink.textContent = 'Lihat di Google Maps';
  mapLink.classList.add('btn-map');
  cardContent.appendChild(mapLink);
}


        card.appendChild(cardContent);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('kosan-container').innerText = 'Gagal memuat data kosan.';
    });

  // Logika modal galeri
  const modalGaleri = document.getElementById('modal-galeri');
  const closeGaleriBtn = document.querySelector('.close-button-galeri');

  closeGaleriBtn.addEventListener('click', () => {
    modalGaleri.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modalGaleri) {
      modalGaleri.style.display = 'none';
    }
  });
});
