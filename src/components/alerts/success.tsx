import {IconCheckbox} from "@tabler/icons-react";

export default function SuccessAlert(
    {text}: {text:string}
) {
    return (
        <div className="alert alert-success shadow-lg my-3">
            <div>
                <IconCheckbox className="flex-shrink-0 h-6 w-6" />
                <span>{text}</span>
            </div>
        </div>
    );
}
