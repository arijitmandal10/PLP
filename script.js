// script.js

console.log('Connected');

const productList = document.getElementById('product-list');
const listViewButton = document.getElementById('listViewButton');
const gridViewButton = document.getElementById('gridViewButton');

// Function to set the list view styles
function setListView() {
	productList.classList.remove('grid-view');
	productList.classList.add('list-view');
}

// Function to set the grid view styles
function setGridView() {
	productList.classList.remove('list-view');
	productList.classList.add('grid-view');
}

// Initial view is list view
setListView();

// Add click event listeners to the buttons
listViewButton.addEventListener('click', setListView);
gridViewButton.addEventListener('click', setGridView);

// Make an API request to fetch the product data
fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093')
	.then((response) => response.json())
	.then((data) => {
		// Iterate through the products and create HTML elements to display them
		data.data.forEach((product) => {
			// Create the main product container
			const productContainer = document.createElement('div');
			productContainer.className = 'product';

			// Create a container for the badge and image
			const badgeImageContainer = document.createElement('div');
			badgeImageContainer.className = 'badge-image-container';

			const productBadge = document.createElement('span');
			productBadge.className = 'badge';
			productBadge.textContent = product.product_badge;

			const productImage = document.createElement('img');
			productImage.src = product.product_image;

			badgeImageContainer.appendChild(productBadge);
			badgeImageContainer.appendChild(productImage);

			// Create a container for product information
			const productInfoContainer = document.createElement('div');
			productInfoContainer.className = 'info';

			const productTitle = document.createElement('h2');
			productTitle.textContent = product.product_title;

			const productVariants = document.createElement('ul');
			productVariants.className = 'variants';

			product.product_variants.forEach((variant) => {
				const variantItem = document.createElement('li');
				variantItem.textContent = variant[Object.keys(variant)[0]];
				productVariants.appendChild(variantItem);
			});

			productInfoContainer.appendChild(productTitle);
			productInfoContainer.appendChild(productVariants);

			// Add the badge/image container and info container to the main product container
			productContainer.appendChild(badgeImageContainer);
			productContainer.appendChild(productInfoContainer);

			// Add the main product container to the product list
			productList.appendChild(productContainer);
		});
	})
	.catch((error) => {
		console.error('Error fetching product data:', error);
	});
