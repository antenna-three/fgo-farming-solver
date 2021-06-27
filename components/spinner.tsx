import SpinnerPart from './spinner-part'

export default function Spinner() {
    const range = (len: number) => Array.from({ length: len }, (_, i) => i)
    const n = 10;
    return (
        <div className="centered">
            <div className="background">
                {range(n).map((i) => (
                    <SpinnerPart key={i} color={{h: 200, s: 80, l: 40 + (50/n)*i}} delay={-0.1-0.1*i}/>
                ))}
            </div>
            <h2>計算中</h2>
            <style jsx>{`
                .background {
                    padding: 0 0 5px;
                    background: #124;
                }
            `}</style>
        </div>
    )
}