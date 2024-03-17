import createPost from "./x/createPost";
import { getXPost } from "./llm/gemini";

export async function postToX() {
	try {
		const post = await getXPost();
		if (post) {
			await createPost({
				text: post,
			});
		}
	} catch (error) {
		console.log("Failed to create post.");
		console.error("Error main: ", error);
	}
}