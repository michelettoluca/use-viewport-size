import { useState, useEffect } from "react";

const debounce = (fn, wait) => {
	let debouncer;

	return () => {
		if (debouncer) clearTimeout(debouncer);

		debouncer = setTimeout(() => {
			debouncer = null;
			fn();
		}, wait);
	};
};

export const useViewportSize = (debounceWait = 200) => {
	const [viewportSize, setViewportSize] = useState({
		height: window.innerHeight,
		width: window.innerWidth,
	});

	useEffect(() => {
		const handleWindowResize = debounce(
			() =>
				setViewportSize({
					height: window.innerHeight,
					width: window.innerWidth,
				}),
			debounceWait
		);

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [debounceWait]);

	return viewportSize;
};
