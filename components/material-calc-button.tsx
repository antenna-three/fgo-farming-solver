import { useRouter } from 'next/router'
import { useState } from 'react'
import { Materials } from '../interfaces'
import { State } from './servant-level-select'
import { sumMaterials } from '../lib/sum-materials'

const CalcButton = ({
  state,
  materials,
}: {
  state: State
  materials: { [id: string]: { [key: string]: Materials } }
}) => {
  const [calculating, setCalculating] = useState(false)
  const router = useRouter()
  const calc = () => {
    setCalculating(true)
    const query = sumMaterials(state, materials)
    router.push({
      pathname: '/material/result',
      query,
    })
  }
  return (
    <button onClick={calc}>
      {calculating ? (
        <div className="loader" />
      ) : (
        <span className="text">必要な素材を計算する</span>
      )}
      <style jsx>{`
        .loader,
        .loader::after {
          border-radius: 50%;
          width: 24px;
          height: 24px;
        }
        .loader {
          margin: 0;
          font-size: 20px;
          position: relative;
          text-indent: -9999em;
          border-top: 3px solid #fff4;
          border-right: 3px solid #fff4;
          border-bottom: 3px solid #fff4;
          border-left: 3px solid #fff;
          animation: load 1s infinite linear;
        }
        @keyframes load {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  )
}

export default CalcButton
