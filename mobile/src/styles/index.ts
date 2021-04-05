import { StyleSheet } from 'react-native'

const colors = {
  white: "#FFF",
  lightGray: "#F2F2F2",
  mediumGray: "#9E9E9E",
  borderGray: "#E1E1E1",
  darkGray: "#263238",
  black: "#000",
  primary: "#407BFF",
  secondary: "#33569B",
  bluePill: "#407BFF61",
  red: "#DF5753"
}

const text = StyleSheet.create({
  regular: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.mediumGray
  },

  bold: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.darkGray
  },

  primaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 20,
    color: colors.white
  },

  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  currency: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.mediumGray
  },

  productPrice: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 3
  }
})

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  draw: {
    width: 313,
    height: 225
  },

  textContainer: {
    paddingHorizontal: 20
  },

  primaryButton: {
    width: 290,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10
  },

  arrowContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: colors.secondary
  },

  // productCard

  scrollContainer: {
    padding: 10
  },

  productCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  productDescription: {
    width: '100%',
    padding: 20,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  productImg: {
    width: 140,
    height: 140,
    margin: 16
  },

  // SearchInput

  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12.5,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  searchInput: {
    width: '90%',
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGray
  }
})

export { colors, text, theme }