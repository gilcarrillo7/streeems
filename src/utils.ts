export const getMonthYear = (date: Date, lang: string) => {
	return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-US", {
		month: "long",
		year: "numeric",
	}).format(new Date(date));
};

export const getDossierColor = (name: string) => {
	const color: any = {
		"Effizienz & Verbrauch": "#28727F",
		Energieträger: "#021F15",
		Erneuerbare: "#62CABE",
		Infrastrukturen: "#1F5D46",
		Mobilität: "#C0EFEA",
		Rahmenbedingungen: "#3AABBE",
		"Speicher & Flexibilität": "#234C67",
		Systemtransformation: "#3A8175",
		Umweltschäden: "#708B8E",
	};

	return name in color ? color[name] : "#28727F";
};
