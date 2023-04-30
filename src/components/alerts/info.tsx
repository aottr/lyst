import {IconInfoSquare} from "@tabler/icons-react";

export default function InfoAlert(
    {text}: {text:string}
) {
    return (
        <div className="alert alert-info shadow-lg my-3">
            <div>
                <IconInfoSquare className="flex-shrink-0 h-6 w-6" />
                <span>{text}</span>
            </div>
        </div>
    );
}
