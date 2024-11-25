import { ApiService } from "../src/apiService";

global.fetch = jest.fn();

describe("ApiService", () => {
    const baseUrl = "https://api.example.com";
    const apiService = new ApiService(baseUrl);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("отримує дані через getData", async () => {
        const mockData = [{ id: 1, name: "Test Item" }];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const data = await apiService.getData("items");
        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/items`);
    });

    test("створює новий елемент через createData", async () => {
        const mockData = { id: 1, name: "New Item" };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const newItem = await apiService.createData("items", { name: "New Item" });
        expect(newItem).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "New Item" }),
        });
    });

    test("оновлює елемент через updateData", async () => {
        const mockData = { id: 1, name: "Updated Item" };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        const updatedItem = await apiService.updateData("items", 1, { name: "Updated Item" });
        expect(updatedItem).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/items/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Updated Item" }),
        });
    });

    test("видаляє елемент через deleteData", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        const response = await apiService.deleteData("items", 1);
        expect(response).toEqual({ success: true });
        expect(fetch).toHaveBeenCalledWith(`${baseUrl}/items/1`, {
            method: "DELETE",
        });
    });

    test("кидає помилку, якщо fetch завершується неуспішно", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
        });

        await expect(apiService.getData("invalid-endpoint")).rejects.toThrowError(
            "Error fetching data from invalid-endpoint: 404"
        );
    });
});
