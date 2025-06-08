// Lắng nghe sự kiện submit form
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    // Ngừng hành động gửi form mặc định để xử lý hiển thị alert
    event.preventDefault();
  
    // Lấy giá trị của các trường tên
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;

    // Kiểm tra tính hợp lệ của trường "First Name" và "Last Name"
    var valid = true; // Cờ để kiểm tra tính hợp lệ

    // Kiểm tra trường "First Name"
    if (fname.trim() === '' || !/^[a-zA-Z\s]+$/.test(fname)) {
        // Nếu tên không hợp lệ (chứa ký tự đặc biệt hoặc rỗng)
        document.getElementById('fname-error').textContent = "Invalid first name. Only letters and spaces are allowed.";
        valid = false;
    } else {
        document.getElementById('fname-error').textContent = ''; // Xóa thông báo lỗi
    }

    // Kiểm tra trường "Last Name"
    if (lname.trim() === '' || !/^[a-zA-Z\s]+$/.test(lname)) {
        // Nếu họ không hợp lệ
        document.getElementById('lname-error').textContent = "Invalid last name. Only letters and spaces are allowed.";
        valid = false;
    } else {
        document.getElementById('lname-error').textContent = ''; // Xóa thông báo lỗi
    }

    // Nếu tất cả các trường hợp hợp lệ, submit form
    if (valid) {
        // Form có thể được gửi ở đây
        this.submit(); // Chỉ gửi form nếu mọi thứ hợp lệ
        alert("Your order has been placed successfully!");
        window.location.href = 'index.html';  
    } else {
        // Thông báo rằng có trường không hợp lệ
        alert("Please review the form fields and try again!");
    }
    // Hiển thị alert thông báo đặt hàng thành công
    
  
    // Sau khi hiển thị thông báo, có thể tiếp tục gửi form nếu cần (nếu muốn gửi dữ liệu thực sự)
    // this.submit(); // Uncomment this line to actually submit the form
      // URL của trang chủ (thường là "/")
  });

// Khi tài liệu được tải hoàn tất
document.addEventListener('DOMContentLoaded', function () {
    // Lấy các phần tử cần cập nhật trong cart summary
    const itemCountElement = document.getElementById('itemCount');
    const totalPriceElement = document.getElementById('totalPrice');

    // Lấy dữ liệu giỏ hàng từ localStorage (nếu có)
    const cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    // Hàm định dạng số tiền theo đơn vị tiền Việt (VND)
    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(value);
    }

    // Hàm cập nhật tóm tắt đơn hàng
    function updateSummary() {
        let totalPrice = 0;

        // Cộng dồn giá từng sản phẩm
        cartList.forEach(item => {
            totalPrice += item.price;
        });

        // Cập nhật số lượng sản phẩm và tổng tiền lên giao diện
        itemCountElement.textContent = `${cartList.length} course${cartList.length > 1 ? 's' : ''}`;
        totalPriceElement.textContent = formatCurrency(totalPrice);
    }

    // Gọi hàm cập nhật ngay khi trang được load
    updateSummary();
});