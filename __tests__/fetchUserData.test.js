import { fetchUserData } from "../src/fetchUserData";
global.fetch = jest.fn();

describe("fetchUserData", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("повертає дані про користувача, якщо запит успішний", async () => {
        
        const mockUserData = { id: 1, name: "Ivan", email: "ivant@gmail.com" };
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUserData,
        });

        const userId = 1;
        const data = await fetchUserData(userId);
        expect(data).toEqual(mockUserData);
        expect(fetch).toHaveBeenCalledTimes(1); 
        expect(fetch).toHaveBeenCalledWith(`https://api.example.com/users/${userId}`);
    });

    test("кидає помилку, якщо API повертає неуспішний статус", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
        });
    
        const userId = 1;
        await expect(fetchUserData(userId)).rejects.toThrowError("Не вдалося отримати дані користувача"); 
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    test("кидає помилку, якщо виникла проблема з мережею", async () => {
       
        fetch.mockRejectedValueOnce(new Error("Network error"));

        const userId = 1;
        await expect(fetchUserData(userId)).rejects.toThrowError("Network error");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
})