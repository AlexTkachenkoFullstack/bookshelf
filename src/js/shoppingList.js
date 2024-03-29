import { isAuthUser } from './isAuthUser';
isAuthUser()

const shoppingListContainer = document.querySelector(
  '.shopping-list-empty-page'
);
if (localStorage.getItem('shoppingList')) {
  const shoppingListJSON = localStorage.getItem('shoppingList');
  let shoppingList = JSON.parse(shoppingListJSON);

  const shoplistBooks = shoppingList.map(makeShoplistMarkup);

  // CreateMarkup

  function makeShoplistMarkup(shoppingList) {
    const { bookImg, author, listName, description, title, buyLinks, id } =
      shoppingList;

    const shoplistBookContainer = document.createElement('div');
    shoplistBookContainer.classList.add('shoplist-book-container');
    shoplistBookContainer.dataset.id = id;

    const shoplistMarkup = `<img src="${bookImg}" class="shoplist-book-img">
        <div class="shoplist-desc-container">
          <h4 class="shoplist-book-title">${title}</h4>
          <p class="shoplist-book-genre">${listName}</p>
          <p class="shoplist-book-description">${description}</p>
           <p class="shoplist-book-author">${author}</p>
        </div>
        <div class="shoplist-icons">
    <ul class="shoplist-icons-list">
      <li class="shoplist-icons-li">
        <a href="${buyLinks[0].url}" target="blank">
          <div class="shoplist-icon-amazon"></div>
        </a>
      </li>
      <li class="shoplist-icons-li">
        <a href="${buyLinks[2].url}" target="blank">
          <div class="shoplist-icon-barnesAndNoble"></div>
        </a>
      </li>
      <li class="shoplist-icons-li">
        <a href="${buyLinks[4].url}" target="blank">
          <div class="shoplist-icon-bookshop"></div>
        </a>
      </li>
    </ul>
  </div>
        <div class="shoplist-trash"></div>
`;

    shoplistBookContainer.innerHTML = shoplistMarkup;

    return shoplistBookContainer;
  }

  // Create new container and replace markup

  const newShoppingListContainer = document.createElement('div');
  newShoppingListContainer.classList.add('shopping-list-container');
  shoplistBooks.forEach(book => {
    newShoppingListContainer.appendChild(book);
  });

  shoppingListContainer.replaceWith(newShoppingListContainer);

  // Add trash to each element

  const shoplistTrash = document.querySelectorAll('.shoplist-trash');
  shoplistTrash.forEach(trash => {
    trash.addEventListener('click', removesBookFromShoppingList);
  });

  // Update Local Storage

  function removesBookFromShoppingList(event) {
    const id = event.target.closest('.shoplist-book-container').dataset.id;
    shoppingList = shoppingList.filter(book => book.id !== id);
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    newShoppingListContainer.removeChild(
      event.target.closest('.shoplist-book-container')
    );

    // Fix updating on the page

    if (shoppingList.length === 0) {
      newShoppingListContainer.replaceWith(shoppingListContainer);
      // paginationContainer.classList.add('pagination-hidden');
    }
  }

  function updateBookOnStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }

  if (shoppingList.length === 0) {
    if (!document.querySelector('.shopping-list-container')) {
      document.body.appendChild(newShoppingListContainer);
    }
    newShoppingListContainer.replaceWith(shoppingListContainer);
  }

  // Pagination

  const paginationContainer = document.querySelector('.pagination-container');

  if (paginationContainer) {
    if (shoppingList.length === 0) {
      paginationContainer.classList.add('pagination-hidden');
    } else {
      paginationContainer.classList.remove('pagination-hidden');
    }
  }
}