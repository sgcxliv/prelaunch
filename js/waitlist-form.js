(function () {
  const form = document.getElementById('waitlist-form');
  const feedback = document.getElementById('waitlist-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const phone = String(fd.get('phone') || '').trim();

    if (!name || !email) {
      feedback.textContent = 'Please add your name and email.';
      feedback.classList.remove('waitlist__note--ok');
      return;
    }

    const payload = { name, email, phone, at: new Date().toISOString() };
    try {
      const key = 'party_waitlist_mock';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      prev.push(payload);
      localStorage.setItem(key, JSON.stringify(prev));
    } catch (_) {
      /* ignore quota / privacy mode */
    }

    feedback.textContent = "You're on the list — we'll be in touch.";
    feedback.classList.add('waitlist__note--ok');
    form.reset();
  });
})();
