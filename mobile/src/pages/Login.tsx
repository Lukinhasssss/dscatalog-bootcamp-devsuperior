import React, { useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { text, theme } from '../styles'
import { isAuthenticated, login } from '../services/auth'

import eyesOpened from '../assets/eyes-opened.png'
import eyesClosed from '../assets/eyes-closed.png'
import arrow from '../assets/arrow.png'

const Login: React.FC = () => {
  const [hidePassword, setHidePassword] = useState(true)
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })

  async function handleLogin() {
    const data = await login(userInfo)
    console.warn(data)
  }

  useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <View style={ theme.container }>
      <View style={ theme.loginCard }>
        <Text style={ text.loginTitle }>Login</Text>
        <View style={ theme.form }>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={ userInfo.username }
            onChangeText={ (event) => {
              const newUserInfo = { ...userInfo }
              newUserInfo.username = event
              setUserInfo(newUserInfo)
            }}
            style={ theme.textInput }
          />
          <View style={ theme.passwordGroup }>
            <TextInput
              placeholder="Senha"
              autoCapitalize="none"
              secureTextEntry={ hidePassword }
              value={ userInfo.password }
              onChangeText={ (event) => {
                const newUserInfo = { ...userInfo }
                newUserInfo.password = event
                setUserInfo(newUserInfo)
              }}
              style={ theme.textInput }
            />
            <TouchableOpacity
              onPress={ () => setHidePassword(!hidePassword) }
              style={ theme.toggle }
            >
              <Image source={ hidePassword ? eyesOpened : eyesClosed } />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={ 0.8 }
          onPress={ () => handleLogin() }
          style={ theme.primaryButton }
        >
          <View>
            <Text style={ text.primaryText }>Fazer Login</Text>
          </View>

          <View style={ theme.arrowContainer }>
            <Image source={ arrow } />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Login