const jsonResponse = (data, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-store',
    },
  });
};

const normalize = (value, maxLength = 2000) => {
  return String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
};

const parseRequestBody = async (request) => {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
};

export async function onRequestGet() {
  return jsonResponse({ ok: true, message: 'Baozuan inquiry API is running.' });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.GOOGLE_SCRIPT_URL) {
      return jsonResponse({ ok: false, error: 'Server is not configured. Missing GOOGLE_SCRIPT_URL.' }, 500);
    }

    const body = await parseRequestBody(request);

    // Honeypot field. Real users will not fill this field. Bots often do.
    if (normalize(body.company, 200)) {
      return jsonResponse({ ok: true, message: 'Inquiry received.' });
    }

    const inquiry = {
      name: normalize(body.name, 120),
      contact: normalize(body.contact, 200),
      message: normalize(body.message, 3000),
      requirement: normalize(body.requirement, 3000),
      consent: normalize(body.consent, 20),
      landingMarket: normalize(body.landingMarket, 80),
      source: normalize(body.source, 160),
      page: normalize(body.page, 500),
      pageTitle: normalize(body.pageTitle, 300),
      timezone: normalize(body.timezone, 100),
      userAgent: normalize(request.headers.get('user-agent'), 500),
      ip: normalize(request.headers.get('cf-connecting-ip'), 80),
      country: normalize(request.cf?.country, 10),
      submittedAt: new Date().toISOString(),
    };

    if (!inquiry.name || !inquiry.contact || !inquiry.message) {
      return jsonResponse({ ok: false, error: 'Please fill in name, contact, and product requirement.' }, 400);
    }

    if (inquiry.message.length < 10) {
      return jsonResponse({ ok: false, error: 'Product requirement is too short.' }, 400);
    }

    if (inquiry.consent !== 'yes') {
      return jsonResponse({ ok: false, error: 'Consent is required before submitting the inquiry.' }, 400);
    }

    const upstream = await fetch(env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });

    if (!upstream.ok) {
      return jsonResponse({ ok: false, error: 'Google Apps Script rejected the inquiry.' }, 502);
    }

    const text = await upstream.text();
    let result = { ok: true };

    try {
      result = JSON.parse(text);
    } catch (_) {
      // Some Apps Script deployments return text; treat HTTP 200 as success.
    }

    if (result.ok === false) {
      return jsonResponse({ ok: false, error: result.error || 'Google Apps Script failed.' }, 502);
    }

    return jsonResponse({ ok: true, message: 'Inquiry sent.' });
  } catch (error) {
    return jsonResponse({ ok: false, error: 'Unexpected server error.' }, 500);
  }
}
