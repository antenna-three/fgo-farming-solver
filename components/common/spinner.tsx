import SpinnerPart from './spinner-part'

export default function Spinner({ message }: { message?: string }) {
  message ||= '計算中'
  const range = (len: number) => Array.from({ length: len }, (_, i) => i)
  const n = 8
  return (
    <>
      <div className="centered">
        <div className="background">
          {range(n).map((i) => (
            <SpinnerPart
              key={i}
              color={{ h: 200, s: 80, l: 40 + (50 / n) * i }}
              delay={-0.1 - 0.1 * i}
            />
          ))}
        </div>
        <h2>{message}</h2>
      </div>
      <div className="margin" />
      <style jsx>{`
        .background {
          padding: 0 0 8px;
          background: #124;
        }
        .margin {
          height: 70vh;
        }
      `}</style>
    </>
  )
}