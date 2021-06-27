

export default function WarningConfirm({
    title,
    message,
    proceed,
    cancel,
    onProceed,
    onCancel
}: {
    title: string,
    message: string,
    proceed: string,
    cancel: string,
    onProceed: () => void,
    onCancel: () => void
}) {
    return (
        <div className="centered card">
            <h2>{title}</h2>
            <p>{message}</p>
            <button className="cancel" onClick={onCancel}>{cancel}</button>
            <button className="proceed" onClick={onProceed}>{proceed}</button>
            <style jsx>{`
                .card {
                    padding: 2rem;
                    color: #333;
                    background: #fff;
                    border-radius: .5rem;
                }
                button {
                    margin: .5rem;
                }
                .proceed {
                    background: #e44;
                    border-color: #e44;
                }
            `}</style>
        </div>
    )
}