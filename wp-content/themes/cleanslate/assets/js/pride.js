const flsPageHasCounters = true;
function counterObserver() {
	let flsCounterObserver = new IntersectionObserver((entries, observer) => {
		if (entries[0].intersectionRatio <= 0) return;
		observer.disconnect();
		const counters = document.querySelectorAll('.ptable .cct');
		const speed = 150;
		counters.forEach( counter => {
			const animate = () => {
				const value = +counter.dataset.to;
				const time = value / speed;
				const data = counter.dataset.from = +counter.dataset.from + time;
				if(Math.round(data) < value) {
					counter.innerText = Math.round(data);
					setTimeout(animate, 1);
				} else {
					counter.innerText = value;
				}
			}
			animate();
		});
	}, {'threshold':0.2});
	flsCounterObserver.observe(document.querySelector('.pride .ptable'));
}