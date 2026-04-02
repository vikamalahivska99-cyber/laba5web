
const VARIANT_ID = 13;

function collectEnvironmentInfo() {
  const nav = window.navigator;

  const info = {
    userAgent: nav.userAgent,
    platform: nav.platform,
    language: nav.language,
    languages: nav.languages,
    cookiesEnabled: nav.cookieEnabled,
    online: nav.onLine,
    screen: {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight
    },
    location: window.location.href,
    time: new Date().toString()
  };

  return info;
}

function saveEnvironmentInfoToLocalStorage() {
  const info = collectEnvironmentInfo();
  localStorage.setItem("envInfo", JSON.stringify(info, null, 2));
}

function renderLocalStorageInfo() {
  const container = document.getElementById("storageInfo");
  if (!container) return;

  if (localStorage.length === 0) {
    container.innerHTML =
      '<p class="sys-terminal__empty">localStorage порожній.</p>';
    return;
  }

  const keys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    keys.push(localStorage.key(i));
  }
  keys.sort();

  const fragment = document.createDocumentFragment();

  keys.forEach((key) => {
    const raw = localStorage.getItem(key);
    const entry = document.createElement("div");
    entry.className = "sys-entry";

    const keyRow = document.createElement("div");
    keyRow.className = "sys-entry__key";
    keyRow.textContent = `${key}:`;

    let display = raw;
    let usePre = false;
    if (raw && (raw.trim().startsWith("{") || raw.trim().startsWith("["))) {
      try {
        display = JSON.stringify(JSON.parse(raw), null, 2);
        usePre = true;
      } catch {
        usePre = false;
      }
    }

    const valueEl = document.createElement(usePre ? "pre" : "div");
    valueEl.className = usePre ? "sys-entry__pre" : "sys-entry__val";
    valueEl.textContent = display;

    entry.appendChild(keyRow);
    entry.appendChild(valueEl);
    fragment.appendChild(entry);
  });

  container.replaceChildren(fragment);
}

async function loadComments() {
  const container = document.getElementById("commentsContainer");
  if (!container) return;

  container.innerHTML = "<p>Завантаження коментарів...</p>";

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${VARIANT_ID}/comments`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const comments = await response.json();

    if (!Array.isArray(comments) || comments.length === 0) {
      container.innerHTML = "<p>Коментарі відсутні.</p>";
      return;
    }

    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const card = document.createElement("article");
      card.className = "comment-card";

      const author = document.createElement("div");
      author.className = "comment-author";
      author.textContent = comment.name;

      const email = document.createElement("div");
      email.className = "comment-email";
      email.textContent = comment.email;

      const body = document.createElement("p");
      body.textContent = comment.body;

      card.appendChild(author);
      card.appendChild(email);
      card.appendChild(body);

      fragment.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  } catch (error) {
    console.error(error);
    container.innerHTML =
      "<p>Сталася помилка під час завантаження коментарів. Спробуйте пізніше.</p>";
  }
}

function setupTheme() {
  const toggle = document.getElementById("themeToggle");
  const label = document.getElementById("themeToggleLabel");
  const body = document.body;

  function applyTheme(theme, fromUser = false) {
    if (theme === "dark") {
      body.classList.add("theme-dark");
      label.textContent = "Нічний режим увімкнено";
      if (toggle) {
        toggle.checked = true;
      }
    } else {
      body.classList.remove("theme-dark");
      label.textContent = "Нічний режим";
      if (toggle) {
        toggle.checked = false;
      }
    }

    if (fromUser) {
      localStorage.setItem("preferredTheme", theme);
    }
  }

  const savedTheme = localStorage.getItem("preferredTheme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    const hour = new Date().getHours();
    const initialTheme = hour >= 7 && hour < 21 ? "light" : "dark";
    applyTheme(initialTheme);
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked ? "dark" : "light", true);
    });
  }
}

function setupFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!modal) return;

  function openModal() {
    modal.classList.add("visible");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("visible");
    modal.setAttribute("aria-hidden", "true");
  }

  setTimeout(openModal, 60_000);

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  saveEnvironmentInfoToLocalStorage();
  renderLocalStorageInfo();
  loadComments();
  setupTheme();
  setupFeedbackModal();
});

