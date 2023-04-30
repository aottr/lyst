import {IconBug} from "@tabler/icons-react";

export default function ErrorAlert(
    {text}: {text:string}
) {
    return (
        <div className="alert alert-error shadow-lg my-3">
            <div>
                <IconBug className="flex-shrink-0 h-6 w-6" />
                <span>{text}</span>
            </div>
        </div>
    );
}
