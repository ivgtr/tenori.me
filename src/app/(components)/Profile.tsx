export const Profile = () => {
	return (
		<div className="space-y-4">
			<div className="bg-yellow-100 border-2 border-orange-400 p-3">
				<h4 className="font-bold text-orange-800 mb-2 flex items-center">
					👤 Identity
				</h4>
				<div className="bg-white border border-gray-400 p-2 font-mono text-sm">
					ivgtr
				</div>
			</div>

			<div className="bg-pink-100 border-2 border-pink-400 p-3">
				<h4 className="font-bold text-pink-800 mb-2 flex items-center">
					🎂 Birthday
				</h4>
				<div className="bg-white border border-gray-400 p-2 font-mono text-sm">
					1996/11/12
				</div>
			</div>

			<div className="bg-blue-100 border-2 border-blue-400 p-3">
				<h4 className="font-bold text-blue-800 mb-2 flex items-center">
					❤️ Likes
				</h4>
				<div className="space-y-2">
					<div className="bg-white border border-gray-400 p-2">
						<div className="text-xs text-gray-600 mb-1">🎮 Games:</div>
						<div className="text-sm font-mono">Dark Souls / ランスシリーズ</div>
					</div>
					<div className="bg-white border border-gray-400 p-2">
						<div className="text-xs text-gray-600 mb-1">🎵 Music:</div>
						<div className="text-sm font-mono">藤井風 / 星野源</div>
					</div>
					<div className="bg-white border border-gray-400 p-2">
						<div className="text-xs text-gray-600 mb-1">📺 Anime:</div>
						<div className="text-sm font-mono">
							アイカツ! / プリティーリズム・レインボーライブ / 輪るピングドラム
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
