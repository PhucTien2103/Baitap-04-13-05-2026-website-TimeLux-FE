import { Input } from 'antd';

const FormInput = ({ label, error, type = "text", variant = "default", ...props }) => {
    const InputComponent = type === "password" ? Input.Password : Input;
    const isLuxury = variant === "luxury";

    return (
        <div className="flex flex-col gap-1 w-full text-left">
            {label && (
                <label className={isLuxury ? "text-xs font-bold uppercase tracking-[0.16em] text-[#d0c5af]" : "text-sm font-semibold text-gray-600"}>
                    {label}
                </label>
            )}
            <InputComponent 
                type={type}
                {...props}
                status={error ? "error" : ""}
                className={isLuxury
                    ? `w-full rounded-none border-0 border-b px-0 py-3 shadow-none outline-none transition-all duration-300
                    ${error ? "border-red-300 bg-transparent text-red-100" : "border-[#4d4635] bg-transparent text-[#e2e2e2] placeholder:text-[#d0c5af]/50 focus:border-[#f2ca50]"}`
                    : `w-full px-4 py-2 rounded-lg border outline-none transition-all duration-300
                    ${error ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"}`}
            />
            {error && <span className={isLuxury ? "text-xs text-red-300 italic mt-1" : "text-xs text-red-500 italic mt-1"}>{error}</span>}
        </div>
    );
};

export default FormInput;
