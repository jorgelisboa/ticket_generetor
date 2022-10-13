const generateForm = document.getElementById("generateForm");

const gerarBilheteUrbano = (e) => {
  e.preventDefault();
  alert(`Gerou Bilhete Urbano: XXXXXXXXX`);
};

generateForm.addEventListener("submit", gerarBilheteUrbano);
