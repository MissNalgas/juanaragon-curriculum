import axios from "axios";

export async function getCatalog() {
    const res = await axios.get("/api/catalog");
    return res.data;
}

export async function getSecret(key) {
    const res = await axios.post("/api/secret", {key});
    return res.data;
}

export async function getLocale() {
    const res = await axios.get("/api/locale");
    return res.data;
}