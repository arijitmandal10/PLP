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

// Function to create product elements
function createProductElement(product) {
	const productContainer = document.createElement('div');
	productContainer.className = 'product';

	const badgeImageContainer = document.createElement('div');
	badgeImageContainer.className = 'badge-image-container';

	const productBadge = document.createElement('span');
	productBadge.className = 'badge';
	productBadge.textContent = product.product_badge;

	const productImage = document.createElement('img');
	productImage.src = product.product_image;

	badgeImageContainer.appendChild(productBadge);
	badgeImageContainer.appendChild(productImage);

	const productInfoContainer = document.createElement('div');
	productInfoContainer.className = 'info';

	const productTitle = document.createElement('h2');
	productTitle.textContent = product.product_title;

	const productVariants = document.createElement('ul');
	productVariants.className = 'variants';

	product.product_variants.forEach((variant) => {
		const variantItem = document.createElement('li');
		const variantValue = variant[Object.keys(variant)[0]];
		variantItem.textContent = variantValue;
		productVariants.appendChild(variantItem);
	});

	productInfoContainer.appendChild(productTitle);
	productInfoContainer.appendChild(productVariants);

	productContainer.appendChild(badgeImageContainer);
	productContainer.appendChild(productInfoContainer);

	return productContainer;
}

// Make an API request to fetch the product data
fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093')
	.then((response) => response.json())
	.then((data) => {
		data.data.forEach((product) => {
			const productElement = createProductElement(product);
			productList.appendChild(productElement);
		});
	})
	.catch((error) => {
		console.error('Error fetching product data:', error);
	});
