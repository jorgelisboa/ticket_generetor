const timerExpiracao = (primeiroUso, expiracao) => {
  let deadline = new Date(expiracao).getTime();
  let now = new Date(primeiroUso).getTime();

  console.log(primeiroUso, expiracao);

  let t = deadline - now;
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));

  if (days == 0 && hours == 0) return `Você tem ${minutes} minutos restantes.`;
  else if (days == 0)
    return `Você tem ${hours} horas e ${minutes} minutos restantes.`;
  else
    return `Você tem ${days} dias, ${hours} horas e ${minutes} minutos restantes.`;
};

module.exports = { timerExpiracao };
