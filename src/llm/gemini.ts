import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";
import moment from "moment";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY as string;

export async function getXPost(): Promise<string | null> {
	try {
		const genAI = new GoogleGenerativeAI(API_KEY);
		const model = genAI.getGenerativeModel({ model: MODEL_NAME });

		const generationConfig = {
			temperature: 0.9,
			topK: 1,
			topP: 1,
			maxOutputTokens: 300,
		};

		const safetySettings = [
			{
				category: HarmCategory.HARM_CATEGORY_HARASSMENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
			{
				category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
				threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
			},
		];

		const parts = [
			{
				text: "input: Write a twitter post relating to STEM field. Note the response length should not exceed 280 characters. Must include at least two hashtags.",
			},
			{
				text: "output : Did you know 3D printing uses computer-aided design (CAD) to create physical objects?  #STEMlearning #3Dprinting    This tech is revolutionizing everything from prosthetics to architecture!  What would you 3D print?",
			},
			{
				text: "input: Write a twitter post relating to fun javascript fact. Note the response length should not exceed 280 characters. Must include at least two hashtags.",
			},
			{
				text: 'output : Believe it or not, JavaScript wasn\'t always called JavaScript!  Originally named "Mocha" ☕️, it was later renamed to capitalize on the popularity of Java.  #FunFactFriday #JavaScript  Who knew coffee fueled the web?',
			},
			{
				text: "input: Write a twitter post relating to fun javascript fact. Note the response length should not exceed 280 characters. Must include at least two hashtags.",
			},
			{ text: "output : " },
		];

		console.log("🚀 Started at: ", moment().format("MMMM Do YYYY, h:mm:ss a"));

		const result = await model.generateContent({
			contents: [{ role: "user", parts }],
			generationConfig,
			safetySettings,
		});

		const response = result.response;

		console.log("✅ Created post content: ", response.text());

		return response.text();
	} catch (error) {
		console.log("❌ Failed creating post content");
		console.error("❌ Error gemini: ", error);
		return null;
	}
}
