const flsPageHasInsights = true;
function clickInsight(e) {
	let url = e.currentTarget.dataset.href;
	window.location = url;
}
function insightHover(e) {
	if (e.currentTarget.classList.contains('leftie')) {
		scrollInsight(false);
		}
	if (e.currentTarget.classList.contains('rightie')) {
		scrollInsight();
		}
}
function scrollInsights(e) {
	if (e.currentTarget.classList.contains('disabled')) return;
	let el = document.querySelector('main .insights .inscroll');
	let cwid = parseInt(document.querySelector('main .insights .inscroll .item').offsetWidth) + 24;
	let amount = 2;
	if (window.matchMedia("(min-width: 1240px)").matches) amount = 3;
	let items = +el.dataset.full - amount;
	let offset = +el.dataset.current;
	let dir = true;
	if (e.currentTarget.classList.contains('prev')) dir = false;
	let target = 0;
	if (dir) {
		target = Math.max(offset - (cwid * amount), 0 - (items * cwid));
		document.querySelector('main .insights .control .prev').classList.remove('disabled');
		if (target == 0 - (items * cwid)) document.querySelector('main .insights .control .next').classList.add('disabled');
	} else {
		target = Math.min(offset + (cwid * amount), 0); 
		document.querySelector('main .insights .control .next').classList.remove('disabled');
		if (target == 0) document.querySelector('main .insights .control .prev').classList.add('disabled');
	}
	let timing = Math.abs(Math.round((target - offset) / (cwid * amount) * 1000));
	el.dataset.current = target;
	el.style.transition = 'transform ' + timing +'ms linear';
	el.style.transform = 'translate('+target+'px, 0)';
}
function scrollInsight(dir = true) {
	let el = document.querySelector('main .insights .inscroll');
	let cwid = parseInt(document.querySelector('main .insights .inscroll .item').offsetWidth) + 24;
	let amount = 2;
	if (window.matchMedia("(min-width: 1240px)").matches) amount = 3;
	let items = +el.dataset.full - amount;
	let offset = +el.dataset.current;
	let target = 0;
	if (dir) {
		target = Math.max(offset - cwid, 0 - (items * cwid));
		document.querySelector('main .insights .control .prev').classList.remove('disabled');
		if (target == 0 - (items * cwid)) document.querySelector('main .insights .control .next').classList.add('disabled');
	} else {
		target = Math.min(offset + cwid, 0); 
		document.querySelector('main .insights .control .next').classList.remove('disabled');
		if (target == 0) document.querySelector('main .insights .control .prev').classList.add('disabled');
	}
	let timing = Math.abs(Math.round((target - offset) / cwid * 1000));
	el.dataset.current = target;
	el.style.transition = 'transform ' + timing +'ms linear';
	el.style.transform = 'translate('+target+'px, 0)';
}
function insightObserver() {
	let scObserver = new IntersectionObserver((entries, observer) => {
		for (let entry of entries) {
			if (entry.boundingClientRect.x < 0) entry.target.classList.add('leftie');
			else entry.target.classList.remove('leftie');
			if (entry.boundingClientRect.x + entry.boundingClientRect.width > entry.rootBounds.width) entry.target.classList.add('rightie');
			else entry.target.classList.remove('rightie');
		}
	},{threshold: [0,1]});
	for (let el of document.querySelectorAll('.insights .item')) scObserver.observe(el);
}