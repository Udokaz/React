const listItemURL = 'http://localhost:8080/api/listitems';

export function getAllItems() {
	return fetch(listItemURL)
		.then(response => { 
			if(response.ok){
				return response.json();
			} else {
				throw new Error("Error fetching all items.");
			}
		});
}

export function getOneItem(id) {
	return fetch(listItemURL + "/" + id)
		.then(response => {
			if(response.ok){
				return response.json();
			} else {
				throw new Error("Error getting one item.")
			}
		});
}

export function saveNewItem(newListItem) {
	console.log("newListItem", newListItem)
	return fetch(listItemURL, {
		method: 'POST',
		headers: {
			Accept: "application/json", "Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: newListItem.name,
			inList: newListItem.inList,
			quantity: newListItem.quantity,
			section: newListItem.section
		})
	})
	.then(response => {
		if(response.ok){
			return response.json();
		} else {
			console.log("error saving new item")
			throw new Error("Error saving new item:", newListItem['name'])
		}
	});
}

export function updateItem(newListItem) {
	console.log("update item", newListItem)
	return fetch(listItemURL + "/" + newListItem.id, {
		method: 'PUT',
		headers: {
			Accept: "application/json", "Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: newListItem.name,
			inList: newListItem.inList,
			quantity: newListItem.quantity,
			section: newListItem.section
		})
	})
	.then(response => {
		if(response.ok){
			return response.json();
		} else {
			throw new Error("Error updating item:" + newListItem.name)
		}
	});
}

export function deleteItem(id) {
	return fetch(listItemURL + "/" + id, {
		method: 'DELETE',
		headers: {
			Accept: "application/json", "Content-Type": "application/json"
		}
	})
		.then(response => {
			if(response.ok){
				return response.json();
			} else {
				throw new Error("Error getting one item.")
			}
		});
}