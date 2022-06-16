import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Wrap, WrapItem } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { ChaldeaState } from '../../hooks/create-chaldea-state'
import { Item, Servant } from '../../interfaces/atlas-academy'
import { MsItemsIo } from './ms-items-io'
import { MsServantsIo } from './ms-servants-io'

export const MsIo = ({
  servants,
  state,
  setState,
  items,
  posession,
  setPosession,
}: {
  servants: Servant[]
  state: ChaldeaState
  setState: Dispatch<SetStateAction<ChaldeaState>>
  items: Item[]
  posession: { [key: string]: number }
  setPosession: Dispatch<SetStateAction<{ [key: string]: number }>>
}) => {
  const { t } = useTranslation('material')
  return (
    <Wrap>
      <WrapItem>
        <FormControl id="ms-servants">
          <FormLabel>{t('サーヴァント')}</FormLabel>
          <MsServantsIo servants={servants} state={state} setState={setState} />
        </FormControl>
      </WrapItem>
      <WrapItem>
        <FormControl id="ms-items">
          <FormLabel>{t('アイテム')}</FormLabel>
          <MsItemsIo
            items={items}
            posession={posession}
            setPosession={setPosession}
          />
        </FormControl>
      </WrapItem>
    </Wrap>
  )
}
