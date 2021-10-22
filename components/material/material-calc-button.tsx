import { useRouter } from 'next/router'
import { sumMaterials } from '../../lib/sum-materials'
import { Button, ButtonProps } from '@chakra-ui/button'
import { ComponentWithAs } from '@chakra-ui/system'
import { ChaldeaState } from '../../hooks/create-chaldea-state'
import { useBoolean } from '@chakra-ui/hooks'
import { MaterialsForServants } from '../../lib/get-materials'

export const CalcButton: ComponentWithAs<
  'button',
  ButtonProps & {
    state: ChaldeaState
    materials: MaterialsForServants
  }
> = ({ state, materials, ...props }) => {
  const [calculating, setCalculating] = useBoolean()
  const router = useRouter()
  const calc = () => {
    setCalculating.on()
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
