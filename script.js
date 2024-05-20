document.getElementById("container-log_in_btn").onclick = connectToMetamask;

let token1_selected = false;
document.getElementById("container-token1-select").onclick = openModal1;
let token2_selected = false;
document.getElementById("container-token2-select").onclick = openModal2;
document.getElementById("container-swap_btn").onclick = swap;

document.getElementById("close_btn").onclick = closeModal1;
document.getElementById("close_btn").onclick = closeModal2;

let tokenListJSON;
async function fetchData() {
	let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
	tokenListJSON = await response.json();
	console.log(tokenListJSON);
}
fetchData();

async function connectToMetamask() {
	if (typeof window.ethereum !== "undefined") {
		const connectedAccounts = await ethereum.request({
			method: "eth_requestAccounts",
		});
		document.getElementById("container-log_in_btn").innerHTML =
			connectedAccounts[0];
	}
}

async function openModal1() {
	document.getElementById("modal").style.display = "block";
	tokenLists();
	token1_selected = true;
}
async function openModal2() {
	document.getElementById("modal").style.display = "block";
	tokenLists();
	token2_selected = true;
}
async function closeModal1() {
	document.getElementById("modal").style.display = "none";
	token1_selected = false;
}
async function closeModal2() {
	token2_selected = false;
	document.getElementById("modal").style.display = "none";
}

async function tokenLists() {
	let parent = document.getElementById("modal-body-tokens");
	for (const i in tokenListJSON.tokens) {
		/*for (let i = 0; i < 500; i++) {*/
		let button = document.createElement("button");
		button.style.width = "100%";
		/*
		let html = `<img class="token_list_img" src="${tokenListJSON.tokens[i].logoURI}"> <span class="token_list_text">${tokenListJSON.tokens[i].symbol}</span>`;
		button.innerHTML = html;
		parent.appendChild(button);
		*/
		//
		let img = document.createElement("img");
		img.className = "token_list_img";
		img.src = tokenListJSON.tokens[i].logoURI;
		button.appendChild(img);
		//
		let span = document.createElement("span");
		span.className = "token_list_text";
		span.innerHTML = tokenListJSON.tokens[i].symbol;
		button.appendChild(span);
		//
		button.onclick = () => {
			if (token1_selected) {
				document.getElementById("container-token1-select").innerHTML =
					"";
				document
					.getElementById("container-token1-select")
					.appendChild(button);
				token1_selected = false;
			}
			if (token2_selected) {
				document.getElementById("container-token2-select").innerHTML =
					"";
				document
					.getElementById("container-token2-select")
					.appendChild(button);
				token2_selected = false;
			}
			document.getElementById("modal").style.display = "none";
		};
		parent.appendChild(button);
	}
}

async function swap() {}
