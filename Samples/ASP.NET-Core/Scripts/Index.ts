import UriParser from "@regionorebrolan/extensions/lib/UriParser";
import EPiServerServiceProvider from "@regionorebrolan/extensions/lib/EPiServer/ServiceProvider";
import ServiceLocation from "@regionorebrolan/extensions/lib/ServiceLocation";

function addText(text: string) {
	let list = document.querySelector("ul");

	if (!list) {
		const body = document.querySelector("body");

		if (!body)
			throw new Error("No body element.");

		list = body.appendChild(document.createElement("ul"));
	}

	const item = document.createElement("li");
	item.innerText = text;
	list.appendChild(item);
}

document.addEventListener("DOMContentLoaded", () => {
	addText("There should come url-information after this line. If not, something not working, check the console.");

	ServiceLocation.setInstance(new EPiServerServiceProvider());
	const uriBuilderFactory = ServiceLocation.instance.uriBuilderFactory;
	const uriBuilder = uriBuilderFactory.create(document.location.toString());
	const uriParseResult = new UriParser().parse(document.location.toString());

	addText("Url: " + (uriParseResult.valid ? (uriParseResult.value || "").toString() : "invalid"));

	uriBuilder.query.add("Added-key", "added-value");
	addText("UriBuilder.Query: " + uriBuilder.query);
	addText("Query: " + uriBuilder.uri.query);
});