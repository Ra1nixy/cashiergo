document.addEventListener("DOMContentLoaded", function () {
  // Initialize data
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  let cart = [];

  // DOM Elements
  const cashierTab = document.getElementById("cashier-tab");
  const productsTab = document.getElementById("products-tab");
  const reportsTab = document.getElementById("reports-tab");
  const cashierSection = document.getElementById("cashier-section");
  const productsSection = document.getElementById("products-section");
  const reportsSection = document.getElementById("reports-section");

  // Cashier elements
  const productInput = document.getElementById("product-input");
  const addProductBtn = document.getElementById("add-product-btn");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Product management elements
  const productCode = document.getElementById("product-code");
  const productName = document.getElementById("product-name");
  const productCost = document.getElementById("product-cost");
  const productPrice = document.getElementById("product-price");
  const productStock = document.getElementById("product-stock");
  const saveProductBtn = document.getElementById("save-product-btn");
  const productSearch = document.getElementById("product-search");
  const productList = document.getElementById("product-list");

  // Report elements
  const dailyReportBtn = document.getElementById("daily-report-btn");
  const weeklyReportBtn = document.getElementById("weekly-report-btn");
  const monthlyReportBtn = document.getElementById("monthly-report-btn");
  const dailyReport = document.getElementById("daily-report");
  const weeklyReport = document.getElementById("weekly-report");
  const monthlyReport = document.getElementById("monthly-report");
  const generateDailyBtn = document.getElementById("generate-daily-btn");
  const generateWeeklyBtn = document.getElementById("generate-weekly-btn");
  const generateMonthlyBtn = document.getElementById("generate-monthly-btn");
  const reportResult = document.getElementById("report-result");
  const reportTotal = document.getElementById("report-total");
  const reportProfit = document.getElementById("report-profit");
  const printReportBtn = document.getElementById("print-report-btn");

  // Modal elements
  const paymentModal = document.getElementById("payment-modal");
  const paymentTotal = document.getElementById("payment-total");
  const paymentAmount = document.getElementById("payment-amount");
  const paymentAmountDisplay = document.getElementById(
    "payment-amount-display"
  );
  const paymentChange = document.getElementById("payment-change");
  const confirmPaymentBtn = document.getElementById("confirm-payment-btn");
  const cancelPaymentBtn = document.getElementById("cancel-payment-btn");

  const editProductModal = document.getElementById("edit-product-modal");
  const editProductId = document.getElementById("edit-product-id");
  const editProductCode = document.getElementById("edit-product-code");
  const editProductName = document.getElementById("edit-product-name");
  const editProductCost = document.getElementById("edit-product-cost");
  const editProductPrice = document.getElementById("edit-product-price");
  const editProductStock = document.getElementById("edit-product-stock");
  const updateProductBtn = document.getElementById("update-product-btn");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");

  // Current date and time
  function updateDateTime() {
    const now = new Date();
    document.getElementById("current-date").textContent =
      now.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    document.getElementById("current-time").textContent =
      now.toLocaleTimeString("id-ID");
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();

cashierTab.addEventListener("click", () => {
  // Aktifkan tab Kasir
  cashierTab.classList.add("border-b-2", "border-primary", "text-primary");
  cashierTab.classList.remove("text-gray-500");

  // Nonaktifkan tab lainnya
  productsTab.classList.remove("border-b-2", "border-primary", "text-primary");
  productsTab.classList.add("text-gray-500");

  reportsTab.classList.remove("border-b-2", "border-primary", "text-primary");
  reportsTab.classList.add("text-gray-500");

  // Tampilkan konten
  cashierSection.classList.remove("hidden");
  productsSection.classList.add("hidden");
  reportsSection.classList.add("hidden");
});

productsTab.addEventListener("click", () => {
  // Aktifkan tab Produk
  productsTab.classList.add("border-b-2", "border-primary", "text-primary");
  productsTab.classList.remove("text-gray-500");

  // Nonaktifkan tab lainnya
  cashierTab.classList.remove("border-b-2", "border-primary", "text-primary");
  cashierTab.classList.add("text-gray-500");

  reportsTab.classList.remove("border-b-2", "border-primary", "text-primary");
  reportsTab.classList.add("text-gray-500");

  // Tampilkan konten
  productsSection.classList.remove("hidden");
  cashierSection.classList.add("hidden");
  reportsSection.classList.add("hidden");

  renderProductList();
});

reportsTab.addEventListener("click", () => {
  // Aktifkan tab Laporan
  reportsTab.classList.add("border-b-2", "border-primary", "text-primary");
  reportsTab.classList.remove("text-gray-500");

  // Nonaktifkan tab lainnya
  cashierTab.classList.remove("border-b-2", "border-primary", "text-primary");
  cashierTab.classList.add("text-gray-500");

  productsTab.classList.remove("border-b-2", "border-primary", "text-primary");
  productsTab.classList.add("text-gray-500");

  // Tampilkan konten
  reportsSection.classList.remove("hidden");
  cashierSection.classList.add("hidden");
  productsSection.classList.add("hidden");
});


  // Report type navigation
  dailyReportBtn.addEventListener("click", () => {
    dailyReportBtn.classList.add("bg-blue-600", "text-white");
    dailyReportBtn.classList.remove("bg-gray-200");
    weeklyReportBtn.classList.add("bg-gray-200");
    weeklyReportBtn.classList.remove("bg-blue-600", "text-white");
    monthlyReportBtn.classList.add("bg-gray-200");
    monthlyReportBtn.classList.remove("bg-blue-600", "text-white");

    dailyReport.classList.remove("hidden");
    weeklyReport.classList.add("hidden");
    monthlyReport.classList.add("hidden");
  });

  weeklyReportBtn.addEventListener("click", () => {
    weeklyReportBtn.classList.add("bg-blue-600", "text-white");
    weeklyReportBtn.classList.remove("bg-gray-200");
    dailyReportBtn.classList.add("bg-gray-200");
    dailyReportBtn.classList.remove("bg-blue-600", "text-white");
    monthlyReportBtn.classList.add("bg-gray-200");
    monthlyReportBtn.classList.remove("bg-blue-600", "text-white");

    weeklyReport.classList.remove("hidden");
    dailyReport.classList.add("hidden");
    monthlyReport.classList.add("hidden");
  });

  monthlyReportBtn.addEventListener("click", () => {
    monthlyReportBtn.classList.add("bg-blue-600", "text-white");
    monthlyReportBtn.classList.remove("bg-gray-200");
    dailyReportBtn.classList.add("bg-gray-200");
    dailyReportBtn.classList.remove("bg-blue-600", "text-white");
    weeklyReportBtn.classList.add("bg-gray-200");
    weeklyReportBtn.classList.remove("bg-blue-600", "text-white");

    monthlyReport.classList.remove("hidden");
    dailyReport.classList.add("hidden");
    weeklyReport.classList.add("hidden");
  });
  const tabs = document.querySelectorAll('button[id$="-tab"]');
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) =>
        t.classList.remove("border-b-2", "border-primary", "text-primary")
      );
      tabs.forEach((t) => t.classList.add("text-gray-500"));
      tab.classList.add("border-b-2", "border-primary", "text-primary");
      tab.classList.remove("text-gray-500");
    });
  });
  // Format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }

  // Add product to cart
  function addToCart(product, quantity = 1) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
    }

    renderCart();
    productInput.value = "";
    productInput.focus();
  }

  // Remove product from cart
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    renderCart();
  }

  // Update product quantity in cart
  function updateCartQuantity(productId, newQuantity) {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = parseInt(newQuantity) || 1;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        renderCart();
      }
    }
  }

  // Render cart
  function renderCart() {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<tr><td colspan="5" class="py-4 text-center text-gray-500">Keranjang kosong</td></tr>';
      cartTotal.textContent = formatCurrency(0);
      checkoutBtn.disabled = true;
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const row = document.createElement("tr");
      row.className = "border-b";
      row.innerHTML = `
                <td class="py-2">${item.name}</td>
                <td class="py-2 text-right">${formatCurrency(item.price)}</td>
                <td class="py-2 text-right">
                    <input type="number" value="${item.quantity}" min="1" 
                           class="w-16 p-1 border rounded text-right quantity-input" 
                           data-id="${item.id}">
                </td>
                <td class="py-2 text-right">${formatCurrency(itemTotal)}</td>
                <td class="py-2 text-right">
                    <button class="text-red-500 remove-item" data-id="${
                      item.id
                    }">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
      cartItems.appendChild(row);
    });

    // Add event listeners for quantity inputs
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (e) => {
        updateCartQuantity(e.target.dataset.id, e.target.value);
      });
    });

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        removeFromCart(e.target.closest("button").dataset.id);
      });
    });

    cartTotal.textContent = formatCurrency(total);
    checkoutBtn.disabled = false;
  }

  // Find product by code or name
  function findProduct(query) {
    return products.find(
      (product) =>
        product.code.toLowerCase() === query.toLowerCase() ||
        product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Update the existing addProductBtn click handler
  addProductBtn.addEventListener("click", () => {
    const query = productInput.value.trim();
    if (!query) return;

    const product = findProduct(query);
    if (product) {
      if (product.stock > 0) {
        addToCart(product);
        productInput.value = "";
      } else {
        showToast("Stok produk habis!", false);
      }
    } else {
      showSearchResults(query); // Show matching products if exact match not found
    }
  });

  // Handle Enter key in product input
  productInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addProductBtn.click();
    }
  });
  let searchTimeout;

  productInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchTimeout);

    if (query.length < 2) {
      document.getElementById("search-results-modal").classList.add("hidden");
      return;
    }

    searchTimeout = setTimeout(() => {
      showSearchResults(query);
    }, 300);
  });

  function showSearchResults(query) {
    const modal = document.getElementById("search-results-modal");
    const resultsList = document.getElementById("search-results-list");

    // Find matching products
    const matchedProducts = products.filter(
      (product) =>
        product.code.toLowerCase().includes(query.toLowerCase()) ||
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    resultsList.innerHTML = "";

    if (matchedProducts.length === 0) {
      resultsList.innerHTML = `
            <li class="py-4 text-center text-gray-500">
                Tidak ada produk yang cocok
            </li>
        `;
    } else {
      matchedProducts.forEach((product) => {
        const li = document.createElement("li");
        li.className = "p-3 hover:bg-gray-50 cursor-pointer transition-colors";
        li.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <div class="font-medium">${product.name}</div>
                        <div class="text-sm text-gray-500">${product.code}</div>
                    </div>
                    <div class="text-right">
                        <div class="font-medium">${formatCurrency(
                          product.price
                        )}</div>
                        <div class="text-sm ${
                          product.stock > 0 ? "text-green-500" : "text-red-500"
                        }">
                            ${
                              product.stock > 0
                                ? `Stok: ${product.stock}`
                                : "Stok habis"
                            }
                        </div>
                    </div>
                </div>
            `;
        li.addEventListener("click", () => {
          if (product.stock > 0) {
            addToCart(product);
            productInput.value = "";
            modal.classList.add("hidden");
            productInput.focus();
          } else {
            showToast("Stok produk habis!", false);
          }
        });
        resultsList.appendChild(li);
      });
    }

    modal.classList.remove("hidden");
  }

  // Close modal handler
  document
    .getElementById("close-search-results")
    .addEventListener("click", () => {
      document.getElementById("search-results-modal").classList.add("hidden");
    });

  // Update the existing addProductBtn click handler
  addProductBtn.addEventListener("click", () => {
    const query = productInput.value.trim();
    if (!query) return;

    const product = findProduct(query);
    if (product) {
      if (product.stock > 0) {
        addToCart(product);
        productInput.value = "";
      } else {
        showToast("Stok produk habis!", false);
      }
    } else {
      showSearchResults(query); // Show matching products if exact match not found
    }
  });

  // Handle Enter key - now selects first matching product
  productInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = productInput.value.trim();
      if (!query) return;

      const product = findProduct(query);
      if (product) {
        if (product.stock > 0) {
          addToCart(product);
          productInput.value = "";
        } else {
          showToast("Stok produk habis!", false);
        }
      } else {
        // Show search results on Enter if no exact match
        showSearchResults(query);
      }
    }
  });
  // Checkout process
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    paymentTotal.textContent = formatCurrency(total);
    paymentAmount.value = "";
    paymentAmountDisplay.textContent = formatCurrency(0);
    paymentChange.textContent = formatCurrency(0);
    paymentModal.classList.remove("hidden");
    paymentAmount.focus();
  });

  // Payment amount input
  paymentAmount.addEventListener("input", () => {
    const amount = parseInt(paymentAmount.value) || 0;
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    paymentAmountDisplay.textContent = formatCurrency(amount);
    paymentChange.textContent = formatCurrency(amount - total);
  });

  // Confirm payment
  confirmPaymentBtn.addEventListener("click", () => {
    const amount = parseInt(paymentAmount.value) || 0;
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (amount < total) {
      alert("Pembayaran kurang!");
      return;
    }

    // Create transaction
    const transaction = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      total: total,
      payment: amount,
      change: amount - total,
    };

    // Update product stocks
    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      if (product) {
        product.stock -= cartItem.quantity;
      }
    });

    // Save data
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("products", JSON.stringify(products));

    // Reset cart and close modal
    cart = [];
    renderCart();
    paymentModal.classList.add("hidden");

    alert("Transaksi berhasil!");
  });

  // Cancel payment
  cancelPaymentBtn.addEventListener("click", () => {
    paymentModal.classList.add("hidden");
  });

  // Product management
  function renderProductList(searchQuery = "") {
    productList.innerHTML = "";

    let filteredProducts = products;
    if (searchQuery) {
      filteredProducts = products.filter(
        (product) =>
          product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filteredProducts.length === 0) {
      productList.innerHTML =
        '<tr><td colspan="5" class="py-4 text-center text-gray-500">Tidak ada produk</td></tr>';
      return;
    }

    filteredProducts.forEach((product) => {
      const profit = product.price - product.cost;
      const profitPercentage = ((profit / product.cost) * 100).toFixed(2);

      const row = document.createElement("tr");
      row.className = "border-b hover:bg-gray-50 transition-colors";
      row.innerHTML = `
            <td class="py-3 px-2">${product.code}</td>
            <td class="py-3 px-2">${product.name}</td>
            <td class="py-3 px-2 text-right">${formatCurrency(
              product.price
            )}</td>
            <td class="py-3 px-2 text-right ${
              product.stock <= 5 ? "text-red-500 font-medium" : ""
            }">${product.stock}</td>
            <td class="py-3 px-2 text-right">
                <div class="flex justify-end space-x-2">
                    <button class="edit-product p-2 text-white bg-primary rounded-lg hover:bg-green-600 transition-colors" 
                            data-id="${product.id}" 
                            title="Edit Produk">
                        <i class="fas fa-pencil-alt text-sm"></i>
                    </button>
                    <button class="delete-product p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors" 
                            data-id="${product.id}" 
                            title="Hapus Produk">
                        <i class="fas fa-trash-alt text-sm"></i>
                    </button>
                </div>
            </td>
        `;
      productList.appendChild(row);
    });

    // Add event listeners for edit buttons
    document.querySelectorAll(".edit-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const product = products.find((p) => p.id === productId);

        if (product) {
          editProductId.value = product.id;
          editProductCode.value = product.code;
          editProductName.value = product.name;
          editProductCost.value = product.cost;
          editProductPrice.value = product.price;
          editProductStock.value = product.stock;
          editProductModal.classList.remove("hidden");
        }
      });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll(".delete-product").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const product = products.find((p) => p.id === productId);

        if (product) {
          showToast(`Yakin ingin hapus ${product.name}?`, true, () => {
            products = products.filter((p) => p.id !== productId);
            localStorage.setItem("products", JSON.stringify(products));
            renderProductList(productSearch.value);
            showToast("Produk berhasil dihapus");
          });
        }
      });
    });
  }
  // Save new product
  saveProductBtn.addEventListener("click", () => {
    const code = productCode.value.trim();
    const name = productName.value.trim();
    const cost = parseInt(productCost.value) || 0;
    const price = parseInt(productPrice.value) || 0;
    const stock = parseInt(productStock.value) || 0;

    if (!code || !name) {
      alert("Kode dan nama produk harus diisi!");
      return;
    }

    if (cost <= 0 || price <= 0) {
      alert("Harga beli dan harga jual harus lebih dari 0!");
      return;
    }

    if (price < cost) {
      alert("Harga jual tidak boleh lebih kecil dari harga beli!");
      return;
    }

    if (stock < 0) {
      alert("Stok tidak boleh negatif!");
      return;
    }

    // Check if product code already exists
    if (products.some((p) => p.code.toLowerCase() === code.toLowerCase())) {
      alert("Kode produk sudah ada!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      code,
      name,
      cost,
      price,
      stock,
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));

    // Reset form
    productCode.value = "";
    productName.value = "";
    productCost.value = "";
    productPrice.value = "";
    productStock.value = "";

    renderProductList();
    alert("Produk berhasil disimpan!");
  });

  // Update product
  updateProductBtn.addEventListener("click", () => {
    const id = parseInt(editProductId.value);
    const code = editProductCode.value.trim();
    const name = editProductName.value.trim();
    const cost = parseInt(editProductCost.value) || 0;
    const price = parseInt(editProductPrice.value) || 0;
    const stock = parseInt(editProductStock.value) || 0;

    if (!code || !name) {
      alert("Kode dan nama produk harus diisi!");
      return;
    }

    if (cost <= 0 || price <= 0) {
      alert("Harga beli dan harga jual harus lebih dari 0!");
      return;
    }

    if (price < cost) {
      alert("Harga jual tidak boleh lebih kecil dari harga beli!");
      return;
    }

    if (stock < 0) {
      alert("Stok tidak boleh negatif!");
      return;
    }

    // Check if product code already exists (excluding current product)
    if (
      products.some(
        (p) => p.code.toLowerCase() === code.toLowerCase() && p.id !== id
      )
    ) {
      alert("Kode produk sudah ada!");
      return;
    }

    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products[productIndex] = {
        id,
        code,
        name,
        cost,
        price,
        stock,
      };

      localStorage.setItem("products", JSON.stringify(products));
      renderProductList(productSearch.value);
      editProductModal.classList.add("hidden");
      alert("Produk berhasil diperbarui!");
    }
  });

  // Cancel edit
  cancelEditBtn.addEventListener("click", () => {
    editProductModal.classList.add("hidden");
  });

  // Product search
  productSearch.addEventListener("input", () => {
    renderProductList(productSearch.value);
  });

  // Generate reports
  generateDailyBtn.addEventListener("click", () => {
    const date = document.getElementById("daily-date").value;
    if (!date) {
      alert("Pilih tanggal terlebih dahulu!");
      return;
    }

    const selectedDate = new Date(date);
    const startOfDay = new Date(
      selectedDate.setHours(0, 0, 0, 0)
    ).toISOString();
    const endOfDay = new Date(
      selectedDate.setHours(23, 59, 59, 999)
    ).toISOString();

    generateReport(startOfDay, endOfDay);
  });

  generateWeeklyBtn.addEventListener("click", () => {
    const weekInput = document.getElementById("weekly-date").value;
    if (!weekInput) {
      alert("Pilih minggu terlebih dahulu!");
      return;
    }

    const [year, week] = weekInput.split("-W");
    const firstDay = new Date(year, 0, 1);
    const daysToFirstMonday = (8 - firstDay.getDay()) % 7;
    const startOfWeek = new Date(
      year,
      0,
      1 + daysToFirstMonday + (week - 1) * 7
    );
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    startOfWeek.setHours(0, 0, 0, 0);
    endOfWeek.setHours(23, 59, 59, 999);

    generateReport(startOfWeek.toISOString(), endOfWeek.toISOString());
  });

  generateMonthlyBtn.addEventListener("click", () => {
    const monthInput = document.getElementById("monthly-date").value;
    if (!monthInput) {
      alert("Pilih bulan terlebih dahulu!");
      return;
    }

    const [year, month] = monthInput.split("-");
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    startOfMonth.setHours(0, 0, 0, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    generateReport(startOfMonth.toISOString(), endOfMonth.toISOString());
  });

  // Generate report data
  function generateReport(startDate, endDate) {
    const filteredTransactions = transactions.filter((transaction) => {
      return transaction.date >= startDate && transaction.date <= endDate;
    });

    if (filteredTransactions.length === 0) {
      reportResult.innerHTML =
        '<p class="text-gray-500 text-center">Tidak ada transaksi pada periode ini</p>';
      reportTotal.textContent = formatCurrency(0);
      reportProfit.textContent = formatCurrency(0);
      return;
    }

    let totalSales = 0;
    let totalProfit = 0;
    let html = '<div class="space-y-3">';

    filteredTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      totalSales += transaction.total;

      let transactionProfit = 0;
      let itemsHtml = '<div class="pl-4 text-sm">';

      transaction.items.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
          const itemProfit = (item.price - product.cost) * item.quantity;
          transactionProfit += itemProfit;

          itemsHtml += `
                        <div class="flex justify-between py-1 border-b">
                            <span>${item.name} (${item.quantity}x)</span>
                            <span>${formatCurrency(
                              item.price * item.quantity
                            )}</span>
                        </div>
                    `;
        }
      });

      totalProfit += transactionProfit;

      itemsHtml += "</div>";

      html += `
                <div class="p-2 border rounded">
                    <div class="flex justify-between font-semibold">
                        <span>${transactionDate.toLocaleDateString(
                          "id-ID"
                        )}</span>
                        <span>${formatCurrency(transaction.total)}</span>
                    </div>
                    ${itemsHtml}
                    <div class="pl-4 text-sm text-green-600">
                        Keuntungan: ${formatCurrency(transactionProfit)}
                    </div>
                </div>
            `;
    });

    html += "</div>";
    reportResult.innerHTML = html;
    reportTotal.textContent = formatCurrency(totalSales);
    reportProfit.textContent = formatCurrency(totalProfit);
  }

  // Print report
  printReportBtn.addEventListener("click", () => {
    const printContent = `
            <h2 class="text-xl font-bold mb-2">Laporan Penjualan</h2>
            <div class="mb-4">
                <p>Periode: ${
                  document.querySelector(".report-content:not(.hidden) input")
                    .value
                }</p>
                <p>Tanggal Cetak: ${new Date().toLocaleDateString("id-ID")}</p>
            </div>
            ${reportResult.innerHTML}
            <div class="mt-4 border-t pt-2">
                <div class="flex justify-between font-bold">
                    <span>Total Penjualan:</span>
                    <span>${reportTotal.textContent}</span>
                </div>
                <div class="flex justify-between font-bold">
                    <span>Total Keuntungan:</span>
                    <span>${reportProfit.textContent}</span>
                </div>
            </div>
        `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Cetak Laporan</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                    @media print {
                        body { padding: 20px; }
                    }
                </style>
            </head>
            <body class="p-4">
                ${printContent}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 1000);
                    }
                </script>
            </body>
            </html>
        `);
    printWindow.document.close();
  });

  // Initialize
  renderCart();
  renderProductList();

  // Set default date inputs to today/current week/month
  const today = new Date();
  document.getElementById("daily-date").valueAsDate = today;

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(
    today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)
  );
  const weekNumber = getWeekNumber(firstDayOfWeek);
  document.getElementById(
    "weekly-date"
  ).value = `${firstDayOfWeek.getFullYear()}-W${weekNumber
    .toString()
    .padStart(2, "0")}`;

  document.getElementById("monthly-date").value = `${today.getFullYear()}-${(
    today.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  // Helper function to get week number
  function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
});
