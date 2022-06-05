import { useCallback, useEffect, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import cx from 'classnames'

import { coinKeyWordState } from 'states/coin'
import { dropDownOpenState, searchKeyWordState } from 'states/search'
import DropDownItem from './DropDownItem'

import styles from './dropDown.module.scss'

const DropDownList = () => {
  const keyWord = useRecoilValue(searchKeyWordState)
  const keyWordList = useRecoilValue(coinKeyWordState)

  const [dropDownOpen, setDropDownOpen] = useRecoilState(dropDownOpenState)

  useEffect(() => {
    if (keyWord === '') setDropDownOpen(false)
    else setDropDownOpen(true)
  }, [keyWord, setDropDownOpen])

  const filterDropDownList = useCallback(() => {
    if (!keyWord) return []
    const arr = keyWordList.filter((item) =>
      item.name.replace(/(\s*)/g, '').toLowerCase().startsWith(keyWord.replace(/(\s*)/g, '').toLowerCase())
    )
    return arr
  }, [keyWord, keyWordList])

  const dropDownList = useMemo(() => {
    return filterDropDownList()
  }, [filterDropDownList])

  return (
    <div className={cx(styles.dropDownContainer, { [styles.open]: dropDownOpen })}>
      <ul>
        {dropDownList.map((item: IDropDown) => (
          <DropDownItem key={`key_word_${item.id}`} data={item} />
        ))}
      </ul>
    </div>
  )
}

export default DropDownList