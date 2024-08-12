import Image from 'next/image';
import { arrow_left, arrow_right } from '@/public';
import { Dispatch, SetStateAction } from 'react';
import useTheme from '@/store/useTheme';

type paginationProps = {
	pageNo: number;
	maxPageNo: number;
	setPageNo: Dispatch<SetStateAction<number>>;
};

const Pagination = ({ pageNo, setPageNo, maxPageNo }: paginationProps) => {
	const generatePageNumbers = () => {
		const pages: Array<number | string> = [];
		if (pageNo > 1) pages.push(1);
		if (pageNo > 3) pages.push('...');
		if (pageNo > 2) pages.push(pageNo - 1);
		pages.push(pageNo);
		if (pageNo < maxPageNo - 1) pages.push(pageNo + 1);
		if (pageNo < maxPageNo - 2) pages.push('...');
		if (pageNo < maxPageNo) pages.push(maxPageNo);
		return pages;
	};

	const handleClick = (page: number | string) => {
		if (typeof page === 'number') setPageNo(page);
	};
	const { isDarkMode } = useTheme();

	return (
		<div className="flex gap-4 transition-all py-10 items-center justify-center cursor-pointer justify-self-end col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
			{pageNo > 1 && (
				<Image
					width={10}
					height={16}
					src={arrow_left}
					alt="arrow_left"
					onClick={() =>
						setPageNo((prev: number) => Math.max(prev - 1, 1))
					}
				/>
			)}
			<div className="flex flex-wrap items-center gap-2.5">
				{generatePageNumbers().map((page, index) => (
					<div
						key={index}
						onClick={() => handleClick(page)}
						className={`cursor-pointer font-openSans text-base font-bold shadow-md pt-1.5 px-2.5 pb-1 rounded-full ${
							page === pageNo
								? `text-white ${
										isDarkMode
											? 'bg-dark-blue-500'
											: 'bg-blue-primary'
								  }`
								: `${
										isDarkMode
											? 'bg-dark-blue-200 text-dark-blue-300'
											: 'text-light-blue-500 bg-white'
								  }`
						}`}
					>
						{page}
					</div>
				))}
			</div>
			{pageNo < maxPageNo && (
				<Image
					width={10}
					height={16}
					src={arrow_right}
					alt="arrow_right"
					onClick={() =>
						setPageNo((prev: number) =>
							Math.min(prev + 1, maxPageNo)
						)
					}
				/>
			)}
		</div>
	);
};

export default Pagination;
