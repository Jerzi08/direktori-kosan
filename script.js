fetch('data/kosan.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('kosan-container');
    data.forEach(kos => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <img src="${kos.gambar}" alt="${kos.nama}">
        <h2>${kos.nama}</h2>
        <p><strong>Lokasi:</strong> ${kos.lokasi}</p>
        <p><strong>Harga:</strong> ${kos.harga}</p>
        <p><strong>Fasilitas:</strong> ${kos.fasilitas.join(', ')}</p>
        <a href="${kos.kontak}" target="_blank">Hubungi via WhatsApp</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Gagal memuat data kosan:', error);
  });
