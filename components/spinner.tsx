import SpinnerPart from './spinner-part'

export default function Spinner() {
    const range = (len: number) => Array.from({ length: len }, (_, i) => i)
    return (
        <div className="spinner">
            <div className="background">
                {range(5).map((i) => (
                    <SpinnerPart key={i} color={{h: 200, s: 80, l: 50 + 8*i}} delay={-0.1*i}/>
                ))}
            </div>
            <style jsx>{`
                .background {
                    padding: 0 0 5px;
                    background: #124;
                }
            `}</style>
        </div>
    )
}