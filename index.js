import { Client } from "discord.js-selfbot-v13";
import config from "./config.json" assert { type: "json" };

const client = new Client();

client.on("ready", () => {
	try {
		console.log(`Logged in as ${client.user.tag}`);
	} catch (error) {
		console.error("Error in ready event:", error);
	}
});

client.on("threadCreate", async (thread) => {
	try {
		if (thread.guild.id === config.guildId && thread.name.includes("ticket")) {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			await thread.send(config.message);
		}
	} catch (error) {
		console.error("Error handling thread creation:", error);
	}
});

client.login(config.token).catch((error) => {
	console.error("Failed to login:", error);
	process.exit(1);
});
