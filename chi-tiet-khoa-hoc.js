const btn = document.getElementById("show-btn");
      const textBox = document.getElementById("des");

      btn.addEventListener("click", () => {
        const isExpanded = textBox.classList.contains("expanded");

        if (isExpanded) {
          textBox.classList.remove("expanded");
          btn.textContent = "Show more";
        } else {
          textBox.classList.add("expanded");
          btn.textContent = "Show less";
        }
      });
document.addEventListener("DOMContentLoaded", () => {
        const topContainer = document.getElementById("top-container");
        const sidebar = document.querySelector(".sidebar");

        function handleScroll() {
          const topBottom = topContainer.getBoundingClientRect().bottom;

          if (topBottom <= 0) {
            // Khi top-container đã cuộn khỏi màn hình
            sidebar.classList.add("sidebar-fixed");
          } else {
            sidebar.classList.remove("sidebar-fixed");
          }
        }

        window.addEventListener("scroll", handleScroll);
      });
const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.cards');
const nextBtn = document.querySelector('.nav.next');
const prevBtn = document.querySelector('.nav.prev');

const cardCount = cards.length;
const visibleCards = 3;
let index = visibleCards;
let isTransitioning = false;

// Clone last and first few items for infinite effect
for (let i = cardCount - visibleCards; i < cardCount; i++) {
  const clone = cards[i].cloneNode(true);
  track.prepend(clone);
}
for (let i = 0; i < visibleCards; i++) {
  const clone = cards[i].cloneNode(true);
  track.append(clone);
}

// Set initial position
const cardWidth = track.querySelector('.cards').offsetWidth;
track.style.transform = `translateX(-${cardWidth * index}px)`;

// Move function
function moveToIndex(newIndex) {
  if (isTransitioning) return;
  isTransitioning = true;
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(-${cardWidth * newIndex}px)`;
  index = newIndex;
}

// After transition, reset if at cloned edges
track.addEventListener('transitionend', () => {
  track.style.transition = 'none';
  if (index >= cardCount + visibleCards) {
    index = visibleCards;
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  } else if (index <= 0) {
    index = cardCount;
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }
  isTransitioning = false;
});

// Controls
nextBtn.addEventListener('click', () => moveToIndex(index + 1));
prevBtn.addEventListener('click', () => moveToIndex(index - 1));

// Auto scroll
setInterval(() => {
  moveToIndex(index + 1);
}, 4000);
document.addEventListener('DOMContentLoaded', function () {
  const addToCartBtn = document.querySelector('.add-to-cart');

  addToCartBtn.addEventListener('click', function () {
    // 1. Lấy tên sản phẩm
    const productName = document.querySelector('#coures-name')?.innerText.trim() || 'Unknown';

    // 2. Lấy ảnh sản phẩm
    const productImage = document.querySelector('#vid-img img')?.src || '';

    // 3. Lấy giá sản phẩm (giá đã giảm)
    const productPriceText = document.querySelector('#price .xl-heading span')?.innerText || '0';
    const price = parseInt(productPriceText.replace(/[^\d]/g, '')) || 0;

    // 4. Đóng gói đối tượng sản phẩm
    const item = {
      name: productName,
      price: price,
      image: productImage
    };

    // 5. Lấy giỏ hàng từ localStorage
    let cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    const exists = cartList.some(cartItem => cartItem.name === item.name);
    if (exists) {
      alert('You have already added this course to your cart.');
      return;
    }

    // 6. Thêm sản phẩm và lưu lại
    cartList.push(item);
    localStorage.setItem('cartList', JSON.stringify(cartList));

    if (confirm('The product has been successfully added to your cart! Would you like to view your cart now?')) {
      window.location.href = 'gio_hang.html';
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("video-modal");
  const btn = document.getElementById("play-video");
  const closeBtn = document.querySelector(".close-btn");
  const video = document.getElementById("preview-video");

  btn.addEventListener("click", () => {
    modal.style.display = "block";
    video.currentTime = 0;
    video.play();
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    video.pause();
  });

  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      video.pause();
    }
  });
});
