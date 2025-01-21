const flsPageHasCustomers = true;
function customerHover(e) {
	if (e.currentTarget.classList.contains('leftie')) {
		scrollCustomer(false);
		}
	if (e.currentTarget.classList.contains('rightie')) {
		scrollCustomer();
		}
}
function scrollCustomers(e) {
	if (e.currentTarget.classList.contains('disabled')) return;
	let el = document.querySelector('main .customers .cscroll');
	let cwid = parseInt(document.querySelector('main .customers .cscroll .citem').offsetWidth) + 24;
	let amount = 3;
	if (window.matchMedia("(min-width: 1240px)").matches) amount = 4;
	let items = +el.dataset.full - amount;
	let offset = +el.dataset.current;
	let dir = true;
	if (e.currentTarget.classList.contains('prev')) dir = false;
	let target = 0;
	if (dir) {
		target = Math.max(offset - (cwid * amount), 0 - (items * cwid));
		document.querySelector('main .customers .control .prev').classList.remove('disabled');
		if (target == 0 - (items * cwid)) document.querySelector('main .customers .control .next').classList.add('disabled');
	} else {
		target = Math.min(offset + (cwid * amount), 0); 
		document.querySelector('main .customers .control .next').classList.remove('disabled');
		if (target == 0) document.querySelector('main .customers .control .prev').classList.add('disabled');
	}
	let timing = Math.abs(Math.round((target - offset) / (cwid * amount) * 1000));
	el.dataset.current = target;
	el.style.transition = 'transform ' + timing +'ms linear';
	el.style.transform = 'translate('+target+'px, 0)';
}
function scrollCustomer(dir = true) {
	let el = document.querySelector('main .customers .cscroll');
	let cwid = parseInt(document.querySelector('main .customers .cscroll .citem').offsetWidth) + 24;
	let amount = 3;
	if (window.matchMedia("(min-width: 1240px)").matches) amount = 4;
	let items = +el.dataset.full - amount;
	let offset = +el.dataset.current;
	let target = 0;
	if (dir) {
		target = Math.max(offset - cwid, 0 - (items * cwid));
		document.querySelector('main .customers .control .prev').classList.remove('disabled');
		if (target == 0 - (items * cwid)) document.querySelector('main .customers .control .next').classList.add('disabled');
	} else {
		target = Math.min(offset + cwid, 0); 
		document.querySelector('main .customers .control .next').classList.remove('disabled');
		if (target == 0) document.querySelector('main .customers .control .prev').classList.add('disabled');
	}
	let timing = Math.abs(Math.round((target - offset) / cwid * 1000));
	el.dataset.current = target;
	el.style.transition = 'transform ' + timing +'ms linear';
	el.style.transform = 'translate('+target+'px, 0)';
}
function customerObserver() {
	let scObserver = new IntersectionObserver((entries, observer) => {
		for (let entry of entries) {
			if (entry.boundingClientRect.x < 0) entry.target.classList.add('leftie');
			else entry.target.classList.remove('leftie');
			if (entry.boundingClientRect.x + entry.boundingClientRect.width > entry.rootBounds.width) entry.target.classList.add('rightie');
			else entry.target.classList.remove('rightie');
		}
	},{threshold: [0,1]});
	for (let el of document.querySelectorAll('.customers .citem')) scObserver.observe(el);
}