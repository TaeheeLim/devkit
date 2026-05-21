/* DevToolKit · app.js
 * All logic runs client-side. No data leaves the browser.
 */
(function () {
  "use strict";

  // ------- i18n -------
  const I18N = {
    ko: {
      "hero.title": "개발자가 매일 쓰는 7가지 도구",
      "hero.subtitle": "JSON · Base64 · URL · JWT · UUID · Hash · Timestamp. 모두 브라우저에서, 가입 없이, 무료로.",
      "common.input": "입력",
      "common.output": "결과",
      "common.copy": "복사",
      "json.title": "JSON 포매터 / 검증",
      "json.desc": "JSON을 보기 좋게 정렬하거나 한 줄로 압축하고, 유효성을 검사합니다.",
      "json.pretty": "정렬 (2 spaces)",
      "json.minify": "압축",
      "json.validate": "검증만",
      "b64.title": "Base64 인코드 / 디코드",
      "b64.desc": "텍스트를 Base64로 인코딩하거나 디코딩합니다. UTF-8 안전.",
      "b64.encode": "인코드",
      "b64.decode": "디코드",
      "url.title": "URL 인코드 / 디코드",
      "url.desc": "쿼리스트링이나 경로 등 URL에 안전하게 사용할 수 있도록 변환합니다.",
      "url.encode": "인코드",
      "url.decode": "디코드",
      "jwt.title": "JWT 디코더",
      "jwt.desc": "JWT 토큰의 Header / Payload를 디코딩합니다. (서명 검증은 하지 않습니다)",
      "jwt.token": "JWT 토큰",
      "jwt.decode": "디코드",
      "uuid.title": "UUID 생성기 (v4)",
      "uuid.desc": "암호학적으로 안전한 RFC 4122 v4 UUID를 즉시 생성합니다.",
      "uuid.count": "개수",
      "uuid.generate": "생성",
      "hash.title": "해시 생성기 (SHA-1 / SHA-256 / SHA-512)",
      "hash.desc": "브라우저의 Web Crypto API로 안전하게 해시를 생성합니다.",
      "time.title": "Unix Timestamp 변환기",
      "time.desc": "Unix 타임스탬프 ↔ 사람이 읽는 날짜 형식을 변환합니다.",
      "time.toDate": "→ 날짜",
      "time.toUnix": "→ Unix",
      "time.now": "지금",
      "seo.title": "왜 DevToolKit인가요?",
      "seo.body": "DevToolKit은 회원가입 없이 즉시 사용 가능한 개발자 도구 모음입니다. 모든 처리는 사용자의 브라우저 안에서 수행되며, 입력값이 외부 서버로 전송되지 않아 개인정보와 민감 데이터를 안전하게 다룰 수 있습니다.",
      "footer.tag": "개발자를 위한 무료 유틸리티",
      "msg.copied": "복사되었습니다",
      "msg.empty": "입력이 비어있습니다",
      "msg.invalidJson": "유효하지 않은 JSON 입니다",
      "msg.validJson": "유효한 JSON 입니다 ✓",
      "msg.invalidJwt": "유효하지 않은 JWT 토큰입니다",
      "msg.invalidUnix": "유효하지 않은 Unix timestamp",
      "msg.invalidIso": "유효하지 않은 ISO 날짜",
    },
    en: {
      "hero.title": "7 Developer Tools, One Page",
      "hero.subtitle": "JSON · Base64 · URL · JWT · UUID · Hash · Timestamp. In your browser, no signup, free.",
      "common.input": "Input",
      "common.output": "Output",
      "common.copy": "Copy",
      "json.title": "JSON Formatter / Validator",
      "json.desc": "Pretty-print or minify JSON, and validate its syntax.",
      "json.pretty": "Pretty (2 spaces)",
      "json.minify": "Minify",
      "json.validate": "Validate only",
      "b64.title": "Base64 Encode / Decode",
      "b64.desc": "Encode or decode text to/from Base64. UTF-8 safe.",
      "b64.encode": "Encode",
      "b64.decode": "Decode",
      "url.title": "URL Encode / Decode",
      "url.desc": "Make text safe for use in URLs and query strings.",
      "url.encode": "Encode",
      "url.decode": "Decode",
      "jwt.title": "JWT Decoder",
      "jwt.desc": "Decode the Header and Payload of a JWT. (Signature not verified.)",
      "jwt.token": "JWT Token",
      "jwt.decode": "Decode",
      "uuid.title": "UUID Generator (v4)",
      "uuid.desc": "Generate cryptographically secure RFC 4122 v4 UUIDs.",
      "uuid.count": "Count",
      "uuid.generate": "Generate",
      "hash.title": "Hash Generator (SHA-1 / SHA-256 / SHA-512)",
      "hash.desc": "Hashes computed locally with the Web Crypto API.",
      "time.title": "Unix Timestamp Converter",
      "time.desc": "Convert between Unix timestamps and human-readable dates.",
      "time.toDate": "→ Date",
      "time.toUnix": "→ Unix",
      "time.now": "Now",
      "seo.title": "Why DevToolKit?",
      "seo.body": "DevToolKit is a free, no-signup collection of developer utilities. Everything runs locally in your browser — your input never leaves your device, keeping sensitive data safe.",
      "footer.tag": "Free utilities for developers",
      "msg.copied": "Copied",
      "msg.empty": "Input is empty",
      "msg.invalidJson": "Invalid JSON",
      "msg.validJson": "Valid JSON ✓",
      "msg.invalidJwt": "Invalid JWT token",
      "msg.invalidUnix": "Invalid Unix timestamp",
      "msg.invalidIso": "Invalid ISO date",
    },
  };

  let LANG = (navigator.language || "en").startsWith("ko") ? "ko" : "en";
  try { LANG = localStorage.getItem("devtoolkit.lang") || LANG; } catch (e) {}

  function t(key) {
    return (I18N[LANG] && I18N[LANG][key]) || I18N.en[key] || key;
  }

  function applyI18n() {
    document.documentElement.lang = LANG;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const k = el.getAttribute("data-i18n");
      const v = t(k);
      if (v) el.textContent = v;
    });
    const btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = LANG === "ko" ? "EN" : "KO";
  }

  // ------- Helpers -------
  const $ = function (id) { return document.getElementById(id); };

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove("show"); }, 1600);
  }
  function setStatus(id, msg, kind) {
    const el = $(id);
    if (!el) return;
    el.textContent = msg || "";
    el.className = "status" + (kind ? " " + kind : "");
  }

  // UTF-8 safe Base64
  function utf8ToB64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }
  function b64ToUtf8(str) {
    return decodeURIComponent(escape(atob(str)));
  }
  // Base64URL → Base64 padding
  function b64UrlToB64(s) {
    s = s.replace(/-/g, "+").replace(/_/g, "/");
    while (s.length % 4) s += "=";
    return s;
  }
  function bufToHex(buf) {
    const b = new Uint8Array(buf);
    let out = "";
    for (let i = 0; i < b.length; i++) out += b[i].toString(16).padStart(2, "0");
    return out;
  }

  // ------- Actions -------
  const ACTIONS = {
    "json-pretty": function () { runJson("pretty"); },
    "json-minify": function () { runJson("minify"); },
    "json-validate": function () { runJson("validate"); },
    "b64-encode": function () {
      const v = $("b64-input").value;
      if (!v) return setStatus("b64-status", t("msg.empty"), "err");
      try { $("b64-output").value = utf8ToB64(v); setStatus("b64-status", "OK", "ok"); }
      catch (e) { setStatus("b64-status", String(e.message || e), "err"); }
    },
    "b64-decode": function () {
      const v = $("b64-input").value.trim();
      if (!v) return setStatus("b64-status", t("msg.empty"), "err");
      try { $("b64-output").value = b64ToUtf8(v); setStatus("b64-status", "OK", "ok"); }
      catch (e) { setStatus("b64-status", String(e.message || e), "err"); }
    },
    "url-encode": function () {
      const v = $("url-input").value;
      if (!v) return setStatus("url-status", t("msg.empty"), "err");
      $("url-output").value = encodeURIComponent(v);
      setStatus("url-status", "OK", "ok");
    },
    "url-decode": function () {
      const v = $("url-input").value;
      if (!v) return setStatus("url-status", t("msg.empty"), "err");
      try { $("url-output").value = decodeURIComponent(v); setStatus("url-status", "OK", "ok"); }
      catch (e) { setStatus("url-status", String(e.message || e), "err"); }
    },
    "jwt-decode": function () {
      const v = $("jwt-input").value.trim();
      if (!v) return setStatus("jwt-status", t("msg.empty"), "err");
      const parts = v.split(".");
      if (parts.length < 2) return setStatus("jwt-status", t("msg.invalidJwt"), "err");
      try {
        const h = JSON.parse(b64ToUtf8(b64UrlToB64(parts[0])));
        const p = JSON.parse(b64ToUtf8(b64UrlToB64(parts[1])));
        $("jwt-header").value = JSON.stringify(h, null, 2);
        $("jwt-payload").value = JSON.stringify(p, null, 2);
        setStatus("jwt-status", "OK", "ok");
      } catch (e) {
        setStatus("jwt-status", t("msg.invalidJwt"), "err");
      }
    },
    "uuid-generate": function () {
      const n = Math.max(1, Math.min(100, parseInt($("uuid-count").value, 10) || 1));
      const list = [];
      for (let i = 0; i < n; i++) list.push(uuidv4());
      $("uuid-output").value = list.join("\n");
    },
    "hash": async function (btn) {
      const algo = btn.getAttribute("data-algo");
      const v = $("hash-input").value;
      if (!v) { $("hash-output").value = ""; return; }
      const buf = new TextEncoder().encode(v);
      const hash = await crypto.subtle.digest(algo, buf);
      $("hash-output").value = algo + ": " + bufToHex(hash);
    },
    "time-from-unix": function () {
      const v = $("time-unix").value.trim();
      if (!v) return ($("time-result").textContent = "");
      const n = Number(v);
      if (!isFinite(n)) return setStatus("time-result", t("msg.invalidUnix"), "err");
      const d = new Date(n * 1000);
      if (isNaN(d.getTime())) return setStatus("time-result", t("msg.invalidUnix"), "err");
      $("time-iso").value = d.toISOString();
      setStatus("time-result", "Local: " + d.toString(), "ok");
    },
    "time-from-iso": function () {
      const v = $("time-iso").value.trim();
      if (!v) return ($("time-result").textContent = "");
      const d = new Date(v);
      if (isNaN(d.getTime())) return setStatus("time-result", t("msg.invalidIso"), "err");
      $("time-unix").value = Math.floor(d.getTime() / 1000);
      setStatus("time-result", "Local: " + d.toString(), "ok");
    },
    "time-now": function () {
      const d = new Date();
      $("time-unix").value = Math.floor(d.getTime() / 1000);
      $("time-iso").value = d.toISOString();
      setStatus("time-result", "Local: " + d.toString(), "ok");
    },
    "copy": async function (btn) {
      const id = btn.getAttribute("data-target");
      const el = $(id);
      if (!el) return;
      const value = el.value || el.textContent || "";
      if (!value) return toast(t("msg.empty"));
      try {
        await navigator.clipboard.writeText(value);
        toast(t("msg.copied"));
      } catch (e) {
        // Fallback
        el.select();
        document.execCommand && document.execCommand("copy");
        toast(t("msg.copied"));
      }
    },
  };

  function runJson(mode) {
    const v = $("json-input").value;
    if (!v.trim()) return setStatus("json-status", t("msg.empty"), "err");
    try {
      const parsed = JSON.parse(v);
      if (mode === "pretty") $("json-output").value = JSON.stringify(parsed, null, 2);
      else if (mode === "minify") $("json-output").value = JSON.stringify(parsed);
      else $("json-output").value = "";
      setStatus("json-status", t("msg.validJson"), "ok");
    } catch (e) {
      setStatus("json-status", t("msg.invalidJson") + " — " + (e.message || ""), "err");
    }
  }

  function uuidv4() {
    if (crypto && crypto.randomUUID) return crypto.randomUUID();
    // Fallback
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40;
    buf[8] = (buf[8] & 0x3f) | 0x80;
    const h = bufToHex(buf.buffer);
    return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20);
  }

  // ------- Event delegation -------
  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.getAttribute("data-act");
    const fn = ACTIONS[act];
    if (typeof fn === "function") fn(btn);
  });

  // Language toggle
  document.getElementById("lang-toggle").addEventListener("click", function () {
    LANG = LANG === "ko" ? "en" : "ko";
    try { localStorage.setItem("devtoolkit.lang", LANG); } catch (e) {}
    applyI18n();
  });

  // Year
  const yEl = document.getElementById("year");
  if (yEl) yEl.textContent = new Date().getFullYear();

  applyI18n();
})();
