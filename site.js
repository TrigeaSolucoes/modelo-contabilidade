(() => {
  const atividade = document.querySelector("#atividade");
  const faturamento = document.querySelector("#faturamento");
  const valor = document.querySelector("#valor-estimado");
  const link = document.querySelector("#receber-calculo");
  const tabs = [...document.querySelectorAll("[data-segmento]")];
  const atualizarSimulador = () => {
    const receita = Number(faturamento.value);
    const aliquota = Number(atividade.value);
    const imposto = receita * aliquota;
    const formatado = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(imposto);
    valor.textContent = formatado;
    const mensagem = `Quero receber um cálculo ilustrativo para atividade ${atividade.options[atividade.selectedIndex].text}, faturamento mensal de ${faturamento.options[faturamento.selectedIndex].text}. Estimativa exibida no site: ${formatado}.`;
    link.href = `${link.dataset.base.split("?")[0]}?text=${encodeURIComponent(mensagem)}`;
  };

  const mostrarSegmento = (id) => {
    const tab = tabs.find((item) => item.dataset.segmento === id);
    const segmento = tab && { nome: tab.dataset.nome, texto: tab.dataset.texto };
    if (!segmento) return;
    document.querySelector("#segmento-nome").textContent = segmento.nome;
    document.querySelector("#segmento-texto").textContent = segmento.texto;
    tabs.forEach((tab) => tab.setAttribute("aria-selected", String(tab.dataset.segmento === id)));
  };

  atividade.addEventListener("change", atualizarSimulador);
  faturamento.addEventListener("change", atualizarSimulador);
  tabs.forEach((tab) => tab.addEventListener("click", () => mostrarSegmento(tab.dataset.segmento)));
  atualizarSimulador();
})();
