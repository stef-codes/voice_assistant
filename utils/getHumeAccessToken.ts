import 'server-only';
import { fetchAccessToken } from "@humeai/voice";

export const getHumeAccessToken = async () => {
	try {
		const apiKey = process.env.HUME_API_KEY;
		const clientSecret = process.env.HUME_CLIENT_SECRET;

		if (!apiKey || !clientSecret) {
			console.error('HUME_API_KEY or HUME_CLIENT_SECRET is not set');
			return null;
		}

		const accessToken = await fetchAccessToken({
			apiKey: String(apiKey),
			secretKey: String(clientSecret),
		});

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