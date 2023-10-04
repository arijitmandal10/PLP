// Function to highlight matching text within products based on a search term
function highlightMatchingText(product, searchTerm) {
	const productTitle = product.querySelector('.info h2');
	const productVariants = product.querySelector('.variants');

	// Remove previous highlighting
	const highlightedText = product.querySelectorAll('.highlighted-text');
	highlightedText.forEach((span) => {
		const text = document.createTextNode(span.textContent);
		span.parentNode.replaceChild(text, span);
	});

	// Helper function to create a span element for highlighting
	function createHighlightSpan(match) {
		const span = document.createElement('span');
		span.classList.add('highlighted-text');
		span.textContent = match;
		return span;
	}

	// Highlight matching text in variants
	const variantsText = productVariants.textContent;
	const variantsMatch = variantsText.toLowerCase().indexOf(searchTerm.toLowerCase());
	if (variantsMatch !== -1) {
		const matchedText = variantsText.substr(variantsMatch, searchTerm.length);
		const span = createHighlightSpan(matchedText);
		const beforeText = variantsText.substr(0, variantsMatch);
		const afterText = variantsText.substr(variantsMatch + searchTerm.length);
		productVariants.innerHTML = beforeText;
		productVariants.appendChild(span);
		productVariants.innerHTML += afterText;
	}
}

// Function to handle search input changes
function handleSearchInput() {
	const searchInput = document.getElementById('searchInput');
	const searchTerm = searchInput.value.trim();
	const products = document.querySelectorAll('.product');

	products.forEach((product) => {
		highlightMatchingText(product, searchTerm);

		// Show or hide the product based on whether it contains highlighted text
		if (product.querySelector('.highlighted-text')) {
			product.style.display = ''; // Display the product
		} else {
			product.style.display = 'none'; // Hide the product
		}
	});
}

// Add an input event listener to the search input field
document.addEventListener('DOMContentLoaded', () => {
	const searchInput = document.getElementById('searchInput');
	searchInput.addEventListener('input', handleSearchInput);
});
