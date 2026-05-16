const iconPaths = {
    home: (
        <>
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9.5 21v-6h5v6" />
        </>
    ),
    search: (
        <>
            <circle cx="11" cy="11" r="6" />
            <path d="m16 16 5 5" />
        </>
    ),
    user: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 21c1.3-4 4-6 7.5-6s6.2 2 7.5 6" />
        </>
    ),
    logout: (
        <>
            <path d="M10 5H5v14h5" />
            <path d="M14 8l4 4-4 4" />
            <path d="M18 12H9" />
        </>
    ),
    back: (
        <>
            <path d="M19 12H5" />
            <path d="m11 6-6 6 6 6" />
        </>
    ),
    bag: (
        <>
            <path d="M6 8h12l1 13H5L6 8Z" />
            <path d="M9 8a3 3 0 0 1 6 0" />
        </>
    ),
    filter: (
        <>
            <path d="M4 6h16" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
        </>
    ),
    edit: (
        <>
            <path d="M4 20h5" />
            <path d="M14.5 4.5 19.5 9.5 9 20H4v-5L14.5 4.5Z" />
        </>
    ),
    tag: (
        <>
            <path d="M4 5v7l8 8 8-8-8-8H4Z" />
            <circle cx="9" cy="9" r="1.5" />
        </>
    ),
    trash: (
        <>
            <path d="M4 7h16" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M6 7l1 14h10l1-14" />
            <path d="M9 7V4h6v3" />
        </>
    ),
    plus: (
        <>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </>
    ),
    minus: <path d="M5 12h14" />,
    shield: (
        <>
            <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
            <path d="m8.5 12 2.5 2.5L16 9" />
        </>
    ),
};

const TimeLuxIcon = ({ name, size = 20, className = '' }) => {
    const paths = iconPaths[name] || iconPaths.home;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className={className}
            aria-hidden="true"
        >
            {paths}
        </svg>
    );
};

export default TimeLuxIcon;
