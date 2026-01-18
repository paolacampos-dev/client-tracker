import PerformButton from "./button";
import clientFields from "../data/ClientFields.js";


function ClientForm({ formData, onChange, onSubmit, submitLabel})    {
    return  (
        <>
            <h3>Client Form:</h3>
            <form onSubmit={onSubmit}>
                {clientFields.map(field => (
                <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={onChange}
                            required={field.required}
                        />
                </div>
                ))}
                <PerformButton label={submitLabel} type="submit"/>
            </form>
        </>
    );
}
export default ClientForm;