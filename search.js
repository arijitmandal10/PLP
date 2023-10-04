// Function to highlight matching list items within products based on a search term
function highlightMatchingText(product, searchTerm) {
	const productVariants = product.querySelector('.variants');
	const listItems = productVariants.querySelectorAll('li');

	if (searchTerm === '') {
		listItems.forEach((listItem) => {
			listItem.classList.remove('highlighted-text');
		});
	} else {
		listItems.forEach((listItem) => {
			const listItemText = listItem.textContent.toLowerCase();
			if (listItemText.includes(searchTerm.toLowerCase())) {
				listItem.classList.add('highlighted-text');
			} else {
				listItem.classList.remove('highlighted-text');
			}
		});
	}
}

// Rest of the code remains the same

// Function to handle search input changes
function handleSearchInput() {
	const searchInput = document.getElementById('searchInput');
	const searchTerm = searchInput.value.trim();
	const products = document.querySelectorAll('.product');

	products.forEach((product) => {
		highlightMatchingText(product, searchTerm);
	});
}

// Add an input event listener to the search input field
document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput');
	searchInput.addEventListener('input', handleSearchInput);
});
