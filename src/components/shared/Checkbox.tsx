import * as React from "react";

const Checkbox = ({
	label,
	className = "",
	onChange,
	value = "yes",
	checked,
}: {
	label: string;
	className?: string;
	onChange?: () => void;
	value?: string;
	checked?: boolean;
}) => {
	return (
		<div className={`p-0 cursor-pointer ${className}`}>
			<div className="flex items-center">
				<input
					type="checkbox"
					id={label}
					name={label}
					value={value}
					className="opacity-0 absolute h-4 w-4"
					onChange={onChange}
					checked={checked}
				/>
				<div className="bg-white border-2 rounded-md border-comp1 w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
					<svg
						className="fill-current hidden w-3 h-3 text-primary pointer-events-none"
						version="1.1"
						viewBox="0 0 17 12"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g fill="none" fillRule="evenodd">
							<g
								transform="translate(-9 -11)"
								fill="#227E66"
								fillRule="nonzero"
							>
								<path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
							</g>
						</g>
					</svg>
				</div>
				<label htmlFor={label} className="select-none">
					{label}
				</label>
			</div>
		</div>
	);
};

export default Checkbox;
