export async function fetchUserData(userId) {
    try{
        const responce = await fetch(`https://api.example.com/users/${userId}`);
        if (!responce.ok){
            throw new Error("Не вдалося отримати дані користувача");
        }
        const data = await responce.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}