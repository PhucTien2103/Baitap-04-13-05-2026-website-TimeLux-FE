import { Button } from 'antd';

const SubmitButton = ({ loading, children, onClick, type = "primary", htmlType = 'button', disabled = false, className = "", variant = "default" }) => (
    <Button
        type={type}
        htmlType={htmlType}
        loading={loading}
        onClick={onClick}
        disabled={loading || disabled}
        className={variant === "luxury"
            ? `!h-12 !w-full !rounded-none !border !border-[#f2ca50] !bg-transparent !text-xs !font-bold !uppercase !tracking-[0.18em] !text-[#f2ca50] !shadow-none transition-all hover:!bg-[#f2ca50] hover:!text-[#241a00] active:scale-[0.98] ${className}`
            : `w-full h-11 text-base font-semibold rounded-lg shadow-md transition-all active:scale-95 ${className}`}
    >
        {children}
    </Button>
);

export default SubmitButton;
