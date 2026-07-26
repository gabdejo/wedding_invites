# Culqi Web Diligence Requirements

> Requirements that the website must meet before Culqi approves API integration.
> Reference this file during implementation to ensure compliance at every step.

---

## Eligible Platforms

- Virtual store **web apps**
- Virtual store **mobile apps**

---

## General Information (Mandatory)

- [ ] Clearly state what products or services the business offers (visible on landing/home).
- [ ] Display contact details: **phone number**, **email address**, and **physical address**.
- [ ] Any social media icons must link to the actual corresponding accounts (no dead links).

---

## Legal Information (Mandatory)

- [ ] **Terms & Conditions** page must be present and accessible.
- [ ] **Return and/or Exchange Policy** page must be present and accessible.
- [ ] **Complaints Book** (*Libro de Reclamaciones*) must be embedded directly in the site/app, complying with INDECOPI guidelines.
  - ⚠️ Must **not** rely on external forms, links, or files (e.g. Google Drive, Typeform, etc.).

---

## Products & Services

- [ ] Show a minimum of **5 products** (minimum count may vary for service-based businesses depending on the industry/model).
- [ ] Every product/service listing must include:
  - [ ] A **photo**
  - [ ] A **clear description**
  - [ ] A **visible price**

---

## Purchase Flow

- [ ] A **shopping cart** or **Buy button** must be present and functional.
- [ ] If the checkout flow requires login, provide Culqi with **test credentials** (username + password).

---

## Security

- [ ] SSL certificate must be active and enforced **across all URLs** — not just the homepage.
  - This includes internal routes such as `/products`, `/contact`, `/checkout`, etc.
  - All pages must load over `https://`.
