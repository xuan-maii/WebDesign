document.addEventListener('DOMContentLoaded', function () {
    const cartListContainer = document.getElementById('cartList');
    const totalPriceElement = document.getElementById('totalPrice');
    const itemCountElement = document.getElementById('itemCount');
    const cartList = JSON.parse(localStorage.getItem('cartList')) || [];

    function renderCartItems() {
        cartListContainer.innerHTML = '';

        if (cartList.length === 0) {
            cartListContainer.innerHTML = '<p style="font-size: 17px;">Your cart is empty. Keep shopping to find a course!</p>';
            totalPriceElement.textContent = '0₫';

            // Cập nhật số sản phẩm thành 0 nếu giỏ hàng trống
            itemCountElement.textContent = '0 courses';
            return;
        }

        let totalPrice = 0;

        cartList.forEach((item, index) => {
            const itemRow = document.createElement('div');
            itemRow.classList.add('row', 'cart-item');

            itemRow.innerHTML = `
                <div class="col-2">
                    <img src="${item.image}" alt="Product Image" style="max-width: 100%; height: auto;">
                </div>
                <div class="col-10">
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="mb-0" style="font-size: 15px">${item.name}</h5>
                            <button class="btn btn-link text-danger btn-remove" data-index="${index}"><i class="fa fa-trash btn-remove" style="font-size: 17px"></i></button>
                            
                    </div>
                    
                    <p class="mb-0" style="font-size: 12px">Unit Price: ${formatCurrency(item.price)}</p>
                </div>
            `;

            cartListContainer.appendChild(itemRow);

            // Tính tổng tiền
            totalPrice += item.price;
        });

        totalPriceElement.textContent = formatCurrency(totalPrice);
        itemCountElement.textContent = `${cartList.length} course${cartList.length > 1 ? 's' : ''}`;
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }

    renderCartItems();

    // Xử lý sự kiện xóa sản phẩm
    cartListContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-remove')) {
            const index = event.target.getAttribute('data-index');
            cartList.splice(index, 1);
            localStorage.setItem('cartList', JSON.stringify(cartList));
            renderCartItems();
        }
    });

});
