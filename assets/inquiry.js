(() => {
  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formStatus');

  if (!form || !status) return;

  const setStatus = (message, type) => {
    status.textContent = message;
    status.className = `form-status show ${type}`;
  };

  const clearStatus = () => {
    status.textContent = '';
    status.className = 'form-status';
  };

  const clean = (value) => String(value || '').trim();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    const payload = {
      name: clean(form.elements.name?.value),
      contact: clean(form.elements.contact?.value),
      message: clean(form.elements.message?.value),
      company: clean(form.elements.company?.value),
      page: window.location.href,
      pageTitle: document.title,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    };

    if (!payload.name || !payload.contact || !payload.message) {
      setStatus('Please fill in your name, contact information, and product requirement.', 'error');
      return;
    }

    if (payload.message.length < 10) {
      setStatus('Please add a little more detail about the product requirement.', 'error');
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(result.error || 'The inquiry could not be sent.');
      }

      form.reset();
      setStatus('Thank you. Your inquiry has been sent successfully. We will contact you soon.', 'success');
    } catch (error) {
      setStatus('Sorry, the message could not be sent. Please email us directly at info@baozuanhardware.com.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
})();
