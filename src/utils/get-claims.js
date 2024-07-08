export default function getClaims(token) {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid JWT token");
        }

        const payloadEncoded = parts[1];
        const payloadDecoded = atob(payloadEncoded + "==");  // Add padding if necessary

        const claims = JSON.parse(payloadDecoded);

        return claims;
    } catch (error) {
        console.error(`Error decoding token: ${error}`);
        return null;
    }
}