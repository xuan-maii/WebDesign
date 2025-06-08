//ScrollScroll
    let lastScrollY = window.scrollY;
    const header = document.querySelector(".header");
    let scrollTimeout; // Biến để lưu trữ timeout

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Xóa timeout hiện có mỗi khi cuộn để reset bộ đếm ẩn header
      clearTimeout(scrollTimeout);

      if (currentScrollY < lastScrollY) {
        // Kéo lên: Header luôn hiển thị ngay lập tức
        header.style.top = "0";
      } else {
        // Kéo xuống: Header vẫn hiển thị trong khi đang cuộn
        // Đặt timeout để ẩn header sau 2 giây nếu dừng cuộn
        scrollTimeout = setTimeout(() => {
          // Chỉ ẩn header nếu đã cuộn xuống đủ xa (ví dụ > 100px)
          // và đang không ở vị trí đầu trang.
          if (window.scrollY > 100) {
            header.style.top = "-100px"; // Đảm bảo giá trị này đủ để ẩn hoàn toàn header
          }
        }, 2000); // 2000ms = 2 giây
      }

      lastScrollY = currentScrollY;
    });

    // Đảm bảo header hiển thị khi trang được tải lần đầu
    window.addEventListener("load", () => {
      header.style.top = "0";
    });


//Mega menu

    const megaContainer = document.querySelector(".mega-menu-container");

    let hoverTimeout;

    megaContainer.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      megaContainer.classList.add("active");
    });

    megaContainer.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        megaContainer.classList.remove("active");
      }, 200); // 200ms để user rê chuột xuống không bị tắt ngay
    });

    // Dang nhaop
   
  document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    document.querySelectorAll(".guest-only").forEach(el => {
      el.style.display = isLoggedIn ? "none" : "inline-block";
    });

    document.querySelectorAll(".user-only").forEach(el => {
      el.style.display = isLoggedIn ? "inline-block" : "none";
    });
  });

//Dang xuat

function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "trangchu.html"; // Reload lại trang chính với header cho khách
  }
