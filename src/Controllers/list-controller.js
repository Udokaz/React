const listItemURL = '/api/listitems';
const JSCookie = require('js-cookie');

const headers = new Headers({ 
	"Authorization": "Bearer " + JSCookie.get("user")	
})

export function getAllItems() {
	return fetch(listItemURL, {
		headers
	}).then(response => { 
		console.log("response", response)
		if(response.ok){
			console.log("ok")
			return response.json();
		} else {
			console.log("bad")
			throw new Error("Error fetching all items.");
		}
	}).catch( error => console.log("error", error));
}

export function getOneItem(id) {
	return fetch(listItemURL + "/" + id, {
		headers
	})
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
			"Authorization": "Bearer " + JSCookie.get("user"),
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
			"Authorization": "Bearer " + JSCookie.get("user"),
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
			"Authorization": "Bearer " + JSCookie.get("user"),
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