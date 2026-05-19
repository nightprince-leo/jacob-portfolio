/**
 * Proxies contact form submissions to Web3Forms.
 * Set WEB3FORMS_ACCESS_KEY in the environment (e.g. Vercel project settings).
 * https://web3forms.com/
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const { name, email, message } = req.body || {};
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ ok: false });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('[contact] WEB3FORMS_ACCESS_KEY is not set on this deployment');
    return res.status(503).json({ ok: false });
  }

  const submit = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio: ${trimmedName}`,
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    }),
  });

  const data = await submit.json().catch((err) => {
    console.error('[contact] Web3Forms response was not JSON', {
      httpStatus: submit.status,
      error: err?.message,
    });
    return {};
  });

  if (!data.success) {
    const web3Message =
      data.body?.message ?? data.message ?? 'No message from Web3Forms';
    console.error('[contact] Web3Forms rejected submission', {
      httpStatus: submit.status,
      message: web3Message,
      response: data,
    });
    return res.status(502).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
}
