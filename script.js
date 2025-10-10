document.getElementById('astroForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const data = document.getElementById('data').value;
  const resultado = document.getElementById('resultado');

  if (!nome || !data) {
    resultado.textContent = 'Por favor, preencha todos os campos.';
    return;
  }

  const signo = descobrirSigno(data);
  resultado.textContent = `${nome}, seu signo é ${signo}! ✨`;
});

function descobrirSigno(data) {
  const dia = new Date(data).getDate();
  const mes = new Date(data).getMonth() + 1;

  if ((dia >= 21 && mes === 3) || (dia <= 19 && mes === 4)) return 'Áries';
  if ((dia >= 20 && mes === 4) || (dia <= 20 && mes === 5)) return 'Touro';
  if ((dia >= 21 && mes === 5) || (dia <= 20 && mes === 6)) return 'Gêmeos';
  if ((dia >= 21 && mes === 6) || (dia <= 22 && mes === 7)) return 'Câncer';
  if ((dia >= 23 && mes === 7) || (dia <= 22 && mes === 8)) return 'Leão';
  if ((dia >= 23 && mes === 8) || (dia <= 22 && mes === 9)) return 'Virgem';
  if ((dia >= 23 && mes === 9) || (dia <= 22 && mes === 10)) return 'Libra';
  if ((dia >= 23 && mes === 10) || (dia <= 21 && mes === 11)) return 'Escorpião';
  if ((dia >= 22 && mes === 11) || (dia <= 21 && mes === 12)) return 'Sagitário';
  if ((dia >= 22 && mes === 12) || (dia <= 19 && mes === 1)) return 'Capricórnio';
  if ((dia >= 20 && mes === 1) || (dia <= 18 && mes === 2)) return 'Aquário';
  if ((dia >= 19 && mes === 2) || (dia <= 20 && mes === 3)) return 'Peixes';
  return 'Desconhecido';
}