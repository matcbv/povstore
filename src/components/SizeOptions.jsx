import { useEffect, useState } from 'react';

export function SizeOptions({
	selectedSizeState,
	productCategory,
	productGender,
}) {
	const [sizeList, setSizeList] = useState([]);
	const [selectedSize, setSelectedSize] = selectedSizeState;

	useEffect(() => {
		switch (productCategory) {
			case 'clothes': {
				setSizeList(['PP', 'P', 'M', 'G']);
				break;
			}
			case 'footwear': {
				if (productGender === 'men') {
					setSizeList(['38', '39', '40', '41', '42']);
				} else if (productGender === 'women') {
					setSizeList(['34', '35', '36', '37', '38']);
				}
				break;
			}
			case 'acessories': {
				setSizeList(['U']);
				break;
			}
			default: {
				setSizeList([]);
				break;
			}
		}
	}, [productCategory, productGender]);

	return (
		<div className="flex gap-x-5">
			{sizeList.map((size) => {
				size === 'U' && setSelectedSize(size);
				return (
					<span
						className="flex justify-center items-center w-10 h-10 border-2 border-black rounded-full cursor-pointer"
						key={size}
						style={{ borderColor: selectedSize === size ? '#dc2626' : 'black' }}
						onClick={() => setSelectedSize(size)}
					>
						{size}
					</span>
				);
			})}
		</div>
	);
}
