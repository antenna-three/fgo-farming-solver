import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { HStack } from '@chakra-ui/layout'
import { Wrap, WrapItem } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Item, Servant } from '../../interfaces/atlas-academy'
import { MsItemsIo } from './ms-items-io'
import { MsServantsIo } from './ms-servants-io'
import { State } from './servant-level-select'

export const MsIo = ({
  servants,
  state,
  setState,
  items,
  posession,
  setPosession,
}: {
  servants: Servant[]
  state: State
  setState: Dispatch<SetStateAction<State>>
  items: Item[]
  posession: { [key: string]: number }
  setPosession: Dispatch<SetStateAction<{ [key: string]: number }>>
}) => (
  <Wrap>
    <WrapItem>
      <FormControl id="ms-servants">
        <FormLabel>サーヴァント</FormLabel>
        <MsServantsIo servants={servants} state={state} setState={setState} />
      </FormControl>
    </WrapItem>
    <WrapItem>
      <FormControl id="ms-items">
        <FormLabel>アイテム</FormLabel>
        <MsItemsIo
          items={items}
          posession={posession}
          setPosession={setPosession}
        />
      </FormControl>
    </WrapItem>
  </Wrap>
)
