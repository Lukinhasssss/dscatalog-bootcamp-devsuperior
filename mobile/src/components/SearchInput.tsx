import React from 'react'
import { TextInput, View } from 'react-native'
import { theme } from '../styles'

interface SearchProps {
  placeholder: string
}

const SearchInput: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <View style={ theme.inputContainer }>
      <TextInput style={ theme.searchInput } placeholder={ placeholder } />
    </View>
  )
}

export default SearchInput