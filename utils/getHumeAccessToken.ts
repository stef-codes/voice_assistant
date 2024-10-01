import 'server-only';
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async (configId?: string) => { // Accept configId as an optional parameter
	try {
		const apiKey = process.env.HUME_API_KEY;
		const secretKey = process.env.HUME_CLIENT_SECRET;

		if (!apiKey || !secretKey) {
			console.error('HUME_API_KEY or HUME_CLIENT_SECRET is not set');
			return null;
		}

		const accessToken = await fetchAccessToken({
			apiKey: String(apiKey),
			secretKey: String(secretKey), // Keeping secretKey
			...(configId ? { configId: String("4c004f60-1c41-4b02-94b4-f56ee45a5c2d") } : {}), // Conditionally add configId
		} as any); // Type assertion to bypass the TypeScript error

		if (accessToken === 'undefined') {
			console.error('Access token is undefined');
			return null;
		}

		return accessToken ?? null;
	} catch (error) {
		console.error('Error fetching Hume access token:', error);
		return null;
	}
}