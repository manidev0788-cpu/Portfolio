const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isBlank(value) {
  return clean(value).length === 0;
}

/** Field validation only — safe to run in the browser. */
export function validateContactFields(body) {
  const errors = {};
  const name = clean(body?.name);
  const email = clean(body?.email);
  const subject = clean(body?.subject);
  const message = clean(body?.message);

  if (isBlank(name)) errors.name = "Name is required.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (isBlank(email)) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Enter a valid email address.";
  else if (email.length > 254) errors.email = "Email must be 254 characters or fewer.";

  if (isBlank(subject)) errors.subject = "Subject is required.";
  else if (subject.length > 200) errors.subject = "Subject must be 200 characters or fewer.";

  if (isBlank(message)) errors.message = "Message is required.";
  else if (message.length < 3) errors.message = "Message must be at least 3 characters.";
  else if (message.length > 5000) errors.message = "Message must be 5000 characters or fewer.";

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    data: valid ? { name, email, subject, message } : null,
  };
}

/** Server-only spam check — do not block real users in the browser. */
export function isHoneypotTriggered(body) {
  const honeypot = clean(body?._hp ?? body?.["bot-field"] ?? "");
  return honeypot.length > 0;
}

/** Full validation for API route. */
export function validateContactPayload(body) {
  const { valid, errors, data } = validateContactFields(body);
  const spamDetected = isHoneypotTriggered(body);

  return {
    valid: valid && !spamDetected,
    errors,
    spamDetected,
    data: valid && !spamDetected ? data : null,
  };
}
