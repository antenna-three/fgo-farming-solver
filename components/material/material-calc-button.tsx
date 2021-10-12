import { useRouter } from 'next/router'
import { useState } from 'react'
import { MaterialsRecord } from '../../interfaces/atlas-academy'
import { State } from './servant-level-select'
import { sumMaterials } from '../../lib/sum-materials'
import { Button, ButtonProps } from '@chakra-ui/button'
import { ComponentWithAs } from '@chakra-ui/system'

export const CalcButton: ComponentWithAs<
  'button',
  ButtonProps & {
    state: State
    materials: { [id: string]: MaterialsRecord }
  }
> = ({
  state,
  materials,
  ...props
}: {
  state: State
  materials: { [id: string]: MaterialsRecord }
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
    <Button onClick={calc} isLoading={calculating} {...props}>
      必要な素材を計算する
    </Button>
  )
}
