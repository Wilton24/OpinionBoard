import { useFormStatus } from "react-dom";

export default function Submit() {
    const { pending, data, method, action } = useFormStatus();
    return (
        <p className="actions">
            <button disabled={pending} type="submit">
                {pending ? 'Submitting...' : "Submit"}
            </button>
        </p>
    );
}