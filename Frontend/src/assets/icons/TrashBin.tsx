import * as React from "react";

const TrashBin: React.FC<React.SVGProps<SVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="18"
        fill="none"
        viewBox="0 0 14 18"
    >
        <path
            fill="#956D84"
            d="M1 16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4H1zM2 5h10v11.5H2zm8.5-4-1-1h-5l-1 1H0v1.5h14V1z"
        ></path>
    </svg>
);

export default TrashBin;
