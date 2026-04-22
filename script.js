// Funzione copia frase
function copiaFrase(button) {
  const testo = button.textContent.replace('💬 ', '').replace('"', '').replace('"', '');
  
  // Copia negli appunti
  if (navigator.clipboard) {
    navigator.clipboard.writeText(testo).then(() => {
      mostraFeedback(button);
    });
  } else {
    // Fallback per browser vecchi
    const textarea = document.createElement('textarea');
    textarea.value = testo;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    mostraFeedback(button);
  }
  
  // Incrementa contatore
  incrementaContatore();
}

function mostraFeedback(button) {
  // Cambia colore bottone
  button.classList.add('copiato');
  setTimeout(() => {
    button.classList.remove('copiato');
  }, 1000);
  
  // Mostra messaggio
  const feedback = button.parentElement.querySelector('.feedback');
  if (feedback) {
    feedback.classList.add('show');
    setTimeout(() => {
      feedback.classList.remove('show');
    }, 2000);
  }
}

// Contatore progressi
function incrementaContatore() {
  let count = localStorage.getItem('momentiGestiti') || 0;
  count = parseInt(count) + 1;
  localStorage.setItem('momentiGestiti', count);
  aggiornaContatore();
}

function aggiornaContatore() {
  const counterElement = document.querySelector('.counter-number');
  if (counterElement) {
    const count = localStorage.getItem('momentiGestiti') || 0;
    counterElement.textContent = count;
  }
}

function resetContatore() {
  if (confirm('Vuoi davvero azzerare il contatore?')) {
    localStorage.setItem('momentiGestiti', 0);
    aggiornaContatore();
  }
}

// Carica contatore all'avvio
document.addEventListener('DOMContentLoaded', () => {
  aggiornaContatore();
});

// Salvataggio automatico note (se presenti)
function salvaNota(id, valore) {
  localStorage.setItem('nota_' + id, valore);
}

function caricaNota(id) {
  return localStorage.getItem('nota_' + id) || '';
}