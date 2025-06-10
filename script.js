document.getElementById("menuToggle").onclick = () => {
  document.getElementById("sidebar").classList.add("active");
};

document.querySelector(".close-btn").onclick = () => {
  document.getElementById("sidebar").classList.remove("active");
};

document.getElementById("editButton").onclick = () => {
  document.getElementById("editorModal").classList.remove("hidden");
};

function atualizarDados() {
  document.getElementById("valorLiquido").textContent = document.getElementById("editValorLiquido").value;
  document.getElementById("vendas").textContent = document.getElementById("editVendas").value;
  document.getElementById("aprovacaoCartao").textContent = document.getElementById("editAprovacaoCartao").value;
  document.getElementById("vendasClick").textContent = document.getElementById("editVendasClick").value;
  document.getElementById("reembolso").textContent = document.getElementById("editReembolso").value;
  document.getElementById("chargeback").textContent = document.getElementById("editChargeback").value;
  document.getElementById("conversaoBoleto").textContent = document.getElementById("editConversaoBoleto").value;
  document.getElementById("boletosGerados").textContent = document.getElementById("editBoletosGerados").value;

  document.getElementById("editorModal").classList.add("hidden");
}
