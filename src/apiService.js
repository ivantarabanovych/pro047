export class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getData(endpoint) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${endpoint}: ${response.status}`);
        }
        return response.json();
    }

    async createData(endpoint, data) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error creating data: ${response.status}`);
        }
        return response.json();
    }

    async updateData(endpoint, id, data) {
        const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error updating data with ID ${id}: ${response.status}`);
        }
        return response.json();
    }

    async deleteData(endpoint, id) {
        const response = await fetch(`${this.baseUrl}/${endpoint}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error deleting data with ID ${id}: ${response.status}`);
        }
        return response.json();
    }
}
