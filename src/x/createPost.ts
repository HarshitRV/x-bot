import axios from "axios";
import moment from "moment";

export interface PostData {
	text: string;
}

export interface CreatePostResponse {
	edit_history_tweet_ids: Array<string>;
	id: string;
	text: string;
}

export default async function createPost(
	data: PostData
): Promise<CreatePostResponse | null> {
	try {
		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://api.twitter.com/2/tweets",
			headers: {
				"Content-Type": "application/json",
				Authorization: `OAuth oauth_consumer_key="${process.env.API_KEY}",oauth_token="${process.env.ACCESS_TOKEN}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1710654723",oauth_nonce="ixGt8QTT5Ap",oauth_version="1.0",oauth_signature="kZ2NgA3I0VlQ7QcIr%2B%2BfOnyiThI%3D"`,
				Cookie:
					'guest_id=v1%3A171065472252646923; guest_id_ads=v1%3A171065472252646923; guest_id_marketing=v1%3A171065472252646923; personalization_id="v1_oCtPOTRilmK6lKkTmsEg/A=="',
			},
			data,
		};

		const response = await axios.request(config);

		console.log("✅ Posted on X: ", response.data.data);

		return response.data.data;
	} catch (error) {
		console.log("❌ Failed posting on X");
		console.error("❌ Error creatingPost: ", error);
		return null;
	} finally {
		console.log("🥂 Finished at: ", moment().format("MMMM Do YYYY, h:mm:ss a"));
	}
}
