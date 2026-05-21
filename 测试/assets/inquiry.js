(() => {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSmJ9F2mqa-fkytslAhGubyHH2Gj_blGeqPGlLiSyRrykOWAnIGMN8lJvZybjFO5MuLw/exec';
  const LOCAL_API_URL = '/api/inquiry';

  const form = document.getElementById('inquiryForm');
  const status = document.getElementById('formStatus');

  const track = (eventName, details = {}) => {
    if (window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track(eventName, details);
    }
  };

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => {
      track('Contact', {
        content_name: element.getAttribute('data-track'),
        page_url: window.location.href
      });
    });
  });

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

  const postJson = async (url, payload) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json().catch(() => ({ ok: true }));
  };

  const postGoogleFallback = async (payload) => {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    return { ok: true };
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearStatus();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : 'Gửi yêu cầu báo giá';

    const payload = {
      name: clean(form.elements.name?.value),
      contact: clean(form.elements.contact?.value),
      requirement: clean(form.elements.message?.value),
      message: clean(form.elements.message?.value),
      company: clean(form.elements.company?.value),
      consent: form.elements.consent?.checked ? 'yes' : '',
      landingMarket: 'Vietnam',
      source: 'TikTok Vietnam landing page',
      page: window.location.href,
      pageTitle: document.title,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
      submittedAt: new Date().toISOString()
    };

    if (!payload.name || !payload.contact || !payload.message) {
      setStatus('Vui lòng điền họ tên, thông tin liên hệ và sản phẩm cần báo giá.', 'error');
      return;
    }

    if (payload.message.length < 10) {
      setStatus('Vui lòng thêm kích thước, số lượng hoặc yêu cầu sản phẩm để báo giá chính xác hơn.', 'error');
      return;
    }

    if (!payload.consent) {
      setStatus('Vui lòng xác nhận đồng ý để Baozuan liên hệ lại theo thông tin đã gửi.', 'error');
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Đang gửi...';
    }

    try {
      try {
        await postJson(LOCAL_API_URL, payload);
      } catch (_) {
        await postGoogleFallback(payload);
      }

      form.reset();
      track('SubmitForm', {
        content_name: 'Vietnam quotation form',
        page_url: window.location.href
      });
      setStatus('Cảm ơn bạn. Yêu cầu đã được gửi, Baozuan sẽ liên hệ lại sớm.', 'success');
    } catch (error) {
      setStatus('Xin lỗi, yêu cầu chưa gửi được. Vui lòng gửi email trực tiếp tới info@baozuanhardware.com.', 'error');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
})();
