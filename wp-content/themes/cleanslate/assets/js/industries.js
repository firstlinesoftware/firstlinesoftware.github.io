let flsIndAnimationActive = false;
let flsIndAnimationTimeout = null;
function playIndAnimation(e) {
	e++;
	if (e > document.querySelectorAll('main .industries .icons > div').length) e = 1;
	selectInd(e);
}
function selectInd(e) {
	if (flsIndAnimationActive) return;
	clearTimeout(flsIndAnimationTimeout);
	flsIndAnimationActive = true;
	let ico = document.querySelector('main .industries .icons > div:nth-child(' + e + ')');
	let el = document.querySelector('main .industries .ipic > div:nth-child(' + e + ')');
	let prev = document.querySelector('main .industries .ipic > div.active');
	prev.classList.add('prev');
	prev.classList.remove('active');
	el.classList.add('active');
	document.querySelector('main .industries .icons div.active').classList.remove('active');
	ico.classList.add('active');
	setTimeout(() => {
		prev.classList.remove('prev');
		flsIndAnimationActive = false;
		flsIndAnimationTimeout = setTimeout(() => {playIndAnimation(e);}, 7000);
	}, 2100);
}