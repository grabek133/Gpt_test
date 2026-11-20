// Uzupełnij publiczny adres pracowni przed publikacją.
const contactEmail = "";

const menu = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");
menu.hidden = false;

function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}

menu.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});

const form = document.querySelector("#inquiry");
const draft = document.querySelector("#draft");
const draftText = document.querySelector("#draft-text");

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    form.elements.service.value = link.dataset.service;
    draft.hidden = true;
  });
});

if (contactEmail) {
  document.querySelector("#submit-inquiry").firstChild.textContent = "Otwórz program pocztowy ";
  document.querySelector("#form-note").textContent = "Wiadomość wyślesz ze swojego programu pocztowego.";
}

form.addEventListener("input", () => { draft.hidden = true; });
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = `Zapytanie o projekt – ${data.get("service")}`;
  const body = `Dzień dobry,\n\n${data.get("message").trim()}\n\nAdres do odpowiedzi: ${data.get("email")}`;
  if (contactEmail) {
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return;
  }
  draftText.value = `${subject}\n\n${body}`;
  draft.hidden = false;
  draftText.focus();
  draftText.select();
});
