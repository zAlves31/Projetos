export const Input = ({ label, style, disabled, placeholder, type = 'text', value, setValue, required=true }) => {
	const inputType = type === 'password' ? 'password' : 'text';

	return (
		<div className={style}>
			<label className="block text-lg mb-2 text-verdana">
				{label}
			</label>
			<input
				type={inputType}
				disabled={disabled}
				placeholder={placeholder || ''}
				className="w-full py-2 px-3 border border-secondary-gray bg-transparent rounded-[4px]
					focus:outline-none focus:ring-0 focus:border-secondary-gray
					placeholder:text-secondary-gray"
				onChange={setValue}
				value={value}
				required={required}
			/>
		</div>
	);
};
