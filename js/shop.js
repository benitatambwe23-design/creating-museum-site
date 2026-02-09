function addToCart(itemId) {
  alert("Added " + itemId + " to cart (functionality to come)");
}

function openModal(img) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");

  modalImg.src = img.src;
  modalImg.alt = img.alt;

  modal.classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}