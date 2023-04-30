import {IconAlertTriangle} from "@tabler/icons-react";

export default function WarningAlert(
    {text}: {text:string}
) {
    return (
        <div className="alert alert-warning shadow-lg my-3">
            <div>
                <IconAlertTriangle className="flex-shrink-0 h-6 w-6" />
                <span>{text}</span>
            </div>
        </div>
    );
}
