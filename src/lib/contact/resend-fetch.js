import https from "node:https";

/**
 * POST JSON to Resend. In local dev, retries with relaxed TLS when Windows
 * SSL inspection causes UNABLE_TO_VERIFY_LEAF_SIGNATURE for Node fetch.
 */
function httpsPostJson(url, headers, jsonBody, { rejectUnauthorized = true }) {
  return new Promise((resolve, reject) => {
    const target = new URL(url);
    const body = JSON.stringify(jsonBody);

    const req = https.request(
      {
        hostname: target.hostname,
        port: 443,
        path: target.pathname,
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        rejectUnauthorized,
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          let parsed = {};
          try {
            parsed = raw ? JSON.parse(raw) : {};
          } catch {
            parsed = { message: raw || "Invalid response from email service." };
          }
          resolve({ status: res.statusCode ?? 500, body: parsed });
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function postToResend(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  const headers = { Authorization: `Bearer ${apiKey}` };

  try {
    return await httpsPostJson("https://api.resend.com/emails", headers, payload, {
      rejectUnauthorized: true,
    });
  } catch (err) {
    const code = err?.code ?? err?.cause?.code;
    const isTlsIssue =
      code === "UNABLE_TO_VERIFY_LEAF_SIGNATURE" ||
      code === "CERT_HAS_EXPIRED" ||
      err?.message?.includes("certificate");

    if (process.env.NODE_ENV !== "development" || !isTlsIssue) {
      throw err;
    }

    return httpsPostJson("https://api.resend.com/emails", headers, payload, {
      rejectUnauthorized: false,
    });
  }
}

export async function sendResendEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, status: 503, message: "Email service is not configured." };
  }

  const { status, body } = await postToResend(payload);

  if (status < 200 || status >= 300) {
    return { ok: false, status, body };
  }

  return { ok: true, body };
}
