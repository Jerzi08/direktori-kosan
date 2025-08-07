fetch('data/kosan.json')  // tambahkan folder data di depan
  .then(response => {
    if (!response.ok) throw new Error('Gagal load data kosan');
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('kosan-container');
    data.forEach(kosan => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${kosan.gambar}" alt="Foto ${kosan.nama}" />
        <div class="card-content">
          <h2>${kosan.nama}</h2>
          <p><strong>Lokasi:</strong> ${kosan.lokasi}</p>
          <p><strong>Harga:</strong> ${kosan.harga}</p>
          <p><strong>Fasilitas:</strong> ${kosan.fasilitas}</p>
          <a href="${kosan.whatsapp}" target="_blank" class="btn-whatsapp">Hubungi via WhatsApp</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('kosan-container').innerText = 'Gagal memuat data kosan.';
  });
