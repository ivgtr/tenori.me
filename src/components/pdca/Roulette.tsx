import React, { useEffect, useState } from "react";

const reel = ["Plan", "Do", "Check", "Act"];

export default function Roulette() {
	const timerRef = React.useRef<number | null>(null);
	const [angle, setAngle] = useState(0);
	const step = 360 / reel.length;

	const getPosition = (
		radius: number,
		angle: number,
		centerX: number,
		centerY: number,
	) => {
		const radian = (angle * Math.PI) / 180;
		return {
			y: radius * Math.cos(radian) + centerX,
			z: radius * Math.sin(radian) + centerY,
		};
	};

	const handleClick = () => {
		console.log("click");
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;

			return;
		}

		timerRef.current = window.setInterval(() => {
			setAngle((angle) => {
				return (angle + 1) % 360;
			});
		}, 10);
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, []);

	return (
		<div>
			<ul className="relative h-96">
				{reel.map((item, index) => {
					const { y, z } = getPosition(100, step * index + angle, 0, 0);
					const style = {
						top: "50%",
						transform: `translateY(${y}px) translateZ(${z}px) scale(${1 + z / 1000})`,
					};
					return (
						<li key={`a-${index}`} style={style} className="absolute">
							<p>{item}</p>
						</li>
					);
				})}
			</ul>
			<button type="button" onClick={handleClick}>
				click
			</button>
		</div>
	);
}
