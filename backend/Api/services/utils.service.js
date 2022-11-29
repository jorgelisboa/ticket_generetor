const timerExpiracao = (primeiroUso, expiracao) => {
  let deadline = new Date(expiracao).getTime();

  let now = new Date(primeiroUso).getTime();
  let t = deadline - now;
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((t % (1000 * 60)) / 1000);

  return `Você tem ${days} dias, ${hours} horas e ${minutes} minutos para utilizar essa recarga do seu bilhete.`;
};

module.exports = { timerExpiracao };
