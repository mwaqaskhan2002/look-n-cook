async function loadMenuData() {
  try {
    let response = await fetch("menu.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let menuData = await response.json();

    renderMenu(menuData);
  } catch (error) {
    console.error("Menu load karne mein error aya:", error);
  }
}

function renderMenu(menuData) {
  const tabsContainer = document.getElementById("dynamicCategoryTabs");
  const contentContainer = document.getElementById("dynamicTabContent");

  let tabsHTML = "";
  let contentHTML = "";

  menuData.forEach((category, index) => {
    const isActive = index === 0 ? "active" : "";
    const isShowActive = index === 0 ? "show active" : "";

    // 1. Category Tab Button
    tabsHTML += `
            <button class="nav-link ${isActive} text-start py-2 px-3 mb-2 rounded-3 poppins-500" 
                    id="tab-${category.id}" 
                    data-bs-toggle="pill" 
                    data-bs-target="#content-${category.id}" 
                    type="button" role="tab"> ${category.name}
            </button>
        `;

    // 2. Category Cards & Error Handling for Empty Items
    let itemsHTML = "";

    if (category.items && category.items.length > 0) {
      // Agar items mojood hain toh cards loop chalayein
      category.items.forEach((item) => {
        itemsHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="card h-100 shadow-sm border-0 rounded-4 p-3 bg-white position-relative">
                            <div class="position-relative mb-3">
                                <img src="${item.image}" class="img-fluid rounded-4 object-fit-cover w-100" style="height: 180px;" alt="${item.title}">
                            </div>
                            <h6 class="poppins-700 text-dark mb-1">${item.title}</h6>
                            <p class="text-secondary small poppins-400 mb-3">${item.description}</p>
                            <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
                                <div class="d-flex align-items-center gap-2">
                                    ${item.oldPrice ? `<span class="text-decoration-line-through text-muted small">Rs. ${item.oldPrice}</span>` : ""}
                                    <span class="poppins-700 text-dark fs-5">Rs. ${item.price}</span>
                                </div>
                                <button class="btn btn-pink-circle"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `;
      });
    } else {
      // Agar items empty hain toh "Items Not Found" message show ho ga
      itemsHTML = `
                <div class="col-12 text-center py-5">
                    <div class="p-5 bg-white rounded-4 shadow-sm border border-light">
                        <i class="fa-solid fa-box-open fs-1 text-muted mb-3"></i>
                        <h5 class="poppins-700 text-dark mb-1">Items Not Found</h5>
                        <p class="poppins-400 text-secondary mb-0">Is category mein filhal koi items add nahi kiye gaye hain.</p>
                    </div>
                </div>
            `;
    }

    contentHTML += `
            <div class="tab-pane fade ${isShowActive}" id="content-${category.id}" role="tabpanel">
                <div class="row g-4">
                    ${itemsHTML}
                </div>
            </div>
        `;
  });

  tabsContainer.innerHTML = tabsHTML;
  contentContainer.innerHTML = contentHTML;
}

document.addEventListener("DOMContentLoaded", loadMenuData);
